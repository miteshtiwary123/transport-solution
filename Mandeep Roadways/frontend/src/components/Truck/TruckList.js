import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';

function TruckList() {
  const [trucks, setTrucks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrucks();
  }, []);

  const fetchTrucks = async () => {
    try {
      const response = await api.getTrucks();
      setTrucks(response.data);
    } catch (error) {
      console.error("Error fetching trucks:", error);
    }
  };

  const handleDelete = async (id) => {
    await api.deleteTruck(id);
    fetchTrucks();
  };

  return (
    <div className="list-container">
      <div className="list-header">
        <h2>All Trucks</h2>
        <button className="add-button" onClick={() => navigate('/trucks')}> + Add Truck</button>
      </div>
      <table className="list-table">
        <thead>
          <tr>
            <th>Truck Number</th>
            <th>Weight</th>
            <th>Driver Mobile</th>
            <th>Owner Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trucks.map(truck => (
            <tr key={truck.id}>
              <td>{truck.truck_number}</td>
              <td>{truck.weight}</td>
              <td>{truck.driver_mobile}</td>
              <td>{truck.owner_mobile}</td>
              <td>
                <button onClick={() => navigate(`/trucks?id=${truck.id}`)}>Edit</button>
                <button onClick={() => handleDelete(truck.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TruckList;
