import { useEffect, useState } from 'react';
import { useSupabase } from '../context/supabase-context';

function ProductGallery({ productId }) {
  const { supabase } = useSupabase();
  const [product, setProduct] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [showAllImages, setShowAllImages] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        console.log(`Fetching product data with images for productId: ${productId}`);

        const { data, error } = await supabase
          .rpc('get_product_images', { productid: productId });

        if (error) throw error;

        const { name, main_image, additional_images } = data;

        if (!main_image) {
          console.error('No main image found!');
          return;
        }

        setProduct({ name, main_image });
        setAdditionalImages([...additional_images]);

      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchProductData();
  }, [supabase, productId]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (1 + additionalImages.length));
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? additionalImages.length - 1 : prevIndex - 1
    );
  };

  if (!product) {
    return <p>Cargando...</p>;
  }

  const imagesToShow = additionalImages.slice(0, 4);
  const allImagesForCarousel = [product.main_image, ...additionalImages];

  return (
    <div className="gallery-container">
      <div className="gallery">
        <img src={product.main_image} alt={product.name} className="main-image"/>
      </div>
      <div className="additional-images">
          {imagesToShow.map((image, index) => (
          <div key={index} className="image-item">
            <img src={image} alt={`${product.name} additional ${index + 1}`} className="product-images"/>
          </div>
        ))}
      </div>
      <div className="ver-mas">
        <button onClick={() => {
          setShowAllImages(true);
          setCurrentImageIndex(0);
        }}
          className="btn-gallery">Ver más </button>
      </div>
      {/* Modal carrusel con todas las imágenes */}
      {showAllImages && (
      <div className="image-modal" onClick={() => setShowAllImages(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowAllImages(false)}>𐢫 Cerrar</button>
            <div className="modal-carousel">
              <button className="nav-btn prev" onClick={handlePrevImage}>❮</button>
              <img src={allImagesForCarousel[currentImageIndex]} alt={`${product.name} gallery ${currentImageIndex + 1}`} className="modal-image"/>
              <button className="nav-btn next" onClick={handleNextImage}>❯</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductGallery;

