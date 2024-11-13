import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AdministrarUsuario } from "./components/AdministrarUsuario";
import { InformacionPersonal } from "./components/InformacionPersonal";

const Panel = () => {
  const [showAdministrarUsuario, setShowAdministrarUsuario] = useState(false);
  const [showInformacionPersonal, setShowInformacionPersonal] = useState(false);
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

  return (
    <div className="container-panel">
      <div className="dashboard">
        <aside className="sidebar">
          <ul>
            <li>
              <button onClick={toggleInformacionPersonal} className="link-button">
                Información personal
              </button>
            </li>
            <li>
              <button onClick={toggleAdministrarUsuario} className="link-button">
                Usuarios
              </button>
            </li>
            <li>
              <Link to="/adminProductos">Productos</Link>
            </li>
            <li>Características</li>
            <li>Categorías</li>
          </ul>
          <span>Cerrar Sesión</span>
        </aside>

        <main className="content">
          {loading ? (
            <div>Loading...</div> // Muestra "loading" mientras se carga
          ) : showInformacionPersonal ? (
            <InformacionPersonal />
          ) : showAdministrarUsuario ? (
            <AdministrarUsuario />
          ) : (
            <>
              <div className="desktop-only">Dashboard</div>
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
