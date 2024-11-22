import { Link } from "react-router-dom";
import ProductFavs from "./ProductFavs";

export const Card = ({ id, image, title, location, country, reviews, rating, price }) => {

  return (
    <div className="card">
      <div className="card-image">
        <img src={image} alt={title} />
      </div>
      <div className="card-content">
      <Link to={"/detail/" + id}>
      <h3>{title}</h3>
      </Link>
        <p className="card-location">{country}</p>
        <p className="card-location">📍({location})</p>
        <div className="card-footer">
          <div className="card-footer-left">
            <span className="rating-star">⭐ {rating}</span>
            <span className="reviews">({reviews} reviews)</span>
          </div>
          <span className="price">${price}</span>
        </div>
      </div>
      <div className="card-favorite">
        <ProductFavs productId={id} />
        
      </div>
    </div>
  );
}