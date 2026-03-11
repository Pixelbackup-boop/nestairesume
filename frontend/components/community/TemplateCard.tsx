'use client';

import { memo } from 'react';
import { Download, User, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';

interface TemplateCardProps {
  id: string;
  name: string;
  thumbnail: string | null;
  category: string;
  downloads: number;
  commentCount: number;
  author: {
    name: string;
    image: string | null;
  };
  onUse: (id: string) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  professional: 'bg-blue-100 text-blue-700',
  creative: 'bg-purple-100 text-purple-700',
  ats: 'bg-green-100 text-green-700',
  bold: 'bg-orange-100 text-orange-700',
};

function TemplateCard({
  id,
  name,
  thumbnail,
  category,
  downloads,
  commentCount,
  author,
  onUse,
}: TemplateCardProps) {
  const locale = useLocale();
  const categoryClass = CATEGORY_COLORS[category] || 'bg-gray-100 text-gray-700';

  return (
    <Link
      href={`/${locale}/community/${id}`}
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-accent-green/30 transition-all duration-200 block"
    >
      {/* Thumbnail */}
      <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
        {thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnail}
            alt={name}
            className="w-full h-full object-cover motion-safe:group-hover:scale-105 motion-safe:transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-sm">No preview</span>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onUse(id);
            }}
            className="px-4 py-2 bg-accent-green text-gray-900 rounded-lg font-semibold transform translate-y-4 motion-safe:group-hover:translate-y-0 motion-safe:transition-transform"
          >
            Use Template
          </button>
        </div>

        {/* Category badge */}
        <span className={`absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-medium ${categoryClass}`}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 truncate" title={name}>
          {name}
        </h3>

        <div className="flex items-center justify-between mt-2">
          {/* Author */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {author.image ? (
              <Image
                src={author.image}
                alt={author.name}
                width={20}
                height={20}
                className="rounded-full"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={12} className="text-gray-500" />
              </div>
            )}
            <span className="truncate max-w-[100px]">{author.name}</span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <MessageCircle size={14} />
              <span>{commentCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Download size={14} />
              <span>{downloads}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default memo(TemplateCard);
