import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AUTHORS } from "@/lib/resume-examples/posts";
import { getAboutContent } from '@/lib/content/about-pages';
import { getLocalizedUrl } from '@/lib/localized-paths';
import { hreflangAlternates } from '@/lib/hreflang';

const BASE_URL = 'https://bestairesumes.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = getAboutContent(locale);
  return {
    title: `${c.hero.badge} | Best AI Resume`,
    description: c.hero.subtitle,
    alternates: {
      canonical: getLocalizedUrl(BASE_URL, '/about', locale),
      languages: hreflangAlternates(BASE_URL, '/about'),
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = getAboutContent(locale);

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="text-accent-green font-medium text-sm uppercase tracking-wider">{c.hero.badge}</span>
          <h1 className="text-5xl font-bold mt-3 mb-6 text-white">
            {c.hero.title}<br />
            <span className="gradient-text">{c.hero.titleHighlight}</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {c.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent-green font-medium text-sm uppercase tracking-wider">{c.story.badge}</span>
              <h2 className="text-3xl font-bold mt-3 mb-6 text-white">
                {c.story.heading}
              </h2>
              <p className="text-gray-400 mb-4 leading-relaxed">{c.story.p1}</p>
              <p className="text-gray-400 mb-4 leading-relaxed">{c.story.p2}</p>
              <p className="text-gray-400 leading-relaxed">{c.story.p3}</p>
            </div>
            <div className="feature-card rounded-xl p-8">
              <div className="grid grid-cols-2 sm:gap-6 gap-4">
                {c.stats.map((stat, i) => {
                  const colors = ['gradient-text', 'text-accent-teal', 'text-accent-purple', 'text-accent-pink'];
                  return (
                    <div key={i} className="text-center">
                      <div className={`text-4xl font-bold ${colors[i]} mb-2`}>{stat.value}</div>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-accent-green font-medium text-sm uppercase tracking-wider">{c.values.badge}</span>
            <h2 className="text-3xl font-bold mt-3 text-white">
              {c.values.heading}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {c.values.cards.map((card, i) => {
              const iconConfigs = [
                { bg: 'bg-accent-green/20', text: 'text-accent-green', d: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
                { bg: 'bg-accent-blue/20', text: 'text-accent-blue', d: 'M13 10V3L4 14h7v7l9-11h-7z' },
                { bg: 'bg-accent-purple/20', text: 'text-accent-purple', d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
              ];
              const ic = iconConfigs[i];
              return (
                <div key={i} className="feature-card rounded-xl p-8">
                  <div className={`w-12 h-12 rounded-lg ${ic.bg} flex items-center justify-center mb-5`}>
                    <svg className={`w-6 h-6 ${ic.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ic.d} />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-xl mb-3 text-white">{card.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{card.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet Our Experts - E-E-A-T Signal */}
      <section className="py-16 bg-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-accent-blue font-medium text-sm uppercase tracking-wider">{c.experts.badge}</span>
            <h2 className="text-3xl font-bold mt-3 text-white">{c.experts.heading}</h2>
            <p className="text-gray-400 mt-3 max-w-2xl mx-auto">{c.experts.subtitle}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(AUTHORS).map((a) => (
              <Link
                key={a.slug}
                href={`/${locale}/about/${a.slug}`}
                className="bg-white/10 rounded-2xl p-6 border border-white/10 backdrop-blur-sm hover:border-accent-blue/30 hover:bg-white/15 transition group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-blue to-accent-purple rounded-full blur-sm opacity-30 group-hover:opacity-50 transition"></div>
                    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/20 bg-gray-800">
                      <Image
                        src={a.image}
                        alt={`${a.name} - ${a.jobTitle}`}
                        className="w-full h-full object-cover"
                        width={64}
                        height={64}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-accent-blue transition">{a.name}</h3>
                    <p className="text-accent-blue/80 text-sm font-medium">{a.jobTitle}</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{a.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {a.expertise.slice(0, 3).map((e) => (
                    <span key={e} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">
                      {e}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center border-t border-white/10 pt-8">
            <h4 className="text-lg font-semibold text-white mb-4">{c.editorial.heading}</h4>
            <div className="grid md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
              {c.editorial.items.map((item, i) => (
                <div key={i}>
                  <h5 className="text-accent-green font-medium mb-1">{item.title}</h5>
                  <p className="text-gray-400 text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="feature-card rounded-xl p-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-white">{c.commitment.heading}</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">{c.commitment.p1}</p>
              <p className="text-gray-400 leading-relaxed">{c.commitment.p2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">
            {c.cta.title}<br />
            <span className="gradient-text">{c.cta.titleHighlight}</span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">{c.cta.subtitle}</p>
          <Link href={`/${locale}/auth/register`} className="inline-flex items-center gap-2 bg-accent-green text-bg-primary px-8 py-4 rounded-xl font-semibold hover:bg-accent-teal transition">
            {c.cta.button}
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
