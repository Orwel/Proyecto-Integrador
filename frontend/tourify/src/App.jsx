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

        <Route path="/adminProductos" element={<AdministrarProducto />} />
        <Route path="/updateProductos/:id" element={<ActualizarProducto />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
