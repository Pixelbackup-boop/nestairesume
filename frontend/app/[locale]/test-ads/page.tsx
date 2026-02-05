import Link from 'next/link';

export default function TestAdsIndex() {
  const pages = [
    {
      title: 'Blog Post',
      href: '/test-ads/blog',
      description: 'In-article video ad after 2nd paragraph',
      cpm: '$10-15',
      format: 'Video',
      color: 'blue',
    },
    {
      title: 'Resume Example',
      href: '/test-ads/resume-example',
      description: 'In-article video ad after intro section',
      cpm: '$12',
      format: 'Video',
      color: 'green',
    },
    {
      title: 'Career Tips',
      href: '/test-ads/career-tips',
      description: 'In-article video ad after 2nd paragraph',
      cpm: '$10-15',
      format: 'Video',
      color: 'purple',
    },
    {
      title: 'Tools (Mock Interview)',
      href: '/test-ads/tools',
      description: 'Rewarded video ad for feature unlock',
      cpm: '$20-40',
      format: 'Rewarded',
      color: 'yellow',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Ad Placement Test Pages
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Click on each page type to see the ad placement position with placeholder video ads.
        </p>
      </div>

      {/* Revenue Summary */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 mb-12 text-white">
        <h2 className="text-2xl font-bold mb-4">Projected Monthly Revenue (1 Ad Per Page)</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white/20 rounded-xl p-4">
            <p className="text-3xl font-bold">$600</p>
            <p className="text-sm opacity-80">Blog Posts (46 pages)</p>
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <p className="text-3xl font-bold">$2,400</p>
            <p className="text-sm opacity-80">Resume Examples (306 pages)</p>
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <p className="text-3xl font-bold">$240</p>
            <p className="text-sm opacity-80">Career Tips (7 pages)</p>
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <p className="text-3xl font-bold">$250</p>
            <p className="text-sm opacity-80">Tools Rewarded (4 pages)</p>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-white/20 flex items-center justify-between">
          <span className="text-lg">Total Estimated Monthly Revenue:</span>
          <span className="text-4xl font-bold">$3,490/mo</span>
        </div>
      </div>

      {/* Page Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {pages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 overflow-hidden group"
          >
            <div className={`h-2 bg-${page.color}-500`}></div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {page.title}
                </h3>
                <div className="flex gap-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${page.color}-100 text-${page.color}-800`}>
                    {page.format}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {page.cpm} CPM
                  </span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{page.description}</p>
              <div className="flex items-center text-blue-600 font-medium">
                View Example
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Ad Format Comparison */}
      <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Ad Format Comparison</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Format</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CPM Range</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User Experience</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Best For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">In-Article Video</td>
                <td className="px-6 py-4 text-sm text-green-600 font-medium">$10-18</td>
                <td className="px-6 py-4 text-sm text-gray-600">Good (non-intrusive)</td>
                <td className="px-6 py-4 text-sm text-gray-600">Blog posts, articles, guides</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Rewarded Video</td>
                <td className="px-6 py-4 text-sm text-green-600 font-medium">$20-40</td>
                <td className="px-6 py-4 text-sm text-gray-600">Excellent (opt-in)</td>
                <td className="px-6 py-4 text-sm text-gray-600">Tools, premium features</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Display 300x600</td>
                <td className="px-6 py-4 text-sm text-yellow-600 font-medium">$4-8</td>
                <td className="px-6 py-4 text-sm text-gray-600">Good (sidebar)</td>
                <td className="px-6 py-4 text-sm text-gray-600">Long-form content</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Display 300x250</td>
                <td className="px-6 py-4 text-sm text-yellow-600 font-medium">$2-5</td>
                <td className="px-6 py-4 text-sm text-gray-600">Good (versatile)</td>
                <td className="px-6 py-4 text-sm text-gray-600">Any content page</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
