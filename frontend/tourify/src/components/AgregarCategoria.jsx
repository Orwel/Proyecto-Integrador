import React from "react";

export const AgregarCategoria = ({ closeModal, handleCreate }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Agregar Categoría</h2>
        <input
          type="text"
          placeholder="Nombre de la categoría"
          id="nombreCategoria"
        />
        <button onClick={closeModal}>Cerrar</button>
        <button
          onClick={() => {
            const name = document.getElementById("nombreCategoria").value;
            if (name) {
              handleCreate({ name });
              closeModal();
            }
          }}
        >
          Guardar
        </button>
      </div>
    </div>
  );
};
