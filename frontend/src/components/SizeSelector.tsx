import React from 'react';

interface Size {
  code: string;
  name: string;
  description: string;
}

interface SizeSelectorProps {
  sizes: Size[];
  selectedSize: string;
  onSelectSize?: (size: string) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ 
  sizes, 
  selectedSize, 
  onSelectSize
}) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Select Size</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {sizes.map((size) => (
          <button
            key={size.code}
            onClick={() => onSelectSize && onSelectSize(size.code)}
            className={`flex flex-col items-center p-3 border border-[#1a1a1a] rounded-full transition-all
              ${selectedSize === size.code 
                ? 'bg-[#1a1a1a] text-[#82837d]' 
                : 'hover:bg-[#1a1a1a] hover:text-[#82837d]'
              }`}
          >
            <span className="text-lg font-bold">{size.name}</span>
            <span className="text-xs">{size.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;