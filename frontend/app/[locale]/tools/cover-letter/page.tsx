'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/lib/api';
import { Sparkles } from 'lucide-react';
import CoverLetterForm from './CoverLetterForm';
import CoverLetterPreview from './CoverLetterPreview';

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

export default function CoverLetterGeneratorPage() {
  const t = useTranslations('CoverLetter');
  const { isAuthenticated } = useAuthStore();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    jobTitle: '',
    companyName: '',
    hiringManagerName: '',
    skills: '',
    experience: '',
    tone: 'professional',
  });
  const [generatedLetter, setGeneratedLetter] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<'limit' | 'subscription' | 'auth' | 'generic' | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToneChange = (tone: FormData['tone']) => {
    setFormData(prev => ({ ...prev, tone }));
  };

  const generateCoverLetter = async () => {
    if (!formData.fullName || !formData.jobTitle || !formData.companyName) {
      return;
    }

    if (!isAuthenticated) {
      setError(t('errors.signInRequired'));
      return;
    }

    setIsGenerating(true);
    setError(null);
    setErrorType(null);

    try {
      const response = await api.post<{ cover_letter: string }>('/ai/generate-cover-letter', {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        jobTitle: formData.jobTitle,
        companyName: formData.companyName,
        hiringManagerName: formData.hiringManagerName,
        skills: formData.skills,
        experience: formData.experience,
        tone: formData.tone,
      });

      setGeneratedLetter(response.data.cover_letter);
    } catch (err) {
      const apiErr = err as { response?: { data?: { code?: string; error?: string } }; message?: string };
      const errorCode = apiErr?.response?.data?.code;
      const errorMessage = apiErr?.response?.data?.error || apiErr?.message || 'Failed to generate cover letter';

      if (errorCode === 'COVER_LETTER_LIMIT_REACHED') {
        setError(t('errors.limitReached'));
        setErrorType('limit');
      } else if (errorCode === 'SUBSCRIPTION_REQUIRED') {
        setError(t('errors.subscriptionRequired'));
        setErrorType('subscription');
      } else if (err?.response?.status === 401) {
        setError(t('errors.signInRequired'));
        setErrorType('auth');
      } else {
        setError(errorMessage);
        setErrorType('generic');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-bg-primary via-bg-primary to-accent-purple/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-accent-purple/10 text-accent-purple px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles size={16} />
              {t('hero.badge')}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('hero.title')} <span className="gradient-text">{t('hero.titleHighlight')}</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-bg-primary">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <CoverLetterForm
              formData={formData}
              onInputChange={handleInputChange}
              onToneChange={handleToneChange}
              onGenerate={generateCoverLetter}
              isGenerating={isGenerating}
              isAuthenticated={isAuthenticated}
              error={error}
              errorType={errorType}
            />
            <CoverLetterPreview
              generatedLetter={generatedLetter}
              companyName={formData.companyName}
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
