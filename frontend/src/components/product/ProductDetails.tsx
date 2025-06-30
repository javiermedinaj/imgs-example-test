import React from 'react';
import type { Product } from '../../types/product';

interface ProductDetailsProps {
  product: Product;
  selectedSize: string;
  onSizeSelect: (size: string) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ 
  product, 
  selectedSize, 
  onSizeSelect 
}) => {
  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-2xl mt-2">${product.price}</p>
      <div className="mt-4 space-y-2">
        <p>{product.description}</p>
        {product.features && product.features.map((feature, index) => (
          <p key={index}>• {feature}</p>
        ))}
      </div>
    
      {product.sizes && product.sizes.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-medium mb-3">Select Size</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {product.sizes.map((size) => (
              <button
                key={size.code}
                onClick={() => onSizeSelect(size.code)}
                className={`py-3 px-4 rounded-full border border-white
                  ${selectedSize === size.code 
                    ? 'bg-white text-[#82837d]' 
                    : 'text-white hover:bg-white hover:text-[#82837d]'}`}
              >
                <span className="block font-bold">{size.name}</span>
                <span className="block text-xs">{size.description}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      <button 
        className="mt-8 w-full py-4 px-8 rounded-full font-bold bg-black text-[#82837d]"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;