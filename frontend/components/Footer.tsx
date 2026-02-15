"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  heading: string;
  links: FooterLink[];
  subSection?: {
    heading: string;
    links: FooterLink[];
  };
}

export default function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navigation");
  const locale = useLocale();

  const localizedHref = (path: string) => `/${locale}${path}`;

  const footerSections: FooterSection[] = [
    {
      heading: t("product"),
      links: [
        { label: tNav("features"), href: "/features" },
        { label: tNav("templates"), href: "/templates" },
        { label: tNav("pricing"), href: "/pricing" },
        { label: t("builder"), href: "/builder" },
        { label: t("resumeFormatGuide"), href: "/resume-format" },
      ],
    },
    {
      heading: t("resumeExamples"),
      links: [
        { label: t("softwareEngineer"), href: "/resume-examples/software-engineer" },
        { label: t("nurse"), href: "/resume-examples/nurse" },
        { label: t("projectManager"), href: "/resume-examples/project-manager" },
        { label: t("marketingManager"), href: "/resume-examples/marketing-manager" },
        { label: t("dataAnalyst"), href: "/resume-examples/data-analyst" },
        { label: t("accountant"), href: "/resume-examples/accountant" },
        { label: t("viewAll300"), href: "/resume-examples" },
      ],
    },
    {
      heading: t("compare"),
      links: [
        { label: t("canvaAlternative"), href: "/canva-alternative" },
        { label: t("overleafAlternative"), href: "/overleaf-alternative" },
        { label: t("resumeIoAlternative"), href: "/resume-io-alternative" },
        { label: t("reziAlternative"), href: "/rezi-alternative" },
        { label: t("zetyAlternative"), href: "/zety-alternative" },
        { label: t("livecareerAlternative"), href: "/livecareer-alternative" },
        { label: t("adobeAlternative"), href: "/adobe-alternative" },
        { label: t("novaAlternative"), href: "/nova-alternative" },
        { label: t("europassAlternative"), href: "/europass-alternative" },
        { label: t("chatgptComparison"), href: "/compare/chatgpt-vs-ai-resume-builder" },
      ],
    },
    {
      heading: t("resources"),
      links: [
        { label: tNav("blog"), href: "/blog" },
        { label: tNav("careerTips"), href: "/career-tips" },
        { label: t("coverLetterGenerator"), href: "/tools/cover-letter" },
        { label: t("resignationLetterGenerator"), href: "/tools/resignation-letter" },
      ],
      subSection: {
        heading: t("careerGuides"),
        links: [
          { label: t("careerGuidance"), href: "/career-tips/career-guidance" },
          { label: t("jobSearchStrategy"), href: "/blog/job-search-strategy" },
          { label: t("careerDevelopmentPlan"), href: "/career-tips/career-development-plan" },
          { label: t("highPayingSkills"), href: "/blog/high-paying-skills" },
          { label: t("interviewPreparation"), href: "/blog/interview-preparation-guide" },
          { label: t("salaryNegotiation"), href: "/blog/salary-negotiation-tips" },
        ],
      },
    },
    {
      heading: t("company"),
      links: [
        { label: t("about"), href: "/about" },
        { label: t("careers"), href: "/career" },
        { label: t("contact"), href: "/contact" },
        { label: t("help"), href: "/help" },
      ],
      subSection: {
        heading: t("legal"),
        links: [
          { label: t("privacy"), href: "/privacy" },
          { label: t("terms"), href: "/terms" },
        ],
      },
    },
  ];

  return (
    <footer className="relative bg-dark-teal">
      {/* Wave Divider at Top */}
      <div className="wave-divider top">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-20 md:h-24">
          <path fill="#1a3a3a" d="M0,0 C480,90 960,20 1440,60 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        {/* Row 1: Brand + CTA */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 pb-10 border-b border-white/10">
          <div>
            <Link href={localizedHref("/")} className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-primary to-teal-secondary rounded-lg flex items-center justify-center font-bold text-white text-base">
                B
              </div>
              <span className="font-bold text-xl text-white">Best AI Resume</span>
            </Link>
            <p className="text-white/70 text-base max-w-sm">{t("tagline")}</p>
          </div>
          <Link href={localizedHref("/builder")}>
            <button className="flex items-center gap-2 bg-gradient-to-r from-teal-primary to-teal-secondary text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition shadow-lg shadow-teal-primary/20">
              {t("buildResumeFree")}
              <ArrowRight size={18} />
            </button>
          </Link>
        </div>

        {/* Row 2: Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10 mb-12">
          {footerSections.map((section) => (
            <div key={section.heading}>
              <h3 className="font-semibold mb-4 text-base text-white">
                {section.heading}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={localizedHref(link.href)}
                      className="text-white/70 hover:text-teal-primary transition text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Sub-section (Legal under Company) */}
              {section.subSection && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-3 text-sm text-white/80">
                    {section.subSection.heading}
                  </h4>
                  <ul className="space-y-2.5">
                    {section.subSection.links.map((link) => (
                      <li key={link.href + link.label}>
                        <Link
                          href={localizedHref(link.href)}
                          className="text-white/70 hover:text-teal-primary transition text-sm"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Row 3: Copyright */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-white/70 text-sm">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
