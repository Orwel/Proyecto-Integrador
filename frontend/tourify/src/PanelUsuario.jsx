import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { InformacionPersonal } from "./components/InformacionPersonal";
import { ListaFavoritos } from "./components/ListaFavoritos";
import TerminosServicio from "./components/TerminosServicio";
import PoliticaPrivacidad from "./components/PoliticaPrivacidad";

const PanelUsuario = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/"); // Redirige a la página principal si no está logueado el usuario
    }
  }, [user, navigate]);

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
            <p className="font-bold mt-8 mb-4">Configuración</p>
              <button
                onClick={() => handleComponentChange("InformacionPersonal")}
                className="link-button"
              > Información Personal
              </button>
            </li>
            <li>
            <button
                onClick={() => handleComponentChange("Reservas")}
                className="link-button"
              > Reservas
              </button>
            </li>
            <li>
              <button
                onClick={() => handleComponentChange("ListaFavoritos")}
                className="link-button"
              > Lista Favoritos
              </button>
            </li>
            <p className="font-bold mt-8 mb-4">Legal</p>
            <li>
              <button
                onClick={() => handleComponentChange("TerminosServicio")}
                className="link-button"
              > Terminos de Servicio
              </button>
            </li>
            <li>
              <button
                onClick={() => handleComponentChange("PoliticaPrivacidad")}
                className="link-button"
              > Política de Privacidad
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
          ) : activeComponent === "TerminosServicio" ? (
            <TerminosServicio />
          ) : activeComponent === "PoliticaPrivacidad" ? (
            <PoliticaPrivacidad />
          ) : ""
          }

        </main>
      </div>
    </div>
  );
};

export default PanelUsuario;
