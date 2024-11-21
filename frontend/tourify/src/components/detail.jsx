import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductos } from '../hook/use-productos';
import { useCharacteristics } from "../hook/use-characteristics";
import ProductGallery from "./ProductGallery";
import ProductFavs from "./ProductFavs";


const Detail = () => {
    const id = parseInt(useParams().id);
    const { productos, loading, error } = useProductos();
    const { characteristics, loadingChar, errorChar } = useCharacteristics();
    const product = productos.find(product => product.id === id);
    const navigate = useNavigate();


    const urlIcon = (key) => {
        const item = characteristics.filter(item => item.name.includes(key));
        return item.map((item) => item.url_icon);
    }



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
                    <span className="detail-location">📍 {product.city}</span>
                </div>
                <div className="detail-favs">
                    <ProductFavs productId={id} />
                    <span className="favorite-text">Añadir a favoritos</span>
                </div>
            </div>
            <div className="detail-body">
                <ProductGallery productId={id} />
                <p className="detail-time">{product.nights} noches  •  {product.days} días </p>
                <hr />
                <br />
                <hr />
                <p className="product-description">{product.description}</p>
                <h3 className="detail-itinerary" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Itinerario</h3>
                <p className="product-itinerary">{product.itinerary}</p>
                <h3 className="detail-itinerary" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Características</h3>

                <ul className="detail-characteristics">

                    {Object.entries(product.characteristics).map(([key, value]) => (

                        value === 1 &&
                        (<li>
                            <img
                                src={urlIcon(key)}
                                alt={key}
                            />
                            {key}
                        </li>)
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default Detail;