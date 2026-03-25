export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPost {
  _id: string; // MongoDB use _id
  title: string;
  description: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

