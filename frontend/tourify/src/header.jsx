import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
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
  const location = useLocation();

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
            ¡Crea recuerdos duraderos... Descubre nuevos horizontes!
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
                    <div className='user-avatar'>
                      <span className="avatar">{getInitials(userInfo.first_name)}</span>
                      <div className="user-info">
                        <span className="user-name">{userInfo.first_name} {userInfo.last_name}</span>
                        <span className="user-role"> {userInfo ? (userInfo.role_id === 2 ? "Administrador" : "Usuario") : ""}</span>
                      </div>
                    </div>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" variant="flat">

                    <DropdownItem key={`profile${userInfo.id}`} className="h-14 gap-2" textValue="Perfil de usuario">
                      <Link className='cursor-pointer flex gap-4' to={userInfo.role_id === 2 ? "/panel" : "/panel-usuario"} >
                        <span className="avatar">{getInitials(userInfo.first_name)}</span>
                        <div className='flex flex-col'>
                          <span className="font-semibold">{userInfo.first_name} {userInfo.last_name}</span>
                          <p className="font-semibold">Panel de usuario</p>
                        </div>
                      </Link>
                    </DropdownItem>
                    <DropdownItem key={`profile-email-${userInfo.id}`} className="h-14 gap-2" textValue="Mail usuario">
                      <h2>Correo electrónico </h2>
                      <p className="font-semibold">{userInfo.email}</p>
                    </DropdownItem>
                    <DropdownItem key="settings" textValue="Información personal del usuario">
                      <Link className='cursor-pointer flex gap-4' to={"/informacion-personal"} >
                        Información personal
                      </Link>
                    </DropdownItem>
                    <DropdownItem key="analytics" textValue="Reservas">
                    <Link className='cursor-pointer flex gap-4' to={"/historial-reservas"} >
                      Reservas
                      </Link>
                    </DropdownItem>
                    <DropdownItem key="system" textValue="Listado de favoritos">
                      <Link className='cursor-pointer flex gap-4' to={"/favoritos"} >
                        Lista de favoritos
                      </Link>
                    </DropdownItem>
                    <DropdownItem key="help_and_feedback" textValue="Terminos de servicio">
                      <Link className="cursor-pointer flex gap-4" to={"/terminosServicio"}>
                        Terminos de Servicio
                      </Link>
                    </DropdownItem>
                    <DropdownItem key="Politica de privacidad" textValue="Política de privacidad">
                      <Link className="cursor-pointer flex gap-4" to="/politicaPrivacidad">
                        Política de privacidad
                      </Link>
                    </DropdownItem>
                    <DropdownItem onClick={handleSignOut} key="logout" color="danger" textValue="Cerrar sesión">
                      Cerrar sesión
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>

              </div>
              {/* <img className="signout-button" onClick={handleSignOut} src="/img/Logout.png" alt="" /> */}
              <button className="btn btn-logout" onClick={handleSignOut} >
                <img src="/img/Logout.png" alt="Icono de cerrar sesión" className="logout-icon" />  
                <span>Cerrar sesión</span>
              </button>
            </div>
          ) : (
            <>
              <button className="btn" id='btn-crear-cuenta' onClick={() => onOpenSignUp()}>Crear cuenta</button>
              <button className="btn" id='btn-iniciar-sesion' onClick={() => onOpen()}>Iniciar sesión</button>
            </>
          )}
        </div>

        <div className={`hamburger-menu ${isMenuOpen ? "open" : ""}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {isMenuOpen && (
        <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
          {userInfo ? (
            <>
              <div className="user-avatar" onClick={toggleMenu}>
                <span className="avatar">{getInitials(userInfo.first_name)}</span>
                <div className="user-info">
                  <span className="user-name">{userInfo.first_name} {userInfo.last_name}</span>
                  <span className="user-role">{userInfo.role_id === 2 ? "Administrador" : "Usuario"}</span>
                    <div className="flex items-center gap-2">
                      < h2 className="text-xs text-gray-600 font-light">e-mail: </h2>
                      <p className="text-xs text-gray-600 font-light">{userInfo.email}</p>
                    </div>
                </div>
              </div>
              <nav className="mobile-nav">
                <Link to="/informacion-personal" className="mobile-nav-link" onClick={toggleMenu}>Información personal</Link>
                <Link to="/favoritos" className="mobile-nav-link" onClick={toggleMenu}>Lista de favoritos</Link>
                <Link to="/historial-reservas" className="mobile-nav-link" onClick={toggleMenu}>Reservas</Link>
                <Link to="/terminosServicio" className="mobile-nav-link" onClick={toggleMenu}>Términos de servicio</Link>
                <Link to="/politicaPrivacidad" className="mobile-nav-link" onClick={toggleMenu}>Política de privacidad</Link>
              </nav>
              <button className="btn btn-logout" onClick={handleSignOut}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <button className="btn" id='btn-crear-cuenta' onClick={() => onOpenSignUp()}>Crear cuenta</button>
              <button className="btn" id='btn-iniciar-sesion' onClick={() => onOpen()}>Iniciar sesión</button>
            </>
          )}
        </div>
      )}

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