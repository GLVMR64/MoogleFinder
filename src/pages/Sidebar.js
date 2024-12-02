import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img
        src="/moogleicon.jpg" // Direct path to the image in the public folder
        alt="Logo"
        className="sidebar-logo"
      />
      <nav>
        <ul>
          <li>
            <NavLink to="/" className="sidebar-link">
              <i className="fas fa-home"></i> {/* Home Icon */}
            </NavLink>
          </li>
          <li>
            <NavLink to="/search" className="sidebar-link">
              <i className="fas fa-search"></i> {/* Search Icon */}
            </NavLink>
          </li>
          <li>
            <NavLink to="/collection" className="sidebar-link">
              <i className="fas fa-book"></i> {/* Collection Icon */}
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
