'use client';

import { useState, useEffect, useCallback } from 'react';
import { User, Trash2, Pencil, Send, Loader2, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import api from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';
import { getContent } from '@/lib/content/community-detail-page';

interface CommentUser {
  id: string;
  name: string;
  image: string | null;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: CommentUser;
}

interface CommentsResponse {
  comments: Comment[];
  total: number;
  page: number;
  totalPages: number;
}

function getRelativeTime(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (diffMin < 1) return rtf.format(0, 'minute');
  if (diffMin < 60) return rtf.format(-diffMin, 'minute');
  if (diffHr < 24) return rtf.format(-diffHr, 'hour');
  if (diffDay < 30) return rtf.format(-diffDay, 'day');

  return date.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function CommentSection({ templateId }: { templateId: string }) {
  const locale = useLocale();
  const content = getContent(locale);
  const { user, isAuthenticated } = useAuthStore();

  const [comments, setComments] = useState<Comment[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [posting, setPosting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchComments = useCallback(async (pageNum: number, append = false) => {
    try {
      const res = await api.get<CommentsResponse>(`/community/${templateId}/comments?page=${pageNum}&limit=20`);
      if (append) {
        setComments(prev => [...prev, ...res.data.comments]);
      } else {
        setComments(res.data.comments);
      }
      setTotal(res.data.total);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Failed to load comments:', err);
    } finally {
      setLoading(false);
    }
  }, [templateId]);

  useEffect(() => {
    fetchComments(1);
  }, [fetchComments]);

  const handlePost = async () => {
    if (!newComment.trim() || posting) return;

    setPosting(true);
    try {
      const res = await api.post<Comment>(`/community/${templateId}/comments`, {
        content: newComment.trim(),
      });
      setComments(prev => [res.data, ...prev]);
      setTotal(prev => prev + 1);
      setNewComment('');
    } catch (err) {
      console.error('Failed to post comment:', err);
    } finally {
      setPosting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm(content.deleteConfirm)) return;

    try {
      await api.delete(`/community/${templateId}/comments/${commentId}`);
      setComments(prev => prev.filter(c => c.id !== commentId));
      setTotal(prev => prev - 1);
    } catch (err) {
      console.error('Failed to delete comment:', err);
    }
  };

  const handleEditStart = (comment: Comment) => {
    setEditingId(comment.id);
    setEditContent(comment.content);
  };

  const handleEditSave = async () => {
    if (!editingId || !editContent.trim() || saving) return;

    setSaving(true);
    try {
      const res = await api.patch<Comment>(`/community/${templateId}/comments/${editingId}`, {
        content: editContent.trim(),
      });
      setComments(prev => prev.map(c => c.id === editingId ? res.data : c));
      setEditingId(null);
      setEditContent('');
    } catch (err) {
      console.error('Failed to edit comment:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      fetchComments(page + 1, true);
    }
  };

  const isEdited = (c: Comment) => c.updatedAt !== c.createdAt;
  const canModify = (c: Comment) => user?.id === c.userId;
  const canDelete = (c: Comment) => user?.id === c.userId || user?.role === 'admin';

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
        <MessageCircle size={20} />
        {content.commentsTitle} ({total})
      </h2>

      {/* Comment form */}
      {isAuthenticated ? (
        <div className="mb-6">
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder={content.commentPlaceholder}
            maxLength={2000}
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green/20 focus:border-accent-green transition resize-none text-sm"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-400">
              {content.charLimit.replace('{count}', String(newComment.length))}
            </span>
            <button
              onClick={handlePost}
              disabled={!newComment.trim() || posting || newComment.length > 2000}
              className="flex items-center gap-2 px-4 py-2 bg-accent-green text-gray-900 rounded-lg text-sm font-semibold hover:bg-accent-teal transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {posting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              {content.postComment}
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
          <p className="text-sm text-gray-500 mb-2">{content.signInToComment}</p>
          <Link
            href={`/${locale}/auth/login?redirect=/${locale}/community/${templateId}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent-green text-gray-900 rounded-lg text-sm font-semibold hover:bg-accent-teal transition"
          >
            {content.signIn}
          </Link>
        </div>
      )}

      {/* Comments list */}
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 size={24} className="animate-spin text-gray-400" />
        </div>
      ) : comments.length === 0 ? (
        <p className="text-center text-gray-400 py-8 text-sm">{content.noComments}</p>
      ) : (
        <div className="space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="flex gap-3 p-4 bg-gray-50 rounded-lg">
              {/* Avatar */}
              {comment.user.image ? (
                <Image
                  src={comment.user.image}
                  alt={comment.user.name}
                  width={32}
                  height={32}
                  className="rounded-full shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                  <User size={16} className="text-gray-500" />
                </div>
              )}

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-900">{comment.user.name}</span>
                  <span className="text-xs text-gray-400">{getRelativeTime(comment.createdAt, locale)}</span>
                  {isEdited(comment) && (
                    <span className="text-xs text-gray-400">{content.edited}</span>
                  )}
                </div>

                {editingId === comment.id ? (
                  <div>
                    <textarea
                      value={editContent}
                      onChange={e => setEditContent(e.target.value)}
                      maxLength={2000}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green/20 focus:border-accent-green transition resize-none text-sm"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={handleEditSave}
                        disabled={!editContent.trim() || saving || editContent.length > 2000}
                        className="px-3 py-1.5 bg-accent-green text-gray-900 rounded-lg text-xs font-semibold hover:bg-accent-teal transition disabled:opacity-50"
                      >
                        {saving ? <Loader2 size={14} className="animate-spin" /> : content.saveEdit}
                      </button>
                      <button
                        onClick={() => { setEditingId(null); setEditContent(''); }}
                        className="px-3 py-1.5 text-gray-500 hover:text-gray-700 text-xs font-medium transition"
                      >
                        {content.cancelEdit}
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">{comment.content}</p>
                )}
              </div>

              {/* Actions */}
              {editingId !== comment.id && (canModify(comment) || canDelete(comment)) && (
                <div className="flex items-start gap-1 shrink-0">
                  {canModify(comment) && (
                    <button
                      onClick={() => handleEditStart(comment)}
                      className="p-1.5 text-gray-400 hover:text-blue-500 rounded transition"
                      title={content.editComment}
                    >
                      <Pencil size={14} />
                    </button>
                  )}
                  {canDelete(comment) && (
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded transition"
                      title={content.deleteComment}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Load more */}
          {page < totalPages && (
            <button
              onClick={handleLoadMore}
              className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 font-medium transition"
            >
              {content.loadMore}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
