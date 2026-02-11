'use client';

import { useState, useEffect } from 'react';
import { X, Upload, Loader2, Check, ExternalLink, AlertTriangle, Shield } from 'lucide-react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import api from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';
import { useDialogA11y } from '@/hooks/useDialogA11y';

// Placeholder values for personal data
const PLACEHOLDERS = {
  name: 'Your Name',
  email: 'your.email@example.com',
  phone: '(555) 123-4567',
  linkedin: 'linkedin.com/in/yourprofile',
  github: 'github.com/yourprofile',
  website: 'yourwebsite.com',
  location: 'City, State',
};

// Regex patterns for detecting personal data
const PATTERNS = {
  email: /[\w.-]+@[\w.-]+\.\w{2,}/g,
  phone: /(?:\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
  linkedin: /linkedin\.com\/in\/[\w-]+/gi,
  github: /github\.com\/[\w-]+/gi,
  website: /(?:https?:\/\/)?(?:www\.)?[\w-]+\.(?:com|io|dev|design|me|co|org|net)(?:\/[\w-]*)?/gi,
  location: /[A-Z][a-z]+(?:\s[A-Z][a-z]+)?,\s*[A-Z]{2}(?:\s+\d{5})?/g,
};

interface CanvasTextElement {
  type: 'text';
  id: string;
  text: string;
  fontSize: number;
  y: number;
  [key: string]: unknown;
}

interface CanvasElement {
  type: string;
  [key: string]: unknown;
}

/**
 * Replace personal data in canvas elements with placeholders
 * Detects emails, phones, social links, and names based on patterns and position
 */
function replacePersonalData(designDataJson: string): string {
  try {
    const parsed = JSON.parse(designDataJson);
    // Handle both formats: { elements, ... } object or flat element array
    const isWrapped = !Array.isArray(parsed) && parsed.elements;
    const elements: CanvasElement[] = isWrapped ? parsed.elements : parsed;
    let nameReplaced = false;

    const processedElements = elements.map((element) => {
      if (element.type !== 'text') return element;

      const textElement = element as CanvasTextElement;
      let text = textElement.text;

      // Replace email addresses
      text = text.replace(PATTERNS.email, PLACEHOLDERS.email);

      // Replace phone numbers
      text = text.replace(PATTERNS.phone, PLACEHOLDERS.phone);

      // Replace LinkedIn URLs
      text = text.replace(PATTERNS.linkedin, PLACEHOLDERS.linkedin);

      // Replace GitHub URLs
      text = text.replace(PATTERNS.github, PLACEHOLDERS.github);

      // Replace location patterns (City, ST)
      text = text.replace(PATTERNS.location, PLACEHOLDERS.location);

      // Replace website URLs (but not after replacing LinkedIn/GitHub)
      // Only replace if it looks like a personal website
      if (!text.includes('linkedin') && !text.includes('github')) {
        text = text.replace(PATTERNS.website, PLACEHOLDERS.website);
      }

      // Detect and replace name (large text near top, 2-3 words with capital letters)
      if (
        !nameReplaced &&
        textElement.y < 150 &&
        textElement.fontSize >= 18
      ) {
        const trimmedText = text.trim();
        const words = trimmedText.split(/\s+/);
        // Check if it looks like a name: 2-3 words, each starting with capital
        if (
          words.length >= 2 &&
          words.length <= 4 &&
          words.every((word) => /^[A-Z][a-z]+$/.test(word))
        ) {
          text = PLACEHOLDERS.name;
          nameReplaced = true;
        }
      }

      return { ...textElement, text };
    });

    // Preserve wrapper object with background info if present
    if (isWrapped) {
      return JSON.stringify({ ...parsed, elements: processedElements });
    }
    return JSON.stringify(processedElements);
  } catch (error) {
    console.error('Failed to process design data:', error);
    return designDataJson; // Return original if parsing fails
  }
}

interface PostToCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  thumbnail: string | null;
  designData: string;
}

const CATEGORIES = [
  { value: 'professional', label: 'Professional' },
  { value: 'creative', label: 'Creative' },
  { value: 'ats', label: 'ATS-Friendly' },
  { value: 'bold', label: 'Bold' },
];

type PostState = 'idle' | 'posting' | 'success' | 'error';

export default function PostToCommunityModal({
  isOpen,
  onClose,
  thumbnail,
  designData,
}: PostToCommunityModalProps) {
  const locale = useLocale();
  const { isAuthenticated } = useAuthStore();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('professional');
  const [postState, setPostState] = useState<PostState>('idle');
  const [error, setError] = useState('');
  const [postedTemplateId, setPostedTemplateId] = useState<string | null>(null);
  const [usePlaceholders, setUsePlaceholders] = useState(true); // Default ON for privacy

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setName('');
      setDescription('');
      setCategory('professional');
      setPostState('idle');
      setError('');
      setPostedTemplateId(null);
      setUsePlaceholders(true);
    }
  }, [isOpen]);

  const { dialogProps } = useDialogA11y({ isOpen, onClose, labelId: 'post-community-modal-title' });

  if (!isOpen) return null;

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-lg transition"
          >
            <X size={20} />
          </button>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-accent-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="text-accent-green" size={28} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Sign In Required</h2>
            <p className="text-gray-500 mb-6">
              Please sign in to share your design with the community.
            </p>
            <Link
              href={`/${locale}/auth/login?redirect=/${locale}/canvas-editor`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-green text-gray-900 rounded-lg font-semibold hover:bg-accent-teal transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Please enter a name for your template');
      return;
    }

    setPostState('posting');
    setError('');

    try {
      // Process design data to replace personal info if toggle is enabled
      const processedDesignData = usePlaceholders
        ? replacePersonalData(designData)
        : designData;

      const response = await api.post<{ id: string }>('/community', {
        name: name.trim(),
        description: description.trim() || undefined,
        category,
        designData: processedDesignData,
        thumbnail,
      });

      setPostedTemplateId(response.data.id);
      setPostState('success');
    } catch (err) {
      console.error('Failed to post template:', err);
      setError('Failed to post template. Please try again.');
      setPostState('error');
    }
  };

  // Success state
  if (postState === 'success') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-green-600" size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Posted Successfully!</h2>
            <p className="text-gray-500 mb-6">
              Your template is now live in the community gallery.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition"
              >
                Close
              </button>
              <Link
                href={`/${locale}/community`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent-green text-gray-900 rounded-lg font-semibold hover:bg-accent-teal transition"
              >
                View Community
                <ExternalLink size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div {...dialogProps} className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-lg transition"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-green/10 rounded-lg flex items-center justify-center">
              <Upload className="text-accent-green" size={20} />
            </div>
            <div>
              <h2 id="post-community-modal-title" className="text-lg font-bold text-gray-900">Post to Community</h2>
              <p className="text-sm text-gray-500">Share your design with others</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Thumbnail Preview */}
          {thumbnail && (
            <div className="flex justify-center">
              <div className="w-32 h-44 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <img
                  src={thumbnail}
                  alt="Template preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Template Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Modern Developer Resume"
              maxLength={100}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green/20 focus:border-accent-green transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your template..."
              rows={3}
              maxLength={500}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green/20 focus:border-accent-green transition resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green/20 focus:border-accent-green transition bg-white"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Use Placeholder Data Toggle */}
          <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-blue-600 shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-900">Use placeholder data</p>
                <p className="text-xs text-blue-700">
                  Replace personal info (name, email, phone) with sample data
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setUsePlaceholders(!usePlaceholders)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                usePlaceholders ? 'bg-blue-600' : 'bg-gray-200'
              }`}
              role="switch"
              aria-checked={usePlaceholders}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  usePlaceholders ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Privacy Warning - only show if placeholders are OFF */}
          {!usePlaceholders && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="flex gap-2">
                <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={16} />
                <div className="text-sm">
                  <p className="font-medium text-amber-800">Personal data will be visible</p>
                  <p className="text-amber-700 mt-1">
                    Your actual name, email, phone, and other text will be visible to everyone.
                    Enable &quot;Use placeholder data&quot; above to protect your privacy.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={postState === 'posting' || !name.trim()}
              className="flex-1 px-4 py-2.5 bg-accent-green text-gray-900 rounded-lg font-semibold hover:bg-accent-teal transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {postState === 'posting' ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Upload size={18} />
                  Post to Community
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center">
            By posting, you agree to share this template publicly. Others can use it as a starting point for their resumes.
          </p>
        </form>
      </div>
    </div>
  );
}
