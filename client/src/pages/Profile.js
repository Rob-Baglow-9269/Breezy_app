import React from 'react';
import UpdateUser from '../components/User/UpdateUser';
import DeleteUser from '../components/User/DeleteUser';

const Profile = () => {
  return (
    <div>
      <h1>Profile</h1>
      <UpdateUser />
      <DeleteUser />
    </div>
  );
};

export default Profile;
