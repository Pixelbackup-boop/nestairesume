import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FaqAccordion from '@/components/help/FaqAccordion';
import { UserPlus, FileText, CreditCard, Download, AlertTriangle, Lightbulb } from 'lucide-react';

const SECTION_ICONS = [UserPlus, FileText, CreditCard, Download] as const;
const SECTION_KEYS = ['gettingStarted', 'buildingResume', 'choosingPlan', 'downloading'] as const;
const SECTION_IDS = ['getting-started', 'building-resume', 'choosing-plan', 'downloading'] as const;
const STEP_COUNTS = [3, 4, 3, 3] as const;
const FAQ_COUNTS = [3, 3, 3, 3] as const;
const TROUBLESHOOTING_COUNT = 5;

// Which steps have tips (sectionIdx -> stepNums with tips)
const TIPS: Record<number, number[]> = {
  0: [1, 2],    // gettingStarted: steps 1, 2
  1: [1, 3],    // buildingResume: steps 1, 3
  2: [2],       // choosingPlan: step 2
  3: [2],       // downloading: step 2
};

const GRADIENT_COLORS = [
  'from-accent-green to-accent-teal',
  'from-accent-teal to-blue-400',
  'from-blue-400 to-purple-400',
  'from-purple-400 to-accent-green',
];

export default async function HelpPage() {
  const t = await getTranslations('Help');

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-8">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-teal-primary mb-5">
            {t('title')}
          </h1>
          <p className="text-teal-primary/70 text-lg leading-relaxed max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap items-center gap-3 justify-center">
            <span className="text-sm text-gray-500 font-medium">{t('quickNav')}</span>
            {SECTION_KEYS.map((key, idx) => (
              <a
                key={key}
                href={`#${SECTION_IDS[idx]}`}
                className="text-sm px-4 py-2 rounded-full border border-teal-primary/30 text-teal-primary hover:bg-teal-primary/10 transition"
              >
                {t(`${key}.title`)}
              </a>
            ))}
            <a
              href="#troubleshooting"
              className="text-sm px-4 py-2 rounded-full border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 transition"
            >
              {t('troubleshootingLabel')}
            </a>
          </div>
        </div>
      </section>

      {/* Guide Sections */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-6 space-y-20">
          {SECTION_KEYS.map((sectionKey, sectionIdx) => {
            const Icon = SECTION_ICONS[sectionIdx];
            const stepCount = STEP_COUNTS[sectionIdx];
            const faqCount = FAQ_COUNTS[sectionIdx];
            const tipsForSection = TIPS[sectionIdx] || [];

            // Build FAQ items for this section
            const faqItems = Array.from({ length: faqCount }, (_, i) => ({
              question: t(`${sectionKey}.faq.${i + 1}.q`),
              answer: t(`${sectionKey}.faq.${i + 1}.a`),
            }));

            return (
              <div key={sectionKey} id={SECTION_IDS[sectionIdx]} className="scroll-mt-24">
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${GRADIENT_COLORS[sectionIdx]} flex items-center justify-center shrink-0`}>
                    <Icon className="w-6 h-6 text-bg-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    {t(`${sectionKey}.title`)}
                  </h2>
                </div>

                {/* Steps */}
                <div className="space-y-4 ml-2">
                  {Array.from({ length: stepCount }, (_, stepIdx) => {
                    const stepNum = stepIdx + 1;
                    const padded = String(stepNum).padStart(2, '0');
                    const hasTip = tipsForSection.includes(stepNum);

                    return (
                      <div
                        key={stepNum}
                        className="flex gap-5 bg-bg-card border border-border-subtle rounded-xl p-6 hover:border-accent-green/30 transition"
                      >
                        {/* Step Number */}
                        <span className={`text-3xl font-bold bg-gradient-to-br ${GRADIENT_COLORS[sectionIdx]} bg-clip-text text-transparent shrink-0 leading-none mt-1`}>
                          {padded}
                        </span>

                        {/* Step Content */}
                        <div className="min-w-0">
                          <h3 className="text-lg font-semibold text-white mb-2">
                            {t(`${sectionKey}.steps.${stepNum}.title`)}
                          </h3>
                          <p className="text-gray-400 leading-relaxed">
                            {t(`${sectionKey}.steps.${stepNum}.description`)}
                          </p>

                          {/* Pro Tip */}
                          {hasTip && (
                            <div className="mt-3 flex gap-2 pl-4 border-l-2 border-accent-green/50">
                              <Lightbulb className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
                              <p className="text-sm text-accent-green/80 italic">
                                <span className="font-semibold not-italic text-accent-green">{t('tipLabel')}:</span>{' '}
                                {t(`${sectionKey}.steps.${stepNum}.tip`)}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* FAQ Accordion */}
                <FaqAccordion items={faqItems} label={t('faqLabel')} />
              </div>
            );
          })}
        </div>
      </section>

      {/* Troubleshooting Section */}
      <section id="troubleshooting" className="scroll-mt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-bg-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {t('troubleshooting.title')}
            </h2>
          </div>

          <div className="space-y-4 ml-2">
            {Array.from({ length: TROUBLESHOOTING_COUNT }, (_, idx) => (
              <div
                key={idx}
                className="bg-bg-card border border-border-subtle rounded-xl p-6 hover:border-yellow-500/30 transition"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {t(`troubleshooting.items.${idx + 1}.title`)}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {t(`troubleshooting.items.${idx + 1}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-border-subtle">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/builder"
              className="inline-flex items-center justify-center gap-2 bg-accent-green text-bg-primary px-8 py-3 rounded-xl font-semibold hover:bg-accent-teal transition"
            >
              {t('cta.buildButton')}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-gray-600 text-gray-300 px-8 py-3 rounded-xl font-semibold hover:border-accent-green hover:text-white transition"
            >
              {t('cta.contactButton')}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
