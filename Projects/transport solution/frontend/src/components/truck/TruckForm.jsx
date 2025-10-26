// src/components/TruckForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../services/api";

const TruckForm = () => {
  const { id } = useParams(); // if exists -> edit mode
  const navigate = useNavigate();
  const [owners, setOwners] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [formData, setFormData] = useState({
    truck_number: "",
    model_name: "",
    capacity_in_tons: "",
    owner: "",
    driver: "",
    is_active: true,
  });

  useEffect(() => {
    fetchOwnersAndDrivers();
    if (id) fetchTruckData();
  }, [id]);

  const fetchOwnersAndDrivers = async () => {
    try {
      const [ownersRes, driversRes] = await Promise.all([
        axiosInstance.get("truck/v1/truck-owners/"),
        axiosInstance.get("truck/v1/truck-drivers/"),
      ]);
      setOwners(ownersRes.data);
      setDrivers(driversRes.data);
    } catch (err) {
      console.error("Failed to load related data", err);
    }
  };

  const fetchTruckData = async () => {
    try {
      const res = await axiosInstance.get(`truck/v1/${id}/`);
      setFormData(res.data);
    } catch (error) {
      console.error("Failed to fetch truck details");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axiosInstance.put(`truck/v1/${id}/`, formData);
        alert("Truck updated successfully!");
      } else {
        await axiosInstance.post("truck/v1/", formData);
        alert("Truck added successfully!");
      }
      navigate("/trucks");
    } catch (error) {
      console.error(error);
      alert("Failed to save truck");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">
        {id ? "Edit Truck" : "Add New Truck"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Truck Number</label>
          <input
            type="text"
            name="truck_number"
            value={formData.truck_number}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <div>
          <label className="block font-medium">Model Name</label>
          <input
            type="text"
            name="model_name"
            value={formData.model_name}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <div>
          <label className="block font-medium">Capacity (tons)</label>
          <input
            type="number"
            name="capacity_in_tons"
            value={formData.capacity_in_tons}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <div>
          <label className="block font-medium">Owner</label>
          <select
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2 w-full"
          >
            <option value="">Select Owner</option>
            {owners.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Driver</label>
          <select
            name="driver"
            value={formData.driver || ""}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="">Select Driver</option>
            {drivers.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.license_number})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-gray-700">Active</label>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/trucks")}
            className="px-4 py-2 rounded border text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {id ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TruckForm;
