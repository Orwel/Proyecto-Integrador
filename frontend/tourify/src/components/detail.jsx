import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductos } from '../hook/use-productos';

const Detail = () => {
    const id = parseInt(useParams().id);
    const { productos, loading, error } = useProductos();
    const product = productos.find(product => product.id === id);
    const navigate = useNavigate();

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="detail-container">
            <div className="detail-header">
                <h2 className="product-title">{product.name}</h2>
                <button className="back-button" onClick={() => navigate(-1)}>← Volver</button>
            </div>
            <div className="detail-body">
                <img src={product.url_img} alt={product.name} className="product-image" />
                <p className="product-description">{product.city}</p>
                <p className="product-price">Precio: {product.unit_price}</p>
            </div>
        </div>
    )
}
export default Detail;