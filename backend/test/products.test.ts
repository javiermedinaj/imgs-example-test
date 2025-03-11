// tests/products.test.ts
import { describe, it, expect } from 'bun:test';
import { app } from '../server/server';

describe('Products API', () => {
  it('should return all products', async () => {
    const res = await app.request('/api/products');
    expect(res.status).toBe(200);
    
    const data = await res.json();
    expect(data).toHaveLength(2);
    expect(data[0].name).toBe('product1');
  });

  it('should return 404 for non-existent routes', async () => {
    const res = await app.request('/api/non-existent');
    expect(res.status).toBe(404);
  });
});