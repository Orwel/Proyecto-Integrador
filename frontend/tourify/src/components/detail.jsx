import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductos } from '../hook/use-productos';
import { useCharacteristics } from "../hook/use-characteristics";

const Detail = () => {
    const id = parseInt(useParams().id);
    const { productos, loading, error } = useProductos();
    const { characteristics, loadingChar, errorChar } = useCharacteristics();
    const product = productos.find(product => product.id === id);
    const navigate = useNavigate();


    const urlImagen = (key) => {
        switch (key) {
            case "Alojamiento":
                return characteristics[3].url_icon
            case "WiFi":
                return characteristics[1].url_icon
            case "Transporte incluido":
                return characteristics[0].url_icon
            case "Seguro de Viaje":
                return characteristics[7].url_icon
            case "Alimentación incluida":
                return characteristics[4].url_icon
            case "Asistencia 24/7":
                return characteristics[6].url_icon
            case "Traslado Aeropuerto":
                return characteristics[5].url_icon
            case "Guia Local - bilingue":
                return characteristics[2].url_icon
            case "Souvenir de Bienvenida":
                return characteristics[8].url_icon
            default:
                break;
        }
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
                <h3 className="detail-itinerary">Características</h3>

                <ul className="detail-characteristics">

                    {Object.entries(product.characteristics).map(([key, value]) => (
                        value === 1 &&
                        (<li>
                            <img
                                src={urlImagen(key)}
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