import { Hono } from "hono";
import { getProducts } from "../data/products";
import type { Product, TransformedProduct } from "../types/product";

const productsRouter = new Hono();

//get all products route
productsRouter.get('/', (c) => {
    const products = getProducts();
    const transformedProducts: TransformedProduct[] = products.map((product) => ({
      ...product,
      mainImage: product.mainImage.replace('../', '/'),
      images: product.images.map((img) => img.replace('../', '/')),
    }));
    return c.json(transformedProducts);
  });

  //id product 
  productsRouter.get('/:id', (c) => {
    const id = parseInt(c.req.param('id'));
    const product = getProducts().find((p) => p.id === id);
  
    if (!product) {
      return c.json({ error: 'Product not found' }, 404);
    }
  
    const transformedProduct: TransformedProduct = {
      ...product,
      mainImage: product.mainImage.replace('../', '/'),
      images: product.images.map((img) => img.replace('../', '/')),
    };
    return c.json(transformedProduct);
  });

  //category product 
  productsRouter.get('/categories/:category', (c) => {
    const category = c.req.param('category');
    const filtered = getProducts().filter((p) => p.category === category);
    const transformedFiltered: TransformedProduct[] = filtered.map((product) => ({
      ...product,
      mainImage: product.mainImage.replace('../', '/'),
      images: product.images.map((img) => img.replace('../', '/')),
    }));
    return c.json(transformedFiltered);
  });
  
  export default productsRouter;