import React from 'react';
import Sidebar from './Sidebar';
import ThemeToggle from '../common/ThemeToggle';
import './Layout.css';

function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <ThemeToggle />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default Layout;