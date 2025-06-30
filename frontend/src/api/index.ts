import { productService } from './products';

export { productService };

export type ApiResponse<T> = {
  data: T;
  status: number;
  message?: string;
};

export { apiClient } from './config';
