import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import ProductDetails from "./components/ProductDetails";
import ProductImage from "./components/ProductImage";
import SizeSelector from "./components/SizeSelector";

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

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  const formatImageUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    if (path.startsWith("/images")) {
      return `http://localhost:3000${path}`;
    }

    return `http://localhost:3000/images${
      path.startsWith("/") ? path : "/" + path
    }`;
  };
  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        if (data.length > 0) {
          setSelectedProduct(data[0]);
          setMainImage(data[0].mainImage);
        }
      });
  }, []);

  if (!selectedProduct) {
    return (
      <div className="loading">
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#82837d]">
      <Navbar />
      <main className="flex flex-col md:flex-row w-full max-w-[1440px] mx-auto pt-20">
        <ProductImage
          mainImage={formatImageUrl(mainImage)}
          variantImages={
            selectedProduct?.images.map((img) => formatImageUrl(img)) || []
          }
        />
        <div className="flex-1 px-4 md:px-8 py-6 max-w-[600px]">
          <ProductDetails
            name={selectedProduct.name}
            price={selectedProduct.price}
            description={selectedProduct.description}
            features={selectedProduct.features || []}
          />

          <SizeSelector
            sizes={selectedProduct.sizes}
            selectedSize={selectedSize}
          />

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products
                .filter((p) => p.id !== selectedProduct.id)
                .slice(0, 3)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    image={formatImageUrl(product.mainImage)}
                    title={product.name}
                    price={product.price}
                    onClick={() => {
                      setSelectedProduct(product);
                      setMainImage(product.mainImage);
                      setSelectedSize("");
                    }}
                  />
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
