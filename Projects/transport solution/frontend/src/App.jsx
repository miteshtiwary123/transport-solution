import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import UserList from "./components/UserList";
import Layout from "./components/Layout";
import TruckList from "./components/truck/TruckList";
import TruckForm from "./components/truck/TruckForm";
import TruckOwnerList from "./components/truck/TruckOwnerList";
import TruckDriverList from "./components/truck/TruckDriverList";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Layout>
                  <UserList />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/truck-owners"
            element={
              <ProtectedRoute>
                <Layout>
                  <TruckOwnerList />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/truck-drivers"
            element={
              <ProtectedRoute>
                <Layout>
                  <TruckDriverList />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/trucks"
            element={
              <ProtectedRoute>
                <Layout>
                  <TruckList />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/trucks/add"
            element={
              <ProtectedRoute>
                <Layout>
                  <TruckForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/trucks/edit/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <TruckForm />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
