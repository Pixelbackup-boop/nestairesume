export default function ResumeExamplesLoading() {
  return (
    <div className="min-h-screen bg-[#080b12]">
      <div className="h-16 bg-white/5 animate-pulse" />
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        <div className="text-center space-y-3">
          <div className="h-10 w-80 mx-auto bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-96 mx-auto bg-white/5 rounded animate-pulse" />
        </div>
        {/* Search bar */}
        <div className="max-w-md mx-auto">
          <div className="h-12 bg-white/5 rounded-lg animate-pulse" />
        </div>
        {/* Category chips */}
        <div className="flex flex-wrap gap-2 justify-center">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-8 w-28 bg-white/5 rounded-full animate-pulse" />
          ))}
        </div>
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
            <div key={i} className="h-20 bg-white/5 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
