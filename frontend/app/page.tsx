import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AbstractShape from "@/components/AbstractShape";
import GlassCard from "@/components/GlassCard";
import { HomeAnimations } from "@/components/HomeAnimations";
import HeroResumeAnimation from "@/components/HeroResumeAnimation";

export default function Home() {
  return (
    <div className="min-h-screen bg-glass-gradient text-slate-800 font-sans selection:bg-blue-200 overflow-x-hidden">
      {/* We might need a transparent header version later, keeping generic for now but ensuring z-index */}
      <div className="relative z-50">
        <Header />
      </div>

      <main className="relative pt-20 pb-40 px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">

        {/* Main Central Visual */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] z-0 opacity-90 scale-125 md:scale-150 pointer-events-none">
          <AbstractShape />
        </div>

        {/* Hero Section - Two Column Layout */}
        <HomeAnimations.Hero>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-10 mt-10 md:mt-0">
            {/* Left - Text Content */}
            <div className="text-center lg:text-left">
              <HomeAnimations.HeroTitle>
                <h1 className="text-4xl md:text-6xl font-bold tracking-[0.2em] text-slate-800 uppercase mb-4 opacity-90">
                  Resume <span className="text-gradient-blue">AI</span>
                </h1>
              </HomeAnimations.HeroTitle>
              <HomeAnimations.HeroSubtitle>
                <p className="text-sm md:text-base tracking-[0.3em] text-slate-500 font-medium uppercase">
                  2026 Intelligent Builder • Future of Work
                </p>
              </HomeAnimations.HeroSubtitle>

              <HomeAnimations.HeroCTA>
                <div className="mt-8 flex justify-center lg:justify-start">
                  <Link
                    href="/onboarding"
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold tracking-wide shadow-lg shadow-blue-500/30 transition-all hover:scale-105 btn-lift"
                  >
                    Start Building
                  </Link>
                </div>
              </HomeAnimations.HeroCTA>
            </div>

            {/* Right - AI Writing Animation */}
            <div className="flex justify-center lg:justify-end">
              <HeroResumeAnimation />
            </div>
          </div>
        </HomeAnimations.Hero>

        {/* Floating Glass Cards Grid - Animated Stagger */}
        <HomeAnimations.CardsContainer className="relative z-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 mt-20 max-w-5xl mx-auto">

          {/* Card 1 - Left - Design */}
          <HomeAnimations.Card className="md:translate-y-12">
            <GlassCard>
              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-700 mb-1">Smart Design</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Layouts that adapt to your content automatically.
                </p>
              </div>
              <div className="h-24 bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-lg border border-blue-100/50 flex items-center justify-center">
                {/* Mini representation */}
                <div className="w-16 h-20 bg-white shadow-sm rounded border border-slate-100 flex flex-col p-2 space-y-1">
                  <div className="h-1 w-8 bg-slate-200 rounded"></div>
                  <div className="h-1 w-full bg-slate-100 rounded"></div>
                  <div className="h-1 w-10 bg-slate-100 rounded"></div>
                </div>
              </div>
            </GlassCard>
          </HomeAnimations.Card>

          {/* Card 2 - Center - AI Power (Lower) */}
          <HomeAnimations.Card className="md:translate-y-40">
            <GlassCard className="bg-white/60">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">AI Powered</h3>
                  <p className="text-xs text-slate-500">Auto-generated content</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                "Generate professional summaries and bullet points in seconds."
              </p>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] rounded-full uppercase font-bold tracking-wider">New</span>
                <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                <span className="text-[10px] text-slate-400">GPT-4 Engine</span>
              </div>
            </GlassCard>
          </HomeAnimations.Card>

          {/* Card 3 - Right - Best Practices */}
          <HomeAnimations.Card className="md:translate-y-20">
            <GlassCard>
              <h3 className="text-lg font-bold text-slate-700 mb-2">ATS Ready</h3>
              <ul className="space-y-3 mb-4">
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                  Keyword Optimization
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                  Clean Parsing
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                  Expert Approved
                </li>
              </ul>
              <div className="text-right">
                <span className="text-4xl font-bold text-slate-800/20">98%</span>
              </div>
            </GlassCard>
          </HomeAnimations.Card>

        </HomeAnimations.CardsContainer>

        {/* Bottom Section - Timeline style like reference */}
        <div className="mt-40 md:mt-30 grid md:grid-cols-2 gap-20 items-end">

          {/* Agenda / Steps - Animated */}
          <HomeAnimations.Timeline>
            <div className="space-y-8">
              <HomeAnimations.TimelineHeader>
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                  <h2 className="text-2xl font-bold text-slate-700">How it Works</h2>
                </div>
              </HomeAnimations.TimelineHeader>

              <div className="relative pl-8 border-l border-slate-200 space-y-10">
                <HomeAnimations.TimelineStep delay={0.1}>
                  <div className="relative">
                    <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-blue-400/50 bg-white"></span>
                    <span className="text-xs font-mono text-slate-400 mb-1 block">STEP 01</span>
                    <h4 className="font-bold text-slate-700">Import or Enter Data</h4>
                    <p className="text-sm text-slate-500 mt-1">Upload an existing PDF or start fresh.</p>
                  </div>
                </HomeAnimations.TimelineStep>
                <HomeAnimations.TimelineStep delay={0.2}>
                  <div className="relative">
                    <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-blue-400/50 bg-white"></span>
                    <span className="text-xs font-mono text-slate-400 mb-1 block">STEP 02</span>
                    <h4 className="font-bold text-slate-700">AI Optimization</h4>
                    <p className="text-sm text-slate-500 mt-1">Our engine suggests improvements instantly.</p>
                  </div>
                </HomeAnimations.TimelineStep>
                <HomeAnimations.TimelineStep delay={0.3}>
                  <div className="relative">
                    <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-blue-400/50 bg-white"></span>
                    <span className="text-xs font-mono text-slate-400 mb-1 block">STEP 03</span>
                    <h4 className="font-bold text-slate-700">Export & Apply</h4>
                    <p className="text-sm text-slate-500 mt-1">Download polished PDF or PNG.</p>
                  </div>
                </HomeAnimations.TimelineStep>
              </div>
            </div>
          </HomeAnimations.Timeline>

          {/* Guest / Profile Card - Animated */}
          <HomeAnimations.ProfileCard>
            <div className="relative">
              <GlassCard className="relative z-10 !p-0 overflow-hidden group hover:scale-[1.02] transition-transform">
                <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                <div className="p-6 pt-0 relative">
                  <div className="absolute -top-12 left-6 w-24 h-24 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-lg">
                    {/* Placeholder Avatar */}
                    <div className="w-full h-full bg-slate-300 flex items-center justify-center text-3xl">👨‍💻</div>
                  </div>
                  <div className="mt-14">
                    <h3 className="text-xl font-bold text-slate-800">Your Future Career</h3>
                    <p className="text-sm text-blue-600 font-medium mb-4">Starts Here</p>
                    <p className="text-sm text-slate-500 leading-relaxed mb-6">
                      "This platform completely transformed how I present myself to employers. The clean, modern templates are unmatched."
                    </p>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                      <span className="text-xs text-slate-400">Resume AI User</span>
                      <Link href="/templates" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                        View Templates →
                      </Link>
                    </div>
                  </div>
                </div>
              </GlassCard>
              {/* Decorative blur behind card */}
              <div className="absolute top-10 right-10 w-full h-full bg-blue-400/20 blur-3xl -z-10 rounded-full"></div>
            </div>
          </HomeAnimations.ProfileCard>

        </div>

      </main>

      {/* Footer minimal version for this page or standard */}
      <Footer />
    </div>
  );
}
