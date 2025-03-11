import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { corsMiddleware } from './middleware/cors';
import indexRouter from './routes/index';
import productsRouter from './routes/products';
import { loadProducts } from './data/products';
import { DATA_PATH } from './constants';

const app = new Hono();

(async () => {
  await loadProducts(DATA_PATH);
})();

// Middlewares
app.use('/*', corsMiddleware);
app.use('/images/*', serveStatic({ root: '/' }));

//routes
app.route('/', indexRouter);
app.route('/api/products', productsRouter);

// Manejo de 404
app.notFound((c) => {
  return c.json({ error: 'Not found' }, 404);
});

console.log(`Server running at http://localhost:3000`);

export default app;