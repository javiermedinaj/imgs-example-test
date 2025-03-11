import React from 'react';

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, title, price, onClick }) => {
  return (
    <div 
      className="bg-blend-screen bg-opacity-10 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 w-full max-w-[250px] mx-auto cursor-pointer" 
      onClick={onClick}
    >
      <div className="aspect-[3/4] w-full overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-90 object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="font-bold text-base truncate">{title}</h3>
        <span className="block mt-1 text-sm">${price}</span>
        <button className="mt-2 px-4 py-2 border border-[#1a1a1a] rounded-full hover:bg-[#1a1a1a] hover:text-[#82837d] transition-colors duration-300 text-sm">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;