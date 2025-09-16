import React, { useState } from 'react';
import { api } from '../../api';
import { useNavigate } from 'react-router-dom';

function TruckForm() {
  const [formData, setFormData] = useState({
    truck_number: '',
    weight: '',
    driver_mobile: '',
    owner_mobile: '',
    account_number: '',
  });
  const [files, setFiles] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    Object.keys(files).forEach(key => data.append(key, files[key]));

    try {
      await api.createTruck(data);
      navigate('/trucks');
    } catch (error) {
      console.error("Error creating truck:", error);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Add Truck</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input name="truck_number" value={formData.truck_number} onChange={handleChange} placeholder="Truck Number" required style={inputStyle} />
        <input name="weight" value={formData.weight} onChange={handleChange} placeholder="Weight" style={inputStyle} />
        <input name="driver_mobile" value={formData.driver_mobile} onChange={handleChange} placeholder="Driver Mobile" style={inputStyle} />
        <input name="owner_mobile" value={formData.owner_mobile} onChange={handleChange} placeholder="Owner Mobile" style={inputStyle} />
        <input name="account_number" value={formData.account_number} onChange={handleChange} placeholder="Account Number" style={inputStyle} />
        <input type="file" name="truck_rc" onChange={handleFileChange} style={fileInputStyle} />
        <input type="file" name="driver_licence" onChange={handleFileChange} style={fileInputStyle} />
        <input type="file" name="owner_aadhar_card" onChange={handleFileChange} style={fileInputStyle} />
        <input type="file" name="owner_pan_card" onChange={handleFileChange} style={fileInputStyle} />
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

const fileInputStyle = {
  padding: '10px 0',
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

export default TruckForm;
