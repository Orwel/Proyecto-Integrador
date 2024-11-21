import React, { useState } from "react";

const modalStyles = {
  modalBack: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    width: "90%",
    maxWidth: "500px",
    padding: "20px",
    position: "relative",
    animation: "fadeIn 0.3s ease-in-out",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "20px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "10px",
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#999",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formDetails: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontSize: "14px",
    color: "#555",
  },
  input: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px",
  },
  textarea: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px",
    resize: "none",
  },
  btnSubmit: {
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "14px",
    marginTop: "10px",
  },
};

export const AgregarProducto = ({ closeModal, handleCreate }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    destination: "",
    days: "",
    nights: "",
    unit_price: "",
    url_img: "",
    description: "",
    city: "",
    itinerary: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica si los campos obligatorios están llenos antes de enviar
    if (newProduct.name ) {
      await handleCreate(newProduct); // Crear el producto

      setNewProduct({
        name: "",
        destination: "",
        days: "",
        nights: "",
        unit_price: "",
        url_img: "",
        description: "",
        city: "",
        itinerary: "",
      }); // Limpiar el formulario

      closeModal(); // Cerrar el modal
    } else {
      alert("Por favor, completa los campos obligatorios.");
    }
  };

  return (
    <div style={modalStyles.modalBack}>
      <div style={modalStyles.modalContainer}>
        <div style={modalStyles.title}>
          <p>Agregar Nuevo Producto</p>
          <button style={modalStyles.closeBtn} onClick={closeModal}>
            X
          </button>
        </div>
        <form style={modalStyles.form} onSubmit={handleSubmit}>
          <div style={modalStyles.formDetails}>
            <label style={modalStyles.label} htmlFor="name">
              Nombre
            </label>
            <input
              style={modalStyles.input}
              type="text"
              id="name"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              required // Este campo es obligatorio
            />
          </div>
          <div style={modalStyles.formDetails}>
            <label style={modalStyles.label} htmlFor="destination">
              Destino
            </label>
            <input
              style={modalStyles.input}
              type="text"
              id="destination"
              name="destination"
              value={newProduct.destination}
              onChange={handleInputChange}
            />
          </div>
          <div style={modalStyles.formDetails}>
            <label style={modalStyles.label} htmlFor="dias">
              Dias
            </label>
            <input
              style={modalStyles.input}
              type="text"
              id="dias"
             
              value={newProduct.days}
              onChange={handleInputChange}
            />
          </div>
          <div style={modalStyles.formDetails}>
            <label style={modalStyles.label} htmlFor="noches">
              Noches
            </label>
            <input
              style={modalStyles.input}
              type="text"
              id="noches"
             
              value={newProduct.nights}
              onChange={handleInputChange}
            />
          </div>
          <div style={modalStyles.formDetails}>
            <label style={modalStyles.label} htmlFor="unit_z|price">
              Precio Unitario
            </label>
            <input
              style={modalStyles.input}
              type="text"
              id="precio"
              
              value={newProduct.unit_price}
              onChange={handleInputChange}
              
            />
          </div>
          <div style={modalStyles.formDetails}>
            <label style={modalStyles.label} htmlFor="url_img">
              URL Imagen
            </label>
            <textarea
              style={modalStyles.textarea}
              id="url_img"
              
              value={newProduct.url_img}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div style={modalStyles.formDetails}>
            <label style={modalStyles.label} htmlFor="itinirary">
              Itinerario
            </label>
            <textarea
              style={modalStyles.textarea}
              id="itinerary"
              rows="6"
              value={newProduct.itinerary}
              onChange={handleInputChange}
            ></textarea>
          </div>

          
          
          
          <button style={modalStyles.btnSubmit} type="submit">
            Crear Producto
          </button>
        </form>
      </div>
    </div>
  );
};
