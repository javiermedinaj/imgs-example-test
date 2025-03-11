import React, { useRef, useEffect, useState, useMemo } from 'react';
import gsap from 'gsap';

interface ProductImageProps {
  mainImage: string;
  variantImages: string[];
  onImageChange?: (image: string) => void;
}

const ProductImage: React.FC<ProductImageProps> = ({ 
  mainImage, 
  variantImages, 
  onImageChange 
}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImage, setCurrentImage] = useState(mainImage);
  
  // Array de variantess
  const allImages = useMemo(() => {
    
    if (variantImages.includes(mainImage)) {
      return variantImages;
    }
    // Incluir mainImage al inicio del array
    return [mainImage, ...variantImages];
  }, [mainImage, variantImages]);


  useEffect(() => {
    setImageLoaded(false);
    setCurrentImage(mainImage);
  }, [mainImage]);

  useEffect(() => {
    if (imageLoaded && imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 }
      );
    }
  }, [imageLoaded]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleVariantClick = (image: string) => {
    setImageLoaded(false);
    
    setCurrentImage(image);
    
    if (onImageChange) {
      onImageChange(image);
    }
  };

  return (
    <section className="product-img w-full max-w-[600px] mx-auto py-8">
      <div className="relative w-full">
        <div className="aspect-square w-full bg-blend-screen rounded-lg shadow-md overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            <img
              ref={imageRef}
              src={currentImage}
              alt="Product preview"
              onLoad={handleImageLoad}
              style={{ opacity: imageLoaded ? 1 : 0 }}
              className="max-w-[90%] max-h-[90%] object-contain transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {allImages.map((img, index) => (
            <div
              key={index}
              className={`aspect-square relative bg-blend-screen rounded-lg shadow-sm cursor-pointer overflow-hidden ${
                currentImage === img ? 'ring-2 ring-#1a1a1a' : ''
              }`}
              onClick={() => handleVariantClick(img)}
            >
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={img}
                  alt={`${index === 0 ? 'Main' : `Variant ${index}`}`}
                  className="max-w-[95%] max-h-[95%] object-contain transition-all duration-300 ease-in-out hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductImage;