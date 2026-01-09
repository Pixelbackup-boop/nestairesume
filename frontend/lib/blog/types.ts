// Blog post types for MDX content

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
}

export interface Post extends PostFrontmatter {
  content: string;
  readingTime: string;
}

export interface PostMeta extends PostFrontmatter {
  readingTime: string;
}
