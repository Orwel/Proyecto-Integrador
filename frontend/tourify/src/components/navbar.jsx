import React, { useState } from 'react'

export const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
	return (
		<>
			 <nav className='navbar-header'>
        <div className='navbar-header-logo'>
          <picture>
            <img src="/img/logo.svg" alt="logo" />
          </picture>
          <p>¡Crea recuerdos duraderos... Descubre nuevos horizontes!</p>
        </div>
        <div className='navbar-buttons'>
          <button className='button-navbar'>
            Crear Cuenta
          </button>
          <button className='button-navbar-v2'>
            Iniciar sesión
          </button>
        </div>
        {/* Menú hamburguesa */}
        <div className='hamburger-menu' onClick={toggleMenu}>
          <span className='hamburger-icon'>☰</span>
        </div>
        {/* Menú desplegable para móvil (opcional) */}
        {isMenuOpen && (
          <div className='mobile-menu'>
						<a href="/">Crear Cuenta</a>
						<a href="/">Iniciar sesión</a>
          </div>
        )}
      </nav>
		</>
	)
}
