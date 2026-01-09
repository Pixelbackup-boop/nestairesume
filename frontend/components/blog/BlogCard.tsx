import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Tag } from 'lucide-react';
import { PostMeta } from '@/lib/blog/types';

interface BlogCardProps {
  post: PostMeta;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article
      className={`group relative rounded-xl overflow-hidden transition-all duration-300 ${
        featured
          ? 'bg-gradient-to-br from-accent-green/10 to-accent-teal/5 border border-accent-green/20'
          : 'bg-bg-card border border-white/5 hover:border-white/10'
      }`}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.imageAlt || post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent-green/20 to-accent-teal/10 flex items-center justify-center">
              <span className="text-4xl font-bold text-accent-green/30">
                {post.title.charAt(0)}
              </span>
            </div>
          )}
          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 text-xs font-medium bg-bg-primary/80 backdrop-blur-sm text-accent-green rounded-full border border-accent-green/30">
              {post.category}
            </span>
          </div>
          {/* Featured badge */}
          {featured && (
            <div className="absolute top-3 right-3">
              <span className="px-2.5 py-1 text-xs font-semibold bg-accent-green text-bg-primary rounded-full">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              {post.readingTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent-green transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-400 line-clamp-2 mb-4">
            {post.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="flex items-center gap-1 px-2 py-0.5 text-xs text-gray-500 bg-white/5 rounded"
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
