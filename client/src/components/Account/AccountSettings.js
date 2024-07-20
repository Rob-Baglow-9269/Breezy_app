import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AccountSettings.css'; // Ensure you have the CSS file

const AccountSettings = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { username, password });
      localStorage.setItem('token', res.data.token);
      setIsLoggedIn(true);
    } catch (error) {
      alert('Login failed!');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.put('http://localhost:5000/api/users/update', { username, email, password }, config);
      alert('Update successful!');
    } catch (error) {
      console.error('Error updating user:', error.response?.data || error.message);
      alert('Update failed!');
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete('http://localhost:5000/api/users/delete', config);
      alert('Account deleted successfully!');
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      navigate('/'); // Redirect to home
    } catch (error) {
      alert('Account deletion failed!');
    }
  };

  if (!isLoggedIn) {
    return (
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    );
  }

  return (
    <div>
      <h2>Account Settings</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Update</button>
      </form>
      <button onClick={handleDelete}>Delete Account</button>
    </div>
  );
};

export default AccountSettings;
