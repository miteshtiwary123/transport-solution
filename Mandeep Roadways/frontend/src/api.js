import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const api = {
  // Consignor API calls
  getConsignors: () => axios.get(`${API_URL}/consignors/`),
  getConsignor: (id) => axios.get(`${API_URL}/consignors/${id}`),
  createConsignor: (data) => axios.post(`${API_URL}/consignors/`, data),
  updateConsignor: (id, data) => axios.put(`${API_URL}/consignors/${id}`, data),
  deleteConsignor: (id) => axios.delete(`${API_URL}/consignors/${id}`),

  // Consignee API calls
  getConsignees: () => axios.get(`${API_URL}/consignees/`),
  getConsignee: (id) => axios.get(`${API_URL}/consignees/${id}`),
  createConsignee: (data) => axios.post(`${API_URL}/consignees/`, data),
  updateConsignee: (id, data) => axios.put(`${API_URL}/consignees/${id}`, data),
  deleteConsignee: (id) => axios.delete(`${API_URL}/consignees/${id}`),

  // Truck API calls
  getTrucks: () => axios.get(`${API_URL}/trucks/`),
  getTruck: (id) => axios.get(`${API_URL}/trucks/${id}`),
  createTruck: (data) => axios.post(`${API_URL}/trucks/`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateTruck: (id, data) => axios.put(`${API_URL}/trucks/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteTruck: (id) => axios.delete(`${API_URL}/trucks/${id}`),

  // Agent API calls
  getAgents: () => axios.get(`${API_URL}/agents/`),
  getAgent: (id) => axios.get(`${API_URL}/agents/${id}`),
  createAgent: (data) => axios.post(`${API_URL}/agents/`, data),
  updateAgent: (id, data) => axios.put(`${API_URL}/agents/${id}`, data),
  deleteAgent: (id) => axios.delete(`${API_URL}/agents/${id}`),
};