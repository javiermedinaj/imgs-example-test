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


app.use('/*', corsMiddleware);

app.use('/images/*', serveStatic({ 
  root: './', // Ruta relativa desde donde se ejecuta el servidor
  rewriteRequestPath: (path) => {
    return path.replace('/images', '/backend/images');
  }
}));

app.route('/', indexRouter);
app.route('/api/products', productsRouter);

app.notFound((c) => {
  return c.json({ error: 'Not found' }, 404);
});

console.log(`Server running at http://localhost:3000`);

export default app;