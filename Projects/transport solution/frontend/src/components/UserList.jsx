import React, { useEffect, useState } from "react";
import axiosInstance from "../services/api";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("users/v1/")
      .then((res) => setUsers(res.data))
      .catch(() => alert("Unauthorized or failed to load users"));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Users</h2>
      <ul className="border rounded divide-y">
        {users.map((u) => (
          <li key={u.id} className="p-3">
            <b>{u.name || u.mobile}</b> — <i>{u.user_type}</i>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
