import React, { useState, useEffect } from "react";
import axiosInstance from "../../services/api";

const TruckDriverForm = ({ driver, onClose }) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (driver) {
      setName(driver.name);
      setMobile(driver.mobile);
      setLicenseNumber(driver.license_number);
      setAddress(driver.address || "");
    } else {
      setName("");
      setMobile("");
      setLicenseNumber("");
      setAddress("");
    }
  }, [driver]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (driver) {
        await axiosInstance.put(`/truck/v1/truck-drivers/${driver.id}/`, {
          name,
          mobile,
          license_number: licenseNumber,
          address,
        });
      } else {
        await axiosInstance.post("/truck/v1/truck-drivers/", {
          name,
          mobile,
          license_number: licenseNumber,
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
        {driver ? "Edit Truck Driver" : "Add Truck Driver"}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 mb-3 w-full"
          type="text"
          placeholder="Driver Name"
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
        <input
          className="border p-2 mb-3 w-full"
          type="text"
          placeholder="License Number"
          value={licenseNumber}
          onChange={(e) => setLicenseNumber(e.target.value)}
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
            {driver ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TruckDriverForm;
