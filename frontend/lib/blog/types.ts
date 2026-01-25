// Blog post types for MDX content

// Post type determines where the post appears
export type PostType = 'blog' | 'career' | 'both';

export interface PostFrontmatter {
  title: string;
  slug: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  featured?: boolean;
  postType?: PostType; // 'blog' (default), 'career', or 'both'
}

export interface Post extends PostFrontmatter {
  content: string;
  readingTime: string;
}

export interface PostMeta extends PostFrontmatter {
  readingTime: string;
}
