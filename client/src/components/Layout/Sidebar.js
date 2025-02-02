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
  const { logout, user } = useAuth();

  const isUser = user?.role === 'user';
  const isManufacturer = user?.role === 'manufacturer';

  const userNavItems = [
    { path: '/user/dashboard', icon: <DashboardIcon />, label: 'Dashboard' },
    { path: '/user/orders', icon: <ShoppingCartIcon />, label: 'My Orders' },
    { path: '/user/profile', icon: <PersonIcon />, label: 'Profile' },
  ];

  const manufacturerNavItems = [
    { path: '/dashboard', icon: <DashboardIcon />, label: 'Dashboard' },
    { path: '/email_list', icon: <EmailIcon />, label: 'Emails' },
    { path: '/order_list', icon: <ShoppingCartIcon />, label: 'Orders' },
    { path: '/profile', icon: <PersonIcon />, label: 'Profile' },
  ];

  // Default to manufacturer items if no role or unknown role
  const navItems = isUser ? userNavItems : (isManufacturer ? manufacturerNavItems : manufacturerNavItems);

  return (
    <div className="sidebar" role="navigation" aria-label="Main navigation">
      <div className="sidebar-header">
        <h2 id="sidebar-title">{isUser ? 'User Dashboard' : 'Order Manager'}</h2>
      </div>
      
      <nav className="sidebar-nav" aria-labelledby="sidebar-title">
        {navItems.map((item) => (
          <NavLink 
            key={item.path}
            to={item.path} 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
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