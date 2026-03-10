'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/useAuthStore';
import { Loader2, Send, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import api from '@/lib/api';

const INQUIRY_KEYS = ['general', 'billing', 'cvCreation'] as const;

export default function ContactPage() {
  const t = useTranslations('Contact');
  const { user } = useAuthStore();

  const [inquiryType, setInquiryType] = useState<string>('general');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Pre-fill name/email when auth state loads (only if fields are still empty)
  useEffect(() => {
    if (user?.name && !name) setName(user.name);
    if (user?.email && !email) setEmail(user.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await api.post('/contact', {
        inquiryType: t(`inquiryTypes.${inquiryType}`),
        name,
        email,
        subject,
        message,
      });
      setIsSuccess(true);
    } catch (err: unknown) {
      const apiErr = err as { response?: { status?: number; data?: { detail?: string } }; message?: string };
      if (apiErr?.response?.status === 429) {
        setError(t('errorRateLimit'));
      } else {
        setError(apiErr?.response?.data?.detail || apiErr?.message || t('errorGeneric'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setInquiryType('general');
    setSubject('');
    setMessage('');
    setError(null);
    setIsSuccess(false);
  };

  const inputClass =
    'w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent transition';

  return (
    <>
      <Header />
      <div className="min-h-screen bg-bg-primary p-4 pt-28 pb-16">
        {/* Intro Section */}
        <div className="max-w-lg mx-auto text-center mb-10">
          <h1 className="text-4xl font-bold text-teal-primary mb-4">{t('title')}</h1>
          <p className="text-teal-primary/70 text-lg leading-relaxed">{t('description')}</p>
        </div>

        {/* Form Card */}
        <div className="bg-bg-card border border-border-subtle rounded-xl p-8 w-full max-w-lg mx-auto shadow-2xl">
          {isSuccess ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-accent-green mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-3">{t('successTitle')}</h2>
              <p className="text-gray-400 mb-8">{t('successMessage')}</p>
              <button
                onClick={handleReset}
                className="bg-accent-green text-bg-primary font-bold py-3 px-8 rounded-lg hover:bg-accent-teal transition"
              >
                {t('sendAnother')}
              </button>
            </div>
          ) : (
            <>

              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg mb-6 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Inquiry Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('inquiryType')}
                  </label>
                  <select
                    required
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className={inputClass}
                  >
                    {INQUIRY_KEYS.map((key) => (
                      <option key={key} value={key}>
                        {t(`inquiryTypes.${key}`)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('name')}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    placeholder={t('namePlaceholder')}
                    maxLength={100}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('email')}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    placeholder={t('emailPlaceholder')}
                    maxLength={255}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('subject')}
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={inputClass}
                    placeholder={t('subjectPlaceholder')}
                    maxLength={200}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('message')}
                  </label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${inputClass} min-h-[150px] resize-y`}
                    placeholder={t('messagePlaceholder')}
                    minLength={10}
                    maxLength={5000}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent-green text-bg-primary font-bold py-3 rounded-lg hover:bg-accent-teal transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t('sending')}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t('submit')}
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
