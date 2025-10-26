// src/components/TruckList.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/api";

const TruckList = () => {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTrucks = async () => {
    try {
      const res = await axiosInstance.get("truck/v1/");
      setTrucks(res.data);
    } catch (error) {
      console.error("Error fetching trucks", error);
      alert("Failed to load trucks");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this truck?")) {
      try {
        await axiosInstance.delete(`truck/v1/${id}/`);
        fetchTrucks();
      } catch (error) {
        alert("Failed to delete truck");
      }
    }
  };

  useEffect(() => {
    fetchTrucks();
  }, []);

  if (loading) return <div>Loading trucks...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Truck List</h2>
        <button
          onClick={() => navigate("/trucks/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Truck
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Truck No</th>
              <th className="border p-2">Model</th>
              <th className="border p-2">Capacity (Tons)</th>
              <th className="border p-2">Owner</th>
              <th className="border p-2">Driver</th>
              <th className="border p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trucks.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No trucks found.
                </td>
              </tr>
            ) : (
              trucks.map((truck) => (
                <tr key={truck.id} className="hover:bg-gray-50">
                  <td className="border p-2">{truck.truck_number}</td>
                  <td className="border p-2">{truck.model_name}</td>
                  <td className="border p-2">{truck.capacity_in_tons}</td>
                  <td className="border p-2">{truck.owner_name || "—"}</td>
                  <td className="border p-2">{truck.driver_name || "—"}</td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => navigate(`/trucks/edit/${truck.id}`)}
                      className="text-blue-600 hover:underline mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(truck.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TruckList;
