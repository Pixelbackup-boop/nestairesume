"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useAuthStore } from "@/store/useAuthStore";
import { LogOut, LayoutDashboard, Shield, ChevronDown, FileText, FileSignature } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Navigation");
  const { isAuthenticated, user, logout } = useAuthStore();

  // Listen for scroll to toggle header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    router.push(`/${locale}`);
  };

  // Helper to add locale prefix to links (memoized)
  const localizedHref = useCallback((path: string) => `/${locale}${path}`, [locale]);

  // Memoize navLinks to prevent recreation on every render
  const navLinks = useMemo(() => [
    { href: "/templates", label: t("templates") },
    { href: "/pricing", label: t("pricing") },
    { href: "/career-tips", label: t("careerTips") },
  ], [t]);

  const isActive = (href: string) => pathname === localizedHref(href);

  // Check if we're on home page (for transparent header on hero)
  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

  // Text color based on scroll state and page
  const textColor = scrolled || !isHomePage ? "text-dark-teal" : "text-white";
  const textColorMuted = scrolled || !isHomePage ? "text-dark-teal/70" : "text-white/80";
  const textColorHover = scrolled || !isHomePage ? "hover:text-dark-teal" : "hover:text-white";
  const activeTextColor = scrolled || !isHomePage ? "text-dark-teal bg-teal-primary/10" : "text-white bg-white/10";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-white/98 backdrop-blur-md shadow-lg shadow-teal-primary/10"
            : "bg-dark-teal/20"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link href={localizedHref("/")} className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-primary to-teal-secondary rounded-lg flex items-center justify-center font-bold text-white text-base shadow-lg shadow-teal-primary/20 group-hover:shadow-teal-primary/40 transition-shadow">
                  B
                </div>
                <div className="absolute inset-0 bg-teal-primary/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className={`font-bold text-xl leading-none transition-colors ${textColor}`}>
                  Best AI Resume
                </span>
                <span className="text-xs text-teal-primary font-medium tracking-wider">
                  BUILD SMARTER
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={localizedHref(link.href)}
                  className={`relative px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? activeTextColor
                      : `${textColorMuted} ${textColorHover}`
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-teal-primary rounded-full" />
                  )}
                </Link>
              ))}

              {/* Tools Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                  onBlur={() => setTimeout(() => setToolsDropdownOpen(false), 150)}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                    pathname.includes('/tools/')
                      ? activeTextColor
                      : `${textColorMuted} ${textColorHover}`
                  }`}
                >
                  {t("tools")}
                  <ChevronDown size={16} className={`transition-transform ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {toolsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-bg-card rounded-xl shadow-xl border border-gray-100 dark:border-border-subtle overflow-hidden z-50">
                    <Link
                      href={localizedHref("/tools/cover-letter")}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <div className="w-9 h-9 bg-accent-purple/10 rounded-lg flex items-center justify-center">
                        <FileText size={18} className="text-accent-purple" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm">{t("coverLetter")}</div>
                        <div className="text-xs text-gray-500">{t("coverLetterDesc")}</div>
                      </div>
                    </Link>
                    <Link
                      href={localizedHref("/tools/resignation-letter")}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <div className="w-9 h-9 bg-accent-teal/10 rounded-lg flex items-center justify-center">
                        <FileSignature size={18} className="text-accent-teal" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm">{t("resignationLetter")}</div>
                        <div className="text-xs text-gray-500">{t("resignationLetterDesc")}</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Language, Auth Buttons & Theme Toggle */}
            <div className="hidden md:flex items-center gap-3">
              <LanguageSwitcher scrolled={scrolled} isHomePage={isHomePage} />

              {isAuthenticated ? (
                <>
                  {user?.role === "admin" && (
                    <Link
                      href={localizedHref("/admin")}
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${textColorMuted} ${textColorHover}`}
                    >
                      <Shield size={16} />
                      {t("admin")}
                    </Link>
                  )}
                  <Link
                    href={localizedHref("/dashboard")}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${textColorMuted} ${textColorHover}`}
                  >
                    <LayoutDashboard size={16} />
                    {t("dashboard")}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${textColorMuted} hover:text-red-500`}
                  >
                    <LogOut size={16} />
                    {t("logout")}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href={localizedHref("/auth/login")}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${textColorMuted} ${textColorHover}`}
                  >
                    {t("login")}
                  </Link>
                  <Link
                    href={localizedHref("/auth/register")}
                    className="group relative px-5 py-2.5 rounded-full font-semibold text-sm overflow-hidden bg-white shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/15 transition-all"
                  >
                    <span className="relative text-teal-primary">{t("getStarted")}</span>
                  </Link>
                </>
              )}

              {/* Theme Toggle - Far Right */}
              <ThemeToggle scrolled={scrolled} isHomePage={isHomePage} />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 transition-colors ${textColorMuted} ${textColorHover}`}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/98 backdrop-blur-md">
            <div className="px-6 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={localizedHref(link.href)}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-dark-teal bg-teal-primary/10"
                      : "text-dark-teal/70 hover:text-dark-teal hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Tools Section in Mobile */}
              <div className="pt-2 pb-1">
                <span className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">{t("tools")}</span>
              </div>
              <Link
                href={localizedHref("/tools/cover-letter")}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-dark-teal/70 hover:text-dark-teal hover:bg-gray-50 transition-colors"
              >
                <FileText size={18} className="text-accent-purple" />
                {t("coverLetter")}
              </Link>
              <Link
                href={localizedHref("/tools/resignation-letter")}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-dark-teal/70 hover:text-dark-teal hover:bg-gray-50 transition-colors"
              >
                <FileSignature size={18} className="text-accent-teal" />
                {t("resignationLetter")}
              </Link>

              {/* Theme & Language in Mobile */}
              <div className="px-4 py-3 flex items-center gap-3">
                <ThemeToggle scrolled={true} isHomePage={false} />
                <LanguageSwitcher scrolled={true} isHomePage={false} />
              </div>

              <div className="pt-4 border-t border-gray-200 space-y-2">
                {isAuthenticated ? (
                  <>
                    {user?.role === "admin" && (
                      <Link
                        href={localizedHref("/admin")}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-teal-primary hover:bg-gray-50 transition-colors"
                      >
                        <Shield size={16} />
                        {t("adminPanel")}
                      </Link>
                    )}
                    <Link
                      href={localizedHref("/dashboard")}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-dark-teal/70 hover:text-dark-teal hover:bg-gray-50 transition-colors"
                    >
                      <LayoutDashboard size={16} />
                      {t("dashboard")}
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-3 rounded-lg text-sm font-medium text-dark-teal/70 hover:text-red-500 hover:bg-gray-50 transition-colors"
                    >
                      <LogOut size={16} />
                      {t("logout")}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href={localizedHref("/auth/login")}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg text-sm font-medium text-dark-teal/70 hover:text-dark-teal hover:bg-gray-50 transition-colors"
                    >
                      {t("login")}
                    </Link>
                    <Link
                      href={localizedHref("/auth/register")}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-full text-sm font-semibold text-center bg-gradient-to-r from-teal-primary to-teal-secondary text-white"
                    >
                      {t("getStarted")}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
