'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Folder } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  activeCategory?: string;
}

export default function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
  const pathname = usePathname();
  const isAllActive = pathname === '/blog';

  return (
    <div className="bg-bg-card rounded-xl border border-white/5 overflow-hidden">
      <div className="p-4 border-b border-white/5">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
          <Folder size={16} className="text-accent-green" />
          Categories
        </h3>
      </div>
      <nav className="p-2">
        {/* All posts link */}
        <Link
          href="/blog"
          className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
            isAllActive
              ? 'bg-accent-green/10 text-accent-green font-medium'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          All Articles
        </Link>

        {/* Category links */}
        {categories.map(category => {
          const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
          const isActive = activeCategory?.toLowerCase() === categorySlug;

          return (
            <Link
              key={category}
              href={`/blog/category/${encodeURIComponent(categorySlug)}`}
              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-accent-green/10 text-accent-green font-medium'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {category}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
