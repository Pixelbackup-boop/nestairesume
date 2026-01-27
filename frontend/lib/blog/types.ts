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
  authorImage?: string; // URL to author photo
  authorBio?: string;   // Short bio for the author
  featured?: boolean;
  postType?: PostType; // 'blog' (default), 'career', or 'both'
  faq?: { question: string; answer: string }[]; // FAQ items for schema + rendering
}

export interface Post extends PostFrontmatter {
  content: string;
  readingTime: string;
}

export interface PostMeta extends PostFrontmatter {
  readingTime: string;
}
