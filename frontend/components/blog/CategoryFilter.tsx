'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Folder } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  activeCategory?: string;
  basePath?: string; // '/blog' or '/career'
}

export default function CategoryFilter({ categories, activeCategory, basePath = '/blog' }: CategoryFilterProps) {
  const pathname = usePathname();
  const isAllActive = pathname === basePath || pathname.endsWith(basePath);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <Folder size={16} className="text-accent-green" />
          Categories
        </h3>
      </div>
      <nav className="p-2">
        {/* All posts link */}
        <Link
          href={basePath}
          className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
            isAllActive
              ? 'bg-accent-green/10 text-accent-green font-medium'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
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
              href={`${basePath}/category/${encodeURIComponent(categorySlug)}`}
              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-accent-green/10 text-accent-green font-medium'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
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
