import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';

function ConsignorForm() {
  const [formData, setFormData] = useState({
    consignor_name: '', gst_number: '', phone_number: '', alternate_number: '', place: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.createConsignor(formData);
    setMessage('Consignor added successfully!');
    setTimeout(() => {
      navigate('/consignors');
    }, 2000);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Add Consignor</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input name="consignor_name" value={formData.consignor_name} onChange={handleChange} placeholder="Name" required style={inputStyle} />
        <input name="gst_number" value={formData.gst_number} onChange={handleChange} placeholder="GST Number" required style={inputStyle} />
        <input name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Phone" style={inputStyle} />
        <input name="alternate_number" value={formData.alternate_number} onChange={handleChange} placeholder="Alternate Phone" style={inputStyle} />
        <input name="place" value={formData.place} onChange={handleChange} placeholder="Place" style={inputStyle} />
        <button type="submit" style={buttonStyle}>Create</button>
      </form>
    </div>
  );
}

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

export default ConsignorForm;
