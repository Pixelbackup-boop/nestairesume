import { PostMeta } from '@/lib/blog/types';
import BlogCard from './BlogCard';

interface RelatedPostsProps {
  posts: PostMeta[];
  basePath?: string; // '/blog' or '/career'
}

export default function RelatedPosts({ posts, basePath = '/blog' }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-16 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <BlogCard key={post.slug} post={post} basePath={basePath} />
        ))}
      </div>
    </section>
  );
}
