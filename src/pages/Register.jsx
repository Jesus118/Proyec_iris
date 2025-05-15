import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/auth';
import '../styles/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      alert('Registro exitoso. Inicia sesión.');
      navigate('/login');
    } catch (error) {
      console.error('Error registrando usuario:', error);
      alert('No se pudo registrar.');
    }
  };

  return (
    <div className="auth-container">
      <h2 className="shine-text">Regístrate en Iris</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Nombre completo</label>
          <input
            type="text"
            placeholder="Nombre completo"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Correo electrónico</label>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <div className="password-container">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Contraseña"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <button 
              type="button" 
              className="toggle-password"
              onClick={() => setShowPass(prev => !prev)}
              aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPass ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <button type="submit" className="auth-btn btn-primary">
          Registrarse
        </button>
      </form>

      <p className="auth-link">
        ¿Ya tienes una cuenta? <Link to="/login" className="link">Inicia sesión</Link>
      </p>
    </div>
  );
};

export default Register;