import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { productService } from '../api';

export const useProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  useEffect(() => {
    productService.getAll()
      .then(data => {
        setProducts(data);
        if (data.length > 0) {
          setSelectedProduct(data[0]);
          setMainImage(data[0].mainImage);
        }
      })
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setMainImage(product.mainImage);
    setSelectedSize("");
  };

  return {
    products,
    selectedProduct,
    mainImage,
    selectedSize,
    setMainImage,
    setSelectedSize,
    handleProductSelect,
  };
};