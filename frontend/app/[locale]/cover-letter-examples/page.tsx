import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllCoverLetterExamples, getAllDisplayCategories } from '@/lib/cover-letter-examples/posts';

export const metadata: Metadata = {
  title: 'Cover Letter Examples by Job Title (2026) | Best AI Resume',
  description: 'Browse 100+ free cover letter examples organized by industry and job title. Professional cover letter templates with writing tips. Find your role and create your cover letter.',
  keywords: 'cover letter examples, cover letter template, professional cover letter, job cover letter, cover letter samples, cover letter format',
};

export default async function CoverLetterExamplesIndex() {
  const [allExamples, categories] = await Promise.all([
    getAllCoverLetterExamples(),
    getAllDisplayCategories(),
  ]);

  // Group examples by category
  const examplesByCategory = allExamples.reduce((acc, example) => {
    const cat = example.displayCategory;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(example);
    return acc;
  }, {} as Record<string, typeof allExamples>);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-light-teal border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-accent-blue font-semibold tracking-wider uppercase text-sm mb-2 block">
            Cover Letter Examples 2026
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mt-2 mb-6 text-dark-teal">
            Cover Letter Examples<br />
            <span className="text-teal-primary">by Job Title</span>
          </h1>
          <p className="text-lg text-dark-teal/70 mb-8 max-w-2xl mx-auto">
            Browse {allExamples.length}+ professional cover letter examples organized by industry.
            Find your role, study the format, and create yours with our AI builder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#examples" className="px-8 py-4 bg-white border border-gray-200 text-dark-teal font-semibold rounded-xl hover:bg-gray-50 transition shadow-sm">
              Browse Examples
            </a>
            <Link href="/tools/cover-letter" className="px-8 py-4 bg-teal-primary text-white font-semibold rounded-xl hover:bg-teal-secondary transition shadow-lg shadow-teal-primary/30">
              Create Cover Letter with AI
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-teal-primary">{allExamples.length}+</div>
              <div className="text-sm text-dark-teal/60 mt-1">Cover Letter Examples</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-primary">{categories.length}</div>
              <div className="text-sm text-dark-teal/60 mt-1">Industries Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-primary">Free</div>
              <div className="text-sm text-dark-teal/60 mt-1">To Use & Download</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cover Letter Tips Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-dark-teal mb-6 text-center">What Makes a Great Cover Letter?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-teal-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-dark-teal mb-2">Personalization</h3>
              <p className="text-dark-teal/70 text-sm">Address the hiring manager by name and customize for each job. 77% of recruiters prefer personalized cover letters.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-teal-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-dark-teal mb-2">Specific Achievements</h3>
              <p className="text-dark-teal/70 text-sm">Include 1-2 quantified accomplishments that demonstrate your value. Numbers are more memorable than vague claims.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-teal-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-dark-teal mb-2">Concise Length</h3>
              <p className="text-dark-teal/70 text-sm">Keep it to 250-400 words. Hiring managers spend under 30 seconds reviewing cover letters — every word counts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Grid by Category */}
      <section id="examples" className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-dark-teal mb-8">Browse by Industry</h2>

          {categories.map(category => (
            examplesByCategory[category.name] && examplesByCategory[category.name].length > 0 && (
              <div key={category.name} className="mb-12">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-dark-teal">
                    {category.name}
                    <span className="ml-2 text-sm font-normal text-dark-teal/50">({category.count} examples)</span>
                  </h3>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {examplesByCategory[category.name].map(example => (
                    <Link
                      key={example.slug}
                      href={`/cover-letter-examples/${example.slug}`}
                      className="group block bg-light-teal hover:bg-teal-primary/10 rounded-xl p-5 transition border border-gray-100 hover:border-teal-primary/20"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-dark-teal group-hover:text-teal-primary transition">
                            {example.jobTitle} Cover Letter
                          </h4>
                          <p className="text-sm text-dark-teal/60 mt-1 line-clamp-2">{example.description}</p>
                        </div>
                        <svg className="w-5 h-5 text-dark-teal/40 group-hover:text-teal-primary transition flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      {example.keySkills.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {example.keySkills.slice(0, 3).map(skill => (
                            <span key={skill} className="text-xs px-2 py-1 bg-white rounded text-dark-teal/70">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )
          ))}

          {/* CTA if no examples yet */}
          {allExamples.length === 0 && (
            <div className="text-center py-16">
              <p className="text-dark-teal/70 mb-4">Cover letter examples coming soon!</p>
              <Link href="/tools/cover-letter" className="inline-block bg-teal-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-secondary transition">
                Create Cover Letter with AI
              </Link>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-16 text-center p-8 bg-light-teal rounded-2xl border border-teal-primary/20">
            <h3 className="text-xl font-bold text-dark-teal mb-2">Don&apos;t see your job title?</h3>
            <p className="text-dark-teal/70 mb-6">Our AI can write a custom cover letter for ANY job title in seconds.</p>
            <Link href="/tools/cover-letter" className="inline-block bg-teal-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-secondary transition">
              Generate Custom Cover Letter
            </Link>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12 bg-light-teal">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-xl font-bold text-dark-teal mb-6 text-center">Related Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/resume-examples" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
              <h3 className="font-bold text-dark-teal mb-2">Resume Examples</h3>
              <p className="text-dark-teal/60 text-sm">300+ job-specific resume examples</p>
            </Link>
            <Link href="/blog/how-to-write-cover-letter" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
              <h3 className="font-bold text-dark-teal mb-2">Cover Letter Guide</h3>
              <p className="text-dark-teal/60 text-sm">Step-by-step writing tutorial</p>
            </Link>
            <Link href="/templates" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
              <h3 className="font-bold text-dark-teal mb-2">Resume Templates</h3>
              <p className="text-dark-teal/60 text-sm">Professional templates for any job</p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
