import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [accessToken, setAccessToken] = useState(() => localStorage.getItem("accessToken") || null);
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem("refreshToken") || null);

  const API_URL = "http://127.0.0.1:8000/users/v1";

  // Login function
  const login = async (mobile, password) => {
    try {
      const response = await axiosInstance.post(`${API_URL}/token/`, { mobile, password });

      const { access, refresh, id, name, mobile: userMobile, user_type } = response.data;

      // Store tokens
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      setAccessToken(access);
      setRefreshToken(refresh);

      // Store user info
      const userData = { id, name, mobile: userMobile, user_type };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  };


  // Auto-refresh access token on page reload
  useEffect(() => {
    if (!refreshToken) return;

    const refreshAccessToken = async () => {
      try {
        const res = await axiosInstance.post(`${API_URL}/token/refresh/`, { refresh: refreshToken });
        localStorage.setItem("accessToken", res.data.access);
        setAccessToken(res.data.access);
      } catch (err) {
        logout(); // Token invalid, force logout
      }
    };

    refreshAccessToken();
  }, [refreshToken]);

  return (
    <AuthContext.Provider value={{ user, login, logout, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
