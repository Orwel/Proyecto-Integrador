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

  return (
    <>
      <div className="products-admin desktop-only">
        <div className="products-admin-title">
          <p>Listado de Productos</p>
          <button
            className="btn-agregar"
            onClick={() => setShowAddModal(true)}
          >
            Agregar producto
          </button>
        </div>
        <div className="tabla-products">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Nombre</th>
                <th scope="col">País</th>
                <th scope="col">Ciudad</th>
                <th scope="col">Tiempo</th>
                <th scope="col">Precio Unitario</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((product) => (
                <tr key={product.id}>
                  <th scope="row">{product.id}</th>
                  <td>{product.name}</td>
                  <td>{product.destination}</td>
                  <td>{product.city}</td>
                  <td>
                    {product.nights} noches <br /> {product.days} días
                  </td>
                  <td className="price">$ {product.unit_price}</td>
                  <td>
                    <div className="btns-table">
                      <button
                        className="btn-actualizar"
                        onClick={() => handleDelete(product.id)}
                      >
                        🗑
                      </button>
                      <button
                        className="btn-actualizar"
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowEditModal(true);
                        }}
                      >
                        🖍
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showAddModal && (
        <AgregarProducto
          closeModal={() => setShowAddModal(false)}
          handleCreate={handleCreate}
          characteristics={characteristics}
        />
      )}
      {showEditModal && selectedProduct && (
        <ActualizarProducto
          closeModal={() => setShowEditModal(false)}
          product={selectedProduct}
          characteristics={characteristics}
        />
      )}
    </>
  );
};
