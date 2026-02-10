// Shared types for locale-aware page content

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ComparisonRow {
  feature: string;
  competitor: string;
  ours: string;
}

export interface StatCard {
  value: string;
  label: string;
}

export interface ReasonCard {
  title: string;
  description: string;
}

export interface CrossLinkItem {
  href: string;
  title: string;
  subtitle: string;
}

export interface GuideLinkItem {
  href: string;
  label: string;
}

export interface ExternalLinkItem {
  href: string;
  label: string;
}

export interface FreeFeatureItem {
  feature: string;
  description: string;
}

export interface ComparisonPageContent {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  schemas: {
    breadcrumbName: string;
    articleHeadline: string;
    articleDescription: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  problem: {
    title: string;
    description: string;
    stats: StatCard[];
  };
  comparison: {
    title: string;
    subtitle: string;
    competitorName: string;
    oursName: string;
    rows: ComparisonRow[];
  };
  whySwitch: {
    title: string;
    subtitle: string;
    reasons: ReasonCard[];
  };
  shortcomings?: {
    title: string;
    items: ReasonCard[];
  };
  recommendation: {
    title: string;
    useCompetitor: { title: string; items: string[] };
    useUs: { title: string; items: string[] };
    bottomLine?: string;
  };
  resumeExamples: {
    title: string;
    description: string;
    ctaBrowse: string;
    ctaTemplates: string;
  };
  faq: {
    title: string;
    items: FaqItem[];
  };
  crossLinks: {
    title: string;
    items: CrossLinkItem[];
    guidesTitle: string;
    guides: GuideLinkItem[];
  };
  externalResources: {
    title: string;
    items: ExternalLinkItem[];
  };
  bottomCta: {
    title: string;
    description: string;
    cta: string;
    subtext: string;
  };
}

export interface LandingPageContent {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  schemas: {
    breadcrumbName: string;
    articleHeadline: string;
    articleDescription: string;
    softwareAppName?: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trustBadges?: string[];
  };
  features: {
    title: string;
    subtitle: string;
    items: FreeFeatureItem[];
    cta: string;
  };
  comparison?: {
    title: string;
    subtitle: string;
    oursName: string;
    othersName: string;
    rows: { feature: string; ours: string; others: string }[];
  };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: { step: number; title: string; description: string }[];
    cta: string;
  };
  trust?: {
    title: string;
    stats: StatCard[];
  };
  templates?: {
    title: string;
    subtitle: string;
    styles: string[];
    cta: string;
  };
  faq: {
    title: string;
    items: FaqItem[];
  };
  crossLinks: {
    title: string;
    items: CrossLinkItem[];
    guidesTitle: string;
    guides: GuideLinkItem[];
  };
  bottomCta: {
    title: string;
    description: string;
    cta: string;
    subtext: string;
  };
}

/** Helper to select content by locale with English fallback */
export function selectContent<T>(contentMap: Record<string, T>, locale: string): T {
  return contentMap[locale] || contentMap['en'];
}
