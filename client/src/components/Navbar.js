import React from 'react';
import Tray from './Tray'; // Import the Tray component
import './Navbar.css'; // Ensure you have the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-tray">
          <Tray /> {/* Add the Tray component here */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
