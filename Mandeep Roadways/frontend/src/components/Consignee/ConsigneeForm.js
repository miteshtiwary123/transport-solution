import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api'; // fixed path

function ConsigneeForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    consignee_name: '', gst_number: '', phone_number: '', alternate_number: '', place: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createConsignee(formData);
      setSuccessMessage('Consignee added successfully!');
      setTimeout(() => navigate('/consignees'), 2000);
    } catch (error) {
      console.error("Error adding consignee:", error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Add Consignee</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input name="consignee_name" value={formData.consignee_name} onChange={handleChange} placeholder="Name" required style={inputStyle} />
        <input name="gst_number" value={formData.gst_number} onChange={handleChange} placeholder="GST Number" required style={inputStyle} />
        <input name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Phone" style={inputStyle} />
        <input name="alternate_number" value={formData.alternate_number} onChange={handleChange} placeholder="Alternate Phone" style={inputStyle} />
        <input name="place" value={formData.place} onChange={handleChange} placeholder="Place" style={inputStyle} />
        <button type="submit" style={buttonStyle}>Add Consignee</button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '16px'
};

const buttonStyle = {
  padding: '10px',
  borderRadius: '5px',
  backgroundColor: '#2ecc71',
  color: '#fff',
  fontSize: '16px',
  cursor: 'pointer',
  border: 'none'
};

export default ConsigneeForm;
