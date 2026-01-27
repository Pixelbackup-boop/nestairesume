'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) => {
    if (page === 1) return basePath;
    return `${basePath}?page=${page}`;
  };

  // Generate page numbers to show
  const getVisiblePages = () => {
    const pages: (number | 'ellipsis')[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('ellipsis');
      }

      // Show pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('ellipsis');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav className="flex items-center justify-center gap-2 mt-12">
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
        >
          <ChevronLeft size={16} />
          Previous
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-3 py-2 text-sm text-gray-400 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed">
          <ChevronLeft size={16} />
          Previous
        </span>
      )}

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {getVisiblePages().map((page, idx) =>
          page === 'ellipsis' ? (
            <span key={`ellipsis-${idx}`} className="px-3 py-2 text-gray-500">
              ...
            </span>
          ) : (
            <Link
              key={page}
              href={getPageUrl(page)}
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                page === currentPage
                  ? 'bg-accent-green text-white font-medium'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {page}
            </Link>
          )
        )}
      </div>

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
        >
          Next
          <ChevronRight size={16} />
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-3 py-2 text-sm text-gray-400 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed">
          Next
          <ChevronRight size={16} />
        </span>
      )}
    </nav>
  );
}
