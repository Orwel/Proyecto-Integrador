import { useEffect, useState } from 'react';
import { useSupabase } from '../context/supabase-context';

function ProductGallery({ productId }) {
  const { supabase } = useSupabase();
  const [product, setProduct] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [showAllImages, setShowAllImages] = useState(false);

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

        setProduct({
          name,
          main_image,
        });

        setAdditionalImages(additional_images);

      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchProductData();
  }, [productId]);

  if (!product) {
    return <p>Cargando...</p>;
  }

  const imagesToShow = showAllImages ? additionalImages : additionalImages.slice(0, 4);

  return (
    <div className="gallery-container">
      <div className="gallery">
        <img src={product.main_image} alt={product.name} className="main-image" />
      </div>
      <div className="additional-images">
        {imagesToShow.map((image, index) => (
          <div key={index} className="image-item">
            <img src={image} alt={`${product.name} additional ${index + 1}`} className="product-image" />
          </div>
        ))}
      </div>
      <div className="ver-mas">
        <button onClick={() => setShowAllImages(!showAllImages)} className="btn-gallery">
          {showAllImages ? 'Ver menos' : 'Ver más'}
        </button>
      </div>
    </div>
  );
}

export default ProductGallery;

