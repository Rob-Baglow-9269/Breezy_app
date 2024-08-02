import React from 'react';
import axios from 'axios';

const DeleteUser = () => {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('https://breezy-app.onrender.com/api/users/delete', {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Account deleted successfully!');
      localStorage.removeItem('token');
    } catch (error) {
      alert('Account deletion failed!');
    }
  };

  return (
    <button onClick={handleDelete}>Delete Account</button>
  );
};

export default DeleteUser;
