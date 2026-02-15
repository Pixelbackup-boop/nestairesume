'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PricingAnimations } from "@/components/PricingAnimations";
import { useAuthStore } from "@/store/useAuthStore";
import api from "@/lib/api";

type PlanType = "starter" | "gold" | "diamond" | "platinum";

export default function PricingPage() {
  const t = useTranslations("Pricing");
  const locale = useLocale();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [isAnnual, setIsAnnual] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<PlanType | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('diamond');
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [planLimits, setPlanLimits] = useState<Record<string, {
    cvLimit: number; aiLimit: number; downloadLimit: number; coverLetterLimit: number;
  }> | null>(null);

  // Fetch plan limits from backend (single source of truth)
  useEffect(() => {
    api.get('/payments/plans')
      .then(res => setPlanLimits(res.data as Record<string, { cvLimit: number; aiLimit: number; downloadLimit: number; coverLetterLimit: number }>))
      .catch(err => console.error('Failed to fetch plan limits:', err));
  }, []);

  const formatLimit = (limit: number | undefined) =>
    limit === -1 ? t("page.unlimited") : String(limit ?? '—');

  const localizedHref = (path: string) => `/${locale}${path}`;

  // Handle direct checkout to Stripe
  const handleCheckout = async (plan: PlanType) => {
    // If not authenticated, redirect to login first
    if (!isAuthenticated) {
      router.push(localizedHref(`/auth/login?redirect=/checkout?plan=${plan}`));
      return;
    }

    setLoadingPlan(plan);

    try {
      setCheckoutError(null);
      const response = await api.post("/payments/create-checkout", { plan });
      const { url } = response.data as { url: string };

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (err: unknown) {
      const errorObj = err as { message?: string; response?: { data?: { detail?: string }; status?: number } };
      const message = errorObj?.message || errorObj?.response?.data?.detail || "Failed to start checkout";
      console.error("Checkout error:", message);
      setCheckoutError(message);
    } finally {
      setLoadingPlan(null);
    }
  };

  const plans = [
    {
      key: "starter" as PlanType,
      name: t("starter.name"),
      price: isAnnual ? t("starter.annualPrice") : t("starter.price"),
      period: isAnnual ? t("starter.annualPeriod") : t("starter.period"),
      monthlyEquivalent: isAnnual ? t("starter.annualMonthly") : null,
      description: t("starter.description"),
      features: [
        { text: t("page.cvCreations", { count: formatLimit(planLimits?.starter?.cvLimit) }), included: true },
        { text: t("page.aiGenerations", { count: formatLimit(planLimits?.starter?.aiLimit) }), included: true },
        { text: t("page.downloads", { count: formatLimit(planLimits?.starter?.downloadLimit) }), included: true },
        { text: t("starter.features.templates"), included: true },
        { text: t("starter.features.noAds"), included: true },
        { text: t("page.atsOptimization"), included: true },
        { text: t("page.coverLetters", { count: formatLimit(planLimits?.starter?.coverLetterLimit) }), included: true },
      ],
      highlighted: false,
    },
    {
      key: "gold" as PlanType,
      name: t("gold.name"),
      price: isAnnual ? t("gold.annualPrice") : t("gold.price"),
      period: isAnnual ? t("gold.annualPeriod") : t("gold.period"),
      monthlyEquivalent: isAnnual ? t("gold.annualMonthly") : null,
      description: t("gold.description"),
      features: [
        { text: t("page.cvCreations", { count: formatLimit(planLimits?.gold?.cvLimit) }), included: true },
        { text: t("page.aiGenerations", { count: formatLimit(planLimits?.gold?.aiLimit) }), included: true },
        { text: t("page.downloads", { count: formatLimit(planLimits?.gold?.downloadLimit) }), included: true },
        { text: t("gold.features.templates"), included: true },
        { text: t("gold.features.noAds"), included: true },
        { text: t("page.atsOptimization"), included: true },
        { text: t("page.coverLetters", { count: formatLimit(planLimits?.gold?.coverLetterLimit) }), included: true },
      ],
      highlighted: false,
    },
    {
      key: "diamond" as PlanType,
      name: t("diamond.name"),
      price: isAnnual ? t("diamond.annualPrice") : t("diamond.price"),
      period: isAnnual ? t("diamond.annualPeriod") : t("diamond.period"),
      monthlyEquivalent: isAnnual ? t("diamond.annualMonthly") : null,
      description: t("diamond.description"),
      badge: t("mostPopular"),
      features: [
        { text: t("page.cvCreations", { count: formatLimit(planLimits?.diamond?.cvLimit) }), included: true },
        { text: t("page.aiGenerations", { count: formatLimit(planLimits?.diamond?.aiLimit) }), included: true },
        { text: t("page.downloads", { count: formatLimit(planLimits?.diamond?.downloadLimit) }), included: true },
        { text: t("diamond.features.templates"), included: true },
        { text: t("page.noAds"), included: true },
        { text: t("page.atsOptimization"), included: true },
        { text: t("page.coverLetters", { count: formatLimit(planLimits?.diamond?.coverLetterLimit) }), included: true },
        { text: t("diamond.features.support"), included: true },
      ],
      highlighted: true,
    },
    {
      key: "platinum" as PlanType,
      name: t("platinum.name"),
      price: isAnnual ? t("platinum.annualPrice") : t("platinum.price"),
      period: isAnnual ? t("platinum.annualPeriod") : t("platinum.period"),
      monthlyEquivalent: isAnnual ? t("platinum.annualMonthly") : null,
      description: t("platinum.description"),
      badge: t("bestValue"),
      features: [
        { text: t("page.cvCreations", { count: formatLimit(planLimits?.platinum?.cvLimit) }), included: true },
        { text: t("page.aiGenerations", { count: formatLimit(planLimits?.platinum?.aiLimit) }), included: true },
        { text: t("page.downloads", { count: formatLimit(planLimits?.platinum?.downloadLimit) }), included: true },
        { text: t("platinum.features.templates"), included: true },
        { text: t("page.noAds"), included: true },
        { text: t("page.atsOptimization"), included: true },
        { text: t("page.coverLetters", { count: formatLimit(planLimits?.platinum?.coverLetterLimit) }), included: true },
        { text: t("platinum.features.support"), included: true },
        { text: t("platinum.features.earlyAccess"), included: true },
      ],
      highlighted: false,
    },
  ];

  // Format limit for comparison table cells
  const fmtCell = (limit: number | undefined) => {
    if (limit === undefined) return '—';
    if (limit === -1) return t("comparison.unlimited");
    return t("comparison.perMonth", { count: limit });
  };

  const comparisonFeatures = [
    { feature: t("comparison.cvCreations"), starter: fmtCell(planLimits?.starter?.cvLimit), gold: fmtCell(planLimits?.gold?.cvLimit), diamond: fmtCell(planLimits?.diamond?.cvLimit), platinum: fmtCell(planLimits?.platinum?.cvLimit) },
    { feature: t("comparison.aiGenerations"), starter: fmtCell(planLimits?.starter?.aiLimit), gold: fmtCell(planLimits?.gold?.aiLimit), diamond: fmtCell(planLimits?.diamond?.aiLimit), platinum: fmtCell(planLimits?.platinum?.aiLimit) },
    { feature: t("comparison.downloads"), starter: fmtCell(planLimits?.starter?.downloadLimit), gold: fmtCell(planLimits?.gold?.downloadLimit), diamond: fmtCell(planLimits?.diamond?.downloadLimit), platinum: fmtCell(planLimits?.platinum?.downloadLimit) },
    { feature: t("page.coverLetterBuilder"), starter: fmtCell(planLimits?.starter?.coverLetterLimit), gold: fmtCell(planLimits?.gold?.coverLetterLimit), diamond: fmtCell(planLimits?.diamond?.coverLetterLimit), platinum: fmtCell(planLimits?.platinum?.coverLetterLimit) },
    { feature: t("page.formBuilder"), starter: "✓", gold: "✓", diamond: "✓", platinum: "✓" },
    { feature: t("comparison.adFree"), starter: "✓", gold: "✓", diamond: "✓", platinum: "✓" },
    { feature: t("page.atsOptimization"), starter: "✓", gold: "✓", diamond: "✓", platinum: "✓" },
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
          </div>
        </PricingAnimations.Hero>
      </section>

      {/* Billing Toggle */}
      <section className="pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-gray-900' : 'text-gray-400'}`}>
              {t("billingToggle.monthly")}
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                isAnnual ? 'bg-accent-green' : 'bg-gray-300'
              }`}
              aria-label="Toggle billing period"
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                  isAnnual ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-sm font-medium transition-colors ${isAnnual ? 'text-gray-900' : 'text-gray-400'}`}>
              {t("billingToggle.annual")}
            </span>
            <span className="bg-accent-green/10 text-accent-green text-xs font-semibold px-2.5 py-1 rounded-full">
              {t("billingToggle.savePercent")}
            </span>
          </div>
        </div>
      </section>

      {/* Checkout Error */}
      {checkoutError && (
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            <span>{checkoutError}</span>
            <button onClick={() => setCheckoutError(null)} className="ml-4 text-red-400 hover:text-red-600">&times;</button>
          </div>
        </div>
      )}

      {/* Pricing Cards - Staggered Animation */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-6">
          <PricingAnimations.PricingGrid className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.key;
              return (
              <PricingAnimations.PricingCard
                key={plan.name}
                highlighted={isSelected}
                onClick={() => setSelectedPlan(plan.key)}
                className={`rounded-2xl p-6 relative cursor-pointer ${
                  isSelected
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
                  {plan.monthlyEquivalent && (
                    <div className="text-accent-green text-sm font-medium mt-1">
                      {plan.monthlyEquivalent}
                    </div>
                  )}
                </div>
                <div className="mb-4 text-xs text-gray-500">{t("billedImmediately")}</div>
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
                <button
                  onClick={() => handleCheckout(plan.key)}
                  disabled={loadingPlan === plan.key}
                  className={`block w-full text-center py-3 rounded-lg font-semibold text-sm transition btn-lift disabled:opacity-50 disabled:cursor-not-allowed ${
                    isSelected
                      ? "bg-accent-green text-bg-primary hover:bg-accent-teal"
                      : "border border-gray-300 hover:bg-gray-100 text-gray-900"
                  }`}
                >
                  {loadingPlan === plan.key ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Loading...
                    </span>
                  ) : (
                    "Get Started"
                  )}
                </button>
              </PricingAnimations.PricingCard>
              );
            })}
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
