import React, { useState } from "react";
import axiosInstance from "../services/api";

const Register = () => {
  const [form, setForm] = useState({
    mobile: "",
    name: "",
    password: "",
    user_type: "customer",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/create/", form);
      alert("User registered successfully");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 mb-3 w-full"
          type="text"
          placeholder="Mobile"
          value={form.mobile}
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
        />
        <input
          className="border p-2 mb-3 w-full"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2 mb-3 w-full"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <select
          className="border p-2 mb-3 w-full"
          value={form.user_type}
          onChange={(e) => setForm({ ...form, user_type: e.target.value })}
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
