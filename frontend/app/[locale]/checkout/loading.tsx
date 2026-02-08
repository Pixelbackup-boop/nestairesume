export default function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-[#080b12] flex items-center justify-center">
      <div className="w-full max-w-lg mx-auto px-6 space-y-6">
        <div className="bg-white/5 rounded-2xl p-8 space-y-5">
          <div className="h-8 w-48 bg-white/10 rounded animate-pulse" />
          <div className="h-px bg-white/10" />
          <div className="space-y-3">
            <div className="h-5 w-full bg-white/5 rounded animate-pulse" />
            <div className="h-5 w-3/4 bg-white/5 rounded animate-pulse" />
          </div>
          <div className="h-12 bg-accent-green/20 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}
