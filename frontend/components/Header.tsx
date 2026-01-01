"use client";

import Link from "next/link";

export default function Header() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/90 backdrop-blur-md border-b border-border-subtle">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-accent-green rounded-md flex items-center justify-center font-bold text-bg-primary text-sm">R</div>
            <span className="font-semibold text-white">ResumeAI</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/features" className="text-gray-400 hover:text-white transition text-sm">Features</Link>
            <Link href="/templates" className="text-gray-400 hover:text-white transition text-sm">Templates</Link>
            <Link href="/pricing" className="text-gray-400 hover:text-white transition text-sm">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-gray-400 hover:text-white transition text-sm">Log in</Link>
            <Link href="/auth/register" className="bg-accent-green text-bg-primary px-4 py-2 rounded-lg font-medium text-sm hover:bg-accent-teal transition">Get Started</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
