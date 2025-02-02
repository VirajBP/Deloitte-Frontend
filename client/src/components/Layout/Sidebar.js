import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import EmailIcon from '@mui/icons-material/Email';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth } from '../../context/AuthContext';

function Sidebar() {
  const { logout } = useAuth();

  return (
    <div className="sidebar" role="navigation" aria-label="Main navigation">
      <div className="sidebar-header">
        <h2 id="sidebar-title">Order Manager</h2>
      </div>
      
      <nav className="sidebar-nav" aria-labelledby="sidebar-title">
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          <DashboardIcon />
          <span>Dashboard</span>
        </NavLink>

        <NavLink 
          to="/email_list" 
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          <EmailIcon />
          <span>Emails</span>
        </NavLink>

        <NavLink 
          to="/order_list" 
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          <ShoppingCartIcon />
          <span>Orders</span>
        </NavLink>

        <NavLink 
          to="/profile" 
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          <PersonIcon />
          <span>Profile</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-button" onClick={logout}>
          <LogoutIcon />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;