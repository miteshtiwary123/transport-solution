import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';
// import './ConsignorList.css';

function ConsignorList() {
  const [consignors, setConsignors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchConsignors();
  }, []);

  const fetchConsignors = async () => {
    try {
      const response = await api.getConsignors();
      setConsignors(response.data);
    } catch (error) {
      console.error('Error fetching consignors:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteConsignor(id);
      fetchConsignors();
    } catch (error) {
      console.error('Error deleting consignor:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/consignors?id=${id}`); // assuming your form can handle this
  };

  return (
    <div className="list-container">
      <div className="list-header">
        <h2>All Consignors</h2>
        <button className="add-button" onClick={() => navigate('/consignors')}>
          + Add Consignor
        </button>
      </div>
      {consignors.length === 0 ? (
        <p className="no-data">No consignors found.</p>
      ) : (
      <table className="list-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>GST Number</th>
            <th>Phone</th>
            <th>Alternate Phone</th>
            <th>Place</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {consignors.map((consignor) => (
            <tr key={consignor.id}>
              <td>{consignor.consignor_name}</td>
              <td>{consignor.gst_number}</td>
              <td>{consignor.phone || 'N/A'}</td>
              <td>{consignor.alternate_number || 'N/A'}</td>
              <td>{consignor.place || 'N/A'}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(consignor.id)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => handleDelete(consignor.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {consignors.length === 0 && (
            <tr>
              <td colSpan="5" className="no-data">No consignors found.</td>
            </tr>
          )}
        </tbody>
      </table>
      )}
    </div>
  );
}

export default ConsignorList;
