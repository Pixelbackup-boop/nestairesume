import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
        <div className="hero-glow"></div>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-card border border-border-subtle text-xs mb-6">
                <span className="text-accent-green">✦</span>
                <span className="text-gray-400">AI-Powered Resume Building</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 text-white">
                Build Your<br />
                <span className="gradient-text">Perfect Resume</span><br />
                with AI
              </h1>

              <p className="text-gray-400 text-lg mb-8 max-w-md leading-relaxed">
                Create stunning, ATS-optimized resumes in minutes. Let AI craft compelling content while you focus on landing your dream job.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Link href="/auth/register" className="inline-flex items-center gap-2 bg-accent-green text-bg-primary px-6 py-3 rounded-lg font-semibold hover:bg-accent-teal transition">
                  Start Building
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <Link href="/builder" className="inline-flex items-center gap-2 bg-bg-card border border-border-subtle px-6 py-3 rounded-lg font-semibold hover:bg-bg-card-light transition text-white">
                  View Templates
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-accent-blue border-2 border-bg-primary"></div>
                  <div className="w-8 h-8 rounded-full bg-accent-pink border-2 border-bg-primary"></div>
                  <div className="w-8 h-8 rounded-full bg-accent-orange border-2 border-bg-primary"></div>
                  <div className="w-8 h-8 rounded-full bg-accent-green border-2 border-bg-primary"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400 text-sm">★★★★★</div>
                  <span className="text-gray-500 text-sm">Trusted by 50,000+ professionals</span>
                </div>
              </div>
            </div>

            {/* Right Content - Resume Preview */}
            <div className="relative">
              <div className="bg-bg-card rounded-2xl p-6 border border-border-subtle card-glow-green">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-lg font-bold text-white">JD</div>
                    <div>
                      <div className="h-3 bg-gray-600 rounded w-28 mb-2"></div>
                      <div className="h-2 bg-gray-700 rounded w-20"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-bg-card-light px-3 py-1.5 rounded-lg border border-border-subtle">
                    <svg className="w-4 h-4 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    <span className="text-xs text-gray-300">AI Suggestion</span>
                  </div>
                </div>

                {/* ATS Score */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-accent-green">94%</span>
                    <span className="text-gray-500 text-sm">ATS Score</span>
                  </div>
                  <div className="h-2 bg-bg-card-light rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-accent-green to-accent-teal rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-bg-card-light rounded-lg text-sm text-gray-300 border border-border-subtle">React</span>
                  <span className="px-3 py-1.5 bg-bg-card-light rounded-lg text-sm text-gray-300 border border-border-subtle">Node.js</span>
                  <span className="px-3 py-1.5 bg-bg-card-light rounded-lg text-sm text-gray-300 border border-border-subtle">Python</span>
                  <span className="px-3 py-1.5 bg-bg-card-light rounded-lg text-sm text-gray-300 border border-border-subtle">AWS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="flex flex-col items-center mt-16">
            <span className="text-gray-500 text-sm mb-2">Scroll to explore</span>
            <div className="scroll-line"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-accent-green font-medium text-sm uppercase tracking-wider">Features</span>
            <h2 className="text-4xl font-bold mt-3 mb-4 text-white">
              Everything you need to<br />
              <span className="gradient-text">land your dream job</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Powerful AI tools combined with beautiful design to help you stand out from the crowd.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Feature 1 */}
            <div className="feature-card rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-accent-purple/20 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">AI-Powered Writing</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Let our AI craft compelling bullet points and professional summaries that highlight your achievements.</p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-accent-blue/20 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">20+ Premium Templates</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Choose from professionally designed templates that stand out while maintaining ATS compatibility.</p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-accent-purple/20 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">ATS Optimization</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Real-time ATS scoring ensures your resume passes automated screening systems every time.</p>
            </div>

            {/* Feature 4 */}
            <div className="feature-card rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-accent-pink/20 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-accent-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">Real-time Preview</h3>
              <p className="text-gray-400 text-sm leading-relaxed">See changes instantly as you type. What you see is exactly what recruiters will see.</p>
            </div>

            {/* Feature 5 */}
            <div className="feature-card rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">PDF Export</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Download pixel-perfect PDFs ready to send. Optimized for both digital and print.</p>
            </div>

            {/* Feature 6 */}
            <div className="feature-card rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">Smart Suggestions</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Get intelligent recommendations for skills, keywords, and content based on your target role.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-accent-green font-medium text-sm uppercase tracking-wider">How It Works</span>
            <h2 className="text-4xl font-bold mt-3 text-white">
              Three steps to your<br />
              <span className="gradient-text">perfect resume</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-20 left-[20%] right-[20%] h-px bg-gradient-to-r from-accent-green via-accent-teal to-accent-purple"></div>

            {/* Step 1 */}
            <div className="text-center">
              <div className="step-circle w-40 h-40 mx-auto rounded-full flex items-center justify-center mb-6 relative">
                <span className="text-6xl font-bold gradient-text">01</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">Fill Your Details</h3>
              <p className="text-gray-400 text-sm">Enter your experience, education, and skills. Our AI assists you every step of the way.</p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="step-circle w-40 h-40 mx-auto rounded-full flex items-center justify-center mb-6 relative">
                <span className="text-6xl font-bold text-accent-teal">02</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">Choose Template</h3>
              <p className="text-gray-400 text-sm">Select from 20+ professionally designed templates. Preview in real-time as you customize.</p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="step-circle w-40 h-40 mx-auto rounded-full flex items-center justify-center mb-6 relative">
                <span className="text-6xl font-bold text-accent-purple">03</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">Download PDF</h3>
              <p className="text-gray-400 text-sm">Export your polished resume as a pixel-perfect PDF, ready to impress recruiters.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-accent-green font-medium text-sm uppercase tracking-wider">Templates</span>
              <h2 className="text-4xl font-bold mt-3 text-white">
                Premium templates for<br />
                <span className="gradient-text">every profession</span>
              </h2>
            </div>
            <Link href="#" className="mt-4 md:mt-0 inline-flex items-center gap-2 text-white hover:text-accent-green transition text-sm font-medium">
              View All Templates
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Template 1 */}
            <div className="template-card cursor-pointer">
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-b from-slate-700 to-slate-900 border border-border-subtle mb-3">
                <div className="h-full p-3">
                  <div className="h-full bg-slate-800/50 rounded-lg border border-slate-600/30"></div>
                </div>
              </div>
              <h4 className="font-medium text-sm text-white">Executive</h4>
              <p className="text-xs text-gray-500">Classic • Navy</p>
            </div>

            {/* Template 2 */}
            <div className="template-card cursor-pointer">
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-b from-teal-600 to-teal-900 border border-border-subtle mb-3">
                <div className="h-full flex">
                  <div className="w-1/3 bg-teal-500/30"></div>
                  <div className="flex-1"></div>
                </div>
              </div>
              <h4 className="font-medium text-sm text-white">Modern</h4>
              <p className="text-xs text-gray-500">Sidebar • Teal</p>
            </div>

            {/* Template 3 */}
            <div className="template-card cursor-pointer">
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-b from-purple-600 to-purple-900 border border-border-subtle mb-3">
                <div className="h-full">
                  <div className="h-12 bg-purple-500/50"></div>
                </div>
              </div>
              <h4 className="font-medium text-sm text-white">Creative</h4>
              <p className="text-xs text-gray-500">Header • Purple</p>
            </div>

            {/* Template 4 */}
            <div className="template-card cursor-pointer">
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-b from-gray-700 to-gray-900 border border-border-subtle mb-3">
                <div className="h-full p-4 space-y-2">
                  <div className="h-2 bg-gray-600 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-700 rounded w-1/2"></div>
                  <div className="h-2 bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
              <h4 className="font-medium text-sm text-white">Minimal</h4>
              <p className="text-xs text-gray-500">Clean • Dark</p>
            </div>

            {/* Template 5 */}
            <div className="template-card cursor-pointer">
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-b from-amber-700 to-amber-900 border border-border-subtle mb-3">
                <div className="h-full p-3">
                  <div className="h-full border-2 border-amber-500/30 rounded-lg"></div>
                </div>
              </div>
              <h4 className="font-medium text-sm text-white">Professional</h4>
              <p className="text-xs text-gray-500">Traditional</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-accent-green font-medium text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-4xl font-bold mt-3 text-white">
              Loved by professionals<br />
              <span className="gradient-text">worldwide</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="testimonial-card rounded-xl p-6">
              <div className="flex text-yellow-400 text-sm mb-4">★★★★★</div>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">&quot;ResumeAI helped me land interviews at 5 FAANG companies. The AI suggestions transformed my bullet points from basic descriptions to impactful achievements.&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xs font-semibold text-white">SC</div>
                <div>
                  <div className="font-medium text-sm text-white">Sarah Chen</div>
                  <div className="text-xs text-gray-500">Software Engineer at Google</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="testimonial-card rounded-xl p-6">
              <div className="flex text-yellow-400 text-sm mb-4">★★★★★</div>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">&quot;The ATS optimization feature is a game-changer. I went from getting ghosted to receiving callbacks within days of updating my resume.&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-xs font-semibold text-white">MJ</div>
                <div>
                  <div className="font-medium text-sm text-white">Marcus Johnson</div>
                  <div className="text-xs text-gray-500">Product Manager at Stripe</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="testimonial-card rounded-xl p-6">
              <div className="flex text-yellow-400 text-sm mb-4">★★★★★</div>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">&quot;Beautiful templates that actually work. I&apos;ve recommended ResumeAI to everyone in my design community. It&apos;s simply the best.&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-xs font-semibold text-white">ER</div>
                <div>
                  <div className="font-medium text-sm text-white">Emily Rodriguez</div>
                  <div className="text-xs text-gray-500">UX Designer at Figma</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-accent-green font-medium text-sm uppercase tracking-wider">Pricing</span>
            <h2 className="text-4xl font-bold mt-3 text-white">
              Simple, transparent<br />
              <span className="gradient-text">pricing</span>
            </h2>
            <p className="text-gray-400 mt-4">Start for free, upgrade when you need more. No hidden fees.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="pricing-card rounded-2xl p-6">
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-1 text-white">Free</h3>
                <p className="text-gray-500 text-sm">Perfect for getting started</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-gray-500">/forever</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <svg className="w-4 h-4 check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  3 resume downloads
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <svg className="w-4 h-4 check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  5 AI suggestions
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <svg className="w-4 h-4 check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  3 basic templates
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <svg className="w-4 h-4 check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  PDF export
                </li>
              </ul>
              <Link href="#" className="block w-full text-center py-3 rounded-lg border border-border-subtle hover:bg-bg-card-light transition font-medium text-sm text-white">
                Get Started
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="pricing-highlight rounded-2xl p-6 relative">
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-1 text-white">Pro</h3>
                <p className="text-gray-500 text-sm">For active job seekers</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$9</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <svg className="w-4 h-4 check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Unlimited downloads
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <svg className="w-4 h-4 check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Unlimited AI suggestions
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <svg className="w-4 h-4 check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  All 20+ templates
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <svg className="w-4 h-4 check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  ATS score analysis
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <svg className="w-4 h-4 check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Cover letter builder
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <svg className="w-4 h-4 check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Priority support
                </li>
              </ul>
              <Link href="#" className="block w-full text-center py-3 rounded-lg bg-accent-green text-bg-primary font-semibold text-sm hover:bg-accent-teal transition">
                Start Pro Trial
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="pricing-card rounded-2xl p-6">
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-1 text-white">Enterprise</h3>
                <p className="text-gray-500 text-sm">For teams and recruiters</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$29</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <svg className="w-4 h-4 check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Everything in Pro
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <svg className="w-4 h-4 check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Team collaboration
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <svg className="w-4 h-4 check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Custom branding
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <svg className="w-4 h-4 check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  API access
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <svg className="w-4 h-4 check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Analytics dashboard
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <svg className="w-4 h-4 check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Dedicated support
                </li>
              </ul>
              <Link href="#" className="block w-full text-center py-3 rounded-lg border border-border-subtle hover:bg-bg-card-light transition font-medium text-sm text-white">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Ready to build your<br />
              <span className="gradient-text">winning resume?</span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">Join 50,000+ professionals who&apos;ve already landed their dream jobs with ResumeAI.</p>
            <Link href="#" className="inline-flex items-center gap-2 bg-accent-green text-bg-primary px-8 py-4 rounded-xl font-semibold hover:bg-accent-teal transition">
              Start Building Free
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
