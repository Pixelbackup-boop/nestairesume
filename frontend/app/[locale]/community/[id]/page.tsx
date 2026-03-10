'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ArrowLeft, Download, User, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import api from '@/lib/api';
import { getContent } from '@/lib/content/community-detail-page';
import CommentSection from '@/components/community/CommentSection';

interface TemplateDetail {
  id: string;
  name: string;
  description: string | null;
  category: string;
  thumbnail: string | null;
  downloads: number;
  isPublic: boolean;
  createdAt: string;
  userId: string;
  user: {
    id: string;
    name: string;
    image: string | null;
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  professional: 'bg-blue-100 text-blue-700',
  creative: 'bg-purple-100 text-purple-700',
  ats: 'bg-green-100 text-green-700',
  bold: 'bg-orange-100 text-orange-700',
};

export default function CommunityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const content = getContent(locale);
  const templateId = params.id as string;

  const [template, setTemplate] = useState<TemplateDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [using, setUsing] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get<TemplateDetail>(`/community/${templateId}`);
        setTemplate(res.data);
      } catch {
        setError('Template not found');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [templateId]);

  const handleUseTemplate = useCallback(async () => {
    if (using) return;
    setUsing(true);
    try {
      await api.post(`/community/${templateId}/use`);
      router.push(`/${locale}/canvas-editor?community=${templateId}`);
    } catch (err) {
      console.error('Failed to use template:', err);
      setUsing(false);
    }
  }, [templateId, locale, router, using]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-accent-green" />
      </div>
    );
  }

  if (error || !template) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">{error || 'Template not found'}</p>
          <Link
            href={`/${locale}/community`}
            className="text-accent-green hover:underline font-medium"
          >
            {content.backToGallery}
          </Link>
        </div>
      </div>
    );
  }

  const categoryClass = CATEGORY_COLORS[template.category] || 'bg-gray-100 text-gray-700';
  const formattedDate = new Date(template.createdAt).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Back link */}
        <Link
          href={`/${locale}/community`}
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition"
        >
          <ArrowLeft size={16} />
          {content.backToGallery}
        </Link>

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Thumbnail - left 2/3 */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm aspect-[210/297]">
              {template.thumbnail ? (
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                  No preview available
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - right 1/3 */}
          <div className="space-y-6">
            {/* Template info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h1 className="text-xl font-bold text-gray-900 mb-3">{template.name}</h1>

              {template.description && (
                <p className="text-sm text-gray-600 mb-4">{template.description}</p>
              )}

              {/* Category badge */}
              <span className={`inline-block px-2.5 py-1 rounded text-xs font-medium mb-4 ${categoryClass}`}>
                {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
              </span>

              {/* Author */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                {template.user.image ? (
                  <Image
                    src={template.user.image}
                    alt={template.user.name}
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={18} className="text-gray-500" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">{template.user.name}</p>
                  <p className="text-xs text-gray-400">{formattedDate}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-1 text-sm text-gray-500 mb-6">
                <Download size={16} />
                <span>
                  {template.downloads} {template.downloads === 1 ? content.download : content.downloads}
                </span>
              </div>

              {/* Use Template button */}
              <button
                onClick={handleUseTemplate}
                disabled={using}
                className="w-full py-3 bg-accent-green text-gray-900 rounded-lg font-semibold hover:bg-accent-teal transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {using ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : null}
                {content.useTemplate}
              </button>
            </div>
          </div>
        </div>

        {/* Comments */}
        <CommentSection templateId={templateId} />
      </div>
    </div>
  );
}
