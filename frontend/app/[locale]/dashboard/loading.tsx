export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#080b12]">
      <div className="h-16 bg-white/5 animate-pulse" />
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Welcome section */}
        <div className="h-8 w-56 bg-white/10 rounded animate-pulse" />
        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-24 bg-white/5 rounded-xl animate-pulse" />
          <div className="h-24 bg-white/5 rounded-xl animate-pulse" />
          <div className="h-24 bg-white/5 rounded-xl animate-pulse" />
        </div>
        {/* Resume cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-white/5 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
