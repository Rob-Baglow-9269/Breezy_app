import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Tray.css';

const Tray = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleTray = () => {
    setIsTrayOpen(!isTrayOpen);
  };

  const handleSignOut = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    // Update state to reflect that the user is logged out
    setIsLoggedIn(false);
    // Redirect to home page
    navigate('/');
    alert('Signed out successfully!');
  };

  const getClassName = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="tray-container">
      <button onClick={toggleTray} className="tray-toggle-button">
        ☰ {/* Menu icon or any other icon */}
      </button>
      {isTrayOpen && (
        <div className="tray">
          <ul>
            <li className={getClassName('/')}><Link to="/">Home</Link></li>
            {!isLoggedIn && <li className={getClassName('/register')}><Link to="/register">Register</Link></li>}
            {!isLoggedIn && <li className={getClassName('/login')}><Link to="/login">Login</Link></li>}
            {isLoggedIn && <li className={getClassName('/account')}><Link to="/account">Account Settings</Link></li>}
            {isLoggedIn && <li><button className="link-button" onClick={handleSignOut}>Sign Out</button></li>}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Tray;
