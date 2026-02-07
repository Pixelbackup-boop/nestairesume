'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/lib/api';
import {
  Sparkles,
  FileText,
  Copy,
  Download,
  RefreshCw,
  CheckCircle,
  Briefcase,
  Building2,
  User,
  Mail,
  Target,
  Lightbulb,
  ArrowRight,
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

const TONES = [
  { value: 'professional', label: 'Professional', icon: '👔' },
  { value: 'friendly', label: 'Friendly', icon: '😊' },
  { value: 'confident', label: 'Confident', icon: '💪' },
  { value: 'enthusiastic', label: 'Enthusiastic', icon: '🔥' },
];

export default function CoverLetterGeneratorPage() {
  const t = useTranslations('CoverLetter');
  const locale = useLocale();
  const router = useRouter();
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
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateCoverLetter = async () => {
    if (!formData.fullName || !formData.jobTitle || !formData.companyName) {
      return;
    }

    // Check if user is logged in
    if (!isAuthenticated) {
      setError('Please sign in to generate a cover letter');
      return;
    }

    setIsGenerating(true);
    setError(null);

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
    } catch (err: any) {
      const errorCode = err?.response?.data?.code;
      const errorMessage = err?.response?.data?.error || err?.message || 'Failed to generate cover letter';

      if (errorCode === 'COVER_LETTER_LIMIT_REACHED') {
        setError('You have reached your cover letter limit. Upgrade your plan for more.');
      } else if (errorCode === 'SUBSCRIPTION_REQUIRED') {
        setError('A subscription is required to generate cover letters. Please upgrade your plan.');
      } else if (err?.response?.status === 401) {
        setError('Please sign in to generate a cover letter');
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAsTxt = () => {
    const blob = new Blob([generatedLetter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cover-letter-${formData.companyName.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const localizedHref = (path: string) => `/${locale}${path}`;

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-bg-primary via-bg-primary to-accent-purple/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-accent-purple/10 text-accent-purple px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles size={16} />
              AI-Powered Cover Letter Generator
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Create a <span className="gradient-text">Perfect Cover Letter</span> in Minutes
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Let AI craft a compelling, personalized cover letter that highlights your strengths
              and captures the attention of hiring managers.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-bg-primary">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent-purple/20 rounded-lg flex items-center justify-center">
                  <FileText size={20} className="text-accent-purple" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Your Details</h2>
                  <p className="text-sm text-gray-400">Fill in your information</p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Personal Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <User size={14} className="inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-bg-primary border border-border-subtle rounded-lg text-white placeholder-gray-500 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Mail size={14} className="inline mr-2" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 bg-bg-primary border border-border-subtle rounded-lg text-white placeholder-gray-500 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple outline-none transition"
                    />
                  </div>
                </div>

                {/* Job Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Briefcase size={14} className="inline mr-2" />
                      Job Title *
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      placeholder="Software Engineer"
                      className="w-full px-4 py-3 bg-bg-primary border border-border-subtle rounded-lg text-white placeholder-gray-500 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Building2 size={14} className="inline mr-2" />
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="Google"
                      className="w-full px-4 py-3 bg-bg-primary border border-border-subtle rounded-lg text-white placeholder-gray-500 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <User size={14} className="inline mr-2" />
                    Hiring Manager Name (Optional)
                  </label>
                  <input
                    type="text"
                    name="hiringManagerName"
                    value={formData.hiringManagerName}
                    onChange={handleInputChange}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-3 bg-bg-primary border border-border-subtle rounded-lg text-white placeholder-gray-500 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Target size={14} className="inline mr-2" />
                    Key Skills
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    placeholder="React, Node.js, Team Leadership"
                    className="w-full px-4 py-3 bg-bg-primary border border-border-subtle rounded-lg text-white placeholder-gray-500 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Lightbulb size={14} className="inline mr-2" />
                    Relevant Experience
                  </label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="I led a team of 5 developers to deliver a major product launch..."
                    rows={3}
                    className="w-full px-4 py-3 bg-bg-primary border border-border-subtle rounded-lg text-white placeholder-gray-500 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple outline-none transition resize-none"
                  />
                </div>

                {/* Tone Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Writing Tone
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {TONES.map(tone => (
                      <button
                        key={tone.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, tone: tone.value as FormData['tone'] }))}
                        className={`px-4 py-3 rounded-lg border text-sm font-medium transition ${
                          formData.tone === tone.value
                            ? 'border-accent-purple bg-accent-purple/10 text-accent-purple'
                            : 'border-border-subtle text-gray-400 hover:border-gray-500'
                        }`}
                      >
                        <span className="mr-2">{tone.icon}</span>
                        {tone.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Error Message */}
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
                          Sign in now
                        </button>
                      )}
                      {error.includes('limit') && (
                        <button
                          onClick={() => router.push(`/${locale}/pricing`)}
                          className="text-accent-purple text-sm underline mt-1"
                        >
                          View plans
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Generate Button */}
                <button
                  onClick={generateCoverLetter}
                  disabled={isGenerating || !formData.fullName || !formData.jobTitle || !formData.companyName}
                  className="w-full flex items-center justify-center gap-2 bg-accent-purple text-white py-4 rounded-lg font-semibold hover:bg-accent-purple/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw size={20} className="animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Generate Cover Letter
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Preview Section */}
            <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent-green/20 rounded-lg flex items-center justify-center">
                    <FileText size={20} className="text-accent-green" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Preview</h2>
                    <p className="text-sm text-gray-400">Your generated letter</p>
                  </div>
                </div>
                {generatedLetter && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-300 transition"
                    >
                      {copied ? <CheckCircle size={16} className="text-accent-green" /> : <Copy size={16} />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={downloadAsTxt}
                      className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-300 transition"
                    >
                      <Download size={16} />
                      Download
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-bg-primary border border-border-subtle rounded-xl p-6 min-h-[400px]">
                {generatedLetter ? (
                  <pre className="whitespace-pre-wrap font-sans text-gray-300 leading-relaxed text-sm">
                    {generatedLetter}
                  </pre>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                      <FileText size={28} className="text-gray-600" />
                    </div>
                    <h3 className="text-gray-400 font-medium mb-2">No letter generated yet</h3>
                    <p className="text-gray-500 text-sm">Fill in your details and click Generate</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-bg-card/30">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Tips for a <span className="gradient-text">Great Cover Letter</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-bg-card border border-border-subtle rounded-xl p-6">
              <div className="w-10 h-10 bg-accent-green/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">🎯</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Be Specific</h3>
              <p className="text-gray-400 text-sm">Tailor your letter to the specific job and company. Generic letters are easily spotted.</p>
            </div>
            <div className="bg-bg-card border border-border-subtle rounded-xl p-6">
              <div className="w-10 h-10 bg-accent-purple/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">📊</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Show Results</h3>
              <p className="text-gray-400 text-sm">Include quantifiable achievements. Numbers make your accomplishments concrete and memorable.</p>
            </div>
            <div className="bg-bg-card border border-border-subtle rounded-xl p-6">
              <div className="w-10 h-10 bg-accent-blue/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">✨</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Keep It Concise</h3>
              <p className="text-gray-400 text-sm">Aim for 3-4 paragraphs. Recruiters spend just seconds scanning each application.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need a Resume Too?
          </h2>
          <p className="text-gray-400 mb-8">
            Pair your cover letter with a professionally designed resume built with AI.
          </p>
          <Link
            href={localizedHref('/builder')}
            className="inline-flex items-center gap-2 bg-accent-green text-bg-primary px-8 py-4 rounded-xl font-semibold hover:bg-accent-teal transition"
          >
            Build Your Resume
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
