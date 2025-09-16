import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';

function AgentList() {
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    const response = await api.getAgents();
    setAgents(response.data);
  };

  const handleDelete = async (id) => {
    await api.deleteAgent(id);
    fetchAgents();
  };

  return (
    <div className="list-container">
      <div className="list-header">
        <h2>All Agents</h2>
        <button className="add-button" onClick={() => navigate('/agents')}> + Add Agent</button>
      </div>
      <table className="list-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {agents.map(agent => (
            <tr key={agent.id}>
              <td>{agent.name}</td>
              <td>{agent.mobile}</td>
              <td>{agent.address}</td>
              <td>
                <button onClick={() => navigate(`/agents?id=${agent.id}`)}>Edit</button>
                <button onClick={() => handleDelete(agent.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AgentList;
