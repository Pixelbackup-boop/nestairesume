"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useAuthStore } from "@/store/useAuthStore";
import { LogOut, LayoutDashboard, Shield, ChevronDown, FileText, FileSignature, BookOpen, Newspaper, ArrowRight, Layers, User, ScanSearch, Mic } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import UserDropdown from "./UserDropdown";
import MegaMenuPanel from "./MegaMenuPanel";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Navigation");
  const { isAuthenticated, user, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mega menu on route change
  useEffect(() => {
    setActiveMenu(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    router.push(`/${locale}`);
  };

  const localizedHref = useCallback((path: string) => `/${locale}${path}`, [locale]);

  const toggleMenu = useCallback((menu: string) => {
    setActiveMenu(prev => prev === menu ? null : menu);
  }, []);

  const closeMenu = useCallback(() => {
    setActiveMenu(null);
  }, []);

  const isMenuActive = (menu: string): boolean => {
    switch (menu) {
      case "templates": return pathname.includes("/templates");
      case "resources": return pathname.includes("/career-tips") || pathname.includes("/blog") || pathname.includes("/tools") || pathname.includes("/resume-format");
      default: return false;
    }
  };

  const isActive = (href: string) => pathname === localizedHref(href);
  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

  const textColor = scrolled || !isHomePage ? "text-dark-teal" : "text-white";
  const textColorMuted = scrolled || !isHomePage ? "text-dark-teal/70" : "text-white/80";
  const textColorHover = scrolled || !isHomePage ? "hover:text-dark-teal" : "hover:text-white";
  const activeTextColor = "text-white bg-teal-primary";

  const menuBtnClass = (menu: string) =>
    `flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isMenuActive(menu) || activeMenu === menu
        ? activeTextColor
        : `${textColorMuted} ${textColorHover}`
    }`;

  // Shared link style for mega menu items
  const megaLinkClass = "block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors";
  const megaSectionHeader = "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4";
  const megaViewAll = "flex items-center gap-1 mt-3 px-3 text-sm font-medium text-teal-primary hover:text-teal-secondary transition-colors";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-white/98 backdrop-blur-md shadow-lg shadow-teal-primary/10"
            : isHomePage
              ? "bg-dark-teal/20"
              : "bg-white/98 backdrop-blur-md"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link href={localizedHref("/")} className="flex items-center gap-3 group">
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt="Best AI Resume Logo"
                  width={40}
                  height={40}
                  className="rounded-lg shadow-lg shadow-teal-primary/20 group-hover:shadow-teal-primary/40 transition-shadow"
                  priority
                />
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
            <div className="hidden lg:flex items-center gap-1">
              {/* Templates ▾ */}
              <button data-mega-trigger onClick={() => toggleMenu("templates")} className={menuBtnClass("templates")}>
                {t("templates")}
                <ChevronDown size={14} className={`transition-transform ${activeMenu === "templates" ? "rotate-180" : ""}`} />
              </button>

              {/* Resources ▾ */}
              <button data-mega-trigger onClick={() => toggleMenu("resources")} className={menuBtnClass("resources")}>
                {t("resources")}
                <ChevronDown size={14} className={`transition-transform ${activeMenu === "resources" ? "rotate-180" : ""}`} />
              </button>

              {/* Pricing (simple link) */}
              <Link
                href={localizedHref("/pricing")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive("/pricing") ? activeTextColor : `${textColorMuted} ${textColorHover}`
                }`}
              >
                {t("pricing")}
              </Link>
            </div>

            {/* Right Side */}
            <div className="hidden lg:flex items-center gap-3">
              <LanguageSwitcher scrolled={scrolled} isHomePage={isHomePage} />

              {isAuthenticated ? (
                <UserDropdown scrolled={scrolled} isHomePage={isHomePage} />
              ) : (
                <>
                  <Link href={localizedHref("/auth/login")} className={`px-4 py-2 text-sm font-medium transition-colors ${textColorMuted} ${textColorHover}`}>
                    {t("login")}
                  </Link>
                  <Link href={localizedHref("/auth/register")} className="group relative px-5 py-2.5 rounded-full font-semibold text-sm overflow-hidden bg-white shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/15 transition-all">
                    <span className="relative text-teal-primary">{t("getStarted")}</span>
                  </Link>
                </>
              )}

            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 transition-colors ${textColorMuted} ${textColorHover}`}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
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

        {/* ============================================
            MEGA MENU PANELS (Desktop)
           ============================================ */}

        {/* Templates Mega Menu */}
        <MegaMenuPanel isOpen={activeMenu === "templates"} onClose={closeMenu}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_280px] gap-6 lg:gap-8">
            <div>
              <h3 className={megaSectionHeader}>{t("byStyle")}</h3>
              <div className="space-y-1">
                <Link href={localizedHref("/templates/modern")} onClick={closeMenu} className={megaLinkClass}>{t("modern")}</Link>
                <Link href={localizedHref("/templates/creative")} onClick={closeMenu} className={megaLinkClass}>{t("creative")}</Link>
                <Link href={localizedHref("/templates/simple")} onClick={closeMenu} className={megaLinkClass}>{t("simpleClean")}</Link>
              </div>
              <Link href={localizedHref("/templates")} onClick={closeMenu} className={megaViewAll}>
                {t("allTemplates")} <ArrowRight size={14} />
              </Link>
            </div>
            <div>
              <h3 className={megaSectionHeader}>{t("byFormat")}</h3>
              <div className="space-y-1">
                <Link href={localizedHref("/templates/ats-friendly")} onClick={closeMenu} className={megaLinkClass}>{t("atsFriendly")}</Link>
                <Link href={localizedHref("/templates/microsoftword")} onClick={closeMenu} className={megaLinkClass}>{t("microsoftWord")}</Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-teal-primary/10 to-teal-secondary/10 rounded-xl p-6 flex flex-col justify-center">
              <div className="w-10 h-10 bg-teal-primary/20 rounded-lg flex items-center justify-center mb-3">
                <Layers size={20} className="text-teal-primary" />
              </div>
              <h4 className="font-bold text-lg text-gray-900 mb-1">{t("buildResumeFree")}</h4>
              <p className="text-sm text-gray-600 mb-4">{t("chooseFromTemplates")}</p>
              <Link href={localizedHref("/builder")} onClick={closeMenu} className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-primary to-teal-secondary text-white rounded-lg font-semibold text-sm hover:opacity-90 transition w-fit">
                {t("getStarted")} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </MegaMenuPanel>

        {/* Resources Mega Menu */}
        <MegaMenuPanel isOpen={activeMenu === "resources"} onClose={closeMenu}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div>
              <h3 className={megaSectionHeader}>
                <span className="flex items-center gap-2">
                  <BookOpen size={14} className="text-teal-primary" />
                  {t("guides")}
                </span>
              </h3>
              <div className="space-y-1">
                <Link href={localizedHref("/resume-format")} onClick={closeMenu} className={megaLinkClass}>{t("resumeFormat")}</Link>
                <Link href={localizedHref("/career-tips/how-to-write-ats-friendly-resume")} onClick={closeMenu} className={megaLinkClass}>{t("atsGuide")}</Link>
                <Link href={localizedHref("/career-tips/how-to-write-cover-letter")} onClick={closeMenu} className={megaLinkClass}>{t("coverLetterGuide")}</Link>
                <Link href={localizedHref("/career-tips/interview-preparation-guide")} onClick={closeMenu} className={megaLinkClass}>{t("interviewPrep")}</Link>
              </div>
              <Link href={localizedHref("/career-tips")} onClick={closeMenu} className={megaViewAll}>
                {t("allCareerTips")} <ArrowRight size={14} />
              </Link>
            </div>
            <div>
              <h3 className={megaSectionHeader}>
                <span className="flex items-center gap-2">
                  <Newspaper size={14} className="text-accent-blue" />
                  {t("latestPosts")}
                </span>
              </h3>
              <div className="space-y-1">
                <Link href={localizedHref("/blog/best-resume-builder-apps")} onClick={closeMenu} className={megaLinkClass}>{t("bestResumeApps")}</Link>
                <Link href={localizedHref("/blog/how-to-list-skills-on-resume")} onClick={closeMenu} className={megaLinkClass}>{t("resumeSkills")}</Link>
                <Link href={localizedHref("/blog/linkedin-profile-optimization")} onClick={closeMenu} className={megaLinkClass}>{t("linkedinGuide")}</Link>
                <Link href={localizedHref("/blog/best-resume-writing-services")} onClick={closeMenu} className={megaLinkClass}>{t("writingServices")}</Link>
              </div>
              <Link href={localizedHref("/blog")} onClick={closeMenu} className={megaViewAll}>
                {t("allBlog")} <ArrowRight size={14} />
              </Link>
            </div>
            <div>
              <h3 className={megaSectionHeader}>
                <span className="flex items-center gap-2">
                  <FileText size={14} className="text-accent-purple" />
                  {t("tools")}
                </span>
              </h3>
              <div className="space-y-1">
                <Link href={localizedHref("/tools/cover-letter")} onClick={closeMenu} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-accent-purple/10 rounded-lg flex items-center justify-center shrink-0">
                    <FileText size={16} className="text-accent-purple" />
                  </div>
                  <div>
                    <div className="font-medium">{t("coverLetter")}</div>
                    <div className="text-xs text-gray-500">{t("coverLetterDesc")}</div>
                  </div>
                </Link>
                <Link href={localizedHref("/tools/resignation-letter")} onClick={closeMenu} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-teal-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <FileSignature size={16} className="text-teal-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{t("resignationLetter")}</div>
                    <div className="text-xs text-gray-500">{t("resignationLetterDesc")}</div>
                  </div>
                </Link>
                <Link href={localizedHref("/tools/ats-checker")} onClick={closeMenu} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-accent-blue/10 rounded-lg flex items-center justify-center shrink-0">
                    <ScanSearch size={16} className="text-accent-blue" />
                  </div>
                  <div>
                    <div className="font-medium">{t("atsChecker")}</div>
                    <div className="text-xs text-gray-500">{t("atsCheckerDesc")}</div>
                  </div>
                </Link>
                <Link href={localizedHref("/tools/mock-interview")} onClick={closeMenu} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                    <Mic size={16} className="text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">{t("mockInterview")}</div>
                    <div className="text-xs text-gray-500">{t("mockInterviewDesc")}</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </MegaMenuPanel>

        {/* ============================================
            MOBILE MENU
           ============================================ */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white/98 backdrop-blur-md max-h-[calc(100vh-72px)] overflow-y-auto">
            <div className="px-6 py-4 space-y-2">

              {/* Templates Section */}
              <div className="pt-2 pb-1">
                <span className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">{t("templates")}</span>
              </div>
              {[
                { href: "/templates/modern", labelKey: "modern" as const },
                { href: "/templates/creative", labelKey: "creative" as const },
                { href: "/templates/simple", labelKey: "simpleClean" as const },
                { href: "/templates/ats-friendly", labelKey: "atsFriendly" as const },
                { href: "/templates/microsoftword", labelKey: "microsoftWord" as const },
              ].map(link => (
                <Link key={link.href} href={localizedHref(link.href)} onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-sm font-medium text-dark-teal/70 hover:text-dark-teal hover:bg-gray-50 transition-colors">
                  {t(link.labelKey)}
                </Link>
              ))}
              <Link href={localizedHref("/templates")} onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-teal-primary">
                {t("allTemplates")} <ArrowRight size={14} />
              </Link>

              {/* Resources Section */}
              <div className="pt-3 pb-1">
                <span className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">{t("resources")}</span>
              </div>
              <Link href={localizedHref("/blog")} onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-dark-teal/70 hover:text-dark-teal hover:bg-gray-50 transition-colors">
                <Newspaper size={18} className="text-accent-blue" /> {t("blog")}
              </Link>
              <Link href={localizedHref("/career-tips")} onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-dark-teal/70 hover:text-dark-teal hover:bg-gray-50 transition-colors">
                <BookOpen size={18} className="text-accent-purple" /> {t("careerTips")}
              </Link>
              <Link href={localizedHref("/tools/cover-letter")} onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-dark-teal/70 hover:text-dark-teal hover:bg-gray-50 transition-colors">
                <FileText size={18} className="text-accent-purple" /> {t("coverLetter")}
              </Link>
              <Link href={localizedHref("/tools/resignation-letter")} onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-dark-teal/70 hover:text-dark-teal hover:bg-gray-50 transition-colors">
                <FileSignature size={18} className="text-teal-primary" /> {t("resignationLetter")}
              </Link>
              <Link href={localizedHref("/tools/ats-checker")} onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-dark-teal/70 hover:text-dark-teal hover:bg-gray-50 transition-colors">
                <ScanSearch size={18} className="text-accent-blue" /> {t("atsChecker")}
              </Link>
              <Link href={localizedHref("/tools/mock-interview")} onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-dark-teal/70 hover:text-dark-teal hover:bg-gray-50 transition-colors">
                <Mic size={18} className="text-green-600" /> {t("mockInterview")}
              </Link>

              {/* Pricing */}
              <div className="pt-3 pb-1">
                <Link href={localizedHref("/pricing")} onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-dark-teal hover:bg-gray-50 transition-colors">
                  {t("pricing")}
                </Link>
              </div>

              {/* Language */}
              <div className="px-4 py-3 flex items-center gap-3">
                <LanguageSwitcher scrolled={true} isHomePage={false} />
              </div>

              {/* Auth */}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link href={localizedHref("/profile")} onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-dark-teal/70 hover:text-dark-teal hover:bg-gray-50 transition-colors">
                      <User size={16} /> {t("profile") || "Profile"}
                    </Link>
                    <Link href={localizedHref("/dashboard")} onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-dark-teal/70 hover:text-dark-teal hover:bg-gray-50 transition-colors">
                      <LayoutDashboard size={16} /> {t("dashboard")}
                    </Link>
                    {user?.role === "admin" && (
                      <Link href={localizedHref("/admin")} onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-teal-primary hover:bg-gray-50 transition-colors">
                        <Shield size={16} /> {t("adminPanel")}
                      </Link>
                    )}
                    <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                      className="flex items-center gap-2 w-full px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
                      <LogOut size={16} /> {t("logout")}
                    </button>
                  </>
                ) : (
                  <>
                    <Link href={localizedHref("/auth/login")} onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg text-sm font-medium text-dark-teal/70 hover:text-dark-teal hover:bg-gray-50 transition-colors">
                      {t("login")}
                    </Link>
                    <Link href={localizedHref("/auth/register")} onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-full text-sm font-semibold text-center bg-gradient-to-r from-teal-primary to-teal-secondary text-white">
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
