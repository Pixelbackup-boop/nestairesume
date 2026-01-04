import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - Choose Your Plan",
  description:
    "Simple, transparent pricing for ResumeAI. Start free, upgrade when you need more. Free tier, Starter ($3), Gold ($6/mo), Diamond ($10/mo).",
  keywords: ["resume builder pricing", "CV maker pricing", "AI resume cost", "free resume builder"],
};

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/forever",
      description: "Try before you buy",
      features: [
        { text: "5 downloads (watch ad)", included: true },
        { text: "3 saved resumes", included: true },
        { text: "15 basic templates", included: true },
        { text: "AI Quick Build", included: true },
        { text: "Form Builder", included: true },
        { text: "Canvas Editor", included: true },
        { text: "Contains ads", included: false },
        { text: "Premium templates", included: false },
      ],
      cta: "Get Started Free",
      href: "/create",
      highlighted: false,
    },
    {
      name: "Starter",
      price: "$3",
      period: " one-time",
      description: "Perfect for one-time use",
      features: [
        { text: "10 downloads", included: true },
        { text: "5 saved resumes", included: true },
        { text: "All 50+ templates", included: true },
        { text: "AI Quick Build", included: true },
        { text: "No ads", included: true },
        { text: "PDF & PNG export", included: true },
        { text: "ATS optimization", included: false },
        { text: "Priority support", included: false },
      ],
      cta: "Buy Starter",
      href: "/checkout?plan=starter",
      highlighted: false,
    },
    {
      name: "Gold",
      price: "$6",
      period: "/month",
      description: "For active job seekers",
      features: [
        { text: "50 downloads/month", included: true },
        { text: "20 saved resumes", included: true },
        { text: "All 50+ templates", included: true },
        { text: "No ads", included: true },
        { text: "ATS optimization", included: true },
        { text: "AI suggestions", included: true },
        { text: "Premium templates", included: false },
        { text: "Cover letter builder", included: false },
      ],
      cta: "Get Gold",
      href: "/checkout?plan=gold",
      highlighted: false,
    },
    {
      name: "Diamond",
      price: "$10",
      period: "/month",
      description: "Best value for power users",
      badge: "MOST POPULAR",
      features: [
        { text: "150 downloads/month", included: true },
        { text: "50 saved resumes", included: true },
        { text: "All + Premium templates", included: true },
        { text: "No ads", included: true },
        { text: "ATS optimization", included: true },
        { text: "Cover letter builder", included: true },
        { text: "Priority support", included: true },
        { text: "Early access features", included: true },
      ],
      cta: "Get Diamond",
      href: "/checkout?plan=diamond",
      highlighted: true,
    },
  ];

  const comparisonFeatures = [
    { feature: "Downloads", free: "5 (ads)", starter: "10", gold: "50/mo", diamond: "150/mo" },
    { feature: "Saved Resumes", free: "3", starter: "5", gold: "20", diamond: "50" },
    { feature: "Templates", free: "15 Basic", starter: "50+", gold: "50+", diamond: "50+ & Premium" },
    { feature: "AI Quick Build", free: "✓", starter: "✓", gold: "✓", diamond: "✓" },
    { feature: "Form Builder", free: "✓", starter: "✓", gold: "✓", diamond: "✓" },
    { feature: "Canvas Editor", free: "✓", starter: "✓", gold: "✓", diamond: "✓" },
    { feature: "Ad-Free", free: "✗", starter: "✓", gold: "✓", diamond: "✓" },
    { feature: "ATS Optimization", free: "✗", starter: "✗", gold: "✓", diamond: "✓" },
    { feature: "Cover Letter Builder", free: "✗", starter: "✗", gold: "✗", diamond: "✓" },
    { feature: "Priority Support", free: "✗", starter: "✗", gold: "✗", diamond: "✓" },
  ];

  const faqs = [
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express) via Stripe. PayPal coming soon.",
    },
    {
      question: "Is the Starter plan a one-time purchase?",
      answer: "Yes! The Starter plan is a one-time purchase of $3. You get 10 downloads that never expire.",
    },
    {
      question: "What happens when I run out of downloads?",
      answer: "You can purchase more downloads by upgrading your plan or buying another Starter pack. Free users can watch ads for additional downloads.",
    },
    {
      question: "Can I switch between plans?",
      answer: "Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee for subscriptions. One-time purchases are non-refundable but transferable.",
    },
  ];

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="text-accent-green font-medium text-sm uppercase tracking-wider">Pricing</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-3 mb-6 text-white">
            Simple, transparent<br />
            <span className="gradient-text">pricing</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Start for free, upgrade when you need more. No hidden fees, cancel anytime.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 relative ${
                  plan.highlighted
                    ? "pricing-highlight"
                    : "pricing-card"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 bg-accent-green text-bg-primary text-xs font-bold rounded-full whitespace-nowrap">
                      {plan.badge}
                    </span>
                  </div>
                )}
                <div className={`mb-5 ${plan.badge ? "mt-2" : ""}`}>
                  <h3 className="font-semibold text-xl mb-1 text-white">{plan.name}</h3>
                  <p className="text-gray-500 text-sm">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-500 text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className={`flex items-center gap-2 text-sm ${
                        feature.included ? "text-gray-300" : "text-gray-500"
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
                  className={`block w-full text-center py-3 rounded-lg font-semibold text-sm transition ${
                    plan.highlighted
                      ? "bg-accent-green text-bg-primary hover:bg-accent-teal"
                      : "border border-border-subtle hover:bg-bg-card-light text-white"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-8 text-white">Compare Plans</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">Feature</th>
                  <th className="text-center py-4 px-4 text-white font-semibold">Free</th>
                  <th className="text-center py-4 px-4 text-white font-semibold">Starter</th>
                  <th className="text-center py-4 px-4 text-white font-semibold">Gold</th>
                  <th className="text-center py-4 px-4 text-accent-green font-semibold">Diamond</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, idx) => (
                  <tr key={idx} className="border-b border-border-subtle">
                    <td className="py-4 px-4 text-gray-300">{row.feature}</td>
                    <td className={`text-center py-4 px-4 ${row.free === "✗" ? "text-gray-500" : "text-gray-300"}`}>
                      {row.free}
                    </td>
                    <td className={`text-center py-4 px-4 ${row.starter === "✗" ? "text-gray-500" : "text-gray-300"}`}>
                      {row.starter}
                    </td>
                    <td className={`text-center py-4 px-4 ${row.gold === "✗" ? "text-gray-500" : "text-gray-300"}`}>
                      {row.gold}
                    </td>
                    <td className={`text-center py-4 px-4 ${row.diamond === "✗" ? "text-gray-500" : "text-accent-green"}`}>
                      {row.diamond}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-bg-card/30">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-bg-card rounded-xl p-6 border border-border-subtle">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-gray-400 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to get started?</h2>
          <p className="text-gray-400 mb-8">Build your perfect resume in minutes. No credit card required.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 bg-accent-green text-bg-primary px-8 py-4 rounded-xl font-semibold hover:bg-accent-teal transition"
            >
              Start Building Free
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-2 border border-border-subtle px-6 py-4 rounded-xl font-medium hover:bg-bg-card-light transition text-white"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
