import { IMAGES_URL } from '../constants/config';

export const formatImageUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${IMAGES_URL}/${path.replace(/^\//, '')}`;
};