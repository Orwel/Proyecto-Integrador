import React from 'react'

export const Card = ({ image, title, location, country, reviews, rating, price }) => {
  return (
    <div className="card">
      <div className="card-image">
        <img src={image} alt={title} />
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p className="card-location">{country} ({location})</p>
        <div className="card-footer">
          <div className="card-footer-left">
            <span className="rating-star">⭐ {rating}</span>
            <span className="reviews">({reviews} reviews)</span>
          </div>
          <span className="price">${price}</span>
        </div>
      </div>
      <button className="card-favorite">❤️</button>
    </div>
  );
}