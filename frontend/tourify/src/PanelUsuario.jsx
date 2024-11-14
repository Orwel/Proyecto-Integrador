import React from "react";
import { Link } from "react-router-dom";
import { InformacionPersonal } from "./components/InformacionPersonal";

const PanelUsuario = () => {
  return (
    <div className="container-panel">
      <div className="dashboard">
        <aside className="sidebar">
          <ul>
            {/* Botón para Información Personal */}
            <li>
              <button className="link-button">
                Información personal
              </button>
            </li>
            <li>Productos comprados</li>
          </ul>
        </aside>

        <main className="content">
          <InformacionPersonal /> {/* Renderiza Información Personal directamente */}
        </main>
      </div>
    </div>
  );
};

export default PanelUsuario;
