import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReturningUserBanner from "@/components/ReturningUserBanner";
import HeroResumeAnimation from "@/components/HeroResumeAnimation";
import {
  HeroSubtitle,
  HeroTitle,
  HeroCTA,
  FeaturesGrid,
  FeatureCard,
  StepsGrid,
  Step,
  TestimonialsGrid,
  Testimonial,
} from "@/components/HomeAnimations";
import HomeTemplateShowcase from "@/components/HomeTemplateShowcase";

export default async function Home() {
  const t = await getTranslations("Home");
  const tCommon = await getTranslations("Common");
  const tPricing = await getTranslations("Pricing");
  const locale = await getLocale();

  const localizedHref = (path: string) => `/${locale}${path}`;

  return (
    <>
      <Header />
      {/* Review Schema JSON-LD for testimonials - all values are hardcoded string literals, safe to render */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([
          {
            '@context': 'https://schema.org',
            '@type': 'Review',
            reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
            author: { '@type': 'Person', name: 'Sarah Chen' },
            reviewBody: 'Best AI Resume helped me land interviews at 5 FAANG companies. The AI suggestions transformed my bullet points from basic descriptions to impactful achievements.',
            itemReviewed: { '@type': 'SoftwareApplication', name: 'Best AI Resume Builder', url: 'https://bestairesumes.com' },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Review',
            reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
            author: { '@type': 'Person', name: 'Marcus Johnson' },
            reviewBody: 'The ATS optimization feature is a game-changer. I went from getting ghosted to receiving callbacks within days of updating my resume.',
            itemReviewed: { '@type': 'SoftwareApplication', name: 'Best AI Resume Builder', url: 'https://bestairesumes.com' },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Review',
            reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
            author: { '@type': 'Person', name: 'Emily Rodriguez' },
            reviewBody: "Beautiful templates that actually work. I've recommended Best AI Resume to everyone in my design community. It's simply the best.",
            itemReviewed: { '@type': 'SoftwareApplication', name: 'Best AI Resume Builder', url: 'https://bestairesumes.com' },
          },
        ]) }}
      />
      <ReturningUserBanner />

      {/* Hero Section - Teal Gradient with Animated Blobs */}
      <section className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-teal-gradient">
        {/* Animated Blobs - Hidden on mobile */}
        <div className="blob hidden md:block w-96 h-96 bg-white/10 top-20 -left-20" style={{ animationDelay: '0s' }} />
        <div className="blob hidden md:block w-80 h-80 bg-white/5 top-40 right-10" style={{ animationDelay: '-5s' }} />
        <div className="blob hidden md:block w-64 h-64 bg-teal-secondary/20 bottom-40 left-1/4" style={{ animationDelay: '-10s' }} />

        {/* Cloud Shapes - Hidden on mobile */}
        <div className="hidden md:block absolute top-20 right-20 w-32 h-16 bg-white/10 rounded-full blur-xl animate-cloud" />
        <div className="hidden md:block absolute top-40 left-20 w-24 h-12 bg-white/10 rounded-full blur-lg animate-cloud" style={{ animationDelay: '-3s' }} />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <HeroSubtitle>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm mb-6">
                  <span className="text-white">✦</span>
                  <span className="text-white/90">{t("hero.badge")}</span>
                </div>
              </HeroSubtitle>

              <HeroTitle>
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-[1.1] mb-4 md:mb-6 text-white">
                  {t("hero.title")}<br />
                  <span className="text-white">{t("hero.titleHighlight")}</span><br />
                  <span className="text-xl sm:text-2xl lg:text-4xl text-white/80 font-medium">{t("hero.subtitle")}</span>
                </h1>

                <p className="text-white/80 text-lg mb-8 max-w-md leading-relaxed">
                  {t("hero.description")}
                </p>
              </HeroTitle>

              <HeroCTA>
                <div className="flex flex-wrap gap-3 mb-4">
                  <Link
                    href={localizedHref("/onboarding")}
                    className="inline-flex items-center gap-2 bg-accent-orange-dark text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition shadow-lg shadow-orange-500/30"
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
              </HeroCTA>
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

      {/* Company Logos Section - Trust Signals */}
      <section className="py-8 md:py-12 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-dark-teal/80 text-sm mb-6">{t("companies.title")}</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            {/* Google */}
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="font-semibold text-gray-700">Google</span>
            </div>
            {/* Amazon */}
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#FF9900">
                <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.756-2.597 1.32-4.062 1.696-1.46.374-2.964.56-4.51.56-3.052 0-5.876-.597-8.467-1.79-.34-.16-.686-.34-1.028-.527-.317-.174-.474-.372-.474-.596 0-.1.028-.195.085-.284zm21.45-4.01c-.183-.233-.535-.31-1.063-.23-.506.078-1.16.192-1.95.344-.79.152-1.35.227-1.68.227-.323 0-.52-.138-.595-.414-.074-.27.053-.506.383-.712l.22-.14c1.374-.864 2.196-1.512 2.465-1.94.27-.434.33-.77.183-.96-.148-.193-.48-.237-1.004-.135-.514.103-1.12.29-1.823.565-.702.273-1.336.53-1.902.77l-.465.2c-.13.058-.27.07-.42.034-.148-.036-.23-.12-.253-.256-.02-.13.01-.26.1-.4.27-.415.88-1.043 1.83-1.884.95-.84 1.703-1.41 2.26-1.72.56-.31 1.06-.42 1.51-.33.45.096.75.38.92.85.16.468.06.997-.3 1.59-.363.59-.97 1.24-1.83 1.95l-.14.11c.98-.27 1.79-.43 2.44-.49.65-.06 1.07.01 1.27.22.2.21.24.49.13.84-.1.35-.35.67-.74.96-.39.29-.95.59-1.67.91l-.55.25c.98-.14 1.73-.21 2.26-.21.52 0 .88.07 1.09.21.21.14.28.34.21.6-.07.26-.27.51-.6.76-.33.25-.77.5-1.33.74z"/>
              </svg>
              <span className="font-semibold text-gray-700">Amazon</span>
            </div>
            {/* Microsoft */}
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 21 21">
                <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
                <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
                <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
                <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
              </svg>
              <span className="font-semibold text-gray-700">Microsoft</span>
            </div>
            {/* Meta */}
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#0668E1">
                <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 008.44-9.9c0-5.53-4.5-10.02-10-10.02z"/>
              </svg>
              <span className="font-semibold text-gray-700">Meta</span>
            </div>
            {/* Apple */}
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span className="font-semibold text-gray-700">Apple</span>
            </div>
            {/* Netflix */}
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#E50914">
                <path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.86-.004-15.913.002-22.95zM5.398 1.05V24c1.873-.225 2.81-.312 4.715-.398v-9.22z"/>
              </svg>
              <span className="font-semibold text-gray-700">Netflix</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - White Background */}
      <section id="features" className="py-12 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8 md:mb-16">
            <span className="text-teal-text font-medium text-sm uppercase tracking-wider">{t("features.sectionTitle")}</span>
            <h2 className="text-4xl font-bold mt-3 mb-4 text-dark-teal">
              {t("features.title")}<br />
              <span className="text-teal-text">{t("features.titleHighlight")}</span>
            </h2>
            <p className="text-dark-teal/80 max-w-xl mx-auto">
              {t("features.subtitle")}
            </p>
          </div>

          <FeaturesGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <FeatureCard className="feature-card-light rounded-2xl p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-primary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-dark-teal">{t("features.aiWriting.title")}</h3>
              <p className="text-dark-teal/80 text-sm leading-relaxed mb-4">{t("features.aiWriting.description")}</p>
              <Link href={localizedHref("/features")} className="text-accent-orange text-sm font-medium underline underline-offset-2">
                Learn More →
              </Link>
            </FeatureCard>

            {/* Feature 2 */}
            <FeatureCard className="feature-card-light rounded-2xl p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-primary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-dark-teal">{t("features.templates.title")}</h3>
              <p className="text-dark-teal/80 text-sm leading-relaxed mb-4">{t("features.templates.description")}</p>
              <Link href={localizedHref("/templates")} className="text-accent-orange text-sm font-medium underline underline-offset-2">
                Learn More →
              </Link>
            </FeatureCard>

            {/* Feature 3 */}
            <FeatureCard className="feature-card-light rounded-2xl p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-primary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-dark-teal">{t("features.atsOptimization.title")}</h3>
              <p className="text-dark-teal/80 text-sm leading-relaxed mb-4">{t("features.atsOptimization.description")}</p>
              <Link href={localizedHref("/features")} className="text-accent-orange text-sm font-medium underline underline-offset-2">
                Learn More →
              </Link>
            </FeatureCard>

            {/* Feature 4 */}
            <FeatureCard className="feature-card-light rounded-2xl p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-primary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-dark-teal">{t("features.realTimePreview.title")}</h3>
              <p className="text-dark-teal/80 text-sm leading-relaxed mb-4">{t("features.realTimePreview.description")}</p>
              <Link href={localizedHref("/features")} className="text-accent-orange text-sm font-medium underline underline-offset-2">
                Learn More →
              </Link>
            </FeatureCard>

            {/* Feature 5 */}
            <FeatureCard className="feature-card-light rounded-2xl p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-primary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-dark-teal">{t("features.pdfExport.title")}</h3>
              <p className="text-dark-teal/80 text-sm leading-relaxed mb-4">{t("features.pdfExport.description")}</p>
              <Link href={localizedHref("/features")} className="text-accent-orange text-sm font-medium underline underline-offset-2">
                Learn More →
              </Link>
            </FeatureCard>

            {/* Feature 6 */}
            <FeatureCard className="feature-card-light rounded-2xl p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-primary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-dark-teal">{t("features.smartSuggestions.title")}</h3>
              <p className="text-dark-teal/80 text-sm leading-relaxed mb-4">{t("features.smartSuggestions.description")}</p>
              <Link href={localizedHref("/features")} className="text-accent-orange text-sm font-medium underline underline-offset-2">
                Learn More →
              </Link>
            </FeatureCard>
          </FeaturesGrid>
        </div>
      </section>

      {/* How It Works Section - Light Teal Background */}
      <section className="py-12 md:py-24 bg-light-teal relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8 md:mb-16">
            <span className="text-teal-text font-medium text-sm uppercase tracking-wider">{t("howItWorks.sectionTitle")}</span>
            <h2 className="text-4xl font-bold mt-3 text-dark-teal">
              {t("howItWorks.title")}<br />
              <span className="text-teal-text">{t("howItWorks.titleHighlight")}</span>
            </h2>
          </div>

          <StepsGrid className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-20 left-[20%] right-[20%] h-px bg-gradient-to-r from-teal-primary via-teal-secondary to-accent-orange"></div>

            {/* Step 1 */}
            <Step className="text-center">
              <div className="w-40 h-40 mx-auto rounded-full bg-white shadow-lg flex items-center justify-center mb-6 relative">
                <span className="text-6xl font-bold text-teal-text">01</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-dark-teal">{t("howItWorks.step1.title")}</h3>
              <p className="text-dark-teal/80 text-sm">{t("howItWorks.step1.description")}</p>
            </Step>

            {/* Step 2 */}
            <Step className="text-center">
              <div className="w-40 h-40 mx-auto rounded-full bg-white shadow-lg flex items-center justify-center mb-6 relative">
                <span className="text-6xl font-bold text-teal-secondary">02</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-dark-teal">{t("howItWorks.step2.title")}</h3>
              <p className="text-dark-teal/80 text-sm">{t("howItWorks.step2.description")}</p>
            </Step>

            {/* Step 3 */}
            <Step className="text-center">
              <div className="w-40 h-40 mx-auto rounded-full bg-white shadow-lg flex items-center justify-center mb-6 relative">
                <span className="text-6xl font-bold text-accent-orange">03</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-dark-teal">{t("howItWorks.step3.title")}</h3>
              <p className="text-dark-teal/80 text-sm">{t("howItWorks.step3.description")}</p>
            </Step>
          </StepsGrid>
        </div>
      </section>

      {/* Templates Section - White Background */}
      <section id="templates" className="py-12 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-teal-text font-medium text-sm uppercase tracking-wider">{t("templates.sectionTitle")}</span>
              <h2 className="text-4xl font-bold mt-3 text-dark-teal">
                {t("templates.title")}<br />
                <span className="text-teal-text">{t("templates.titleHighlight")}</span>
              </h2>
            </div>
            <Link href={localizedHref("/templates")} className="mt-4 md:mt-0 inline-flex items-center gap-2 text-accent-orange hover:text-orange-600 transition text-sm font-medium underline underline-offset-2">
              {t("templates.viewAll")}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <HomeTemplateShowcase />
        </div>
      </section>

      {/* Testimonials Section - Teal Gradient */}
      <section className="py-12 md:py-24 bg-teal-gradient relative overflow-hidden">
        {/* Decorative Elements - Hidden on mobile */}
        <div className="blob hidden md:block w-64 h-64 bg-white/5 top-10 -left-20" style={{ animationDelay: '-3s' }} />
        <div className="blob hidden md:block w-48 h-48 bg-white/5 bottom-10 right-10" style={{ animationDelay: '-7s' }} />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-8 md:mb-16">
            <span className="text-white/80 font-medium text-sm uppercase tracking-wider">{t("testimonials.sectionTitle")}</span>
            <h2 className="text-4xl font-bold mt-3 text-white">
              {t("testimonials.title")}<br />
              <span className="text-white/90">{t("testimonials.titleHighlight")}</span>
            </h2>
          </div>

          <TestimonialsGrid className="grid md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <Testimonial className="bg-white rounded-2xl p-6 shadow-xl">
              <div className="flex text-yellow-400 text-sm mb-4">★★★★★</div>
              <p className="text-dark-teal/80 text-sm mb-6 leading-relaxed">&quot;Best AI Resume helped me land interviews at 5 FAANG companies. The AI suggestions transformed my bullet points from basic descriptions to impactful achievements.&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-xs font-semibold text-white">SC</div>
                <div>
                  <div className="font-medium text-sm text-dark-teal">Sarah Chen</div>
                  <div className="text-xs text-dark-teal/80">Software Engineer at Google</div>
                </div>
              </div>
            </Testimonial>

            {/* Testimonial 2 */}
            <Testimonial className="bg-white rounded-2xl p-6 shadow-xl">
              <div className="flex text-yellow-400 text-sm mb-4">★★★★★</div>
              <p className="text-dark-teal/80 text-sm mb-6 leading-relaxed">&quot;The ATS optimization feature is a game-changer. I went from getting ghosted to receiving callbacks within days of updating my resume.&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-teal-400 flex items-center justify-center text-xs font-semibold text-white">MJ</div>
                <div>
                  <div className="font-medium text-sm text-dark-teal">Marcus Johnson</div>
                  <div className="text-xs text-dark-teal/80">Product Manager at Stripe</div>
                </div>
              </div>
            </Testimonial>

            {/* Testimonial 3 */}
            <Testimonial className="bg-white rounded-2xl p-6 shadow-xl">
              <div className="flex text-yellow-400 text-sm mb-4">★★★★★</div>
              <p className="text-dark-teal/80 text-sm mb-6 leading-relaxed">&quot;Beautiful templates that actually work. I&apos;ve recommended Best AI Resume to everyone in my design community. It&apos;s simply the best.&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-xs font-semibold text-white">ER</div>
                <div>
                  <div className="font-medium text-sm text-dark-teal">Emily Rodriguez</div>
                  <div className="text-xs text-dark-teal/80">UX Designer at Figma</div>
                </div>
              </div>
            </Testimonial>
          </TestimonialsGrid>
        </div>

        {/* Wave Divider - Single Simple Wave */}
        <div className="wave-divider bottom">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-20 md:h-24">
            <path fill="#ffffff" d="M0,70 C480,90 960,10 1440,50 L1440,100 L0,100 Z" />
          </svg>
        </div>
      </section>

      {/* Pricing Section - White Background */}
      <section id="pricing" className="py-12 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-teal-text font-medium text-sm uppercase tracking-wider">{tPricing("sectionTitle")}</span>
            <h2 className="text-4xl font-bold mt-3 text-dark-teal">
              {tPricing("title")}<br />
              <span className="text-teal-text">{tPricing("titleHighlight")}</span>
            </h2>
            <p className="text-dark-teal/80 mt-4">{tPricing("subtitle")}</p>
            <div className="mt-4 inline-flex items-center gap-2 bg-teal-primary/10 px-4 py-2 rounded-full">
              <svg className="w-5 h-5 text-teal-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-teal-text font-medium text-sm">{tPricing("billedImmediately")} • {tPricing("cancelAnytime")}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-5">
                <h3 className="font-semibold text-lg mb-1 text-dark-teal">{tPricing("starter.name")}</h3>
                <p className="text-dark-teal/80 text-xs">{tPricing("starter.description")}</p>
              </div>
              <div className="mb-5">
                <span className="text-3xl font-bold text-dark-teal">{tPricing("starter.price")}</span>
                <span className="text-dark-teal/80 text-sm">{tPricing("starter.period")}</span>
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
                <p className="text-dark-teal/80 text-xs">{tPricing("gold.description")}</p>
              </div>
              <div className="mb-3">
                <span className="text-3xl font-bold text-dark-teal">{tPricing("gold.price")}</span>
                <span className="text-dark-teal/80 text-sm">{tPricing("gold.period")}</span>
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
              <Link href={localizedHref("/checkout?plan=diamond")} className="block w-full text-center py-2.5 rounded-lg bg-white text-teal-text font-semibold text-sm hover:bg-gray-50 transition">
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
                <p className="text-dark-teal/80 text-xs">{tPricing("platinum.description")}</p>
              </div>
              <div className="mb-5">
                <span className="text-3xl font-bold text-dark-teal">{tPricing("platinum.price")}</span>
                <span className="text-dark-teal/80 text-sm">{tPricing("platinum.period")}</span>
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

          <p className="text-center text-dark-teal/80 text-sm mt-8">
            <Link href={localizedHref("/pricing")} className="text-teal-text underline underline-offset-2">{tPricing("viewComparison")}</Link> • {tPricing("securePayments")}
          </p>
        </div>
      </section>

      {/* FAQ Section - Light Background with JSON-LD Schema */}
      {/* FAQ schema — built from translation strings, no user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: (t.raw("faq.items") as Array<{question: string; answer: string}>).map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }) }}
      />
      <section id="faq" className="py-12 md:py-24 bg-light-teal">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-8 md:mb-12">
            <span className="text-teal-text font-medium text-sm uppercase tracking-wider">{t("faq.sectionTitle")}</span>
            <h2 className="text-4xl font-bold mt-3 text-dark-teal">
              {t("faq.title")}{" "}
              <span className="text-teal-text">{t("faq.titleHighlight")}</span>
            </h2>
          </div>

          <div className="space-y-4">
            {(t.raw("faq.items") as Array<{question: string; answer: string}>).map((item, index) => (
              <details
                key={index}
                className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition">
                  <h3 className="font-semibold text-dark-teal pr-4">{item.question}</h3>
                  <svg className="w-5 h-5 text-teal-primary flex-shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-dark-teal/80 leading-relaxed">
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Teal Gradient */}
      <section className="py-12 md:py-24 bg-teal-gradient relative overflow-hidden">
        {/* Decorative Blobs - Hidden on mobile */}
        <div className="blob hidden md:block w-72 h-72 bg-white/10 top-0 -right-20" style={{ animationDelay: '-4s' }} />
        <div className="blob hidden md:block w-56 h-56 bg-white/5 bottom-0 left-10" style={{ animationDelay: '-8s' }} />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4 text-white">
              {t("cta.title")}<br />
              <span className="text-white/90">{t("cta.titleHighlight")}</span>
            </h2>
            <p className="text-white/80 mb-8 max-w-md mx-auto">{t("cta.subtitle")}</p>
            <Link
              href={localizedHref("/onboarding")}
              className="inline-flex items-center gap-2 bg-accent-orange-dark text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-600 transition shadow-lg shadow-orange-500/30"
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
