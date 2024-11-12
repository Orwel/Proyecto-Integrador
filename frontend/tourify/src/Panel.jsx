import React from "react";
import { Link } from "react-router-dom";

const Panel = () => {
  return <div className="container-panel">
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Admin</h2>
        <ul>
          <li>
            <Link to="/panel/">
              Dashboard
            </Link>
          </li>
          <li>Roles</li>
          <li>Usuarios</li>
          <li>
            <Link to="/adminProductos">
              Productos
            </Link>
          </li>
          <li>Características</li>
          <li>Categorías</li>
        </ul>
        <span>Cerrar Sesión</span>
      </aside>

      <main className="content">
        <div className="desktop-only">
          Dashboard
        </div>
        <div className="desktop-only">
          <div className="card">10 <span>Usuarios</span></div>
          <div className="card">20 <span>Reservas</span></div>
          <div className="card">50 <span>Visitantes</span></div>
          <div className="card">5 <span>Reservas</span></div>
        </div>
        <div className="mobile-message">
          El panel de administración no está disponible en dispositivos móviles. Accede desde un dispositivo compatible para gestionar las funciones de administración.
        </div>
      </main>
    </div>
  </div>;
};

export default Panel;