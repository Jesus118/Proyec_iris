import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/auth';
import { ThemeContext } from '../context/ThemeContext';
import Chatbot from '../components/ChatBot/chat'; // Chat integrado
import '../styles/Home.css';

const Home = () => {
  const { user, logout } = useAuth();
  const { dark, toggleTheme } = useContext(ThemeContext);
  const [profileImg, setProfileImg] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const [openSidebar, setOpenSidebar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const profile = localStorage.getItem(`user_${user.email}_profile`);
    const cover = localStorage.getItem(`user_${user.email}_cover`);
    if (profile) setProfileImg(profile);
    if (cover) setCoverImg(cover);
  }, [user.email]);

  const handleImgChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'profile') {
        setProfileImg(reader.result);
        localStorage.setItem(`user_${user.email}_profile`, reader.result);
      } else {
        setCoverImg(reader.result);
        localStorage.setItem(`user_${user.email}_cover`, reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={`home-wrapper ${dark ? 'dark-mode' : ''}`}>
      <div className="home-overlay">
        <button 
          className="profile-toggle" 
          onClick={() => setOpenSidebar(true)}
        >
          ☰ Perfil
        </button>

        <div className={`sidebar ${openSidebar ? 'open' : ''}`}>
          <div className="sidebar-header">
            <button 
              className="close-btn" 
              onClick={() => setOpenSidebar(false)}
            >
              ✖
            </button>
          </div>

          <div className="cover-section">
            {coverImg ? (
              <img src={coverImg} alt="Portada" className="cover-img" />
            ) : (
              <div className="cover-placeholder">Portada</div>
            )}
          </div>

          <div className="profile-section">
            {profileImg ? (
              <img src={profileImg} alt="perfil" className="profile-img" />
            ) : (
              <div className="profile-img placeholder">Foto</div>
            )}
          </div>

          <div className="profile-content">
            <h3 className="user-name">{user?.nombre}</h3>
            <p className="user-email">{user?.email}</p>

            <div className="profile-buttons">
              <label className="profile-btn btn-primary">
                Cambiar portada
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleImgChange(e, 'cover')} 
                  hidden 
                />
              </label>

              <label className="profile-btn btn-primary">
                Cambiar foto
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleImgChange(e, 'profile')} 
                  hidden 
                />
              </label>

              <button 
                className="profile-btn btn-secondary"
                onClick={() => navigate('/welcome')}
              >
                Volver a inicio
              </button>

              <button 
                className="profile-btn btn-danger"
                onClick={logout}
              >
                Cerrar sesión
              </button>
            </div>
          </div>

          <div className="config-section">
            <h4>Configuración</h4>
            <div className="switch-container">
              <span>Modo {dark ? 'Oscuro' : 'Claro'}</span>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={dark} 
                  onChange={toggleTheme} 
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Chatbot integrado debajo del sidebar */}
        <div className="chat-section">
          <Chatbot />
        </div>
      </div>
    </div>
  );
};

export default Home;
