import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';

function Agent() {
  const [formData, setFormData] = useState({ name: '', mobile: '', address: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createAgent(formData);
      setFormData({ name: '', mobile: '', address: '' });
      navigate('/agents'); // Redirect after create
    } catch (error) {
      console.error('Error creating agent:', error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Add Agent</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" style={inputStyle} required />
        <input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" style={inputStyle} required />
        <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" style={inputStyle} />
        <button type="submit" style={buttonStyle}>Create Agent</button>
      </form>
    </div>
  );
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  marginBottom: '20px'
};

const inputStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #bdc3c7',
  fontSize: '16px'
};

const buttonStyle = {
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#2ecc71',
  color: 'white',
  cursor: 'pointer',
  fontSize: '16px'
};

export default Agent;
