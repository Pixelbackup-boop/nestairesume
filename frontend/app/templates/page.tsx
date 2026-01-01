import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const templates = [
  { name: "Executive", style: "Classic • Navy", colors: "from-slate-700 to-slate-900", layout: "classic" },
  { name: "Modern", style: "Sidebar • Teal", colors: "from-teal-600 to-teal-900", layout: "sidebar" },
  { name: "Creative", style: "Header • Purple", colors: "from-purple-600 to-purple-900", layout: "header" },
  { name: "Minimal", style: "Clean • Dark", colors: "from-gray-700 to-gray-900", layout: "minimal" },
  { name: "Professional", style: "Traditional", colors: "from-amber-700 to-amber-900", layout: "classic" },
  { name: "Tech", style: "Modern • Blue", colors: "from-blue-600 to-blue-900", layout: "sidebar" },
  { name: "Designer", style: "Creative • Pink", colors: "from-pink-600 to-pink-900", layout: "header" },
  { name: "Corporate", style: "Classic • Gray", colors: "from-zinc-600 to-zinc-900", layout: "classic" },
  { name: "Startup", style: "Modern • Green", colors: "from-emerald-600 to-emerald-900", layout: "sidebar" },
  { name: "Academic", style: "Traditional • Navy", colors: "from-indigo-700 to-indigo-900", layout: "classic" },
  { name: "Marketing", style: "Bold • Orange", colors: "from-orange-600 to-orange-900", layout: "header" },
  { name: "Finance", style: "Clean • Blue", colors: "from-sky-700 to-sky-900", layout: "minimal" },
  { name: "Healthcare", style: "Professional • Teal", colors: "from-cyan-600 to-cyan-900", layout: "classic" },
  { name: "Legal", style: "Traditional • Dark", colors: "from-stone-700 to-stone-900", layout: "minimal" },
  { name: "Engineering", style: "Technical • Blue", colors: "from-blue-700 to-blue-950", layout: "sidebar" },
  { name: "Sales", style: "Dynamic • Red", colors: "from-rose-600 to-rose-900", layout: "header" },
  { name: "Consulting", style: "Executive • Navy", colors: "from-slate-600 to-slate-900", layout: "classic" },
  { name: "Creative Pro", style: "Artistic • Violet", colors: "from-violet-600 to-violet-900", layout: "creative" },
  { name: "Data Science", style: "Modern • Cyan", colors: "from-cyan-700 to-cyan-950", layout: "sidebar" },
  { name: "Product", style: "Clean • Indigo", colors: "from-indigo-600 to-indigo-900", layout: "minimal" },
];

export default function TemplatesPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="text-accent-green font-medium text-sm uppercase tracking-wider">Templates</span>
          <h1 className="text-5xl font-bold mt-3 mb-6 text-white">
            Premium templates for<br />
            <span className="gradient-text">every profession</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Choose from 20+ professionally designed templates. Each one is ATS-optimized and crafted by design experts.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            <button className="px-4 py-2 rounded-lg bg-accent-green text-bg-primary font-medium text-sm">All Templates</button>
            <button className="px-4 py-2 rounded-lg bg-bg-card border border-border-subtle text-gray-400 hover:text-white transition text-sm">Classic</button>
            <button className="px-4 py-2 rounded-lg bg-bg-card border border-border-subtle text-gray-400 hover:text-white transition text-sm">Modern</button>
            <button className="px-4 py-2 rounded-lg bg-bg-card border border-border-subtle text-gray-400 hover:text-white transition text-sm">Creative</button>
            <button className="px-4 py-2 rounded-lg bg-bg-card border border-border-subtle text-gray-400 hover:text-white transition text-sm">Minimal</button>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {templates.map((template, index) => (
              <div key={index} className="template-card cursor-pointer group">
                <div className={`aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-b ${template.colors} border border-border-subtle mb-3 relative`}>
                  {template.layout === "sidebar" && (
                    <div className="h-full flex">
                      <div className="w-1/3 bg-white/10"></div>
                      <div className="flex-1 p-3 space-y-2">
                        <div className="h-2 bg-white/20 rounded w-3/4"></div>
                        <div className="h-2 bg-white/10 rounded w-1/2"></div>
                      </div>
                    </div>
                  )}
                  {template.layout === "header" && (
                    <div className="h-full">
                      <div className="h-14 bg-white/20"></div>
                      <div className="p-3 space-y-2">
                        <div className="h-2 bg-white/10 rounded w-3/4"></div>
                        <div className="h-2 bg-white/10 rounded w-1/2"></div>
                      </div>
                    </div>
                  )}
                  {template.layout === "classic" && (
                    <div className="h-full p-3">
                      <div className="h-full bg-white/5 rounded-lg border border-white/10 p-3 space-y-2">
                        <div className="h-2 bg-white/20 rounded w-1/2 mx-auto"></div>
                        <div className="h-2 bg-white/10 rounded w-3/4"></div>
                        <div className="h-2 bg-white/10 rounded w-2/3"></div>
                      </div>
                    </div>
                  )}
                  {template.layout === "minimal" && (
                    <div className="h-full p-4 space-y-3">
                      <div className="h-2 bg-white/20 rounded w-1/2"></div>
                      <div className="h-2 bg-white/10 rounded w-3/4"></div>
                      <div className="h-2 bg-white/10 rounded w-2/3"></div>
                      <div className="h-2 bg-white/10 rounded w-1/2"></div>
                    </div>
                  )}
                  {template.layout === "creative" && (
                    <div className="h-full">
                      <div className="h-full border-l-4 border-white/30 ml-4 p-3 space-y-2">
                        <div className="h-3 bg-white/20 rounded w-1/2"></div>
                        <div className="h-2 bg-white/10 rounded w-3/4"></div>
                        <div className="h-2 bg-white/10 rounded w-2/3"></div>
                      </div>
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-accent-green/0 group-hover:bg-accent-green/10 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-accent-green text-bg-primary px-4 py-2 rounded-lg font-medium text-sm">Use Template</span>
                  </div>
                </div>
                <h4 className="font-medium text-sm text-white">{template.name}</h4>
                <p className="text-xs text-gray-500">{template.style}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Can&apos;t decide?<br />
            <span className="gradient-text">Try them all for free</span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">Create your account and preview any template with your own content. No credit card required.</p>
          <Link href="/auth/register" className="inline-flex items-center gap-2 bg-accent-green text-bg-primary px-8 py-4 rounded-xl font-semibold hover:bg-accent-teal transition">
            Get Started Free
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
