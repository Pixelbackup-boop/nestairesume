export default function BuilderLoading() {
  return (
    <div className="min-h-screen bg-[#080b12]">
      {/* Header skeleton */}
      <div className="h-16 bg-white/5 animate-pulse" />
      <div className="flex flex-1">
        {/* Sidebar / form area */}
        <div className="w-full lg:w-1/2 p-6 space-y-4">
          <div className="h-8 w-48 bg-white/10 rounded animate-pulse" />
          <div className="h-12 bg-white/5 rounded-lg animate-pulse" />
          <div className="h-12 bg-white/5 rounded-lg animate-pulse" />
          <div className="h-12 bg-white/5 rounded-lg animate-pulse" />
          <div className="h-32 bg-white/5 rounded-lg animate-pulse" />
        </div>
        {/* Preview area */}
        <div className="hidden lg:block w-1/2 p-6">
          <div className="aspect-[8.5/11] bg-white/5 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}
