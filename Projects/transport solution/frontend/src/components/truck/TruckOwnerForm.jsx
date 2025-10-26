import React, { useState, useEffect } from "react";
import axiosInstance from "../../services/api";

const TruckOwnerForm = ({ owner, onClose }) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (owner) {
      setName(owner.name);
      setMobile(owner.mobile);
      setAddress(owner.address || "");
    } else {
      setName("");
      setMobile("");
      setAddress("");
    }
  }, [owner]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (owner) {
        await axiosInstance.put(`/truck/v1/truck-owners/${owner.id}/`, {
          name,
          mobile,
          address,
        });
      } else {
        await axiosInstance.post("/truck/v1/truck-owners/", {
          name,
          mobile,
          address,
        });
      }
      onClose();
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="bg-white p-6 shadow rounded-lg max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">
        {owner ? "Edit Truck Owner" : "Add Truck Owner"}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 mb-3 w-full"
          type="text"
          placeholder="Owner Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="border p-2 mb-3 w-full"
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <textarea
          className="border p-2 mb-3 w-full"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {owner ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TruckOwnerForm;
