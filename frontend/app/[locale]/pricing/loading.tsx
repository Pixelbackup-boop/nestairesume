export default function PricingLoading() {
  return (
    <div className="min-h-screen bg-[#080b12]">
      <div className="h-16 bg-white/5 animate-pulse" />
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-10">
        {/* Title */}
        <div className="text-center space-y-3">
          <div className="h-10 w-64 mx-auto bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-80 mx-auto bg-white/5 rounded animate-pulse" />
        </div>
        {/* Toggle */}
        <div className="flex justify-center">
          <div className="h-10 w-48 bg-white/5 rounded-full animate-pulse" />
        </div>
        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-96 bg-white/5 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
