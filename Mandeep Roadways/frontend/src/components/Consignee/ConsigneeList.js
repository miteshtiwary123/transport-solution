import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';

function ConsigneeList() {
  const [consignees, setConsignees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchConsignees();
  }, []);

  const fetchConsignees = async () => {
    const response = await api.getConsignees();
    setConsignees(response.data);
  };

  const handleDelete = async (id) => {
    await api.deleteConsignee(id);
    fetchConsignees();
  };

  return (
    <div className="list-container">
      <div className="list-header">
        <h2>All Consignees</h2>
        <button className="add-button" onClick={() => navigate('/consignees')}> + Add Consignee</button>
      </div>
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
          {consignees.map(c => (
            <tr key={c.id}>
              <td>{c.consignee_name}</td>
              <td>{c.gst_number}</td>
              <td>{c.phone || 'N/A'}</td>
              <td>{c.alternate_number || 'N/A'}</td>
              <td>{c.place || 'N/A'}</td>
              <td>
                <button onClick={() => navigate(`/consignees?id=${c.id}`)}>Edit</button>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ConsigneeList;
