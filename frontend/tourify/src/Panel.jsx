import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AdministrarUsuario } from "./components/AdministrarUsuario";
import { InformacionPersonal } from "./components/InformacionPersonal";
import { AdministrarProducto } from "./components/AdministrarProducto";
import { FaUsers, FaUserTag, FaShoppingBag, FaTags, FaShieldAlt } from 'react-icons/fa';

const Panel = () => {
  const [showAdministrarUsuario, setShowAdministrarUsuario] = useState(false);
  const [showInformacionPersonal, setShowInformacionPersonal] = useState(false);
  const [showAdministrarProductos, setShowAdministrarProductos] = useState(false);
  const [loading, setLoading] = useState(false); // Estado para "loading"

  const toggleAdministrarUsuario = () => {
    setLoading(true);
    setShowInformacionPersonal(false); // Asegurarse de ocultar Información Personal
    setTimeout(() => {
      setShowAdministrarUsuario(true);
      setLoading(false);
    }, 1000); // Simula un tiempo de carga de 1 segundo
  };

  const toggleInformacionPersonal = () => {
    setShowAdministrarUsuario(false); // Asegurarse de ocultar Administrar Usuario
    setShowInformacionPersonal((prev) => !prev);
  };

  const toggleAdministrarProductos = () => {
    setLoading(true);
    setShowAdministrarUsuario(false);
    setShowInformacionPersonal(false);
    setTimeout(() => {
      setShowAdministrarProductos(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container-panel">
      <div className="dashboard">
        <aside className="sidebar">
          <ul>
            <li>
              <button onClick={toggleInformacionPersonal} className="link-button">
               <FaUserTag /> Información personal
              </button>
            </li>
            <li>
              <button onClick={toggleAdministrarUsuario} className="link-button">
              <FaUsers /> Usuarios
              </button>
            </li>
            <li>
              <button onClick={toggleAdministrarProductos} className="link-button">
               <FaShoppingBag /> Productos
              </button>
            </li>
            <li>
            <button className="link-button">
              <FaTags /> Características
              </button>
            </li>
            <li>
              <button className="link-button">
              <FaShieldAlt /> Categorías
              </button>
            </li>
          </ul>
          <span className="underline">Cerrar Sesión</span>
        </aside>

        <main className="content">
          {loading ? (
            <div>Loading...</div> // Muestra "loading" mientras se carga
          ) : showInformacionPersonal ? (
            <InformacionPersonal />
          ) : showAdministrarUsuario ? (
            <AdministrarUsuario />
          ) : showAdministrarProductos ? (
            <AdministrarProducto />
          ) : (
            <>
              <div className="desktop-only">Dashboard </div>
              <div className="desktop-only">
                <div className="card">10 <span>Usuarios</span></div>
                <div className="card">20 <span>Reservas</span></div>
                <div className="card">50 <span>Visitantes</span></div>
                <div className="card">5 <span>Reservas</span></div>
              </div>
            </>
          )}
          <div className="mobile-message">
            El panel de administración no está disponible en dispositivos móviles. Accede desde un dispositivo compatible para gestionar las funciones de administración.
          </div>
        </main>
      </div>
    </div>
  );
};

export default Panel;
