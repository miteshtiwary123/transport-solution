import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  TruckIcon,
  UserCircleIcon,
  WrenchIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

const Layout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <HomeIcon className="h-5 w-5 mr-2" />,
      access: ["admin", "superadmin", "customer"],
    },
    {
      name: "Users",
      path: "/users",
      icon: <UsersIcon className="h-5 w-5 mr-2" />,
      access: ["admin", "superadmin"],
    },
    {
      name: "Trucks",
      path: "/trucks",
      icon: <TruckIcon className="h-5 w-5 mr-2" />,
      access: ["admin", "superadmin"],
    },
    {
      name: "Truck Owners",
      path: "/truck-owners",
      icon: <UserCircleIcon className="h-5 w-5 mr-2" />,
      access: ["admin", "superadmin"],
    },
    {
      name: "Truck Drivers",
      path: "/truck-drivers",
      icon: <WrenchIcon className="h-5 w-5 mr-2" />,
      access: ["admin", "superadmin"],
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h1 className="text-xl font-semibold text-blue-600">Admin Panel</h1>
          <button
            className="md:hidden text-gray-600"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Menu */}
        <nav className="mt-6 space-y-1">
          {menuItems.map(
            (item) =>
              item.access.includes(user?.user_type) && (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-6 py-2 text-gray-700 rounded-md transition ${
                    location.pathname === item.path
                      ? "bg-blue-100 text-blue-600 font-semibold"
                      : "hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              )
          )}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white px-4 py-3 shadow-sm sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <button
              className="md:hidden text-gray-700"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <h2 className="text-lg font-semibold capitalize">
              {location.pathname.split("/")[1] || "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-700 text-sm">
              {user?.name || user?.mobile} ({user?.user_type})
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              Logout
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
