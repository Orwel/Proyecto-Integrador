import React, { useState } from 'react';

export const ActualizarCategoria = ({ closeModal, categoria, handleUpdate }) => {
  const [nombre, setNombre] = useState(categoria.nombre);
  const [descripcion, setDescripcion] = useState(categoria.descripcion);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(categoria.id, { nombre, descripcion });
    closeModal();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h3>Editar Categoría</h3>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <button type="submit">Actualizar</button>
        <button type="button" onClick={closeModal}>
          Cancelar
        </button>
      </form>
    </div>
  );
};
