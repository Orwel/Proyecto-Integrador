import React, { useState, useEffect } from "react";
import { useCaracteristicas } from '../hook/use-caracteristicas';
import { AgregarCaracteristica } from "./AgregarCaracteristica";
import { ActualizarCaracteristica } from './ActualizarCaracteristica';
import { ModalConfirmation } from "./modalConfirmation";

export const AdministrarCaracteristicas = () => {
  const { caracteristicas, handleDelete, handleCreate: handleCreateFromHook, handleUpdate } = useCaracteristicas();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCaracteristica, setSelectedCaracteristica] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });


  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [caracteristicaToDelete, setCaracteristicaToDelete] = useState(null);


  const handleDeleteClick = (caracteristicaId) => {
    setCaracteristicaToDelete(caracteristicaId);
    setIsConfirmationModalOpen(true);
  };


  const confirmDelete = async () => {
    try {
      await handleDelete(caracteristicaToDelete);
      setMessage({
        text: 'Característica eliminada exitosamente',
        type: 'success',
      });
    } catch (error) {
      if (error.code === "23503") {
        setMessage({
          text: 'No se puede eliminar la característica porque está asociada a uno o más productos.',
          type: 'error',
        });
      } else {
        setMessage({
          text: 'Error al eliminar característica',
          type: 'error'
        });
      }
    } finally {
      setIsConfirmationModalOpen(false);
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  const handleUpdateClick = async (updatedCaracteristica) => {
    try {
      await handleUpdate(updatedCaracteristica);
      setShowEditModal(false);
      setMessage({
        text: 'Característica actualizada exitosamente',
        type: 'success',
      });
      setSelectedCaracteristica(null);
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (error) {
      setMessage({
        text: 'Error al actualizar característica',
        type: 'error',
      });
    }
  };

  const handleCreate = async (newCaracteristica) => {
    try {
      await handleCreateFromHook(newCaracteristica);

      setMessage({
        text: 'Característica agregada exitosamente',
        type: 'success',
      });
      setShowAddModal(false);
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);

    } catch (error) {
      setMessage({
        text: 'Error al agregar característica',
        type: 'error',
      });
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Listado de Características</h2>
          <button
            className="bg-[#FF8127] text-white px-4 py-2 rounded-lg hover:bg-[#FF8127]/90 transition-colors"
            onClick={() => setShowAddModal(true)}
          >
            Agregar Caracteristica
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icono</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {caracteristicas.map((caracteristica) => (
                <tr key={caracteristica.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <img
                      src={caracteristica.url_icon}
                      alt={`${caracteristica.name} icon`}
                      className="h-6 w-6 object-contain"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{caracteristica.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-xs">{caracteristica.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteClick(caracteristica.id)}
                      title="Eliminar Caracteristica"
                    >
                      🗑
                    </button>
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => {
                        setSelectedCaracteristica(caracteristica);
                        setShowEditModal(true);
                      }}
                      title="Editar Caracteristica"
                    >
                      🖍
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <AgregarCaracteristica
              closeModal={() => setShowAddModal(false)}
              handleCreate={handleCreate}
            />
          </div>
        </div>
      )}

      {showEditModal && selectedCaracteristica && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <ActualizarCaracteristica
              closeModal={() => setShowEditModal(false)}
              caracteristica={selectedCaracteristica}
              onUpdate={handleUpdateClick}
            />
          </div>
        </div>
      )}
    {}
    <ModalConfirmation
        isOpen={isConfirmationModalOpen}
        onOpenChange={setIsConfirmationModalOpen}
        onConfirm={confirmDelete}
        type="eliminar"
      />
    </>
  );
};
