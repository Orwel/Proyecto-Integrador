import React, { useState } from "react";
import { useCategorias } from "../hook/use-categorias";
import { AgregarCategoria } from "./AgregarCategoria";

export const AdministrarCategorias = () => {
  const { categorias, handleCreate, handleDelete } = useCategorias();
  const [showAddModal, setShowAddModal] = useState(false);

  console.log("Estado del modal:", showAddModal);

  return (
    <div className="categories-admin">
      <div className="categories-admin-title">
        <p>Listado de Categorías</p>
        <button
          className="btn-agregar"
          onClick={() => {
            console.log("Botón de agregar categoría clickeado");
            setShowAddModal(true); // Abre el modal
          }}
        >
          Agregar Categoría
        </button>
      </div>
      <div className="tabla-categorias">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nombre</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td>{categoria.name}</td>
                <td>
                  <button
                    className="btn-eliminar"
                    onClick={() => handleDelete(categoria.id)}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAddModal && (
        <AgregarCategoria
          closeModal={() => setShowAddModal(false)}
          handleCreate={handleCreate}
        />
      )}
    </div>
  );
};
