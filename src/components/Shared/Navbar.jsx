import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../services/auth';
import '../../styles/main.css'; 


const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      {user ? (
        <>
          <Link to="/home">Inicio</Link>
          <Link to="/dashboard">Dashboard</Link>
          <span>Hola, {user.nombre}</span>
          <button onClick={logout}>Cerrar sesión</button>
        </>
      ) : (
        <>
          <Link to="/login">Iniciar sesión</Link>
          <Link to="/register">Registrarse</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
