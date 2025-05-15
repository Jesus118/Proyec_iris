import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/auth';
import '../styles/Auth.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      navigate('/home');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="auth-container">
      <h2 className="shine-text">Iniciar sesión</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Correo electrónico</label>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <div className="password-container">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Contraseña"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
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
          Ingresar
        </button>
      </form>

      <p className="auth-link">
        ¿No tienes cuenta? <Link to="/register" className="link">Regístrate aquí</Link>
      </p>
    </div>
  );
};

export default Login;