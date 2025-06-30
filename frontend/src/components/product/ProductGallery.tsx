import React, { useState } from 'react';
import { formatImageUrl } from '../../utils/formatters';

interface ProductGalleryProps {
  mainImage: string;
  images: string[];
  onImageChange: (image: string) => void;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({
  mainImage,
  images,
  onImageChange
}) => {
  const [selectedImage, setSelectedImage] = useState(mainImage);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    onImageChange(image);
  };

  const allImages = Array.from(new Set([mainImage, ...images]));

  return (
    <div className="space-y-4">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-[#82837d]">
        <img
          src={formatImageUrl(selectedImage)}
          alt="Main product view"
          className="h-400 w-full object-cover object-center"
        />
      </div>

      {allImages.length > 1 && (
        <div className="grid grid-cols-3 gap-4">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => handleImageClick(image)}
              className={`aspect-square w-full h-50 overflow-hidden rounded-lg bg-[#82837d] 
                ${selectedImage === image ? 'ring-2 ring-indigo-500' : ''}`}
            >
              <img
                src={formatImageUrl(image)}
                alt={`Product view ${index + 1}`}
                className="h-140 w-full object-cover object-center hover:opacity-75"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
