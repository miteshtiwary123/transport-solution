import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/api";
import TruckOwnerForm from "./TruckOwnerForm";

const TruckOwnerList = () => {
  const [owners, setOwners] = useState([]);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchOwners = async () => {
    try {
      const res = await axiosInstance.get("/truck/v1/truck-owners/");
      setOwners(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this owner?")) return;
    try {
      await axiosInstance.delete(`/truck/v1/truck-owners/${id}/`);
      fetchOwners();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (owner) => {
    setSelectedOwner(owner);
    setShowForm(true);
  };

  const handleAdd = () => {
    setSelectedOwner(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    fetchOwners();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Truck Owners</h2>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Owner
        </button>
      </div>

      {showForm ? (
        <TruckOwnerForm
          owner={selectedOwner}
          onClose={handleFormClose}
        />
      ) : (
        <table className="w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Mobile</th>
              <th className="p-3">Address</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {owners.map((owner) => (
              <tr key={owner.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{owner.name}</td>
                <td className="p-3">{owner.mobile}</td>
                <td className="p-3">{owner.address}</td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(owner)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(owner.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TruckOwnerList;
