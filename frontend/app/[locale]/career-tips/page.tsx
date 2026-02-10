import { getTranslations, getLocale } from 'next-intl/server';
import { BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllCareerTips } from '@/lib/blog/posts';
import CareerTipsClient from './CareerTipsClient';

export default async function CareerTipsPage() {
  const [t, locale, posts] = await Promise.all([
    getTranslations('CareerTips'),
    getLocale(),
    getAllCareerTips(),
  ]);

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-teal-primary/5 to-transparent" />
          <div className="max-w-6xl mx-auto px-6 relative">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-primary/10 rounded-full border border-teal-primary/20 mb-6">
                <BookOpen size={16} className="text-teal-primary" />
                <span className="text-sm text-teal-primary font-medium">{t('hero.badge')}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                {t('hero.title')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-primary to-teal-secondary">
                  {t('hero.titleHighlight')}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                {t('hero.subtitle')}
              </p>
            </div>
          </div>
        </section>

        <CareerTipsClient posts={posts} locale={locale} />
      </main>

      <Footer />
    </div>
  );
}
