'use client';

import Link from 'next/link';

export default function BuilderError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const handleClearAndRetry = () => {
    try {
      // Clear potentially corrupted resume state
      localStorage.removeItem('resume-storage');
    } catch {
      // localStorage access may fail in some contexts
    }
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Builder Error</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          The resume builder encountered an error. This may be due to corrupted saved data. You can try again or clear your saved data and start fresh.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={reset}
            className="w-full px-6 py-3 bg-accent-green text-white font-semibold rounded-xl hover:opacity-90 transition"
          >
            Try again
          </button>
          <button
            onClick={handleClearAndRetry}
            className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition"
          >
            Clear saved data & retry
          </button>
          <Link
            href="/"
            className="w-full px-6 py-3 text-gray-500 font-medium hover:text-gray-700 transition"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
