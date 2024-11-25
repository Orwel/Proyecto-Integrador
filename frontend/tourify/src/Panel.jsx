import React, { useState } from "react";
import { FaUsers, FaUserTag, FaShoppingBag, FaTags, FaShieldAlt, FaClipboardList } from "react-icons/fa";
import { AdministrarUsuario } from "./components/AdministrarUsuario";
import { InformacionPersonal } from "./components/InformacionPersonal";
import { AdministrarProducto } from "./components/AdministrarProducto";
import { AdministrarCategorias } from "./components/AdministrarCategorias";
import { AdministrarCaracteristicas } from "./components/AdministrarCaracteristica";

const Panel = () => {
  const [activeComponent, setActiveComponent] = useState(null); // Controla qué componente mostrar
  const [loading, setLoading] = useState(false);

  const handleComponentChange = (component) => {
    setLoading(true);
    setTimeout(() => {
      setActiveComponent(component); // Cambia el componente activo después de "cargar"
      setLoading(false);
    }, 500); // Simula un pequeño tiempo de carga
  };

  return (
    <div className="container-panel">
      <div className="dashboard">
        <aside className="sidebar">
          <ul>
            <li>
              <button
                onClick={() => handleComponentChange("InformacionPersonal")}
                className="link-button"
              >
                <FaUserTag /> Información personal
              </button>
            </li>
            <li>
              <button
                onClick={() => handleComponentChange("AdministrarUsuario")}
                className="link-button"
              >
                <FaUsers /> Usuarios
              </button>
            </li>
            <li>
              <button
                onClick={() => handleComponentChange("AdministrarProducto")}
                className="link-button"
              >
                <FaShoppingBag /> Productos
              </button>
            </li>
            <li>
              <button
                onClick={() => handleComponentChange("AdministrarCategorias")}
                className="link-button"
              >
                <FaTags /> Categorías
              </button>
            </li>
            <li>
              <button
                onClick={() => handleComponentChange("AdministrarCaracteristicas")}
                className="link-button"
              >
                <FaClipboardList /> Caracteristicas
              </button>
            </li>
          </ul>
          <span className="underline">Cerrar Sesión</span>
        </aside>

        <main className="content">
          {loading ? (
            <div>Loading...</div> // Muestra un indicador de carga mientras cambia
          ) : activeComponent === "InformacionPersonal" ? (
            <InformacionPersonal />
          ) : activeComponent === "AdministrarUsuario" ? (
            <AdministrarUsuario />
          ) : activeComponent === "AdministrarProducto" ? (
            <AdministrarProducto />
          ) : activeComponent === "AdministrarCategorias" ? (
            <AdministrarCategorias />
          ) : activeComponent === "AdministrarCaracteristicas" ? (
            <AdministrarCaracteristicas />
          ) : (
            <div className="dashboard-summary">
              <h2>Bienvenido al Panel</h2>
              <div className="card">10 <span>Usuarios</span></div>
              <div className="card">20 <span>Reservas</span></div>
              <div className="card">50 <span>Visitantes</span></div>
              <div className="card">5 <span>Reservas</span></div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Panel;
