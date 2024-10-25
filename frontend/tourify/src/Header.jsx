// Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from './assets/images/Logo-fondo-transparente-3.png'; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className='logo-and-phrase'>
        <Link to="/" className="logo">
          <img src={logo} className="logo-image" alt="Logo" />
        </Link>
        <Link to="/" className="logo">
          <span>¡Crea recuerdos duraderos... Descubre nuevos horizontes!</span>
        </Link>
      </div>
      
      <div className="auth-buttons">
        <button className="btn" id='btn-crear-cuenta'>Crear cuenta</button>
        <button className="btn" id='btn-iniciar-sesion'>Iniciar sesión</button>
      </div>

      <div className="hamburger-menu" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu">
          <button className="btn" id='btn-crear-cuenta'>Crear cuenta</button>
          <button className="btn" id='btn-iniciar-sesion'>Iniciar sesión</button>
        </div>
      )}
    </header>
  );
};

export default Header;
