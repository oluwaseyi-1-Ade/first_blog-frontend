import axios from 'axios';
import { BlogPost } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'https://first-blog-backend-bckh.onrender.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  posts: {
    getAll: async (): Promise<BlogPost[]> => {
      const response = await apiClient.get('/api/posts');
      return response.data;
    },
    getById: async (id: string): Promise<BlogPost> => {
      const response = await apiClient.get(`/api/posts/${id}`);
      return response.data;
    },
    create: async (data: Partial<BlogPost>): Promise<BlogPost> => {
      const response = await apiClient.post('/api/posts', data);
      return response.data;
    },
    update: async (id: string, data: Partial<BlogPost>): Promise<BlogPost> => {
      const response = await apiClient.put(`/api/posts/${id}`, data);
      return response.data;
    },
    delete: async (id: string): Promise<void> => {
      await apiClient.delete(`/api/posts/${id}`);
    },
  },
};
