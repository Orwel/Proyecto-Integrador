import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { SearchBar } from './components/SearchBar';
import { useAuth } from './context/AuthContext';
import ModalLogin from './components/modal';
import { useDisclosure } from "@nextui-org/modal";



const Header = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {userInfo, signOut} = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getInitials = (name) => {
    return name ? name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() : "";
  };
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/'); // Redirige a la página de inicio de sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <header className="header">
      <div className='logo-and-phrase'>
        <div className='flex items-center gap-3'>
        <Link to="/" className="logo">
          <img src="/img/logo.png" className="logo-image" alt="Logo" />
        </Link>
        <Link to="/" className="logo">
          Crea recuerdos duraderos... Descubre nuevos horizontes!
        </Link>

        </div>

        <div className="auth-buttons">
        {userInfo ? (
            <div className="user-avatar">
              <span className="avatar">{getInitials(userInfo.name)}</span>
              <span className="user-name">{userInfo.name}</span>
              <button className="signout-button" onClick={handleSignOut}>Cerrar sesión</button>
            </div>
          ) : (
            <>
              <button className="btn" id='btn-crear-cuenta' onClick={() => navigate('/signup')}>Crear cuenta</button>
              <button className="btn" id='btn-iniciar-sesion'  onClick={() => onOpen()}>Iniciar sesión</button>
            </>
          )}
        </div>

        <div className="hamburger-menu" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>



      {isMenuOpen && (
        <div className="mobile-menu">
          {userInfo ? (
            <div className="user-avatar">
              <span className="avatar">{getInitials(userInfo.name)}</span>
              <span className="user-name">{userInfo.name}</span>
            </div>
          ) : (
            <>
              <button className="btn" id='btn-crear-cuenta' onClick={() => navigate('/signup')}>Crear cuenta</button>
              <button className="btn" id='btn-iniciar-sesion' 
             onClick={() => navigate('/login')}
              >Iniciar sesión</button>
            </>
          )}
        </div>
      )}
      <SearchBar />
      <ModalLogin
				isOpen={isOpen}
				onOpenChange={onOpenChange} />
    </header>
  );
};

export default Header;