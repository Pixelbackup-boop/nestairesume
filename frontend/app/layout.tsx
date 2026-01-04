import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter-var",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// SEO Configuration
const siteConfig = {
  name: "ResumeAI",
  description: "Create professional, ATS-optimized resumes in minutes with AI. Free to try, no signup required. 50+ templates, instant PDF download.",
  url: "https://resumeai.com", // Update with actual domain
  ogImage: "/og-image.png",
  keywords: [
    "resume builder",
    "CV maker",
    "AI resume",
    "ATS resume",
    "free resume builder",
    "professional resume",
    "resume templates",
    "CV templates",
    "job application",
    "career tools",
  ],
};

export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: `${siteConfig.name} - Build Your Perfect Resume with AI`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Open Graph (Facebook, LinkedIn)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - Build Your Perfect Resume with AI`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - AI Resume Builder`,
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - Build Your Perfect Resume with AI`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@resumeai", // Update with actual Twitter handle
  },

  // Verification (add your actual verification codes)
  // verification: {
  //   google: "your-google-verification-code",
  //   yandex: "your-yandex-verification-code",
  // },

  // Alternate languages (if supporting multiple languages)
  // alternates: {
  //   canonical: siteConfig.url,
  //   languages: {
  //     "en-US": `${siteConfig.url}/en`,
  //     "es-ES": `${siteConfig.url}/es`,
  //   },
  // },

  // App-specific
  applicationName: siteConfig.name,
  category: "technology",
};

// Viewport configuration (separated from metadata in Next.js 14+)
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#080b12" },
    { media: "(prefers-color-scheme: dark)", color: "#080b12" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
