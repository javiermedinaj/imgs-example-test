import React from "react";
import { useProduct } from "../hooks/useProduct";
import ProductDetails from "./product/ProductDetails";
import ProductGallery from "./product/ProductGallery";
import ProductCard from "./shared/ProductCard";

const ProductPage: React.FC = () => {
  const {
    products,
    selectedProduct,
    mainImage,
    selectedSize,
    setMainImage,
    setSelectedSize,
    handleProductSelect,
  } = useProduct();

  if (!selectedProduct) {
    return (
      <div className="min-h-screen bg-[#82837d] flex items-center align-center justify-center pt-10">
        <p className="text-xl text-white">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#82837d] text-black py-10">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProductGallery
            mainImage={mainImage}
            images={selectedProduct.images}
            onImageChange={setMainImage}
          />

          <ProductDetails
            product={selectedProduct}
            selectedSize={selectedSize}
            onSizeSelect={setSelectedSize}
          />
        </div>

        <div className="mt-16 justify-center text-center">
          <h2 className="text-xl font-bold text-center text-white mb-6">
            You might also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-20">
            {products
              .filter((p) => p.id !== selectedProduct.id)
              .slice(0, 3)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={handleProductSelect}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
