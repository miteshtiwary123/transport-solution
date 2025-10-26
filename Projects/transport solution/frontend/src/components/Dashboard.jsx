import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">
        Welcome {' '}
        <span className="text-blue-600">
          {user?.name || user?.mobile}
        </span>
      </h2>
      <div className="mt-4 space-x-4">
        <Link to="/users" className="text-blue-600 underline">
          View Users
        </Link>
        <button onClick={logout} className="text-red-600 underline">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
