import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from './assets/images/Logo-fondo-transparente-3.png'; 

const Header = () => {
  return (
    <header className="header">
        <div className='logo-and-phrase'>
          <Link to="/" className="logo">
            <img src={logo} className="logo-image" />
          </Link>
          <Link to="/" className="logo">
            <a>¡Crea recuerdos duraderos... Descubre nuevos horizontes!</a>
          </Link>
        </div>
      <div className="auth-buttons">
        <button className="btn" id='btn-crear-cuenta'>Crear cuenta</button>
        <button className="btn" id='btn-iniciar-sesion'>Iniciar sesión</button>
      </div>
      
  <div class="hamburger-menu" id="hamburger-menu">
    <span></span>
    <span></span>
    <span></span>
  </div>
    </header>
  );
};

export default Header;
