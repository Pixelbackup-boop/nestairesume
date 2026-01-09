"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, Eye, AlertCircle, Loader2 } from "lucide-react";
import api from "@/lib/api";
import Link from "next/link";

interface BlogFormData {
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  imageAlt: string;
  category: string;
  tags: string;
  author: string;
  featured: boolean;
  published: boolean;
}

const CATEGORIES = [
  "Resume Tips",
  "Career Advice",
  "Job Search",
  "Interview Tips",
  "Industry Insights",
  "Success Stories",
];

export default function EditBlogPost() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    slug: "",
    description: "",
    content: "",
    image: "",
    imageAlt: "",
    category: "Resume Tips",
    tags: "",
    author: "ResumeAI Team",
    featured: false,
    published: false,
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/admin/blog/${params.id}`);
        const post = response.data;
        let tags = "";
        try {
          const parsedTags = JSON.parse(post.tags);
          tags = Array.isArray(parsedTags) ? parsedTags.join(", ") : "";
        } catch {
          tags = post.tags || "";
        }
        setFormData({
          title: post.title,
          slug: post.slug,
          description: post.description,
          content: post.content,
          image: post.image || "",
          imageAlt: post.imageAlt || "",
          category: post.category,
          tags,
          author: post.author,
          featured: post.featured,
          published: post.published,
        });
      } catch (err: any) {
        setError(err.response?.data?.detail || "Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const postData = {
        ...formData,
        tags: JSON.stringify(
          formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
        ),
      };

      await api.put(`/admin/blog/${params.id}`, postData);
      router.push("/admin/blog");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to update post");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-white/5 rounded w-48" />
        <div className="h-96 bg-white/5 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        href="/admin/blog"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Posts
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Blog Post</h1>
          <p className="text-gray-400 mt-1">Update post content and settings.</p>
        </div>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-300 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium"
        >
          <Eye size={16} />
          {showPreview ? "Hide Preview" : "Preview"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="text-red-400" size={20} />
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className={`grid gap-6 ${showPreview ? "lg:grid-cols-2" : ""}`}>
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-bg-card border border-white/5 rounded-xl p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter post title..."
                className="w-full px-4 py-2.5 bg-bg-primary border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-purple/50 transition-colors"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Slug *
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2.5 bg-white/5 border border-white/10 border-r-0 rounded-l-lg text-gray-500 text-sm">
                  /blog/
                </span>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  placeholder="post-slug"
                  className="flex-1 px-4 py-2.5 bg-bg-primary border border-white/10 rounded-r-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-purple/50 transition-colors"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description * <span className="text-gray-500">(SEO meta description)</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={2}
                placeholder="Brief description for search results..."
                className="w-full px-4 py-2.5 bg-bg-primary border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-purple/50 transition-colors resize-none"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Content * <span className="text-gray-500">(Markdown supported)</span>
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={15}
                placeholder="Write your post content in Markdown..."
                className="w-full px-4 py-2.5 bg-bg-primary border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-purple/50 transition-colors resize-y font-mono text-sm"
              />
            </div>
          </div>

          {/* Metadata */}
          <div className="bg-bg-card border border-white/5 rounded-xl p-6 space-y-6">
            <h3 className="text-lg font-semibold text-white">Metadata</h3>

            <div className="grid grid-cols-2 gap-4">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-bg-primary border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent-purple/50 transition-colors"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Author *
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-bg-primary border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent-purple/50 transition-colors"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tags <span className="text-gray-500">(comma-separated)</span>
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="resume, tips, career"
                className="w-full px-4 py-2.5 bg-bg-primary border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-purple/50 transition-colors"
              />
            </div>

            {/* Image */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Featured Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="/blog/image.svg"
                  className="w-full px-4 py-2.5 bg-bg-primary border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-purple/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Image Alt Text
                </label>
                <input
                  type="text"
                  name="imageAlt"
                  value={formData.imageAlt}
                  onChange={handleChange}
                  placeholder="Description of the image"
                  className="w-full px-4 py-2.5 bg-bg-primary border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-purple/50 transition-colors"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-white/20 bg-bg-primary text-accent-purple focus:ring-accent-purple/50"
                />
                <span className="text-sm text-gray-300">Featured post</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-white/20 bg-bg-primary text-accent-green focus:ring-accent-green/50"
                />
                <span className="text-sm text-gray-300">Published</span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-accent-purple text-white rounded-lg font-medium hover:bg-accent-purple/90 transition-colors disabled:opacity-50"
            >
              {saving ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Save size={18} />
              )}
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <Link
              href="/admin/blog"
              className="px-6 py-2.5 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>

        {/* Preview */}
        {showPreview && (
          <div className="bg-bg-card border border-white/5 rounded-xl p-6 overflow-hidden">
            <h3 className="text-lg font-semibold text-white mb-4">Preview</h3>
            <div className="prose-custom">
              <h1 className="text-2xl font-bold text-white mb-2">
                {formData.title || "Post Title"}
              </h1>
              <p className="text-gray-400 text-sm mb-4">
                {formData.description || "Post description will appear here..."}
              </p>
              <div className="flex items-center gap-2 mb-6">
                <span className="px-2 py-1 bg-white/5 text-gray-300 rounded text-xs">
                  {formData.category}
                </span>
                <span className="text-gray-500 text-xs">
                  by {formData.author}
                </span>
              </div>
              <div className="whitespace-pre-wrap text-gray-300 text-sm">
                {formData.content || "Start writing to see the preview..."}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
