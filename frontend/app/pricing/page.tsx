import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PricingPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="text-accent-green font-medium text-sm uppercase tracking-wider">Pricing</span>
          <h1 className="text-5xl font-bold mt-3 mb-6 text-white">
            Simple, transparent<br />
            <span className="gradient-text">pricing</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Start for free, upgrade when you need more. No hidden fees, cancel anytime.
          </p>
        </div>
      </section>

      {/* Pricing Toggle */}
      <section className="pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center items-center gap-4">
            <span className="text-white font-medium">Monthly</span>
            <button className="w-14 h-7 bg-bg-card-light rounded-full relative border border-border-subtle">
              <div className="w-5 h-5 bg-accent-green rounded-full absolute left-1 top-1"></div>
            </button>
            <span className="text-gray-400">Yearly <span className="text-accent-green text-sm">(Save 20%)</span></span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Free Plan */}
            <div className="pricing-card rounded-2xl p-8">
              <div className="mb-6">
                <h3 className="font-semibold text-xl mb-2 text-white">Free</h3>
                <p className="text-gray-500 text-sm">Perfect for getting started</p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-bold text-white">$0</span>
                <span className="text-gray-500">/forever</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 check-icon flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  3 resume downloads
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 check-icon flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  5 AI suggestions
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 check-icon flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  3 basic templates
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 check-icon flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  PDF export
                </li>
                <li className="flex items-center gap-3 text-gray-500">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  ATS score analysis
                </li>
                <li className="flex items-center gap-3 text-gray-500">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  Cover letter builder
                </li>
              </ul>
              <Link href="/auth/register" className="block w-full text-center py-3 rounded-lg border border-border-subtle hover:bg-bg-card-light transition font-medium text-white">
                Get Started
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="pricing-highlight rounded-2xl p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-green text-bg-primary px-4 py-1 rounded-full text-xs font-semibold">
                Most Popular
              </div>
              <div className="mb-6">
                <h3 className="font-semibold text-xl mb-2 text-white">Pro</h3>
                <p className="text-gray-500 text-sm">For active job seekers</p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-bold text-white">$9</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 check-icon flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Unlimited downloads
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 check-icon flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Unlimited AI suggestions
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 check-icon flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  All 20+ templates
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 check-icon flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  ATS score analysis
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 check-icon flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Cover letter builder
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 check-icon flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Priority support
                </li>
              </ul>
              <Link href="/auth/register" className="block w-full text-center py-3 rounded-lg bg-accent-green text-bg-primary font-semibold hover:bg-accent-teal transition">
                Start Pro Trial
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="pricing-card rounded-2xl p-8">
              <div className="mb-6">
                <h3 className="font-semibold text-xl mb-2 text-white">Enterprise</h3>
                <p className="text-gray-500 text-sm">For teams and recruiters</p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-bold text-white">$29</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 check-icon flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Everything in Pro
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 check-icon flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Team collaboration
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 check-icon flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Custom branding
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 check-icon flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  API access
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 check-icon flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Analytics dashboard
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 check-icon flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Dedicated support
                </li>
              </ul>
              <Link href="#" className="block w-full text-center py-3 rounded-lg border border-border-subtle hover:bg-bg-card-light transition font-medium text-white">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-bg-card rounded-xl p-6 border border-border-subtle">
              <h3 className="font-semibold text-white mb-2">Can I cancel my subscription anytime?</h3>
              <p className="text-gray-400 text-sm">Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.</p>
            </div>
            <div className="bg-bg-card rounded-xl p-6 border border-border-subtle">
              <h3 className="font-semibold text-white mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-400 text-sm">We accept all major credit cards (Visa, MasterCard, American Express) and PayPal.</p>
            </div>
            <div className="bg-bg-card rounded-xl p-6 border border-border-subtle">
              <h3 className="font-semibold text-white mb-2">Is there a free trial for Pro?</h3>
              <p className="text-gray-400 text-sm">Yes! You get a 7-day free trial of Pro features. No credit card required to start.</p>
            </div>
            <div className="bg-bg-card rounded-xl p-6 border border-border-subtle">
              <h3 className="font-semibold text-white mb-2">Can I switch between plans?</h3>
              <p className="text-gray-400 text-sm">Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div className="bg-bg-card rounded-xl p-6 border border-border-subtle">
              <h3 className="font-semibold text-white mb-2">Do you offer refunds?</h3>
              <p className="text-gray-400 text-sm">We offer a 30-day money-back guarantee. If you&apos;re not satisfied, contact us for a full refund.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Still have questions?</h2>
          <p className="text-gray-400 mb-8">Our team is here to help. Reach out anytime.</p>
          <Link href="#" className="inline-flex items-center gap-2 border border-border-subtle px-6 py-3 rounded-lg font-medium hover:bg-bg-card-light transition text-white">
            Contact Support
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
