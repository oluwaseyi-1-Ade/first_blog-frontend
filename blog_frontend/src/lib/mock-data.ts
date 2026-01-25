import { BlogPost, Category, Tag, User } from "@/types";

export const mockUsers: User[] = [
  {
    id: "u1",
    name: "Grace Williams",
    email: "grace@faithblog.com",
    avatar: "https://i.pravatar.cc/150?u=grace",
    role: "admin",
  },
  {
    id: "u2",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
  },
];

export const mockCategories: Category[] = [
  { id: "c1", name: "Faith & Walk", slug: "faith-walk" },
  { id: "c2", name: "Bible Study", slug: "bible-study" },
  { id: "c3", name: "Community", slug: "community" },
  { id: "c4", name: "Prayer", slug: "prayer" },
];

export const mockTags: Tag[] = [
  { id: "t1", name: "Hope", slug: "hope" },
  { id: "t2", name: "Grace", slug: "grace" },
  { id: "t3", name: "Love", slug: "love" },
  { id: "t4", name: "Wisdom", slug: "wisdom" },
];

export const mockPosts: BlogPost[] = [
  {
    id: "p1",
    title: "Finding Peace in the Storm",
    slug: "finding-peace-in-the-storm",
    excerpt:
      "When life feels overwhelming, where do we turn? Discovering the anchor for our souls in turbulent times.",
    content: `
# Finding Peace in the Storm

Life often feels like a tempestuous sea. The waves of responsibility, the winds of uncertainty, and the rain of sorrow can batter our small vessels. Yet, in the midst of it all, there is a Peace that surpasses all understanding.

## The Anchor of the Soul

Hebrews 6:19 tells us we have an anchor for the soul, firm and secure. This anchor is not found in our circumstances, but in the unchanging character of God.

> "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid." - John 14:27

### Practicing Stillness

1. **Pause**: Take a moment to breathe.
2. **Pray**: Cast your cares onto Him.
3. **Praise**: Remember His faithfulness in the past.

We are not promised a storm-free life, but we are promised a storm-proof anchor.
    `,
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
    author: mockUsers[0],
    category: mockCategories[0],
    tags: [mockTags[0], mockTags[1]],
    publishedAt: "2024-03-15T09:00:00Z",
    readingTime: 5,
    status: "published",
  },
  {
    id: "p2",
    title: "The Power of Community",
    slug: "the-power-of-community",
    excerpt:
      "We were not meant to walk this road alone. Why gathering together strengthens our faith.",
    content: "Community content placeholder...",
    coverImage: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=80",
    author: mockUsers[0],
    category: mockCategories[2],
    tags: [mockTags[2]],
    publishedAt: "2024-03-10T14:30:00Z",
    readingTime: 3,
    status: "published",
  },
  {
    id: "p3",
    title: "Understanding Grace",
    slug: "understanding-grace",
    excerpt:
      "It is the gift we don't deserve but desperately need. A deep dive into the concept of grace.",
    content: "Grace content placeholder...",
    author: mockUsers[0],
    category: mockCategories[1],
    tags: [mockTags[1]],
    publishedAt: "2024-03-05T10:00:00Z",
    readingTime: 7,
    status: "published",
  },
  {
    id: "p4",
    title: "Draft Post",
    slug: "draft-post",
    excerpt: "This is a draft post that should only be visible to admins.",
    content: "Draft content...",
    author: mockUsers[0],
    category: mockCategories[0],
    tags: [],
    publishedAt: "2024-03-20T10:00:00Z",
    readingTime: 1,
    status: "draft",
  },
];
