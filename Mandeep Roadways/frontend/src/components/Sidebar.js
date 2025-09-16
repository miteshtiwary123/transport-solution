import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // adjust path as needed
// import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo-section">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <nav className="nav-links">
        <Link to="/consignors/list">Consignors</Link>
        <Link to="/consignees/list">Consignees</Link>
        <Link to="/trucks/list">Trucks</Link>
        <Link to="/agents/list">Agents</Link>
      </nav>
    </div>
  );
}

export default Sidebar;
