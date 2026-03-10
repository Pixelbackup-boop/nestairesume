'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  FileText,
  RefreshCw,
  Briefcase,
  Building2,
  User,
  Mail,
  Target,
  Lightbulb,
  AlertCircle,
} from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
  companyName: string;
  hiringManagerName: string;
  skills: string;
  experience: string;
  tone: 'professional' | 'friendly' | 'confident' | 'enthusiastic';
}

interface CoverLetterFormProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onToneChange: (tone: FormData['tone']) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  isAuthenticated: boolean;
  error: string | null;
  errorType: 'limit' | 'subscription' | 'auth' | 'generic' | null;
}

export default function CoverLetterForm({
  formData,
  onInputChange,
  onToneChange,
  onGenerate,
  isGenerating,
  isAuthenticated,
  error,
  errorType,
}: CoverLetterFormProps) {
  const t = useTranslations('CoverLetter');
  const locale = useLocale();
  const router = useRouter();

  const TONES = [
    { value: 'professional' as const, label: t('form.professional'), icon: '👔' },
    { value: 'friendly' as const, label: t('form.friendly'), icon: '😊' },
    { value: 'confident' as const, label: t('form.confident'), icon: '💪' },
    { value: 'enthusiastic' as const, label: t('form.enthusiastic'), icon: '🔥' },
  ];

  return (
    <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-accent-purple/20 rounded-lg flex items-center justify-center">
          <FileText size={20} className="text-accent-purple" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{t('form.yourDetails')}</h2>
          <p className="text-sm text-gray-600">{t('form.fillInfo')}</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Personal Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User size={14} className="inline mr-2" />
              {t('form.fullName')} *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={onInputChange}
              placeholder={t('form.fullNamePlaceholder')}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail size={14} className="inline mr-2" />
              {t('form.email')}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              placeholder={t('form.emailPlaceholder')}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple outline-none transition"
            />
          </div>
        </div>

        {/* Job Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Briefcase size={14} className="inline mr-2" />
              {t('form.jobTitle')} *
            </label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={onInputChange}
              placeholder={t('form.jobTitlePlaceholder')}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Building2 size={14} className="inline mr-2" />
              {t('form.companyName')} *
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={onInputChange}
              placeholder={t('form.companyPlaceholder')}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple outline-none transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User size={14} className="inline mr-2" />
            {t('form.hiringManager')}
          </label>
          <input
            type="text"
            name="hiringManagerName"
            value={formData.hiringManagerName}
            onChange={onInputChange}
            placeholder={t('form.hiringManagerPlaceholder')}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Target size={14} className="inline mr-2" />
            {t('form.keySkills')}
          </label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={onInputChange}
            placeholder={t('form.skillsPlaceholder')}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Lightbulb size={14} className="inline mr-2" />
            {t('form.experience')}
          </label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={onInputChange}
            placeholder={t('form.experiencePlaceholder')}
            rows={3}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple outline-none transition resize-none"
          />
        </div>

        {/* Tone Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t('form.tone')}
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3" role="radiogroup" aria-label={t('form.tone')}>
            {TONES.map(tone => (
              <button
                key={tone.value}
                type="button"
                role="radio"
                aria-checked={formData.tone === tone.value}
                onClick={() => onToneChange(tone.value)}
                className={`px-4 py-3 rounded-lg border text-sm font-medium transition ${
                  formData.tone === tone.value
                    ? 'border-accent-purple bg-accent-purple/10 text-accent-purple'
                    : 'border-gray-200 text-gray-600 hover:border-gray-400'
                }`}
              >
                <span className="mr-2">{tone.icon}</span>
                {tone.label}
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        <div role="alert" aria-live="polite">
        {error && (
          <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <AlertCircle size={20} className="text-red-400 mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-red-300 text-sm">{error}</p>
              {!isAuthenticated && (
                <button
                  onClick={() => router.push(`/${locale}/auth/login`)}
                  className="text-accent-purple text-sm underline mt-1"
                >
                  {t('errors.signInNow')}
                </button>
              )}
              {(errorType === 'limit' || errorType === 'subscription') && (
                <button
                  onClick={() => router.push(`/${locale}/pricing`)}
                  className="text-accent-purple text-sm underline mt-1"
                >
                  {t('errors.viewPlans')}
                </button>
              )}
            </div>
          </div>
        )}
        </div>

        {/* Generate Button */}
        <button
          onClick={onGenerate}
          disabled={isGenerating || !formData.fullName || !formData.jobTitle || !formData.companyName}
          className="w-full flex items-center justify-center gap-2 bg-accent-purple text-white py-4 rounded-lg font-semibold hover:bg-accent-purple/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isGenerating ? (
            <>
              <RefreshCw size={20} className="animate-spin" />
              {t('form.generating')}
            </>
          ) : (
            <>
              <Sparkles size={20} />
              {t('form.generate')}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
