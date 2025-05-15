import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Welcome.css';
import irisIcon from '../assets/iris.png'; // Asegúrate que el nombre del archivo coincida

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="welcome-text-section">
          <h1 className="iris-title">
            <span className="iris-letter">I</span>
            <span className="iris-letter">R</span>
            <span className="iris-letter">I</span>
            <span className="iris-letter">S</span>
          </h1>
          <p className="welcome-subtitle">Tu plataforma de comunicación inteligente</p>
          
          <div className="welcome-buttons">
            <button 
              className="welcome-btn login-btn"
              onClick={() => navigate('/login')}
            >
              Iniciar Sesión
            </button>
            <button 
              className="welcome-btn register-btn"
              onClick={() => navigate('/register')}
            >
              Registrarse
            </button>
          </div>
        </div>

        <div className="welcome-image-section">
          <img 
            src={irisIcon} 
            alt="Icono de Iris" 
            className="iris-icon"
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;