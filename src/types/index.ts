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
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown content
  coverImage?: string;
  author: User;
  category: Category;
  tags: Tag[];
  publishedAt: string; // ISO date string
  readingTime: number; // in minutes
  status: 'published' | 'draft';
}
