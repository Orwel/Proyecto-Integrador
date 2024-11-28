import React, { useState } from 'react';
import { useCategorias } from '../hook/use-categorias';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";

export const AdministrarCategorias = () => {
  const { categorias, loading, error, handleCreate, handleDelete } = useCategorias();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategoria, setNewCategoria] = useState({
    name: '',
    description: '',
    url_image: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleCreate(newCategoria);
      setShowAddModal(false);
      setMessage({
        text: 'Categoría agregada exitosamente',
        type: 'success'
      });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      setNewCategoria({ name: '', description: '', url_image: '' }); // Limpiar formulario
    } catch (error) {
      setMessage({
        text: 'Error al agregar categoría',
        type: 'error'
      });
    }
  };

  const handleDeleteClick = async (categoriaId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      try {
        await handleDelete(categoriaId);
        setMessage({
          text: 'Categoría eliminada exitosamente',
          type: 'success'
        });
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      } catch (error) {
        setMessage({
          text: 'Error al eliminar categoría',
          type: 'error'
        });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Listado de Categorías
        </h2>
        <button
          className="bg-[#FF8127] text-white px-4 py-2 rounded-lg hover:bg-[#FF8127]/90 transition-colors"
          onClick={() => setShowAddModal(true)}
        >
          Agregar categoría
        </button>
      </div>

      {message.text && (
        <div className={`mb-4 p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagen</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categorias.map((categoria) => (
              <tr key={categoria.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{categoria.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{categoria.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{categoria.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <img 
                    src={categoria.url_image} 
                    alt={categoria.name} 
                    className="h-10 w-10 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDeleteClick(categoria.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Eliminar categoría"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-bold mb-4">Agregar Categoría</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Nombre"
                  value={newCategoria.name}
                  onChange={(e) => setNewCategoria({...newCategoria, name: e.target.value})}
                  required
                />
                <Input
                  label="Descripción"
                  value={newCategoria.description}
                  onChange={(e) => setNewCategoria({...newCategoria, description: e.target.value})}
                  required
                />
                <Input
                  label="URL de Imagen"
                  value={newCategoria.url_image}
                  onChange={(e) => setNewCategoria({...newCategoria, url_image: e.target.value})}
                  required
                />
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-[#FF8127] rounded-lg hover:bg-[#FF8127]/90"
                  >
                    Agregar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
