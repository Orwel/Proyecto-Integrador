import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { SearchBar } from './components/SearchBar';
import { useAuth } from './context/AuthContext';
import ModalLogin from './components/modalLogin';
import { useDisclosure } from "@nextui-org/modal";
import { ModalConfirmation } from './components/modalConfirmation';
import ModalSignUp from './components/modalSignUp';
import { useDisclosure as useDisclosure1 } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User } from "@nextui-org/react";


const Header = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isOpenSignUp, onOpen: onOpenSignUp, onOpenChange: onOpenChangeSignUp } = useDisclosure1();
  const { userInfo, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
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
      setIsLogoutModalOpen(true);
      navigate('/');
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
              <div className="flex items-center gap-4">
                <Dropdown
                className='bg-[#757575] text-white' 
                placement="bottom-end">
                  <DropdownTrigger>
                    <div className='flex items-center gap-4 cursor-pointer'>
                    <span className="avatar">{getInitials(userInfo.first_name)}</span>
                    <span className="user-name">{userInfo.first_name} {userInfo.last_name}</span>
                    </div>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" variant="flat">
                    
                    <DropdownItem key="profile" className="h-14 gap-2">
                      <h2>Configuracion</h2>
                      <p className="font-semibold">{userInfo.email}</p>
                    </DropdownItem>

                    <DropdownItem key="settings">
                      Información personal
                    </DropdownItem>
                    <DropdownItem key="team_settings">Team Settings</DropdownItem>
                    <DropdownItem key="analytics">
                      Reservas
                    </DropdownItem>
                    <DropdownItem key="system">Lista de favoritos</DropdownItem>
                    <DropdownItem key="configurations">Notificaciones</DropdownItem>
                    
                    <DropdownItem key="help_and_feedback">
                      Terminos de servicio
                    </DropdownItem>
                    <DropdownItem key="Politica de privacidad">
                      Politica de privacidad
                    </DropdownItem>
                    <DropdownItem onClick={handleSignOut} key="logout" color="danger">
                      Cerrar sesión
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>

              </div>
              <img className="signout-button" onClick={handleSignOut} src="/img/Logout.png" alt="" />
            </div>
          ) : (
            <>
              <button className="btn" id='btn-crear-cuenta' onClick={() => onOpenSignUp()}>Crear cuenta</button>
              <button className="btn" id='btn-iniciar-sesion' onClick={() => onOpen()}>Iniciar sesión</button>
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
              <span className="avatar">{getInitials(userInfo.first_name)}</span>
              <span className="user-name">{userInfo.first_name} {userInfo.last_name}</span>
            </div>
          ) : (
            <>
              <button className="btn" id='btn-crear-cuenta' onClick={() => onOpenSignUp()}>Crear cuenta</button>
              <button className="btn" id='btn-iniciar-sesion' onClick={() => onOpen()}>Iniciar sesión</button>
            </>
          )}
        </div>
      )}
      <SearchBar />
      <ModalLogin
        isOpen={isOpen}
        onOpenChange={onOpenChange} />
      <ModalConfirmation
        isOpen={isLogoutModalOpen}
        onOpenChange={setIsLogoutModalOpen}
        navigate={navigate}
        type="cierre"
      />
      <ModalSignUp
        isOpen={isOpenSignUp}
        onOpenChange={onOpenChangeSignUp} />
    </header>
  );
};

export default Header;