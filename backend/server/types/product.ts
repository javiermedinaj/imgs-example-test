// server/types/product.ts
export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    description: string;
    mainImage: string;
    images: string[];
    features?: string[];
    sizes?: Array<{ code: string; name: string; description: string }>;
  }
  
  export interface TransformedProduct extends Product {
    mainImage: string; 
    images: string[];  
  }