import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft, Tag } from 'lucide-react';
import { Post } from '@/lib/blog/types';

interface BlogHeaderProps {
  post: Post;
  basePath?: string; // '/blog' or '/career'
}

export default function BlogHeader({ post, basePath = '/blog' }: BlogHeaderProps) {
  const backLabel = basePath === '/career' ? 'Back to Career Center' : 'Back to Blog';

  return (
    <header className="mb-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link
          href={basePath}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent-green transition-colors"
        >
          <ArrowLeft size={16} />
          {backLabel}
        </Link>
      </nav>

      {/* Category */}
      <div className="mb-4">
        <Link
          href={`${basePath}/category/${encodeURIComponent(post.category.toLowerCase().replace(/\s+/g, '-'))}`}
          className="inline-block px-3 py-1 text-sm font-medium text-accent-green bg-accent-green/10 rounded-full border border-accent-green/20 hover:bg-accent-green/20 transition-colors"
        >
          {post.category}
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
        {post.title}
      </h1>

      {/* Description */}
      <p className="text-lg text-gray-400 mb-6 max-w-3xl">
        {post.description}
      </p>

      {/* Meta info */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8">
        <span className="flex items-center gap-2">
          <User size={16} className="text-accent-green" />
          {post.author}
        </span>
        <span className="flex items-center gap-2">
          <Calendar size={16} className="text-accent-green" />
          {new Date(post.date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
        <span className="flex items-center gap-2">
          <Clock size={16} className="text-accent-green" />
          {post.readingTime}
        </span>
      </div>

      {/* Featured Image */}
      {post.image && (
        <div className="relative aspect-video rounded-xl overflow-hidden mb-8 border border-white/10">
          <Image
            src={post.image}
            alt={post.imageAlt || post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 900px"
          />
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {post.tags.map(tag => (
          <Link
            key={tag}
            href={`${basePath}?tag=${encodeURIComponent(tag)}`}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-400 bg-white/5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
          >
            <Tag size={12} />
            {tag}
          </Link>
        ))}
      </div>
    </header>
  );
}
