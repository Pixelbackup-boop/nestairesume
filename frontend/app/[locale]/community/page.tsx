'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { Users, Loader2, ChevronLeft, ChevronRight, Trash2, Eye, EyeOff, FolderOpen } from 'lucide-react';
import TemplateCard from '@/components/community/TemplateCard';
import api from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';
import { getContent } from '@/lib/content/community-page';

interface CommunityTemplate {
  id: string;
  name: string;
  description: string | null;
  category: string;
  thumbnail: string | null;
  downloads: number;
  isPublic?: boolean;
  createdAt: string;
  updatedAt?: string;
  user: {
    id: string;
    name: string;
    image: string | null;
  };
}

interface CommunityResponse {
  templates: CommunityTemplate[];
  total: number;
  page: number;
  totalPages: number;
}

type TabType = 'browse' | 'my-templates';

export default function CommunityPage() {
  const router = useRouter();
  const locale = useLocale();
  const c = getContent(locale);
  const { isAuthenticated, user } = useAuthStore();

  // Tab state
  const [activeTab, setActiveTab] = useState<TabType>('browse');

  // Browse state
  const [templates, setTemplates] = useState<CommunityTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState('');

  // My templates state
  const [myTemplates, setMyTemplates] = useState<CommunityTemplate[]>([]);
  const [myTemplatesLoading, setMyTemplatesLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch public templates
  const fetchTemplates = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
      });
      if (category) {
        params.set('category', category);
      }

      const response = await api.get<CommunityResponse>(`/community?${params}`);
      setTemplates(response.data.templates);
      setTotalPages(response.data.totalPages);
      setTotal(response.data.total);
    } catch (err) {
      console.error('Failed to fetch templates:', err);
      setError(c.errorMessage);
    } finally {
      setLoading(false);
    }
  }, [page, category, c.errorMessage]);

  // Fetch user's templates
  const fetchMyTemplates = useCallback(async () => {
    if (!isAuthenticated) return;

    setMyTemplatesLoading(true);
    try {
      const response = await api.get<CommunityTemplate[]>('/community/my');
      setMyTemplates(response.data);
    } catch (err) {
      console.error('Failed to fetch my templates:', err);
    } finally {
      setMyTemplatesLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (activeTab === 'browse') {
      fetchTemplates();
    } else if (activeTab === 'my-templates' && isAuthenticated) {
      fetchMyTemplates();
    }
  }, [activeTab, fetchTemplates, fetchMyTemplates, isAuthenticated]);

  // Handle using a template
  const handleUseTemplate = useCallback(async (templateId: string) => {
    try {
      await api.post(`/community/${templateId}/use`);
      router.push(`/${locale}/canvas-editor?community=${templateId}`);
    } catch (err) {
      console.error('Failed to use template:', err);
    }
  }, [router, locale]);

  // Handle deleting a template
  const handleDeleteTemplate = useCallback(async (templateId: string) => {
    if (!confirm(c.deleteConfirm)) {
      return;
    }

    setDeletingId(templateId);
    try {
      await api.delete(`/community/${templateId}`);
      setMyTemplates((prev) => prev.filter((t) => t.id !== templateId));
    } catch (err) {
      console.error('Failed to delete template:', err);
      alert(c.deleteError);
    } finally {
      setDeletingId(null);
    }
  }, [c.deleteConfirm, c.deleteError]);

  // Handle toggling visibility
  const handleToggleVisibility = useCallback(async (templateId: string, currentlyPublic: boolean) => {
    try {
      await api.patch(`/community/${templateId}/visibility`, { isPublic: !currentlyPublic });
      setMyTemplates((prev) =>
        prev.map((t) => (t.id === templateId ? { ...t, isPublic: !currentlyPublic } : t))
      );
    } catch (err) {
      console.error('Failed to update visibility:', err);
      alert(c.visibilityError);
    }
  }, [c.visibilityError]);

  // Handle category change
  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setPage(1);
  };

  // Handle tab change
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === 'browse') {
      setPage(1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-accent-green/10 rounded-xl flex items-center justify-center">
              <Users className="text-accent-green" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{c.title}</h1>
              <p className="text-gray-500">{c.subtitle}</p>
            </div>
          </div>

          {/* Main Tabs */}
          <div className="flex gap-1 border-b border-gray-200">
            <button
              onClick={() => handleTabChange('browse')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition ${
                activeTab === 'browse'
                  ? 'border-accent-green text-accent-green'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {c.browseTab}
            </button>
            {isAuthenticated && (
              <button
                onClick={() => handleTabChange('my-templates')}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition ${
                  activeTab === 'my-templates'
                    ? 'border-accent-green text-accent-green'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {c.myTemplatesTab}
                {myTemplates.length > 0 && (
                  <span className="ml-2 px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                    {myTemplates.length}
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Category Tabs (only for Browse) */}
          {activeTab === 'browse' && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {c.categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                    category === cat.value
                      ? 'bg-accent-green text-gray-900'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Browse Tab */}
        {activeTab === 'browse' && (
          <>
            {/* Stats */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                {total !== 1
                  ? c.templatesAvailable.replace('{count}', String(total))
                  : c.templateAvailable.replace('{count}', String(total))}
              </p>
              <Link
                href={`/${locale}/canvas-editor`}
                className="text-sm text-accent-green hover:underline"
              >
                {c.createYourOwn}
              </Link>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin text-accent-green" size={32} />
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-20">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                  onClick={fetchTemplates}
                  className="px-4 py-2 bg-accent-green text-gray-900 rounded-lg font-medium hover:bg-accent-teal transition"
                >
                  {c.tryAgain}
                </button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && templates.length === 0 && (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-gray-400" size={28} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{c.noTemplatesTitle}</h3>
                <p className="text-gray-500 mb-6">{c.noTemplatesSub}</p>
                <Link
                  href={`/${locale}/canvas-editor`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent-green text-gray-900 rounded-lg font-semibold hover:bg-accent-teal transition"
                >
                  {c.createTemplate}
                </Link>
              </div>
            )}

            {/* Template Grid */}
            {!loading && !error && templates.length > 0 && (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {templates.map((template) => (
                    <TemplateCard
                      key={template.id}
                      id={template.id}
                      name={template.name}
                      thumbnail={template.thumbnail}
                      category={template.category}
                      downloads={template.downloads}
                      author={{
                        name: template.user.name,
                        image: template.user.image,
                      }}
                      onUse={handleUseTemplate}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <span className="px-4 py-2 text-sm text-gray-600">
                      {c.pageOf.replace('{page}', String(page)).replace('{total}', String(totalPages))}
                    </span>
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* My Templates Tab */}
        {activeTab === 'my-templates' && isAuthenticated && (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                {myTemplates.length !== 1
                  ? c.templatesPosted.replace('{count}', String(myTemplates.length))
                  : c.templatePosted.replace('{count}', String(myTemplates.length))}
              </p>
              <Link
                href={`/${locale}/canvas-editor`}
                className="text-sm text-accent-green hover:underline"
              >
                {c.createNewTemplate}
              </Link>
            </div>

            {/* Loading */}
            {myTemplatesLoading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin text-accent-green" size={32} />
              </div>
            )}

            {/* Empty State */}
            {!myTemplatesLoading && myTemplates.length === 0 && (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FolderOpen className="text-gray-400" size={28} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{c.noPostedTitle}</h3>
                <p className="text-gray-500 mb-6">{c.noPostedSub}</p>
                <Link
                  href={`/${locale}/canvas-editor`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent-green text-gray-900 rounded-lg font-semibold hover:bg-accent-teal transition"
                >
                  {c.createTemplate}
                </Link>
              </div>
            )}

            {/* My Templates List */}
            {!myTemplatesLoading && myTemplates.length > 0 && (
              <div className="space-y-4">
                {myTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-28 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                      {template.thumbnail ? (
                        <img
                          src={template.thumbnail}
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          {c.noPreview}
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 truncate">{template.name}</h3>
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium ${
                            template.isPublic
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {template.isPublic ? c.publicLabel : c.privateLabel}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {template.downloads} {template.downloads !== 1 ? c.downloads : c.download} • {template.category}
                      </p>
                      {template.description && (
                        <p className="text-sm text-gray-400 mt-1 truncate">{template.description}</p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleToggleVisibility(template.id, template.isPublic ?? true)}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
                        title={template.isPublic ? c.makePrivate : c.makePublic}
                      >
                        {template.isPublic ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      <button
                        onClick={() => handleUseTemplate(template.id)}
                        className="px-3 py-1.5 text-sm font-medium text-accent-green hover:bg-accent-green/10 rounded-lg transition"
                      >
                        {c.edit}
                      </button>
                      <button
                        onClick={() => handleDeleteTemplate(template.id)}
                        disabled={deletingId === template.id}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                        title={c.deleteBtn}
                      >
                        {deletingId === template.id ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Not Authenticated - My Templates */}
        {activeTab === 'my-templates' && !isAuthenticated && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-gray-400" size={28} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{c.signInTitle}</h3>
            <p className="text-gray-500 mb-6">{c.signInSub}</p>
            <Link
              href={`/${locale}/auth/login?redirect=/${locale}/community`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent-green text-gray-900 rounded-lg font-semibold hover:bg-accent-teal transition"
            >
              {c.signIn}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
