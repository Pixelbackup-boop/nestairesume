'use client';

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PricingAnimations } from "@/components/PricingAnimations";

export default function PricingPage() {
  const t = useTranslations("Pricing");
  const locale = useLocale();

  const localizedHref = (path: string) => `/${locale}${path}`;

  const plans = [
    {
      name: t("starter.name"),
      price: t("starter.price"),
      period: t("starter.period"),
      description: t("starter.description"),
      features: [
        { text: t("starter.features.cvCreations"), included: true },
        { text: t("starter.features.aiGenerations"), included: true },
        { text: t("starter.features.templates"), included: true },
        { text: t("starter.features.noAds"), included: true },
        { text: t("starter.features.export"), included: true },
        { text: t("page.formBuilder"), included: true },
        { text: t("page.atsOptimization"), included: false },
        { text: t("page.coverLetterBuilder"), included: false },
      ],
      cta: t("starter.cta"),
      href: localizedHref("/checkout?plan=starter"),
      highlighted: false,
      hasTrial: false, // No trial - charges immediately
    },
    {
      name: t("gold.name"),
      price: t("gold.price"),
      period: t("gold.period"),
      description: t("gold.description"),
      features: [
        { text: t("gold.features.cvCreations"), included: true },
        { text: t("gold.features.aiGenerations"), included: true },
        { text: t("gold.features.templates"), included: true },
        { text: t("gold.features.noAds"), included: true },
        { text: t("gold.features.ats"), included: true },
        { text: t("page.aiSuggestions"), included: true },
        { text: t("page.coverLetterBuilder"), included: false },
        { text: t("page.prioritySupport"), included: false },
      ],
      cta: t("gold.cta"),
      href: localizedHref("/checkout?plan=gold"),
      highlighted: false,
      hasTrial: true, // 7-day free trial
    },
    {
      name: t("diamond.name"),
      price: t("diamond.price"),
      period: t("diamond.period"),
      description: t("diamond.description"),
      badge: t("mostPopular"),
      features: [
        { text: t("diamond.features.cvCreations"), included: true },
        { text: t("diamond.features.aiGenerations"), included: true },
        { text: t("diamond.features.templates"), included: true },
        { text: t("page.noAds"), included: true },
        { text: t("page.atsOptimization"), included: true },
        { text: t("diamond.features.coverLetter"), included: true },
        { text: t("diamond.features.support"), included: true },
        { text: t("page.earlyAccess"), included: false },
      ],
      cta: t("diamond.cta"),
      href: localizedHref("/checkout?plan=diamond"),
      highlighted: true,
      hasTrial: true, // 7-day free trial
    },
    {
      name: t("platinum.name"),
      price: t("platinum.price"),
      period: t("platinum.period"),
      description: t("platinum.description"),
      badge: t("bestValue"),
      features: [
        { text: t("platinum.features.cvCreations"), included: true },
        { text: t("platinum.features.aiGenerations"), included: true },
        { text: t("platinum.features.templates"), included: true },
        { text: t("page.noAds"), included: true },
        { text: t("platinum.features.coverLetter"), included: true },
        { text: t("platinum.features.support"), included: true },
        { text: t("platinum.features.earlyAccess"), included: true },
        { text: t("page.prioritySupport"), included: true },
      ],
      cta: t("platinum.cta"),
      href: localizedHref("/checkout?plan=platinum"),
      highlighted: false,
      hasTrial: false, // No trial - charges immediately
    },
  ];

  const comparisonFeatures = [
    { feature: t("comparison.cvCreations"), starter: "30/mo", gold: "150/mo", diamond: "300/mo", platinum: t("comparison.unlimited") },
    { feature: t("comparison.aiGenerations"), starter: "3/mo", gold: "10/mo", diamond: "30/mo", platinum: "100/mo" },
    { feature: "Free Trial", starter: "✗", gold: "7 days", diamond: "7 days", platinum: "✗" },
    { feature: t("comparison.templates"), starter: t("comparison.all50"), gold: t("comparison.all50"), diamond: t("comparison.premiumPlus"), platinum: t("comparison.premiumPlus") },
    { feature: t("comparison.aiBuild"), starter: "✓", gold: "✓", diamond: "✓", platinum: "✓" },
    { feature: t("page.formBuilder"), starter: "✓", gold: "✓", diamond: "✓", platinum: "✓" },
    { feature: t("comparison.adFree"), starter: "✓", gold: "✓", diamond: "✓", platinum: "✓" },
    { feature: t("page.atsOptimization"), starter: "✗", gold: "✓", diamond: "✓", platinum: "✓" },
    { feature: t("page.coverLetterBuilder"), starter: "✗", gold: "✗", diamond: "✓", platinum: "✓" },
    { feature: t("page.prioritySupport"), starter: "✗", gold: "✗", diamond: "✓", platinum: "✓" },
    { feature: t("page.earlyAccess"), starter: "✗", gold: "✗", diamond: "✗", platinum: "✓" },
  ];

  const faqs = [
    {
      question: t("faq.cancelAnytime.question"),
      answer: t("faq.cancelAnytime.answer"),
    },
    {
      question: t("faq.paymentMethods.question"),
      answer: t("faq.paymentMethods.answer"),
    },
    {
      question: t("faq.starterOneTime.question"),
      answer: t("faq.starterOneTime.answer"),
    },
    {
      question: t("faq.runOutDownloads.question"),
      answer: t("faq.runOutDownloads.answer"),
    },
    {
      question: t("faq.switchPlans.question"),
      answer: t("faq.switchPlans.answer"),
    },
    {
      question: t("faq.refunds.question"),
      answer: t("faq.refunds.answer"),
    },
  ];

  // FAQPage JSON-LD schema — built from hardcoded i18n translation constants, safe for rendering
  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  });

  return (
    <>
      <Header />

      {/* FAQPage JSON-LD schema — hardcoded i18n translation constants, no user input involved */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema }}
      />

      {/* Hero - Animated */}
      <section className="pt-32 pb-12">
        <PricingAnimations.Hero>
          <div className="max-w-6xl mx-auto px-6 text-center">
            <span className="text-accent-green font-medium text-sm uppercase tracking-wider">{t("sectionTitle")}</span>
            <h1 className="text-4xl sm:text-5xl font-bold mt-3 mb-6 text-gray-900">
              {t("title")}<br />
              <span className="gradient-text">{t("titleHighlight")}</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              {t("subtitle")}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 bg-accent-green/10 border border-accent-green/30 px-4 py-2 rounded-full">
              <svg className="w-5 h-5 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-accent-green font-medium text-sm">{t("trialBadge")} on Gold & Diamond</span>
            </div>
          </div>
        </PricingAnimations.Hero>
      </section>

      {/* Pricing Cards - Staggered Animation */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-6">
          <PricingAnimations.PricingGrid className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {plans.map((plan) => (
              <PricingAnimations.PricingCard
                key={plan.name}
                highlighted={plan.highlighted}
                className={`rounded-2xl p-6 relative ${
                  plan.highlighted
                    ? "pricing-highlight"
                    : "pricing-card"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <PricingAnimations.Badge className="px-3 py-1 bg-accent-green text-bg-primary text-xs font-bold rounded-full whitespace-nowrap">
                      {plan.badge}
                    </PricingAnimations.Badge>
                  </div>
                )}
                <div className={`mb-5 ${plan.badge ? "mt-2" : ""}`}>
                  <h3 className="font-semibold text-xl mb-1 text-gray-900">{plan.name}</h3>
                  <p className="text-gray-500 text-sm">{plan.description}</p>
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 text-sm">{plan.period}</span>
                </div>
                {plan.hasTrial ? (
                  <div className="mb-4 inline-flex items-center gap-1.5 bg-accent-green/10 text-accent-green text-xs font-medium px-2.5 py-1 rounded-full">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t("trialBadge")}
                  </div>
                ) : (
                  <div className="mb-4 text-xs text-gray-500">Billed immediately</div>
                )}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className={`flex items-center gap-2 text-sm ${
                        feature.included ? "text-gray-700" : "text-gray-400"
                      }`}
                    >
                      <svg
                        className={`w-4 h-4 flex-shrink-0 ${
                          feature.included ? "check-icon" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {feature.included ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        )}
                      </svg>
                      {feature.text}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`block w-full text-center py-3 rounded-lg font-semibold text-sm transition btn-lift ${
                    plan.highlighted
                      ? "bg-accent-green text-bg-primary hover:bg-accent-teal"
                      : "border border-gray-300 hover:bg-gray-100 text-gray-900"
                  }`}
                >
                  {plan.cta}
                </Link>
              </PricingAnimations.PricingCard>
            ))}
          </PricingAnimations.PricingGrid>
        </div>
      </section>

      {/* Comparison Table - Animated Rows */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">{t("comparison.title")}</h2>
          <PricingAnimations.ComparisonTable className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 text-gray-500 font-medium">{t("comparison.feature")}</th>
                  <th className="text-center py-4 px-4 text-gray-900 font-semibold">{t("starter.name")}</th>
                  <th className="text-center py-4 px-4 text-gray-900 font-semibold">{t("gold.name")}</th>
                  <th className="text-center py-4 px-4 text-accent-green font-semibold">{t("diamond.name")}</th>
                  <th className="text-center py-4 px-4 text-amber-400 font-semibold">{t("platinum.name")}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, idx) => (
                  <PricingAnimations.TableRow key={idx} className="border-b border-gray-200">
                    <td className="py-4 px-4 text-gray-700">{row.feature}</td>
                    <td className={`text-center py-4 px-4 ${row.starter === "✗" ? "text-gray-400" : "text-gray-700"}`}>
                      {row.starter}
                    </td>
                    <td className={`text-center py-4 px-4 ${row.gold === "✗" ? "text-gray-400" : "text-gray-700"}`}>
                      {row.gold}
                    </td>
                    <td className={`text-center py-4 px-4 ${row.diamond === "✗" ? "text-gray-400" : "text-accent-green"}`}>
                      {row.diamond}
                    </td>
                    <td className={`text-center py-4 px-4 ${row.platinum === "✗" ? "text-gray-400" : "text-amber-400"}`}>
                      {row.platinum}
                    </td>
                  </PricingAnimations.TableRow>
                ))}
              </tbody>
            </table>
          </PricingAnimations.ComparisonTable>
        </div>
      </section>

      {/* FAQ - Interactive Accordion */}
      <section className="py-16 bg-bg-card/30">
        <div className="max-w-3xl mx-auto px-6">
          <PricingAnimations.FAQHeader className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">{t("faq.title")}</h2>
          </PricingAnimations.FAQHeader>
          <PricingAnimations.FAQContainer className="space-y-4">
            {faqs.map((faq, idx) => (
              <PricingAnimations.FAQItem
                key={idx}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </PricingAnimations.FAQContainer>
        </div>
      </section>

      {/* CTA - Animated */}
      <section className="py-16">
        <PricingAnimations.CTA className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">{t("cta.title")}</h2>
          <p className="text-gray-500 mb-8">{t("cta.subtitle")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={localizedHref("/onboarding")}
              className="inline-flex items-center gap-2 bg-accent-green text-bg-primary px-8 py-4 rounded-xl font-semibold hover:bg-accent-teal transition btn-lift"
            >
              {t("cta.button")}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-2 border border-gray-300 px-6 py-4 rounded-xl font-medium hover:bg-gray-100 transition text-gray-900"
            >
              {t("cta.contactSupport")}
            </Link>
          </div>
        </PricingAnimations.CTA>
      </section>

      <Footer />
    </>
  );
}
