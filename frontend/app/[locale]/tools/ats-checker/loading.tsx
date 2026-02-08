export default function ATSCheckerLoading() {
  return (
    <div className="min-h-screen bg-[#080b12]">
      <div className="h-16 bg-white/5 animate-pulse" />
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
        <div className="text-center space-y-3">
          <div className="h-10 w-64 mx-auto bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-96 mx-auto bg-white/5 rounded animate-pulse" />
        </div>
        {/* Upload area */}
        <div className="h-48 bg-white/5 rounded-2xl border-2 border-dashed border-white/10 animate-pulse" />
        {/* Results placeholder */}
        <div className="h-64 bg-white/5 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}
