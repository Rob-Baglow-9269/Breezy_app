import React, { useState } from 'react';
import axios from 'axios';

const UpdateUser = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('https://breezy-app.onrender.com/api/users/update', { username, email, password }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Update successful!');
    } catch (error) {
      alert('Update failed!');
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Update Profile</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateUser;
