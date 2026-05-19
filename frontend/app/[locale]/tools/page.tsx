import { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { locales } from '@/i18n.config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileSearch, FileText, Mic, FileSignature } from 'lucide-react';
import { getLocalizedUrl } from '@/lib/localized-paths';

const siteUrl = 'https://bestairesumes.com';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Common' });

  const title = 'Free AI Resume & Career Tools | Best AI Resume';
  const description = 'Free AI-powered tools to boost your job search: ATS resume checker, cover letter generator, mock interview practice, and resignation letter builder.';

  const alternateLanguages: Record<string, string> = {
    'x-default': getLocalizedUrl(siteUrl, '/tools', 'en'),
  };
  locales.forEach((loc) => {
    alternateLanguages[loc] = getLocalizedUrl(siteUrl, '/tools', loc);
  });

  return {
    title,
    description,
    alternates: {
      canonical: getLocalizedUrl(siteUrl, '/tools', locale),
      languages: alternateLanguages,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: getLocalizedUrl(siteUrl, '/tools', locale),
    },
  };
}

const tools = [
  {
    href: '/tools/ats-checker',
    icon: FileSearch,
    titleKey: 'ATS Resume Checker',
    descKey: 'Scan your resume against ATS systems and get an instant compatibility score with actionable suggestions.',
  },
  {
    href: '/tools/cover-letter',
    icon: FileText,
    titleKey: 'AI Cover Letter Generator',
    descKey: 'Generate a tailored, professional cover letter in seconds using AI based on your resume and the job description.',
  },
  {
    href: '/tools/mock-interview',
    icon: Mic,
    titleKey: 'AI Mock Interview',
    descKey: 'Practice with AI-generated interview questions tailored to your target role and get feedback on your answers.',
  },
  {
    href: '/tools/resignation-letter',
    icon: FileSignature,
    titleKey: 'Resignation Letter Generator',
    descKey: 'Create a professional resignation letter in minutes with customizable tone and formatting options.',
  },
];

export default async function ToolsPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <>
      <Header />
      <main id="main-content" className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Free AI Career Tools
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful, free tools to help you create better resumes, write cover letters, prepare for interviews, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={`/${locale}${tool.href}`}
              className="group block p-6 rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors">
                  <tool.icon size={24} className="text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                    {tool.titleKey}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {tool.descKey}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
