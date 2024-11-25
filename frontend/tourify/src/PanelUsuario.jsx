import React, { useState } from "react";
import { Link } from "react-router-dom";
import { InformacionPersonal } from "./components/InformacionPersonal";
import { ListaFavoritos } from "./components/ListaFavoritos";

const PanelUsuario = () => {

  const [activeComponent, setActiveComponent] = useState(null);
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
            {/* Botón para Información Personal */}
            <li>
              <button
                onClick={() => handleComponentChange("InformacionPersonal")}
                className="link-button"
              > Información personal
              </button>
            </li>
            <li>Productos comprados</li>
            <li>
              <button
                onClick={() => handleComponentChange("ListaFavoritos")}
                className="link-button"
              > Lista Favoritos
              </button>
            </li>
          </ul>
        </aside>

        <main className="content">
          {loading ? (
            <div>Loading...</div> // Muestra un indicador de carga mientras cambia
          ) : activeComponent === "InformacionPersonal" ? (
            <InformacionPersonal />
          ) : activeComponent === "ListaFavoritos" ? (
            <ListaFavoritos />
          ) : ""
          }

        </main>
      </div>
    </div>
  );
};

export default PanelUsuario;
