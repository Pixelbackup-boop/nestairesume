'use client';

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FeaturesAnimations } from "@/components/FeaturesAnimations";

export default function FeaturesPage() {
  return (
    <>
      <Header />

      {/* Hero - Animated */}
      <section className="pt-32 pb-16">
        <FeaturesAnimations.Hero>
          <div className="max-w-6xl mx-auto px-6 text-center">
            <span className="text-accent-green font-medium text-sm uppercase tracking-wider">Features</span>
            <h1 className="text-5xl font-bold mt-3 mb-6 text-white">
              Everything you need to<br />
              <span className="gradient-text">land your dream job</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Powerful AI tools combined with beautiful design to help you stand out from the crowd.
            </p>
          </div>
        </FeaturesAnimations.Hero>
      </section>

      {/* Main Features - Staggered Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <FeaturesAnimations.FeaturesGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <FeaturesAnimations.FeatureCard>
              <div className="feature-card rounded-xl p-8">
                <div className="w-12 h-12 rounded-lg bg-accent-purple/20 flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="font-semibold text-xl mb-3 text-white">AI-Powered Writing</h3>
                <p className="text-gray-400 leading-relaxed">Let our AI craft compelling bullet points and professional summaries that highlight your achievements. Transform basic job descriptions into impactful statements.</p>
              </div>
            </FeaturesAnimations.FeatureCard>

            {/* Feature 2 */}
            <FeaturesAnimations.FeatureCard>
              <div className="feature-card rounded-xl p-8">
                <div className="w-12 h-12 rounded-lg bg-accent-blue/20 flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
                </div>
                <h3 className="font-semibold text-xl mb-3 text-white">20+ Premium Templates</h3>
                <p className="text-gray-400 leading-relaxed">Choose from professionally designed templates that stand out while maintaining ATS compatibility. Each template is crafted by design experts.</p>
              </div>
            </FeaturesAnimations.FeatureCard>

            {/* Feature 3 */}
            <FeaturesAnimations.FeatureCard>
              <div className="feature-card rounded-xl p-8">
                <div className="w-12 h-12 rounded-lg bg-accent-green/20 flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="font-semibold text-xl mb-3 text-white">ATS Optimization</h3>
                <p className="text-gray-400 leading-relaxed">Real-time ATS scoring ensures your resume passes automated screening systems every time. Get instant feedback on how to improve your score.</p>
              </div>
            </FeaturesAnimations.FeatureCard>

            {/* Feature 4 */}
            <FeaturesAnimations.FeatureCard>
              <div className="feature-card rounded-xl p-8">
                <div className="w-12 h-12 rounded-lg bg-accent-pink/20 flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-accent-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </div>
                <h3 className="font-semibold text-xl mb-3 text-white">Real-time Preview</h3>
                <p className="text-gray-400 leading-relaxed">See changes instantly as you type. What you see is exactly what recruiters will see. No more guessing how your resume looks.</p>
              </div>
            </FeaturesAnimations.FeatureCard>

            {/* Feature 5 */}
            <FeaturesAnimations.FeatureCard>
              <div className="feature-card rounded-xl p-8">
                <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <h3 className="font-semibold text-xl mb-3 text-white">PDF Export</h3>
                <p className="text-gray-400 leading-relaxed">Download pixel-perfect PDFs ready to send. Optimized for both digital viewing and print. Your resume looks professional everywhere.</p>
              </div>
            </FeaturesAnimations.FeatureCard>

            {/* Feature 6 */}
            <FeaturesAnimations.FeatureCard>
              <div className="feature-card rounded-xl p-8">
                <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                </div>
                <h3 className="font-semibold text-xl mb-3 text-white">Smart Suggestions</h3>
                <p className="text-gray-400 leading-relaxed">Get intelligent recommendations for skills, keywords, and content based on your target role. AI analyzes thousands of successful resumes.</p>
              </div>
            </FeaturesAnimations.FeatureCard>
          </FeaturesAnimations.FeaturesGrid>
        </div>
      </section>

      {/* How It Works - Animated Steps */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <FeaturesAnimations.StepsHeader className="text-center mb-16">
            <span className="text-accent-green font-medium text-sm uppercase tracking-wider">How It Works</span>
            <h2 className="text-4xl font-bold mt-3 text-white">
              Three steps to your<br />
              <span className="gradient-text">perfect resume</span>
            </h2>
          </FeaturesAnimations.StepsHeader>

          <FeaturesAnimations.StepsGrid className="grid md:grid-cols-3 gap-8 relative">
            {/* Animated gradient line connecting steps */}
            <FeaturesAnimations.AnimatedLine />

            <FeaturesAnimations.Step className="text-center">
              <div className="step-circle w-40 h-40 mx-auto rounded-full flex items-center justify-center mb-6 relative">
                <span className="text-6xl font-bold gradient-text">01</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">Fill Your Details</h3>
              <p className="text-gray-400 text-sm">Enter your experience, education, and skills. Our AI assists you every step of the way.</p>
            </FeaturesAnimations.Step>

            <FeaturesAnimations.Step className="text-center">
              <div className="step-circle w-40 h-40 mx-auto rounded-full flex items-center justify-center mb-6 relative">
                <span className="text-6xl font-bold text-accent-teal">02</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">Choose Template</h3>
              <p className="text-gray-400 text-sm">Select from 20+ professionally designed templates. Preview in real-time as you customize.</p>
            </FeaturesAnimations.Step>

            <FeaturesAnimations.Step className="text-center">
              <div className="step-circle w-40 h-40 mx-auto rounded-full flex items-center justify-center mb-6 relative">
                <span className="text-6xl font-bold text-accent-purple">03</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">Download PDF</h3>
              <p className="text-gray-400 text-sm">Export your polished resume as a pixel-perfect PDF, ready to impress recruiters.</p>
            </FeaturesAnimations.Step>
          </FeaturesAnimations.StepsGrid>
        </div>
      </section>

      {/* CTA - Animated */}
      <section className="py-24">
        <FeaturesAnimations.CTA>
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Ready to build your<br />
              <span className="gradient-text">winning resume?</span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">Join 50,000+ professionals who&apos;ve already landed their dream jobs with Best AI Resume.</p>
            <Link href="/auth/register" className="inline-flex items-center gap-2 bg-accent-green text-bg-primary px-8 py-4 rounded-xl font-semibold hover:bg-accent-teal transition btn-lift">
              Start Building Free
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </FeaturesAnimations.CTA>
      </section>

      <Footer />
    </>
  );
}
