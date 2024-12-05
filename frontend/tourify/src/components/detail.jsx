import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductos } from '../hook/use-productos';
import { useCharacteristics } from "../hook/use-characteristics";
import ProductGallery from "./ProductGallery";
import ProductFavs from "./ProductFavs";
import Calendario from './Calendario';
import "react-datepicker/dist/react-datepicker.css";
import SharePopup from "./SharePopup"; // Componente emergente para compartir
import { FaTelegramPlane } from "react-icons/fa"; // Icono de compartir

const Detail = () => {
    const id = parseInt(useParams().id);
    const { productos, loading, error } = useProductos();
    const { characteristics, loadingChar, errorChar } = useCharacteristics();
    const product = productos.find(product => product.id === id);
    const navigate = useNavigate();
    
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const urlIcon = (key) => {
        const item = characteristics.filter(item => item.name.includes(key));
        return item.map((item) => item.url_icon);
    }

    const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);

    const handleShareClick = () => {
      setIsSharePopupOpen(true);
    };
    
    const closeSharePopup = () => {
      setIsSharePopupOpen(false);
    };

    const handleDateSelect = ({ startDate: newStartDate, endDate: newEndDate, duracionDias }) => {
        console.log('Fechas seleccionadas:', { newStartDate, newEndDate, duracionDias });
        setDateRange([newStartDate, newEndDate]);
    };

    const handleClearDates = () => {
        setDateRange([null, null]);
    };

    const getCharacteristicInfo = (charId) => {
        const characteristic = characteristics.find(char => char.id === parseInt(charId));
        return characteristic ? {
            name: characteristic.name,
            url_icon: characteristic.url_icon
        } : null;
    };

    if (loading || loadingChar) return <div>Cargando...</div>;
    if (error || errorChar) return <div>Error al cargar la información</div>;
    if (!product) return <div>Producto no encontrado</div>;

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
                    <button 
                        onClick={handleShareClick}
                        style={{ marginLeft: "10px", display: "flex", alignItems: "center" }}
                    >
                    <FaTelegramPlane size={20} style={{ marginRight: "5px", color: "#FE8C00" }} />
                    </button>
                    <ProductFavs productId={id} />
                </div>
            </div>

            <ProductGallery productId={id} />
            
            <div className="detail-body">
                <p className="detail-time">
                    <span className="detail-itinerary text-2xl font-bold mb-4">Duración: {product.duration_days} días</span>
                </p>
                <hr />
                <br />
                <hr />
                
                <div>
                    <p className="product-description">{product.description}</p>
                    <h3 className="detail-itinerary text-2xl font-bold mb-4">Itinerario</h3>
                    <p className="product-itinerary">{product.itinerary}</p>
                    <h3 className="detail-itinerary text-2xl font-bold mt-8 mb-4">Características</h3>
                    <ul className="detail-characteristics">
                        {Object.entries(product?.characteristics || {}).map(([charId, value]) => {
                            if (value === 1) {
                                const charInfo = getCharacteristicInfo(charId);
                                if (charInfo) {
                                    return (
                                        <li key={charId} className="flex items-center gap-2">
                                            <img 
                                                src={charInfo.url_icon} 
                                                alt={charInfo.name}
                                                className="w-6 h-6"
                                            />
                                            <span>{charInfo.name}</span>
                                        </li>
                                    );
                                }
                            }
                            return null;
                        }).filter(Boolean)}
                    </ul>

                    <div className="mt-8">
                        <h3 className="text-2xl font-bold mb-2">
                            {product.duration_days} días en {product.city}
                        </h3>
                        
                        <div className="text-gray-600 mb-4">
                            {startDate && endDate ? (
                                <>
                                    <p className="text-lg">
                                        {startDate.toLocaleDateString('es-ES', { 
                                            month: 'short', 
                                            day: '2-digit',
                                            year: 'numeric'
                                        })} - {endDate.toLocaleDateString('es-ES', { 
                                            month: 'short', 
                                            day: '2-digit',
                                            year: 'numeric'
                                        })}
                                    </p>
                                    <p className="mt-1">
                                        Duración: {product.duration_days} días
                                    </p>
                                </>
                            ) : (
                                <p className="text-[#FF8127]">
                                    Selecciona las fechas de tu viaje
                                </p>
                            )}
                        </div>

                        <Calendario 
                            productoId={id}
                            onDateSelect={handleDateSelect}
                            duracionMinima={parseInt(product?.duration_days) || 1}
                            selectedRange={dateRange}
                            onRangeChange={setDateRange}
                            onClearDates={handleClearDates}
                            className="calendario-container" 
                        />

                        {isSharePopupOpen && (
                            <SharePopup
                                link={`http://localhost:5173/detail/${id}`}
                                title={product.name}
                                image={product.url_img} // Usa la imagen principal del producto
                                onClose={closeSharePopup}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail;