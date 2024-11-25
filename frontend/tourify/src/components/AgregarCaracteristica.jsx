import React, { useState } from "react";
import { Input, Button, Textarea } from "@nextui-org/react";

export const AgregarCaracteristica = ({ closeModal, handleCreate }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url_icon: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.url_icon) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      await handleCreate(formData); 

      closeModal();
      setFormData({ name: '', description: '', url_icon: '' });
    } catch (error) {
      console.error("Error al agregar la característica:", error);
    }
  };

  return (
    <div className="space-y-4 p-6">
      <h2 className="text-xl font-bold mb-4">Agregar Nueva Característica</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {}
        <Input
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          variant="bordered"
        />

        {}
        <Textarea
          label="Descripción"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          variant="bordered"
          minRows={3}
        />

        {}
        <Input
          label="URL de Imagen"
          name="url_icon"
          value={formData.url_icon}
          onChange={handleChange}
          required
          variant="bordered"
        />
        
        <div className="flex justify-end space-x-4">
          <Button color="danger" variant="light" onPress={closeModal}>
            Cancelar
          </Button>
          <Button color="primary" type="submit" className="bg-[#FF8127] text-white">
            Agregar
          </Button>
        </div>
      </form>
    </div>
  );
};
