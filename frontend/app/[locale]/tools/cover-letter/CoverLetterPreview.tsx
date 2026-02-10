'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import {
  FileText,
  Copy,
  Download,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

interface CoverLetterPreviewProps {
  generatedLetter: string;
  companyName: string;
}

export default function CoverLetterPreview({ generatedLetter, companyName }: CoverLetterPreviewProps) {
  const t = useTranslations('CoverLetter');
  const locale = useLocale();
  const [copied, setCopied] = useState(false);

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
    a.download = `cover-letter-${companyName.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const localizedHref = (path: string) => `/${locale}${path}`;

  return (
    <>
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

      {/* Tips Section */}
      <section className="py-16 bg-bg-card/30">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            {t('tips.title')} <span className="gradient-text">{t('tips.titleHighlight')}</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-bg-card border border-border-subtle rounded-xl p-6">
              <div className="w-10 h-10 bg-accent-green/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">🎯</span>
              </div>
              <h3 className="font-semibold text-white mb-2">{t('tips.beSpecific')}</h3>
              <p className="text-gray-400 text-sm">{t('tips.beSpecificDesc')}</p>
            </div>
            <div className="bg-bg-card border border-border-subtle rounded-xl p-6">
              <div className="w-10 h-10 bg-accent-purple/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">📊</span>
              </div>
              <h3 className="font-semibold text-white mb-2">{t('tips.showResults')}</h3>
              <p className="text-gray-400 text-sm">{t('tips.showResultsDesc')}</p>
            </div>
            <div className="bg-bg-card border border-border-subtle rounded-xl p-6">
              <div className="w-10 h-10 bg-accent-blue/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">✨</span>
              </div>
              <h3 className="font-semibold text-white mb-2">{t('tips.keepConcise')}</h3>
              <p className="text-gray-400 text-sm">{t('tips.keepConciseDesc')}</p>
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
            <a href="https://www.bls.gov/ooh/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
              <span className="text-gray-400">↗</span>
              <span className="text-sm text-gray-700">{t('externalResources.blsCareerOutlook')}</span>
            </a>
            <a href="https://www.shrm.org/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
              <span className="text-gray-400">↗</span>
              <span className="text-sm text-gray-700">{t('externalResources.shrmHrResources')}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
