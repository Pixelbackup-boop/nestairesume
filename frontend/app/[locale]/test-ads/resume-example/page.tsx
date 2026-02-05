import InArticleVideoAd from '@/components/ads/InArticleVideoAd';

export default function TestAdsResumeExample() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <span>Resume Examples</span> / <span>Software Engineer</span>
      </nav>

      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Software Engineer Resume Example & Writing Guide 2026
        </h1>
        <p className="text-xl text-gray-600">
          Create a standout software engineer resume with our expert tips and real examples.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Software Engineer</span>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Tech Resume</span>
          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">ATS Optimized</span>
        </div>
      </header>

      {/* Resume Preview */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-8 shadow-lg">
        <div className="text-center border-b pb-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-900">John Developer</h2>
          <p className="text-gray-600">Senior Software Engineer</p>
          <p className="text-sm text-gray-500 mt-2">
            john@email.com | (555) 123-4567 | San Francisco, CA | linkedin.com/in/johndeveloper
          </p>
        </div>
        <div className="text-sm text-gray-600">
          <p className="italic">
            Results-driven Software Engineer with 7+ years of experience building scalable web applications.
            Expertise in React, Node.js, and cloud technologies. Led development of platform serving 2M+ users.
          </p>
        </div>
        <div className="mt-4 text-center">
          <span className="bg-gray-100 text-gray-600 px-4 py-2 rounded text-sm">
            [Resume Preview - Click to expand]
          </span>
        </div>
      </div>

      {/* Article Content */}
      <article className="prose prose-lg max-w-none">
        {/* Intro Section - Paragraph 1 */}
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          What Makes a Great Software Engineer Resume?
        </h2>
        <p className="text-gray-700 leading-relaxed">
          A great software engineer resume goes beyond listing programming languages and frameworks.
          In today&apos;s competitive tech job market, hiring managers and ATS systems are looking for
          candidates who can demonstrate real impact through their work. Your resume needs to tell
          a story of problem-solving, technical excellence, and measurable results. Whether you&apos;re
          a fresh bootcamp graduate or a seasoned principal engineer, the principles of a strong
          tech resume remain the same: clarity, relevance, and quantifiable achievements.
        </p>

        {/* Intro Section - Paragraph 2 */}
        <p className="text-gray-700 leading-relaxed">
          Unlike other professions, software engineering resumes have unique requirements. Tech
          recruiters spend an average of 7.4 seconds scanning each resume, so your most impressive
          achievements need to be immediately visible. Your technical skills section must balance
          comprehensiveness with relevance—listing every technology you&apos;ve ever touched can actually
          work against you. In this guide, we&apos;ll show you exactly how to structure your software
          engineer resume to pass ATS screening and impress human reviewers.
        </p>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* ▼▼▼ AD PLACEMENT: AFTER INTRO (BEFORE PROFESSIONAL SUMMARY) ▼▼▼ */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <InArticleVideoAd />
        {/* ═══════════════════════════════════════════════════════════ */}

        {/* Professional Summary Section */}
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Professional Summary Examples
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Your professional summary is your elevator pitch. Here are three examples tailored to
          different experience levels:
        </p>

        {/* Entry Level */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
          <h4 className="font-bold text-blue-800 mb-2">Entry-Level (0-2 years)</h4>
          <p className="text-gray-700 text-sm">
            &quot;Computer Science graduate with hands-on experience in full-stack development through
            internships and personal projects. Built 3 production applications using React and Node.js.
            Strong foundation in data structures, algorithms, and software design patterns. Eager to
            contribute to a collaborative engineering team.&quot;
          </p>
        </div>

        {/* Mid Level */}
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
          <h4 className="font-bold text-green-800 mb-2">Mid-Level (3-5 years)</h4>
          <p className="text-gray-700 text-sm">
            &quot;Software Engineer with 4 years of experience building scalable microservices and
            React applications. Reduced API response times by 40% through database optimization.
            Led migration of monolithic application to containerized architecture serving 500K+
            daily users. Proficient in TypeScript, Python, AWS, and Kubernetes.&quot;
          </p>
        </div>

        {/* Senior Level */}
        <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-4">
          <h4 className="font-bold text-purple-800 mb-2">Senior-Level (6+ years)</h4>
          <p className="text-gray-700 text-sm">
            &quot;Senior Software Engineer with 8+ years architecting distributed systems at scale.
            Led team of 6 engineers delivering platform processing $50M+ annual transactions.
            Pioneered adoption of event-driven architecture reducing system latency by 60%.
            Track record of mentoring junior developers and driving technical excellence.&quot;
          </p>
        </div>

        {/* Skills Section */}
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Essential Skills to Highlight
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Organize your skills into clear categories for better readability:
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-2">Languages & Frameworks</h4>
            <div className="flex flex-wrap gap-2">
              {['JavaScript', 'TypeScript', 'Python', 'React', 'Node.js', 'Next.js'].map((skill) => (
                <span key={skill} className="bg-white border border-gray-300 text-gray-700 text-xs px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-2">Cloud & DevOps</h4>
            <div className="flex flex-wrap gap-2">
              {['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Git'].map((skill) => (
                <span key={skill} className="bg-white border border-gray-300 text-gray-700 text-xs px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-2">Databases</h4>
            <div className="flex flex-wrap gap-2">
              {['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch'].map((skill) => (
                <span key={skill} className="bg-white border border-gray-300 text-gray-700 text-xs px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-2">Soft Skills</h4>
            <div className="flex flex-wrap gap-2">
              {['Team Leadership', 'Code Review', 'Agile/Scrum', 'Technical Writing'].map((skill) => (
                <span key={skill} className="bg-white border border-gray-300 text-gray-700 text-xs px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Achievement Bullets */}
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Achievement-Focused Bullet Points
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Transform your responsibilities into achievements with these examples:
        </p>

        <ul className="space-y-3 mb-6">
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span className="text-gray-700">Architected microservices platform handling 10M+ daily API requests with 99.9% uptime</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span className="text-gray-700">Reduced deployment time by 75% by implementing automated CI/CD pipelines with GitHub Actions</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span className="text-gray-700">Led codebase modernization initiative, improving test coverage from 45% to 92%</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span className="text-gray-700">Mentored 4 junior engineers, with 2 promoted to mid-level within 18 months</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span className="text-gray-700">Optimized database queries reducing page load times by 60% and saving $15K/month in cloud costs</span>
          </li>
        </ul>

        {/* Salary Section */}
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Salary & Job Outlook
        </h2>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 mb-6">
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-green-600">$127,260</p>
              <p className="text-sm text-gray-600">Median Salary (2025)</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">$80K - $180K</p>
              <p className="text-sm text-gray-600">Salary Range</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">+25%</p>
              <p className="text-sm text-gray-600">Job Growth (2024-2034)</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Sources: U.S. Bureau of Labor Statistics, Glassdoor, PayScale
          </p>
        </div>

        {/* CTA */}
        <div className="bg-blue-600 text-white p-6 rounded-xl text-center mt-8">
          <h3 className="text-xl font-bold mb-2">Ready to Build Your Software Engineer Resume?</h3>
          <p className="text-blue-100 mb-4">Use our AI-powered resume builder to create a standout resume in minutes.</p>
          <button className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors">
            Create My Resume
          </button>
        </div>
      </article>
    </div>
  );
}
