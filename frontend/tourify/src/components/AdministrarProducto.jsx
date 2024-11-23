import React, { useState } from 'react';
import { useProductos } from '../hook/use-productos';
import { ActualizarProducto } from './ActualizarProducto';
import { AgregarProducto } from './AgregarProducto';
import { useCharacteristics } from '../hook/use-characteristics';

export const AdministrarProducto = () => {
  const { productos, handleDelete, handleCreate, handleUpdate } = useProductos();
  const { characteristics } = useCharacteristics();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleDeleteClick = async (productId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await handleDelete(productId);
        setMessage({
          text: 'Producto eliminado exitosamente',
          type: 'success'
        });
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      } catch (error) {
        setMessage({
          text: 'Error al eliminar el producto',
          type: 'error'
        });
      }
    }
  };

  const handleUpdateClick = async (updatedProduct) => {
    try {
      await handleUpdate(updatedProduct);
      setShowEditModal(false);
      setMessage({
        text: 'Producto actualizado exitosamente',
        type: 'success'
      });
      setSelectedProduct(null);
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (error) {
      setMessage({
        text: 'Error al actualizar el producto',
        type: 'error'
      });
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Listado de Productos</h2>
          <button
            className="bg-[#FF8127] text-white px-4 py-2 rounded-lg hover:bg-[#FF8127]/90 transition-colors"
            onClick={() => setShowAddModal(true)}
          >
            Agregar producto
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">País</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ciudad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiempo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Unitario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {productos.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.destination}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.city}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.duration_nights} noches / {product.duration_days} días
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$ {product.unit_price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteClick(product.id)}
                      title="Eliminar producto"
                    >
                      🗑
                    </button>
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowEditModal(true);
                      }}
                      title="Editar producto"
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
            <AgregarProducto
              closeModal={() => setShowAddModal(false)}
              handleCreate={handleCreate}
              characteristics={characteristics}
            />
          </div>
        </div>
      )}

      {showEditModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <ActualizarProducto
              closeModal={() => setShowEditModal(false)}
              product={selectedProduct}
              characteristics={characteristics}
              onUpdate={handleUpdateClick}
            />
          </div>
        </div>
      )}
    </>
  );
};
