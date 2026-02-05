import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="text-accent-green font-medium text-sm uppercase tracking-wider">Terms & Conditions</span>
          <h1 className="text-5xl font-bold mt-3 mb-6 text-white">
            Simple, transparent<br />
            <span className="gradient-text">terms of service</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We believe in transparency and simplicity. Our terms are written in plain language
            so you know exactly what to expect when using Best AI Resume.
          </p>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="feature-card rounded-xl p-8 border-l-4 border-accent-green">
              <div className="w-12 h-12 rounded-lg bg-accent-green/20 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-3 text-white">No Hidden Fees</h3>
              <p className="text-gray-400 leading-relaxed">
                What you see is what you pay. Our pricing is straightforward with no surprise
                charges or hidden costs.
              </p>
            </div>

            <div className="feature-card rounded-xl p-8 border-l-4 border-accent-blue">
              <div className="w-12 h-12 rounded-lg bg-accent-blue/20 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-3 text-white">Your Data, Your Control</h3>
              <p className="text-gray-400 leading-relaxed">
                We only store your email and name for login purposes. Your resume content
                stays in your browser—never on our servers.
              </p>
            </div>

            <div className="feature-card rounded-xl p-8 border-l-4 border-accent-purple">
              <div className="w-12 h-12 rounded-lg bg-accent-purple/20 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-3 text-white">7-Day Free Trial</h3>
              <p className="text-gray-400 leading-relaxed">
                Try all premium features free for 7 days. No charge until trial ends,
                cancel anytime with no fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Terms */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-12">

            {/* Section 1 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent-green/20 flex items-center justify-center text-accent-green text-sm font-bold">1</span>
                Service Overview
              </h2>
              <div className="feature-card rounded-xl p-6">
                <p className="text-gray-400 mb-4 leading-relaxed">
                  Best AI Resume is an online resume builder that helps you create professional resumes using AI-powered tools. By using our service, you agree to these terms.
                </p>
                <ul className="text-gray-400 space-y-2">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Create unlimited resumes with our builder tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Access AI-powered content suggestions and improvements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Download your resumes in PDF format</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Choose from professionally designed templates</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent-green/20 flex items-center justify-center text-accent-green text-sm font-bold">2</span>
                Account & Data Transparency
              </h2>
              <div className="feature-card rounded-xl p-6">
                <h3 className="font-semibold text-white mb-3">What We Store on Our Servers</h3>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  We are committed to minimal data collection. We only store what&apos;s absolutely necessary for your account to function:
                </p>
                <ul className="text-gray-400 space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-blue mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Email address</strong> — For account login and important notifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-blue mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Name</strong> — To personalize your experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-blue mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Password (encrypted)</strong> — Securely hashed for authentication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-blue mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Subscription status</strong> — To manage your plan benefits</span>
                  </li>
                </ul>

                <h3 className="font-semibold text-white mb-3">What We Do NOT Store</h3>
                <ul className="text-gray-400 space-y-2">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Your resume content (stored locally in your browser)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Your work history or employment details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Your education or skills information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Your personal address or phone number</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent-green/20 flex items-center justify-center text-accent-green text-sm font-bold">3</span>
                Subscription & Payments
              </h2>
              <div className="feature-card rounded-xl p-6">
                <h3 className="font-semibold text-white mb-3">Monthly Subscription</h3>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  Our paid plans operate on a monthly subscription basis:
                </p>
                <ul className="text-gray-400 space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Billing cycle</strong> — You are billed monthly on the same date you subscribed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Auto-renewal</strong> — Subscriptions automatically renew unless cancelled</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Price transparency</strong> — The price shown at checkout is the price you pay (plus applicable taxes)</span>
                  </li>
                </ul>

                <h3 className="font-semibold text-white mb-3">Cancellation Policy</h3>
                <ul className="text-gray-400 space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-purple mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Cancel anytime from your account dashboard—no questions asked</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-purple mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Access continues until the end of your current billing period</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-purple mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No cancellation fees or penalties</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-purple mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Your local data remains intact after cancellation</span>
                  </li>
                </ul>

                <h3 className="font-semibold text-white mb-3">7-Day Free Trial</h3>
                <ul className="text-gray-400 space-y-2">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Full access</strong> — Try all premium features free for 7 days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>No charge during trial</strong> — You won&apos;t be billed until your trial ends</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Cancel anytime</strong> — Cancel before trial ends and pay nothing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Reminder email</strong> — We&apos;ll notify you before your trial ends</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent-green/20 flex items-center justify-center text-accent-green text-sm font-bold">4</span>
                Free Access &amp; Paid Plans
              </h2>
              <div className="feature-card rounded-xl p-6">
                <p className="text-gray-400 mb-4 leading-relaxed">
                  Before subscribing, you can:
                </p>
                <ul className="text-gray-400 space-y-2">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Browse and preview all templates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Create and save resumes to your account</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>View resume examples and career tips</span>
                  </li>
                </ul>
                <p className="text-gray-400 mt-4 leading-relaxed">
                  To download PDFs, use AI features, and access premium templates, a paid subscription is required. Our plans start at $3/month (Starter) with options up to Platinum for unlimited access.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent-green/20 flex items-center justify-center text-accent-green text-sm font-bold">5</span>
                User Responsibilities
              </h2>
              <div className="feature-card rounded-xl p-6">
                <p className="text-gray-400 mb-4 leading-relaxed">
                  By using our service, you agree to:
                </p>
                <ul className="text-gray-400 space-y-2">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-blue mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Provide accurate information in your account registration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-blue mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Keep your account credentials secure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-blue mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Use the service for lawful purposes only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-blue mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Not attempt to circumvent or abuse the service</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent-green/20 flex items-center justify-center text-accent-green text-sm font-bold">6</span>
                Intellectual Property
              </h2>
              <div className="feature-card rounded-xl p-6">
                <ul className="text-gray-400 space-y-2">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Your content</strong> — You retain full ownership of all content you create using our service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Our templates</strong> — Template designs are licensed to you for personal and professional use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>AI-generated content</strong> — Text generated by our AI becomes yours to use freely</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent-green/20 flex items-center justify-center text-accent-green text-sm font-bold">7</span>
                Service Availability
              </h2>
              <div className="feature-card rounded-xl p-6">
                <p className="text-gray-400 mb-4 leading-relaxed">
                  We strive to maintain high service availability, but:
                </p>
                <ul className="text-gray-400 space-y-2">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-purple mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Occasional maintenance may cause temporary interruptions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-purple mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>We will notify users of planned maintenance when possible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-purple mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Your local data remains accessible even when our servers are down</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent-green/20 flex items-center justify-center text-accent-green text-sm font-bold">8</span>
                Changes to Terms
              </h2>
              <div className="feature-card rounded-xl p-6">
                <p className="text-gray-400 leading-relaxed">
                  We may update these terms from time to time. We will notify you of significant changes via email or through our service. Continued use of the service after changes constitutes acceptance of the new terms.
                </p>
              </div>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent-green/20 flex items-center justify-center text-accent-green text-sm font-bold">9</span>
                Contact Us
              </h2>
              <div className="feature-card rounded-xl p-6">
                <p className="text-gray-400 leading-relaxed">
                  Questions about these terms? Contact us at{" "}
                  <a href="mailto:support@bestairesumes.com" className="text-accent-green hover:underline">
                    support@bestairesumes.com
                  </a>
                </p>
              </div>
            </div>

          </div>

          {/* Last Updated */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              Last updated: January 2026
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Ready to build your<br />
            <span className="gradient-text">professional resume?</span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Simple pricing, transparent terms, and your data stays yours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/auth/register" className="inline-flex items-center gap-2 bg-accent-green text-bg-primary px-8 py-4 rounded-xl font-semibold hover:bg-accent-teal transition">
              Get Started Free
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/pricing" className="inline-flex items-center gap-2 border border-gray-600 text-white px-8 py-4 rounded-xl font-semibold hover:border-accent-green transition">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
