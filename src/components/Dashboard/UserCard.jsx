import React from 'react';

const UserCard = ({ user }) => (
  <div className="user-card">
    <h2>{user.nombre}</h2>
    <p>{user.email}</p>
  </div>
);

export default UserCard;