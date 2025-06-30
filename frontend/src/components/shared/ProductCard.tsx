import React from 'react';
import type { Product } from '../../types/product';
import { formatImageUrl } from '../../utils/formatters';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => (
  <div
    className="cursor-pointer group bg-white rounded-lg overflow-hidden shadow-sm"
    onClick={() => onSelect(product)}
  >
    <div className="relative pt-[125%]">
      <img
        src={formatImageUrl(product.mainImage)}
        alt={product.name}
        className="absolute top-0 left-0 w-full h-full object-cover object-top bg-[#82837d]"
      />
    </div>
    {/* //carta de precio */}
    <div className="p-4 bg-black">
      <h3 className="font-medium text-gray-100 text-center">{product.name}</h3>
      <p className="text-white text-center">${product.price}</p>
    </div>
  </div>
);

export default ProductCard;