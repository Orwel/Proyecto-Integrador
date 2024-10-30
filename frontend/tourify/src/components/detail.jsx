import React from "react";
import { useParams } from "react-router-dom";
import { useProductos } from '../hook/use-productos';

const Detail = () => {
    const id = parseInt(useParams().id);
    const { productos, loading, error } = useProductos();
    const product = productos.find(product => product.id === id);
    console.log('product:', product);

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h2>{product.name}</h2>
            <p>{product.city}</p>
            <img src={product.url_img} />
            <p>Precio: {product.unit_price}</p>
        </div>
    )
}
export default Detail;