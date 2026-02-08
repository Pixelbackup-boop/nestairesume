export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-[#080b12]">
      <div className="h-16 bg-white/5 animate-pulse" />
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        <div className="h-10 w-48 bg-white/10 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white/5 rounded-xl overflow-hidden animate-pulse">
              <div className="h-48 bg-white/10" />
              <div className="p-5 space-y-3">
                <div className="h-4 w-20 bg-white/10 rounded" />
                <div className="h-6 w-full bg-white/10 rounded" />
                <div className="h-4 w-3/4 bg-white/5 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
