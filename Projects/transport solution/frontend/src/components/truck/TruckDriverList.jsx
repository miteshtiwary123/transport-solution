import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/api";
import TruckDriverForm from "./TruckDriverForm";

const TruckDriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchDrivers = async () => {
    try {
      const res = await axiosInstance.get("/truck/v1/truck-drivers/");
      setDrivers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this driver?")) return;
    try {
      await axiosInstance.delete(`/truck/v1/truck-drivers/${id}/`);
      fetchDrivers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (driver) => {
    setSelectedDriver(driver);
    setShowForm(true);
  };

  const handleAdd = () => {
    setSelectedDriver(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    fetchDrivers();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Truck Drivers</h2>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Driver
        </button>
      </div>

      {showForm ? (
        <TruckDriverForm
          driver={selectedDriver}
          onClose={handleFormClose}
        />
      ) : (
        <table className="w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Mobile</th>
              <th className="p-3">License Number</th>
              <th className="p-3">Address</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{driver.name}</td>
                <td className="p-3">{driver.mobile}</td>
                <td className="p-3">{driver.license_number}</td>
                <td className="p-3">{driver.address}</td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(driver)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(driver.id)}
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

export default TruckDriverList;
