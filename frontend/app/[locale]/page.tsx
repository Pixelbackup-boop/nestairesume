"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReturningUserBanner from "@/components/ReturningUserBanner";
import HeroResumeAnimation from "@/components/HeroResumeAnimation";
import { HomeAnimations } from "@/components/HomeAnimations";

export default function Home() {
  const t = useTranslations("Home");
  const tCommon = useTranslations("Common");
  const tPricing = useTranslations("Pricing");
  const locale = useLocale();

  const localizedHref = (path: string) => `/${locale}${path}`;

  return (
    <>
      <Header />
      <ReturningUserBanner />

      {/* Hero Section - Teal Gradient with Animated Blobs */}
      <section className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-teal-gradient">
        {/* Animated Blobs */}
        <div className="blob w-96 h-96 bg-white/10 top-20 -left-20" style={{ animationDelay: '0s' }} />
        <div className="blob w-80 h-80 bg-white/5 top-40 right-10" style={{ animationDelay: '-5s' }} />
        <div className="blob w-64 h-64 bg-teal-secondary/20 bottom-40 left-1/4" style={{ animationDelay: '-10s' }} />

        {/* Cloud Shapes */}
        <div className="absolute top-20 right-20 w-32 h-16 bg-white/10 rounded-full blur-xl animate-cloud" />
        <div className="absolute top-40 left-20 w-24 h-12 bg-white/10 rounded-full blur-lg animate-cloud" style={{ animationDelay: '-3s' }} />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <HomeAnimations.HeroSubtitle>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm mb-6">
                  <span className="text-white">✦</span>
                  <span className="text-white/90">{t("hero.badge")}</span>
                </div>
              </HomeAnimations.HeroSubtitle>

              <HomeAnimations.HeroTitle>
                <h1 className="text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 text-white">
                  {t("hero.title")}<br />
                  <span className="text-white">{t("hero.titleHighlight")}</span><br />
                  <span className="text-3xl lg:text-4xl text-white/80 font-medium">{t("hero.subtitle")}</span>
                </h1>

                <p className="text-white/80 text-lg mb-8 max-w-md leading-relaxed">
                  {t("hero.description")}
                </p>
              </HomeAnimations.HeroTitle>

              <HomeAnimations.HeroCTA>
                <div className="flex flex-wrap gap-3 mb-4">
                  <Link
                    href={localizedHref("/onboarding")}
                    className="inline-flex items-center gap-2 bg-accent-orange text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition shadow-lg shadow-orange-500/30"
                  >
                    {t("hero.ctaPrimary")}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </Link>
                  <Link
                    href={localizedHref("/templates")}
                    className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition text-white"
                  >
                    {t("hero.ctaSecondary")}
                  </Link>
                </div>

                <p className="text-sm text-white/70 mb-8">
                  <span className="text-white">✓</span> {t("hero.noCreditCard")} &nbsp;•&nbsp; <span className="text-white">✓</span> {t("hero.noSignup")}
                </p>

                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-pink-400 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-green-400 border-2 border-white"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-300 text-sm">★★★★★</div>
                    <span className="text-white/70 text-sm">{t("hero.trustedBy")}</span>
                  </div>
                </div>
              </HomeAnimations.HeroCTA>
            </div>

            {/* Right Content - AI Writing Animation */}
            <div className="relative flex justify-center lg:justify-end">
              <HeroResumeAnimation />
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="flex flex-col items-center mt-16">
            <span className="text-white/70 text-sm mb-2">{tCommon("scrollToExplore")}</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
          </div>
        </div>

        {/* Wave Divider - Single Simple Wave */}
        <div className="wave-divider bottom">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-20 md:h-24">
            <path fill="#ffffff" d="M0,80 C480,95 960,5 1440,60 L1440,100 L0,100 Z" />
          </svg>
        </div>
      </section>

      {/* Features Section - White Background */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-teal-primary font-medium text-sm uppercase tracking-wider">{t("features.sectionTitle")}</span>
            <h2 className="text-4xl font-bold mt-3 mb-4 text-dark-teal">
              {t("features.title")}<br />
              <span className="text-teal-primary">{t("features.titleHighlight")}</span>
            </h2>
            <p className="text-dark-teal/70 max-w-xl mx-auto">
              {t("features.subtitle")}
            </p>
          </div>

          <HomeAnimations.FeaturesGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <HomeAnimations.FeatureCard className="feature-card-light rounded-2xl p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-primary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-dark-teal">{t("features.aiWriting.title")}</h3>
              <p className="text-dark-teal/70 text-sm leading-relaxed mb-4">{t("features.aiWriting.description")}</p>
              <Link href={localizedHref("/features")} className="text-accent-orange text-sm font-medium hover:underline">
                Learn More →
              </Link>
            </HomeAnimations.FeatureCard>

            {/* Feature 2 */}
            <HomeAnimations.FeatureCard className="feature-card-light rounded-2xl p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-primary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-dark-teal">{t("features.templates.title")}</h3>
              <p className="text-dark-teal/70 text-sm leading-relaxed mb-4">{t("features.templates.description")}</p>
              <Link href={localizedHref("/templates")} className="text-accent-orange text-sm font-medium hover:underline">
                Learn More →
              </Link>
            </HomeAnimations.FeatureCard>

            {/* Feature 3 */}
            <HomeAnimations.FeatureCard className="feature-card-light rounded-2xl p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-primary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-dark-teal">{t("features.atsOptimization.title")}</h3>
              <p className="text-dark-teal/70 text-sm leading-relaxed mb-4">{t("features.atsOptimization.description")}</p>
              <Link href={localizedHref("/features")} className="text-accent-orange text-sm font-medium hover:underline">
                Learn More →
              </Link>
            </HomeAnimations.FeatureCard>

            {/* Feature 4 */}
            <HomeAnimations.FeatureCard className="feature-card-light rounded-2xl p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-primary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-dark-teal">{t("features.realTimePreview.title")}</h3>
              <p className="text-dark-teal/70 text-sm leading-relaxed mb-4">{t("features.realTimePreview.description")}</p>
              <Link href={localizedHref("/features")} className="text-accent-orange text-sm font-medium hover:underline">
                Learn More →
              </Link>
            </HomeAnimations.FeatureCard>

            {/* Feature 5 */}
            <HomeAnimations.FeatureCard className="feature-card-light rounded-2xl p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-primary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-dark-teal">{t("features.pdfExport.title")}</h3>
              <p className="text-dark-teal/70 text-sm leading-relaxed mb-4">{t("features.pdfExport.description")}</p>
              <Link href={localizedHref("/features")} className="text-accent-orange text-sm font-medium hover:underline">
                Learn More →
              </Link>
            </HomeAnimations.FeatureCard>

            {/* Feature 6 */}
            <HomeAnimations.FeatureCard className="feature-card-light rounded-2xl p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-primary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-dark-teal">{t("features.smartSuggestions.title")}</h3>
              <p className="text-dark-teal/70 text-sm leading-relaxed mb-4">{t("features.smartSuggestions.description")}</p>
              <Link href={localizedHref("/features")} className="text-accent-orange text-sm font-medium hover:underline">
                Learn More →
              </Link>
            </HomeAnimations.FeatureCard>
          </HomeAnimations.FeaturesGrid>
        </div>
      </section>

      {/* How It Works Section - Light Teal Background */}
      <section className="py-24 bg-light-teal relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-teal-primary font-medium text-sm uppercase tracking-wider">{t("howItWorks.sectionTitle")}</span>
            <h2 className="text-4xl font-bold mt-3 text-dark-teal">
              {t("howItWorks.title")}<br />
              <span className="text-teal-primary">{t("howItWorks.titleHighlight")}</span>
            </h2>
          </div>

          <HomeAnimations.StepsGrid className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-20 left-[20%] right-[20%] h-px bg-gradient-to-r from-teal-primary via-teal-secondary to-accent-orange"></div>

            {/* Step 1 */}
            <HomeAnimations.Step className="text-center">
              <div className="w-40 h-40 mx-auto rounded-full bg-white shadow-lg flex items-center justify-center mb-6 relative">
                <span className="text-6xl font-bold text-teal-primary">01</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-dark-teal">{t("howItWorks.step1.title")}</h3>
              <p className="text-dark-teal/70 text-sm">{t("howItWorks.step1.description")}</p>
            </HomeAnimations.Step>

            {/* Step 2 */}
            <HomeAnimations.Step className="text-center">
              <div className="w-40 h-40 mx-auto rounded-full bg-white shadow-lg flex items-center justify-center mb-6 relative">
                <span className="text-6xl font-bold text-teal-secondary">02</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-dark-teal">{t("howItWorks.step2.title")}</h3>
              <p className="text-dark-teal/70 text-sm">{t("howItWorks.step2.description")}</p>
            </HomeAnimations.Step>

            {/* Step 3 */}
            <HomeAnimations.Step className="text-center">
              <div className="w-40 h-40 mx-auto rounded-full bg-white shadow-lg flex items-center justify-center mb-6 relative">
                <span className="text-6xl font-bold text-accent-orange">03</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-dark-teal">{t("howItWorks.step3.title")}</h3>
              <p className="text-dark-teal/70 text-sm">{t("howItWorks.step3.description")}</p>
            </HomeAnimations.Step>
          </HomeAnimations.StepsGrid>
        </div>
      </section>

      {/* Templates Section - White Background */}
      <section id="templates" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-teal-primary font-medium text-sm uppercase tracking-wider">{t("templates.sectionTitle")}</span>
              <h2 className="text-4xl font-bold mt-3 text-dark-teal">
                {t("templates.title")}<br />
                <span className="text-teal-primary">{t("templates.titleHighlight")}</span>
              </h2>
            </div>
            <Link href={localizedHref("/templates")} className="mt-4 md:mt-0 inline-flex items-center gap-2 text-accent-orange hover:text-orange-600 transition text-sm font-medium">
              {t("templates.viewAll")}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Template 1 */}
            <div className="group cursor-pointer">
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-b from-slate-600 to-slate-800 border border-gray-200 mb-3 shadow-md group-hover:shadow-xl transition-shadow">
                <div className="h-full p-3">
                  <div className="h-full bg-white/10 rounded-lg border border-white/20"></div>
                </div>
              </div>
              <h4 className="font-medium text-sm text-dark-teal">Executive</h4>
              <p className="text-xs text-dark-teal/60">Classic • Navy</p>
            </div>

            {/* Template 2 */}
            <div className="group cursor-pointer">
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-b from-teal-500 to-teal-700 border border-gray-200 mb-3 shadow-md group-hover:shadow-xl transition-shadow">
                <div className="h-full flex">
                  <div className="w-1/3 bg-white/20"></div>
                  <div className="flex-1"></div>
                </div>
              </div>
              <h4 className="font-medium text-sm text-dark-teal">Modern</h4>
              <p className="text-xs text-dark-teal/60">Sidebar • Teal</p>
            </div>

            {/* Template 3 */}
            <div className="group cursor-pointer">
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-b from-purple-500 to-purple-700 border border-gray-200 mb-3 shadow-md group-hover:shadow-xl transition-shadow">
                <div className="h-full">
                  <div className="h-12 bg-white/30"></div>
                </div>
              </div>
              <h4 className="font-medium text-sm text-dark-teal">Creative</h4>
              <p className="text-xs text-dark-teal/60">Header • Purple</p>
            </div>

            {/* Template 4 */}
            <div className="group cursor-pointer">
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200 border border-gray-200 mb-3 shadow-md group-hover:shadow-xl transition-shadow">
                <div className="h-full p-4 space-y-2">
                  <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-2 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
              <h4 className="font-medium text-sm text-dark-teal">Minimal</h4>
              <p className="text-xs text-dark-teal/60">Clean • Light</p>
            </div>

            {/* Template 5 */}
            <div className="group cursor-pointer">
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-b from-amber-500 to-amber-700 border border-gray-200 mb-3 shadow-md group-hover:shadow-xl transition-shadow">
                <div className="h-full p-3">
                  <div className="h-full border-2 border-white/30 rounded-lg"></div>
                </div>
              </div>
              <h4 className="font-medium text-sm text-dark-teal">Professional</h4>
              <p className="text-xs text-dark-teal/60">Traditional</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Teal Gradient */}
      <section className="py-24 bg-teal-gradient relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="blob w-64 h-64 bg-white/5 top-10 -left-20" style={{ animationDelay: '-3s' }} />
        <div className="blob w-48 h-48 bg-white/5 bottom-10 right-10" style={{ animationDelay: '-7s' }} />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-white/80 font-medium text-sm uppercase tracking-wider">{t("testimonials.sectionTitle")}</span>
            <h2 className="text-4xl font-bold mt-3 text-white">
              {t("testimonials.title")}<br />
              <span className="text-white/90">{t("testimonials.titleHighlight")}</span>
            </h2>
          </div>

          <HomeAnimations.TestimonialsGrid className="grid md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <HomeAnimations.Testimonial className="bg-white rounded-2xl p-6 shadow-xl">
              <div className="flex text-yellow-400 text-sm mb-4">★★★★★</div>
              <p className="text-dark-teal/80 text-sm mb-6 leading-relaxed">&quot;Best AI Resume helped me land interviews at 5 FAANG companies. The AI suggestions transformed my bullet points from basic descriptions to impactful achievements.&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-xs font-semibold text-white">SC</div>
                <div>
                  <div className="font-medium text-sm text-dark-teal">Sarah Chen</div>
                  <div className="text-xs text-dark-teal/60">Software Engineer at Google</div>
                </div>
              </div>
            </HomeAnimations.Testimonial>

            {/* Testimonial 2 */}
            <HomeAnimations.Testimonial className="bg-white rounded-2xl p-6 shadow-xl">
              <div className="flex text-yellow-400 text-sm mb-4">★★★★★</div>
              <p className="text-dark-teal/80 text-sm mb-6 leading-relaxed">&quot;The ATS optimization feature is a game-changer. I went from getting ghosted to receiving callbacks within days of updating my resume.&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-teal-400 flex items-center justify-center text-xs font-semibold text-white">MJ</div>
                <div>
                  <div className="font-medium text-sm text-dark-teal">Marcus Johnson</div>
                  <div className="text-xs text-dark-teal/60">Product Manager at Stripe</div>
                </div>
              </div>
            </HomeAnimations.Testimonial>

            {/* Testimonial 3 */}
            <HomeAnimations.Testimonial className="bg-white rounded-2xl p-6 shadow-xl">
              <div className="flex text-yellow-400 text-sm mb-4">★★★★★</div>
              <p className="text-dark-teal/80 text-sm mb-6 leading-relaxed">&quot;Beautiful templates that actually work. I&apos;ve recommended Best AI Resume to everyone in my design community. It&apos;s simply the best.&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-xs font-semibold text-white">ER</div>
                <div>
                  <div className="font-medium text-sm text-dark-teal">Emily Rodriguez</div>
                  <div className="text-xs text-dark-teal/60">UX Designer at Figma</div>
                </div>
              </div>
            </HomeAnimations.Testimonial>
          </HomeAnimations.TestimonialsGrid>
        </div>

        {/* Wave Divider - Single Simple Wave */}
        <div className="wave-divider bottom">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-20 md:h-24">
            <path fill="#ffffff" d="M0,70 C480,90 960,10 1440,50 L1440,100 L0,100 Z" />
          </svg>
        </div>
      </section>

      {/* Pricing Section - White Background */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-teal-primary font-medium text-sm uppercase tracking-wider">{tPricing("sectionTitle")}</span>
            <h2 className="text-4xl font-bold mt-3 text-dark-teal">
              {tPricing("title")}<br />
              <span className="text-teal-primary">{tPricing("titleHighlight")}</span>
            </h2>
            <p className="text-dark-teal/70 mt-4">{tPricing("subtitle")}</p>
            <div className="mt-4 inline-flex items-center gap-2 bg-teal-primary/10 px-4 py-2 rounded-full">
              <svg className="w-5 h-5 text-teal-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-teal-primary font-medium text-sm">{tPricing("trialBadge")} on Gold & Diamond • {tPricing("cancelAnytime")}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-5">
                <h3 className="font-semibold text-lg mb-1 text-dark-teal">{tPricing("starter.name")}</h3>
                <p className="text-dark-teal/60 text-xs">{tPricing("starter.description")}</p>
              </div>
              <div className="mb-5">
                <span className="text-3xl font-bold text-dark-teal">{tPricing("starter.price")}</span>
                <span className="text-dark-teal/60 text-sm">{tPricing("starter.period")}</span>
              </div>
              <ul className="space-y-2.5 mb-6 text-sm">
                <li className="flex items-center gap-2 text-dark-teal/80">
                  <svg className="w-4 h-4 text-teal-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {tPricing("starter.features.cvCreations")}
                </li>
                <li className="flex items-center gap-2 text-dark-teal/80">
                  <svg className="w-4 h-4 text-teal-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {tPricing("starter.features.aiGenerations")}
                </li>
                <li className="flex items-center gap-2 text-dark-teal/80">
                  <svg className="w-4 h-4 text-teal-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {tPricing("starter.features.templates")}
                </li>
                <li className="flex items-center gap-2 text-dark-teal/80">
                  <svg className="w-4 h-4 text-teal-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {tPricing("starter.features.noAds")}
                </li>
              </ul>
              <Link href={localizedHref("/checkout?plan=starter")} className="block w-full text-center py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition font-medium text-sm text-dark-teal">
                {tPricing("starter.cta")}
              </Link>
            </div>

            {/* Gold Plan */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-5">
                <h3 className="font-semibold text-lg mb-1 text-dark-teal">{tPricing("gold.name")}</h3>
                <p className="text-dark-teal/60 text-xs">{tPricing("gold.description")}</p>
              </div>
              <div className="mb-3">
                <span className="text-3xl font-bold text-dark-teal">{tPricing("gold.price")}</span>
                <span className="text-dark-teal/60 text-sm">{tPricing("gold.period")}</span>
              </div>
              <div className="mb-4 inline-flex items-center gap-1.5 bg-teal-primary/10 text-teal-primary text-xs font-medium px-2.5 py-1 rounded-full">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {tPricing("trialBadge")}
              </div>
              <ul className="space-y-2.5 mb-6 text-sm">
                <li className="flex items-center gap-2 text-dark-teal/80">
                  <svg className="w-4 h-4 text-teal-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {tPricing("gold.features.cvCreations")}
                </li>
                <li className="flex items-center gap-2 text-dark-teal/80">
                  <svg className="w-4 h-4 text-teal-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {tPricing("gold.features.aiGenerations")}
                </li>
                <li className="flex items-center gap-2 text-dark-teal/80">
                  <svg className="w-4 h-4 text-teal-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {tPricing("gold.features.templates")}
                </li>
                <li className="flex items-center gap-2 text-dark-teal/80">
                  <svg className="w-4 h-4 text-teal-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {tPricing("gold.features.ats")}
                </li>
              </ul>
              <Link href={localizedHref("/checkout?plan=gold")} className="block w-full text-center py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition font-medium text-sm text-dark-teal">
                {tPricing("gold.cta")}
              </Link>
            </div>

            {/* Diamond Plan - Highlighted */}
            <div className="bg-gradient-to-b from-teal-primary to-teal-secondary rounded-2xl p-5 relative shadow-xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-1 bg-accent-orange text-white text-xs font-bold rounded-full shadow-lg">
                  {tPricing("mostPopular")}
                </span>
              </div>
              <div className="mb-5 mt-2">
                <h3 className="font-semibold text-lg mb-1 text-white">{tPricing("diamond.name")}</h3>
                <p className="text-white/70 text-xs">{tPricing("diamond.description")}</p>
              </div>
              <div className="mb-3">
                <span className="text-3xl font-bold text-white">{tPricing("diamond.price")}</span>
                <span className="text-white/70 text-sm">{tPricing("diamond.period")}</span>
              </div>
              <div className="mb-4 inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {tPricing("trialBadge")}
              </div>
              <ul className="space-y-2.5 mb-6 text-sm">
                <li className="flex items-center gap-2 text-white/90">
                  <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {tPricing("diamond.features.cvCreations")}
                </li>
                <li className="flex items-center gap-2 text-white/90">
                  <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {tPricing("diamond.features.aiGenerations")}
                </li>
                <li className="flex items-center gap-2 text-white/90">
                  <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {tPricing("diamond.features.coverLetter")}
                </li>
                <li className="flex items-center gap-2 text-white/90">
                  <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {tPricing("diamond.features.support")}
                </li>
              </ul>
              <Link href={localizedHref("/checkout?plan=diamond")} className="block w-full text-center py-2.5 rounded-lg bg-white text-teal-primary font-semibold text-sm hover:bg-gray-50 transition">
                {tPricing("diamond.cta")}
              </Link>
            </div>

            {/* Platinum Plan */}
            <div className="bg-white rounded-2xl p-5 border border-amber-300 shadow-md hover:shadow-lg transition-shadow relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full shadow-lg">
                  {tPricing("bestValue")}
                </span>
              </div>
              <div className="mb-5 mt-2">
                <h3 className="font-semibold text-lg mb-1 text-dark-teal">{tPricing("platinum.name")}</h3>
                <p className="text-dark-teal/60 text-xs">{tPricing("platinum.description")}</p>
              </div>
              <div className="mb-5">
                <span className="text-3xl font-bold text-dark-teal">{tPricing("platinum.price")}</span>
                <span className="text-dark-teal/60 text-sm">{tPricing("platinum.period")}</span>
              </div>
              <ul className="space-y-2.5 mb-6 text-sm">
                <li className="flex items-center gap-2 text-dark-teal/80">
                  <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {tPricing("platinum.features.cvCreations")}
                </li>
                <li className="flex items-center gap-2 text-dark-teal/80">
                  <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {tPricing("platinum.features.aiGenerations")}
                </li>
                <li className="flex items-center gap-2 text-dark-teal/80">
                  <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {tPricing("platinum.features.earlyAccess")}
                </li>
                <li className="flex items-center gap-2 text-dark-teal/80">
                  <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {tPricing("platinum.features.support")}
                </li>
              </ul>
              <Link href={localizedHref("/checkout?plan=platinum")} className="block w-full text-center py-2.5 rounded-lg bg-amber-500 text-white font-semibold text-sm hover:bg-amber-600 transition">
                {tPricing("platinum.cta")}
              </Link>
            </div>
          </div>

          <p className="text-center text-dark-teal/60 text-sm mt-8">
            <Link href={localizedHref("/pricing")} className="text-teal-primary hover:underline">{tPricing("viewComparison")}</Link> • {tPricing("securePayments")}
          </p>
        </div>
      </section>

      {/* CTA Section - Teal Gradient */}
      <section className="py-24 bg-teal-gradient relative overflow-hidden">
        {/* Decorative Blobs */}
        <div className="blob w-72 h-72 bg-white/10 top-0 -right-20" style={{ animationDelay: '-4s' }} />
        <div className="blob w-56 h-56 bg-white/5 bottom-0 left-10" style={{ animationDelay: '-8s' }} />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4 text-white">
              {t("cta.title")}<br />
              <span className="text-white/90">{t("cta.titleHighlight")}</span>
            </h2>
            <p className="text-white/80 mb-8 max-w-md mx-auto">{t("cta.subtitle")}</p>
            <Link
              href={localizedHref("/onboarding")}
              className="inline-flex items-center gap-2 bg-accent-orange text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-600 transition shadow-lg shadow-orange-500/30"
            >
              {t("cta.button")}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </Link>
            <p className="text-sm text-white/60 mt-4">{t("cta.note")}</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
