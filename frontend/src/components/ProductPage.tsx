import React, { useState, useEffect } from 'react';
import ProductImage from './ProductImage';

interface Size {
  code: string;
  name: string;
  description: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  features: string[];
  mainImage: string;
  images: string[];
  sizes: Size[];
  category: string;
}

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        if (data.length > 0) {
          setSelectedProduct(data[0]);
          setMainImage(data[0].mainImage);
        }
      })
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const formatImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith("http")) return path;
    if (path.startsWith("/images")) {
      return `http://localhost:3000${path}`;
    }
    return `http://localhost:3000/images${path.startsWith("/") ? path : "/" + path}`;
  };

  const handleImageChange = (image: string) => {
    setMainImage(image);
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  if (!selectedProduct) {
    return (
      <div className="min-h-screen bg-[#82837d] flex items-center justify-center">
        <p className="text-xl text-white">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#82837d]">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProductImage
            mainImage={formatImageUrl(mainImage)}
            variantImages={selectedProduct.images.map(img => formatImageUrl(img))}
            onImageChange={handleImageChange}
          />

          <div className="space-y-6 text-white">
            <div>
              <h1 className="text-3xl font-bold">{selectedProduct.name}</h1>
              <p className="mt-2 text-xl">${selectedProduct.price}</p>
            </div>

            <div className="space-y-4">
              <p>{selectedProduct.description}</p>
              <ul className="list-disc pl-5">
                {selectedProduct.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Select Size</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size.code}
                    data-size={size.code}
                    onClick={() => handleSizeSelect(size.code)}
                    className={`size-btn border rounded-full py-3 px-4 text-sm font-medium 
                      transition-all hover:bg-[#1a1a1a] hover:text-[#82837d]
                      ${selectedSize === size.code ? 'bg-[#1a1a1a] text-[#82837d]' : ''}`}
                  >
                    <span className="block font-bold">{size.name}</span>
                    <span className="block text-xs">{size.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-lg font-medium mb-4">You might also like</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {products
                  .filter(p => p.id !== selectedProduct.id)
                  .slice(0, 3)
                  .map((product) => (
                    <div
                      key={product.id}
                      className="cursor-pointer group"
                      onClick={() => {
                        setSelectedProduct(product);
                        setMainImage(product.mainImage);
                        setSelectedSize("");
                      }}
                    >
                      <div className="aspect-square w-full overflow-hidden rounded-lg">
                        <img
                          src={formatImageUrl(product.mainImage)}
                          alt={product.name}
                          className="h-full w-full object-cover transition-all 
                            group-hover:scale-105"
                        />
                      </div>
                      <p className="mt-2 text-sm">{product.name}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;