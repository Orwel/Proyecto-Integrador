import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./header";
import './App.css';
import Body from "./body";
import Footer from "./footer";
import Detail from "./components/detail";
import { routes } from "./utils/router";
import Panel from "./Panel";
import { AdministrarProducto } from "./components/AdministrarProducto";
import { ActualizarProducto } from "./components/ActualizarProducto";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { AdministrarUsuario } from "./components/AdministrarUsuario";
import InformacionPersonal from "./components/InformacionPersonal"; // Importa el componente InformacionPersonal
import PanelUsuario from "./PanelUsuario"; // Importa el componente PanelUsuario
import ProductoPage from './pages/ProductoPage';
import { ListaFavoritos } from "./components/ListaFavoritos";
import PoliticaPrivacidad from "./components/PoliticaPrivacidad";
import TerminosServicio from "./components/TerminosServicio";
import ReservaDetalle from "./components/ReservaDetalle";
import ReservaConfirmada from "./components/ReservaConfirmada";
import HistorialReservas from "./components/HistorialReservas";
import WhatsAppButton from './components/Whatsapp';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={routes.home} element={<Body />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/panel" element={
          <ProtectedRoute>
            <Panel />
          </ProtectedRoute>
        } />

        <Route path="/panel-usuario" element={<PanelUsuario />} />
        <Route path="/adminUsuarios" element={<AdministrarUsuario />} />
        <Route path="/adminProductos" element={<AdministrarProducto />} />
        <Route path="/updateProductos/:id" element={<ActualizarProducto />} />
        <Route path="/informacion-personal" element={<InformacionPersonal />} />
        <Route path="/producto/:id" element={<ProductoPage />} />
        <Route path="/favoritos" element={<ListaFavoritos />} />
        <Route path="/terminosServicio" element={<TerminosServicio />} />
        <Route path="/politicaPrivacidad" element={<PoliticaPrivacidad />} />
        <Route path="/reserva/:id" element={<ReservaDetalle />} />
        <Route path="/reserva-confirmada" element={<ReservaConfirmada />} />
        <Route path="/historial-reservas" element={<HistorialReservas />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default App;
