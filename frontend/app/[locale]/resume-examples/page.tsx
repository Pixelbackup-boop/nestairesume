import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ResumeExamplesGrid from '@/components/ResumeExamplesGrid';
import { getAllResumeExamples, getAllDisplayCategories } from '@/lib/resume-examples/posts';

export const metadata: Metadata = {
  title: 'Browse 300+ Resume Examples by Job Title (2026) | Best AI Resume',
  description: 'Browse 300+ free resume examples organized by industry and job title. Professional resume format templates with ATS-friendly tips. Find your role and build your resume.',
};

export default async function ResumeExamplesIndex() {
  const [allExamples, categories] = await Promise.all([
    getAllResumeExamples(),
    getAllDisplayCategories(),
  ]);

  // Slim down data passed to client component
  const examples = allExamples.map(e => ({
    slug: e.slug,
    jobTitle: e.jobTitle,
    displayCategory: e.displayCategory,
    avgSalary: e.avgSalary,
    keySkills: e.keySkills,
    description: e.description,
  }));

  return (
    <>
      <Header />

      <section className="pt-32 pb-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-accent-blue font-semibold tracking-wider uppercase text-sm mb-2 block">
            Resume Examples 2026
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mt-2 mb-6 text-slate-900">
            Resume Examples<br />
            <span className="text-accent-primary">by Job Title</span>
          </h1>
          <p className="text-lg text-slate-600 mb-4 max-w-2xl mx-auto">
            Browse {allExamples.length}+ professional resume examples organized by industry. Find your role, study the resume format, and build yours with our AI builder.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <ResumeExamplesGrid examples={examples} categories={categories} />

          <div className="mt-16 text-center p-8 bg-slate-50 rounded-2xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Don&apos;t see your job title?</h3>
            <p className="text-slate-600 mb-6">Our AI can write a custom resume for ANY job title in seconds.</p>
            <Link href="/onboarding" className="inline-block bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition">
              Generate Custom Resume
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
