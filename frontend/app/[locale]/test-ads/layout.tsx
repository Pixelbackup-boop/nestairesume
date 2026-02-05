import Link from 'next/link';

export default function TestAdsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/test-ads" className="text-xl font-bold text-gray-900">
                Ad Placement Test
              </Link>
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded">
                Demo Mode
              </span>
            </div>
            <nav className="flex items-center gap-4">
              <Link
                href="/test-ads/blog"
                className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100"
              >
                Blog Post
              </Link>
              <Link
                href="/test-ads/resume-example"
                className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100"
              >
                Resume Example
              </Link>
              <Link
                href="/test-ads/career-tips"
                className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100"
              >
                Career Tips
              </Link>
              <Link
                href="/test-ads/tools"
                className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100"
              >
                Tools (Rewarded)
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm">
            This is a test page for ad placement visualization. Ads shown are placeholders.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
            <span>In-Article Video: $10-15 CPM</span>
            <span>|</span>
            <span>Rewarded Video: $20-40 CPM</span>
            <span>|</span>
            <span>Display 300x600: $4-8 CPM</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
