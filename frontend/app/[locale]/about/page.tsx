import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="text-accent-green font-medium text-sm uppercase tracking-wider">About Us</span>
          <h1 className="text-5xl font-bold mt-3 mb-6 text-white">
            Building the future of<br />
            <span className="gradient-text">career success</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Best AI Resume is on a mission to help job seekers worldwide create professional,
            ATS-optimized resumes that open doors to their dream careers.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent-green font-medium text-sm uppercase tracking-wider">Our Story</span>
              <h2 className="text-3xl font-bold mt-3 mb-6 text-white">
                Why we built Best AI Resume
              </h2>
              <p className="text-gray-400 mb-4 leading-relaxed">
                We noticed that talented professionals were being overlooked simply because their resumes
                didn&apos;t make it past automated screening systems. The traditional resume-building process
                was time-consuming, frustrating, and often produced documents that failed to showcase
                candidates&apos; true potential.
              </p>
              <p className="text-gray-400 mb-4 leading-relaxed">
                That&apos;s why we created Best AI Resume—a platform that combines the power of artificial
                intelligence with beautiful, professional design. Our goal is simple: help every job
                seeker present their best self to potential employers.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Today, we&apos;ve helped over 50,000 professionals land their dream jobs by creating
                resumes that stand out while passing ATS screening with flying colors.
              </p>
            </div>
            <div className="feature-card rounded-xl p-8">
              <div className="grid grid-cols-2 sm:gap-6 gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">50K+</div>
                  <p className="text-gray-400 text-sm">Resumes Created</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent-teal mb-2">98%</div>
                  <p className="text-gray-400 text-sm">ATS Pass Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent-purple mb-2">20+</div>
                  <p className="text-gray-400 text-sm">Templates</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent-pink mb-2">4.9</div>
                  <p className="text-gray-400 text-sm">User Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-accent-green font-medium text-sm uppercase tracking-wider">Our Values</span>
            <h2 className="text-3xl font-bold mt-3 text-white">
              What drives us forward
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="feature-card rounded-xl p-8">
              <div className="w-12 h-12 rounded-lg bg-accent-green/20 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-3 text-white">Privacy First</h3>
              <p className="text-gray-400 leading-relaxed">
                Your data belongs to you. We store your resume data locally in your browser,
                not on our servers. Only your account credentials are kept secure on our end.
              </p>
            </div>

            <div className="feature-card rounded-xl p-8">
              <div className="w-12 h-12 rounded-lg bg-accent-blue/20 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-3 text-white">Innovation</h3>
              <p className="text-gray-400 leading-relaxed">
                We leverage cutting-edge AI technology to help you write compelling content
                that highlights your achievements and gets you noticed by recruiters.
              </p>
            </div>

            <div className="feature-card rounded-xl p-8">
              <div className="w-12 h-12 rounded-lg bg-accent-purple/20 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-3 text-white">Accessibility</h3>
              <p className="text-gray-400 leading-relaxed">
                Professional resume tools shouldn&apos;t be locked behind expensive paywalls.
                We offer powerful features that everyone can access and afford.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="feature-card rounded-xl p-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-white">Our Commitment to You</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                At Best AI Resume, we believe that your career journey is personal. That&apos;s why we&apos;ve
                built a platform that respects your privacy while giving you powerful tools to succeed.
                Your resume data stays on your device, giving you complete control over your information.
              </p>
              <p className="text-gray-400 leading-relaxed">
                We&apos;re constantly improving our AI algorithms, adding new templates, and enhancing
                our features based on user feedback. Your success is our success, and we&apos;re
                committed to helping you every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Ready to join<br />
            <span className="gradient-text">50,000+ success stories?</span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Start building your professional resume today and take the first step toward your dream career.
          </p>
          <Link href="/auth/register" className="inline-flex items-center gap-2 bg-accent-green text-bg-primary px-8 py-4 rounded-xl font-semibold hover:bg-accent-teal transition">
            Get Started Free
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
