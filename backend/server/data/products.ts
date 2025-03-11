import type { Product } from "../types/product";

let productsData: {products:Product[]} = { products: []}

export async function loadProducts(filePath: string):Promise<Product[]> {
    try {
        const file = Bun.file(filePath);
        productsData = await file.json();
        return productsData.products;
    } catch (error) {
        console.error('Failed to load products data:', error);
        return [];
    }
}

export function getProducts():Product[] {
    return productsData.products;
}