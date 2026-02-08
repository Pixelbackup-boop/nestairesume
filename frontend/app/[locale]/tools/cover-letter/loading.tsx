export default function CoverLetterLoading() {
  return (
    <div className="min-h-screen bg-[#080b12]">
      <div className="h-16 bg-white/5 animate-pulse" />
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
        <div className="text-center space-y-3">
          <div className="h-10 w-72 mx-auto bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-80 mx-auto bg-white/5 rounded animate-pulse" />
        </div>
        <div className="bg-white/5 rounded-2xl p-8 space-y-4">
          <div className="h-12 bg-white/5 rounded-lg animate-pulse" />
          <div className="h-12 bg-white/5 rounded-lg animate-pulse" />
          <div className="h-32 bg-white/5 rounded-lg animate-pulse" />
          <div className="h-12 bg-accent-green/20 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}
