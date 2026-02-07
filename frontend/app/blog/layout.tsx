import Link from 'next/link';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-teal-500 to-teal-600 rounded-md flex items-center justify-center font-bold text-white text-sm">B</div>
            <span className="font-semibold text-gray-900">Best AI Resume</span>
          </Link>
          <Link href="/blog" className="text-sm text-gray-600 hover:text-teal-600 transition">
            Blog
          </Link>
        </div>
      </nav>
      <main className="min-h-screen bg-gray-50 pt-20">
        {children}
      </main>
      <footer className="bg-[#1a3a3a] py-8 text-center">
        <p className="text-white/50 text-sm">&copy; {new Date().getFullYear()} Best AI Resume. All rights reserved.</p>
      </footer>
    </>
  );
}
