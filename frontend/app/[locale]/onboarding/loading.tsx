export default function OnboardingLoading() {
  return (
    <div className="min-h-screen bg-[#080b12] flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto px-6 space-y-6">
        {/* Progress bar skeleton */}
        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-accent-green/30 rounded-full animate-pulse" />
        </div>
        {/* Form skeleton */}
        <div className="bg-white/5 rounded-2xl p-8 space-y-5">
          <div className="h-8 w-64 bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-48 bg-white/5 rounded animate-pulse" />
          <div className="h-12 bg-white/5 rounded-lg animate-pulse" />
          <div className="h-12 bg-white/5 rounded-lg animate-pulse" />
          <div className="h-12 bg-accent-green/20 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}
