import React from 'react';
import Tray from './Tray';
import './Navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">
          <img src="/image0.jpg" alt="Logo" />
        </div>
        <div className="navbar-title">
          <h1>Breezy Weather Ondemand</h1>
        </div>
        <div className="navbar-tray">
          <Tray isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
