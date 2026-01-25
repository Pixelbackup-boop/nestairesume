import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="text-accent-green font-medium text-sm uppercase tracking-wider">Privacy Policy</span>
          <h1 className="text-5xl font-bold mt-3 mb-6 text-white">
            Your privacy is<br />
            <span className="gradient-text">our priority</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            At Best AI Resume, we believe your personal data belongs to you. We&apos;ve built
            our platform with a privacy-first approach that keeps your information under your control.
          </p>
        </div>
      </section>

      {/* Key Privacy Highlights */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="feature-card rounded-xl p-8 border-l-4 border-accent-green">
              <div className="w-12 h-12 rounded-lg bg-accent-green/20 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-3 text-white">Your Data Stays Local</h3>
              <p className="text-gray-400 leading-relaxed">
                All your resume content, work experience, education, and skills are stored
                locally in your browser&apos;s storage—never on our servers.
              </p>
            </div>

            <div className="feature-card rounded-xl p-8 border-l-4 border-accent-blue">
              <div className="w-12 h-12 rounded-lg bg-accent-blue/20 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-3 text-white">Minimal Server Data</h3>
              <p className="text-gray-400 leading-relaxed">
                We only store your email address and password on our servers for account
                authentication. Nothing else. No resume content, no personal details.
              </p>
            </div>

            <div className="feature-card rounded-xl p-8 border-l-4 border-accent-purple">
              <div className="w-12 h-12 rounded-lg bg-accent-purple/20 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-3 text-white">Full Transparency</h3>
              <p className="text-gray-400 leading-relaxed">
                We believe in complete transparency. You can see exactly what data is
                stored in your browser and delete it anytime you want.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Policy */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-12">

            {/* Section 1 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent-green/20 flex items-center justify-center text-accent-green text-sm font-bold">1</span>
                What Data We Collect
              </h2>
              <div className="feature-card rounded-xl p-6">
                <h3 className="font-semibold text-white mb-3">Data Stored on Our Servers (Minimal)</h3>
                <ul className="text-gray-400 space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Email address</strong> — Used for account authentication and important service updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Password (encrypted)</strong> — Securely hashed and stored for authentication</span>
                  </li>
                </ul>

                <h3 className="font-semibold text-white mb-3">Data Stored Locally in Your Browser</h3>
                <ul className="text-gray-400 space-y-2">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-blue mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Personal information (name, contact details, address)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-blue mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Work experience and employment history</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-blue mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Education and certifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-blue mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Skills, languages, and achievements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-blue mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Resume templates and customization preferences</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent-green/20 flex items-center justify-center text-accent-green text-sm font-bold">2</span>
                Why We Use Browser Storage
              </h2>
              <div className="feature-card rounded-xl p-6">
                <p className="text-gray-400 mb-4 leading-relaxed">
                  We chose browser storage (localStorage) as our primary data storage method for several important reasons:
                </p>
                <ul className="text-gray-400 space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-accent-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-accent-green text-xs font-bold">✓</span>
                    </span>
                    <span><strong className="text-white">Maximum Privacy</strong> — Your sensitive career information never leaves your device</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-accent-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-accent-green text-xs font-bold">✓</span>
                    </span>
                    <span><strong className="text-white">No Data Breaches</strong> — Since we don&apos;t store your resume data, it can&apos;t be compromised in a server breach</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-accent-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-accent-green text-xs font-bold">✓</span>
                    </span>
                    <span><strong className="text-white">Complete Control</strong> — You can view, export, or delete your data anytime through your browser settings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-accent-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-accent-green text-xs font-bold">✓</span>
                    </span>
                    <span><strong className="text-white">Fast Performance</strong> — Local storage means instant access to your data without server latency</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent-green/20 flex items-center justify-center text-accent-green text-sm font-bold">3</span>
                How We Protect Your Account
              </h2>
              <div className="feature-card rounded-xl p-6">
                <p className="text-gray-400 mb-4 leading-relaxed">
                  While we minimize server-side data, we take the security of your account credentials seriously:
                </p>
                <ul className="text-gray-400 space-y-2">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-purple mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Passwords are encrypted using industry-standard hashing algorithms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-purple mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>All data transmission is secured with HTTPS encryption</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-purple mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>We never store passwords in plain text</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-purple mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Regular security audits and monitoring</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent-green/20 flex items-center justify-center text-accent-green text-sm font-bold">4</span>
                Your Rights and Control
              </h2>
              <div className="feature-card rounded-xl p-6">
                <p className="text-gray-400 mb-4 leading-relaxed">
                  You have complete control over your data:
                </p>
                <ul className="text-gray-400 space-y-2">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Access</strong> — View all your browser-stored data anytime through your browser&apos;s developer tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Export</strong> — Download your resume data as PDF or other formats</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Delete</strong> — Clear your browser storage or delete your account at any time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Portability</strong> — Your data is yours to take anywhere</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent-green/20 flex items-center justify-center text-accent-green text-sm font-bold">5</span>
                What We Don&apos;t Do
              </h2>
              <div className="feature-card rounded-xl p-6">
                <p className="text-gray-400 mb-4 leading-relaxed">
                  We are committed to ethical data practices. Here&apos;s what we will never do:
                </p>
                <ul className="text-gray-400 space-y-2">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Sell your personal information to third parties</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Use your resume content for advertising purposes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Share your information with recruiters without your explicit consent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Track your browsing activity across other websites</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Store your resume content on our servers</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent-green/20 flex items-center justify-center text-accent-green text-sm font-bold">6</span>
                Cookies and Analytics
              </h2>
              <div className="feature-card rounded-xl p-6">
                <p className="text-gray-400 mb-4 leading-relaxed">
                  We use minimal, essential cookies for:
                </p>
                <ul className="text-gray-400 space-y-2">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-blue mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Keeping you logged into your account</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-blue mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Remembering your language and theme preferences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-blue mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Anonymous usage analytics to improve our service</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent-green/20 flex items-center justify-center text-accent-green text-sm font-bold">7</span>
                Contact Us
              </h2>
              <div className="feature-card rounded-xl p-6">
                <p className="text-gray-400 leading-relaxed">
                  If you have any questions about our privacy practices or want to exercise your data rights,
                  please contact us at{" "}
                  <a href="mailto:privacy@bestairesumes.com" className="text-accent-green hover:underline">
                    privacy@bestairesumes.com
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
            Build your resume with<br />
            <span className="gradient-text">confidence and privacy</span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Your career data stays with you. Start building your professional resume today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/auth/register" className="inline-flex items-center gap-2 bg-accent-green text-bg-primary px-8 py-4 rounded-xl font-semibold hover:bg-accent-teal transition">
              Get Started Free
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/about" className="inline-flex items-center gap-2 border border-gray-600 text-white px-8 py-4 rounded-xl font-semibold hover:border-accent-green transition">
              Learn About Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
