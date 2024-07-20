import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Tray.css'; // Ensure you have the CSS file

const Tray = () => {
  const [isTrayOpen, setIsTrayOpen] = useState(false);

  const toggleTray = () => {
    setIsTrayOpen(!isTrayOpen);
  };

  return (
    <div className="tray-container">
      <button onClick={toggleTray} className="tray-toggle-button">
        ☰ {/* Menu icon or any other icon */}
      </button>
      {isTrayOpen && (
        <div className="tray">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/account">Account Settings</Link></li> {/* Add Account Settings link */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Tray;
