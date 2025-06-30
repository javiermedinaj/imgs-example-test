import { Product } from '../types';
import { apiClient } from './config';

export const productService = {
  getAll: () => apiClient.get<Product[]>('/api/products'),
  getById: (id: number) => apiClient.get<Product>(`/api/products/${id}`),
};