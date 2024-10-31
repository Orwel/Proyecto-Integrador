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
                <div className="detail-title">
                    <h1 className="product-title">{product.name}</h1>
                    <button className="back-button" onClick={() => navigate(-1)}>← Volver</button>
                </div>
                <div className="product-rating">
                    <span className="detail-rating-star">⭐ {product.rating}</span>
                    <span className="detail-reviews">({product.reviews} reviews)</span>
                    <span className="detail-location">🚩 {product.city}</span>
                </div>
            </div>
            <div className="detail-body">
                <img src={product.url_img} alt={product.name} className="product-image" />
                <p className="detail-time">{product.nights} noches  •  {product.days} días </p>
                <br />
                <hr />
                <br />
                <p className="product-description">{product.description}</p>
                <hr />
                <h3 className="detail-itinerary">Itinerario</h3>
                <p className="product-itinerary">{product.itinerary}</p>
            </div>
        </div>
    )
}
export default Detail;