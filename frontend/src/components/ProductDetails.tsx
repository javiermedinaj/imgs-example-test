import React from 'react';

interface ProductDetailsProps {
  name: string;
  price: number;
  description: string;
  features: string[];
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ name, price, description, features }) => {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">{name}</h1>
      <p className="text-2xl mt-2">${price}</p>
      <div className="mt-4 space-y-2">
        <p>{description}</p>
        {features.map((feature, index) => (
          <p key={index}>• {feature}</p>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;