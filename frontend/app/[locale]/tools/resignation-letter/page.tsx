'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
  Calendar,
  Heart,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';

interface FormData {
  fullName: string;
  currentPosition: string;
  companyName: string;
  managerName: string;
  lastWorkingDay: string;
  reasonForLeaving: string;
  positiveExperiences: string;
  tone: 'professional' | 'grateful' | 'brief' | 'warm';
  offerHelp: boolean;
}

const TONES = [
  { value: 'professional', label: 'Professional', icon: '👔', desc: 'Formal and business-like' },
  { value: 'grateful', label: 'Grateful', icon: '🙏', desc: 'Expressing appreciation' },
  { value: 'brief', label: 'Brief', icon: '📝', desc: 'Short and to the point' },
  { value: 'warm', label: 'Warm', icon: '💛', desc: 'Friendly and personal' },
];

const REASONS = [
  { value: '', label: 'Select a reason (optional)' },
  { value: 'new_opportunity', label: 'Pursuing a new opportunity' },
  { value: 'career_change', label: 'Career change' },
  { value: 'relocation', label: 'Relocation' },
  { value: 'personal', label: 'Personal reasons' },
  { value: 'education', label: 'Returning to education' },
  { value: 'family', label: 'Family commitments' },
  { value: 'health', label: 'Health reasons' },
  { value: 'retirement', label: 'Retirement' },
  { value: 'other', label: 'Other' },
];

export default function ResignationLetterGeneratorPage() {
  const locale = useLocale();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    currentPosition: '',
    companyName: '',
    managerName: '',
    lastWorkingDay: '',
    reasonForLeaving: '',
    positiveExperiences: '',
    tone: 'professional',
    offerHelp: true,
  });
  const [generatedLetter, setGeneratedLetter] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const generateResignationLetter = async () => {
    if (!formData.fullName || !formData.currentPosition || !formData.companyName) {
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 2000));

    const reasonText: Record<string, string> = {
      new_opportunity: 'I have accepted a position at another company',
      career_change: 'I have decided to pursue a different career path',
      relocation: 'I will be relocating',
      personal: 'due to personal reasons',
      education: 'I have decided to return to further my education',
      family: 'due to family commitments that require my full attention',
      health: 'due to health reasons',
      retirement: 'I have decided to retire',
      other: 'for personal reasons',
    };

    const reason = formData.reasonForLeaving ? reasonText[formData.reasonForLeaving] || formData.reasonForLeaving : '';
    const lastDay = formData.lastWorkingDay ? formatDate(formData.lastWorkingDay) : '[Last Working Day]';

    let letter = '';

    if (formData.tone === 'brief') {
      letter = `Dear ${formData.managerName || 'Manager'},

Please accept this letter as formal notification of my resignation from the position of ${formData.currentPosition} at ${formData.companyName}. My last day of work will be ${lastDay}.

${reason ? `I am resigning because ${reason}.` : ''}

Thank you for the opportunities provided during my time here.

Sincerely,
${formData.fullName}`;
    } else {
      letter = `Dear ${formData.managerName || 'Manager'},

I am writing to formally notify you of my resignation from my position as ${formData.currentPosition} at ${formData.companyName}. My last day of work will be ${lastDay}.

${reason ? `After careful consideration, ${reason}. ` : ''}This was not an easy decision to make, as I have genuinely valued my time with the company.

${formData.positiveExperiences ? `${formData.positiveExperiences} ` : formData.tone === 'grateful' ? 'I am incredibly grateful for the opportunities I have had to grow professionally and personally during my time here. ' : formData.tone === 'warm' ? 'Working with you and the team has been a wonderful experience that I will always cherish. ' : ''}I have learned so much and will always appreciate the support and guidance I have received.

${formData.offerHelp ? `During the transition period, I am committed to ensuring a smooth handover of my responsibilities. I am happy to help train my replacement or document my current projects and processes.

` : ''}Thank you for the opportunities for professional and personal development that you have provided me during my tenure. I wish ${formData.companyName} continued success, and I hope to stay in touch.

${formData.tone === 'warm' ? 'With warm regards,' : formData.tone === 'grateful' ? 'With sincere gratitude,' : 'Sincerely,'}
${formData.fullName}`;
    }

    setGeneratedLetter(letter);
    setIsGenerating(false);
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
    a.download = `resignation-letter-${formData.companyName.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const localizedHref = (path: string) => `/${locale}${path}`;

  // Calculate minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-bg-primary via-bg-primary to-accent-teal/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-accent-teal/10 text-accent-teal px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles size={16} />
              AI-Powered Resignation Letter Generator
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Write a <span className="gradient-text">Professional Resignation</span> Letter
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Leave your job on good terms with a professionally written resignation letter.
              Maintain positive relationships and protect your professional reputation.
            </p>
          </div>
        </div>
      </section>

      {/* Notice Banner */}
      <section className="py-4 bg-amber-500/10 border-y border-amber-500/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 text-amber-400">
            <AlertCircle size={20} />
            <p className="text-sm">
              <strong>Tip:</strong> Standard notice period is usually 2 weeks. Check your employment contract for specific requirements.
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
                <div className="w-10 h-10 bg-accent-teal/20 rounded-lg flex items-center justify-center">
                  <FileText size={20} className="text-accent-teal" />
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
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-bg-primary border border-border-subtle rounded-lg text-white placeholder-gray-500 focus:border-accent-teal focus:ring-1 focus:ring-accent-teal outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Briefcase size={14} className="inline mr-2" />
                      Current Position *
                    </label>
                    <input
                      type="text"
                      name="currentPosition"
                      value={formData.currentPosition}
                      onChange={handleInputChange}
                      placeholder="Software Engineer"
                      className="w-full px-4 py-3 bg-bg-primary border border-border-subtle rounded-lg text-white placeholder-gray-500 focus:border-accent-teal focus:ring-1 focus:ring-accent-teal outline-none transition"
                    />
                  </div>
                </div>

                {/* Company Info */}
                <div className="grid md:grid-cols-2 gap-4">
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
                      placeholder="Acme Corp"
                      className="w-full px-4 py-3 bg-bg-primary border border-border-subtle rounded-lg text-white placeholder-gray-500 focus:border-accent-teal focus:ring-1 focus:ring-accent-teal outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <User size={14} className="inline mr-2" />
                      Manager&apos;s Name
                    </label>
                    <input
                      type="text"
                      name="managerName"
                      value={formData.managerName}
                      onChange={handleInputChange}
                      placeholder="Jane Smith"
                      className="w-full px-4 py-3 bg-bg-primary border border-border-subtle rounded-lg text-white placeholder-gray-500 focus:border-accent-teal focus:ring-1 focus:ring-accent-teal outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Calendar size={14} className="inline mr-2" />
                    Last Working Day
                  </label>
                  <input
                    type="date"
                    name="lastWorkingDay"
                    value={formData.lastWorkingDay}
                    onChange={handleInputChange}
                    min={today}
                    className="w-full px-4 py-3 bg-bg-primary border border-border-subtle rounded-lg text-white placeholder-gray-500 focus:border-accent-teal focus:ring-1 focus:ring-accent-teal outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Reason for Leaving
                  </label>
                  <select
                    name="reasonForLeaving"
                    value={formData.reasonForLeaving}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-bg-primary border border-border-subtle rounded-lg text-white focus:border-accent-teal focus:ring-1 focus:ring-accent-teal outline-none transition"
                  >
                    {REASONS.map(reason => (
                      <option key={reason.value} value={reason.value} className="bg-bg-primary">
                        {reason.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Heart size={14} className="inline mr-2" />
                    Positive Experiences (Optional)
                  </label>
                  <textarea
                    name="positiveExperiences"
                    value={formData.positiveExperiences}
                    onChange={handleInputChange}
                    placeholder="I really enjoyed working on the product launch project and appreciated the mentorship from the senior team..."
                    rows={3}
                    className="w-full px-4 py-3 bg-bg-primary border border-border-subtle rounded-lg text-white placeholder-gray-500 focus:border-accent-teal focus:ring-1 focus:ring-accent-teal outline-none transition resize-none"
                  />
                </div>

                {/* Tone Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Letter Tone
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {TONES.map(tone => (
                      <button
                        key={tone.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, tone: tone.value as FormData['tone'] }))}
                        className={`px-4 py-3 rounded-lg border text-left transition ${
                          formData.tone === tone.value
                            ? 'border-accent-teal bg-accent-teal/10'
                            : 'border-border-subtle hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span>{tone.icon}</span>
                          <span className={`font-medium ${formData.tone === tone.value ? 'text-accent-teal' : 'text-white'}`}>
                            {tone.label}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">{tone.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Offer Help Checkbox */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="offerHelp"
                    checked={formData.offerHelp}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded border-border-subtle bg-bg-primary text-accent-teal focus:ring-accent-teal"
                  />
                  <span className="text-gray-300">Offer to help with transition</span>
                </label>

                {/* Generate Button */}
                <button
                  onClick={generateResignationLetter}
                  disabled={isGenerating || !formData.fullName || !formData.currentPosition || !formData.companyName}
                  className="w-full flex items-center justify-center gap-2 bg-accent-teal text-bg-primary py-4 rounded-lg font-semibold hover:bg-accent-teal/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw size={20} className="animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Generate Resignation Letter
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
            Resignation <span className="gradient-text">Best Practices</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-bg-card border border-border-subtle rounded-xl p-6">
              <div className="w-10 h-10 bg-accent-green/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">📅</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Give Notice</h3>
              <p className="text-gray-400 text-sm">Provide at least 2 weeks notice, or follow your contract terms.</p>
            </div>
            <div className="bg-bg-card border border-border-subtle rounded-xl p-6">
              <div className="w-10 h-10 bg-accent-purple/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">🤝</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Stay Professional</h3>
              <p className="text-gray-400 text-sm">Keep emotions out of it. Be respectful and positive.</p>
            </div>
            <div className="bg-bg-card border border-border-subtle rounded-xl p-6">
              <div className="w-10 h-10 bg-accent-blue/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">📝</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Document It</h3>
              <p className="text-gray-400 text-sm">Always submit a written resignation for your records.</p>
            </div>
            <div className="bg-bg-card border border-border-subtle rounded-xl p-6">
              <div className="w-10 h-10 bg-accent-teal/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">🌟</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Leave Well</h3>
              <p className="text-gray-400 text-sm">Complete pending work and offer to train your replacement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready for Your Next Opportunity?
          </h2>
          <p className="text-gray-400 mb-8">
            Build a professional resume for your job search with our AI-powered resume builder.
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
            {/* External Resources */}
            <section className="py-8 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">External Resources</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        <a href="https://www.shrm.org/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
                            <span className="text-gray-400">↗</span>
                            <span className="text-sm text-gray-700">SHRM: HR & Workplace Resources</span>
                        </a>
                        <a href="https://www.bls.gov/ooh/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
                            <span className="text-gray-400">↗</span>
                            <span className="text-sm text-gray-700">Bureau of Labor Statistics: Career Data</span>
                        </a>
                    </div>
                </div>
            </section>


      <Footer />
    </>
  );
}
