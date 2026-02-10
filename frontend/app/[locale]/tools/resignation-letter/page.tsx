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

export default function ResignationLetterGeneratorPage() {
  const locale = useLocale();
  const t = useTranslations('ResignationLetter');

  const TONES = [
    { value: 'professional', label: t('form.professional'), icon: '👔', desc: t('form.professionalDesc') },
    { value: 'grateful', label: t('form.grateful'), icon: '🙏', desc: t('form.gratefulDesc') },
    { value: 'brief', label: t('form.brief'), icon: '📝', desc: t('form.briefDesc') },
    { value: 'warm', label: t('form.warm'), icon: '💛', desc: t('form.warmDesc') },
  ];

  const REASONS = [
    { value: '', label: t('reasons.selectReason') },
    { value: 'new_opportunity', label: t('reasons.newOpportunity') },
    { value: 'career_change', label: t('reasons.careerChange') },
    { value: 'relocation', label: t('reasons.relocation') },
    { value: 'personal', label: t('reasons.personal') },
    { value: 'education', label: t('reasons.education') },
    { value: 'family', label: t('reasons.family') },
    { value: 'health', label: t('reasons.health') },
    { value: 'retirement', label: t('reasons.retirement') },
    { value: 'other', label: t('reasons.other') },
  ];
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
    return date.toLocaleDateString(locale, { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const generateResignationLetter = async () => {
    if (!formData.fullName || !formData.currentPosition || !formData.companyName) {
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 2000));

    const reasonTextMap: Record<string, string> = {
      new_opportunity: t('reasonText.newOpportunity'),
      career_change: t('reasonText.careerChange'),
      relocation: t('reasonText.relocation'),
      personal: t('reasonText.personal'),
      education: t('reasonText.education'),
      family: t('reasonText.family'),
      health: t('reasonText.health'),
      retirement: t('reasonText.retirement'),
      other: t('reasonText.other'),
    };

    const reason = formData.reasonForLeaving ? reasonTextMap[formData.reasonForLeaving] || formData.reasonForLeaving : '';
    const lastDay = formData.lastWorkingDay ? formatDate(formData.lastWorkingDay) : t('letter.lastWorkingDayPlaceholder');
    const greeting = t('letter.dearManager', { name: formData.managerName || t('letter.defaultManager') });

    let letter = '';

    if (formData.tone === 'brief') {
      letter = `${greeting}

${t('letter.briefBody', { position: formData.currentPosition, company: formData.companyName, lastDay })}

${reason ? t('letter.briefReason', { reason }) : ''}

${t('letter.briefClosing')}

${t('letter.sincerely')}
${formData.fullName}`;
    } else {
      letter = `${greeting}

${t('letter.formalBody', { position: formData.currentPosition, company: formData.companyName, lastDay })}

${reason ? `${t('letter.reasonPrefix', { reason })} ` : ''}${t('letter.notEasyDecision')}

${formData.positiveExperiences ? `${formData.positiveExperiences} ` : formData.tone === 'grateful' ? `${t('letter.gratefulDefault')} ` : formData.tone === 'warm' ? `${t('letter.warmDefault')} ` : ''}${t('letter.learnedAppreciate')}

${formData.offerHelp ? `${t('letter.transitionHelp')}

` : ''}${t('letter.thankYouClosing', { company: formData.companyName })}

${formData.tone === 'warm' ? t('letter.warmRegards') : formData.tone === 'grateful' ? t('letter.sincereGratitude') : t('letter.sincerely')}
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

      {/* Notice Banner */}
      <section className="py-4 bg-amber-500/10 border-y border-amber-500/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 text-amber-400">
            <AlertCircle size={20} />
            <p className="text-sm">
              <strong>{t('noticeLabel')}:</strong> {t('notice')}
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
                  <h2 className="text-xl font-semibold text-white">{t('form.yourDetails')}</h2>
                  <p className="text-sm text-gray-400">{t('form.fillInfo')}</p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Personal Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <User size={14} className="inline mr-2" />
                      {t('form.yourName')} *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder={t('form.yourNamePlaceholder')}
                      className="w-full px-4 py-3 bg-bg-primary border border-border-subtle rounded-lg text-white placeholder-gray-500 focus:border-accent-teal focus:ring-1 focus:ring-accent-teal outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Briefcase size={14} className="inline mr-2" />
                      {t('form.currentPosition')} *
                    </label>
                    <input
                      type="text"
                      name="currentPosition"
                      value={formData.currentPosition}
                      onChange={handleInputChange}
                      placeholder={t('form.currentPositionPlaceholder')}
                      className="w-full px-4 py-3 bg-bg-primary border border-border-subtle rounded-lg text-white placeholder-gray-500 focus:border-accent-teal focus:ring-1 focus:ring-accent-teal outline-none transition"
                    />
                  </div>
                </div>

                {/* Company Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Building2 size={14} className="inline mr-2" />
                      {t('form.companyName')} *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder={t('form.companyPlaceholder')}
                      className="w-full px-4 py-3 bg-bg-primary border border-border-subtle rounded-lg text-white placeholder-gray-500 focus:border-accent-teal focus:ring-1 focus:ring-accent-teal outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <User size={14} className="inline mr-2" />
                      {t('form.managerName')}
                    </label>
                    <input
                      type="text"
                      name="managerName"
                      value={formData.managerName}
                      onChange={handleInputChange}
                      placeholder={t('form.managerPlaceholder')}
                      className="w-full px-4 py-3 bg-bg-primary border border-border-subtle rounded-lg text-white placeholder-gray-500 focus:border-accent-teal focus:ring-1 focus:ring-accent-teal outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Calendar size={14} className="inline mr-2" />
                    {t('form.lastWorkingDay')}
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
                    {t('form.reasonForLeaving')}
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
                    {t('form.positiveExperiences')}
                  </label>
                  <textarea
                    name="positiveExperiences"
                    value={formData.positiveExperiences}
                    onChange={handleInputChange}
                    placeholder={t('form.positiveExperiencesPlaceholder')}
                    rows={3}
                    className="w-full px-4 py-3 bg-bg-primary border border-border-subtle rounded-lg text-white placeholder-gray-500 focus:border-accent-teal focus:ring-1 focus:ring-accent-teal outline-none transition resize-none"
                  />
                </div>

                {/* Tone Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    {t('form.tone')}
                  </label>
                  <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label={t('form.tone')}>
                    {TONES.map(tone => (
                      <button
                        key={tone.value}
                        type="button"
                        role="radio"
                        aria-checked={formData.tone === tone.value}
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
                  <span className="text-gray-300">{t('form.offerHelp')}</span>
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

            {/* Preview Section */}
            <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent-green/20 rounded-lg flex items-center justify-center">
                    <FileText size={20} className="text-accent-green" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">{t('preview.title')}</h2>
                    <p className="text-sm text-gray-400">{t('preview.subtitle')}</p>
                  </div>
                </div>
                {generatedLetter && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-300 transition"
                    >
                      {copied ? <CheckCircle size={16} className="text-accent-green" /> : <Copy size={16} />}
                      {copied ? t('preview.copied') : t('preview.copy')}
                    </button>
                    <button
                      onClick={downloadAsTxt}
                      className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-300 transition"
                    >
                      <Download size={16} />
                      {t('preview.download')}
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
                    <h3 className="text-gray-400 font-medium mb-2">{t('preview.noLetter')}</h3>
                    <p className="text-gray-500 text-sm">{t('preview.fillAndGenerate')}</p>
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
            {t('tips.title')} <span className="gradient-text">{t('tips.titleHighlight')}</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-bg-card border border-border-subtle rounded-xl p-6">
              <div className="w-10 h-10 bg-accent-green/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">📅</span>
              </div>
              <h3 className="font-semibold text-white mb-2">{t('tips.giveNotice')}</h3>
              <p className="text-gray-400 text-sm">{t('tips.giveNoticeDesc')}</p>
            </div>
            <div className="bg-bg-card border border-border-subtle rounded-xl p-6">
              <div className="w-10 h-10 bg-accent-purple/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">🤝</span>
              </div>
              <h3 className="font-semibold text-white mb-2">{t('tips.stayProfessional')}</h3>
              <p className="text-gray-400 text-sm">{t('tips.stayProfessionalDesc')}</p>
            </div>
            <div className="bg-bg-card border border-border-subtle rounded-xl p-6">
              <div className="w-10 h-10 bg-accent-blue/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">📝</span>
              </div>
              <h3 className="font-semibold text-white mb-2">{t('tips.documentIt')}</h3>
              <p className="text-gray-400 text-sm">{t('tips.documentItDesc')}</p>
            </div>
            <div className="bg-bg-card border border-border-subtle rounded-xl p-6">
              <div className="w-10 h-10 bg-accent-teal/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">🌟</span>
              </div>
              <h3 className="font-semibold text-white mb-2">{t('tips.leaveWell')}</h3>
              <p className="text-gray-400 text-sm">{t('tips.leaveWellDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-gray-400 mb-8">
            {t('cta.subtitle')}
          </p>
          <Link
            href={localizedHref('/builder')}
            className="inline-flex items-center gap-2 bg-accent-green text-bg-primary px-8 py-4 rounded-xl font-semibold hover:bg-accent-teal transition"
          >
            {t('cta.button')}
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
            {/* External Resources */}
            <section className="py-8 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('externalResources.title')}</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        <a href="https://www.shrm.org/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
                            <span className="text-gray-400">↗</span>
                            <span className="text-sm text-gray-700">{t('externalResources.shrmWorkplace')}</span>
                        </a>
                        <a href="https://www.bls.gov/ooh/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
                            <span className="text-gray-400">↗</span>
                            <span className="text-sm text-gray-700">{t('externalResources.blsCareerData')}</span>
                        </a>
                    </div>
                </div>
            </section>


      <Footer />
    </>
  );
}
