export default function TemplatesLoading() {
  return (
    <div className="min-h-screen bg-[#080b12]">
      <div className="h-16 bg-white/5 animate-pulse" />
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        {/* Title */}
        <div className="text-center space-y-3">
          <div className="h-10 w-72 mx-auto bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-96 mx-auto bg-white/5 rounded animate-pulse" />
        </div>
        {/* Filter bar */}
        <div className="flex gap-3 justify-center">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-10 w-24 bg-white/5 rounded-full animate-pulse" />
          ))}
        </div>
        {/* Template grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="aspect-[8.5/11] bg-white/5 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
