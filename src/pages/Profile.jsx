import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../services/auth';
import api from '../services/api';
import '../styles/Profile.css';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/auth/update', {
        email: formData.email,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      setMessage('Perfil actualizado correctamente');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error al actualizar');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2 className="shine-text">Mi Perfil</h2>
        {message && <p className="message">{message}</p>}
      </div>

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Contraseña actual</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
        </div>

        <div className="form-group">
          <label>Nueva contraseña (opcional)</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Dejar vacío para no cambiar"
          />
        </div>

        <div className="profile-actions">
          <button type="submit" className="btn btn-primary">
            Actualizar Perfil
          </button>
          <button 
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/welcome')}
          >
            Volver a Inicio
          </button>
          <button 
            type="button"
            onClick={() => {
              logout();
              navigate('/login');
            }} 
            className="btn btn-danger"
          >
            Cerrar Sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;