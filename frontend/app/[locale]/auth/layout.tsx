import type { Metadata } from 'next';

const siteConfig = {
  name: 'Best AI Resume',
  url: 'https://www.bestairesumes.com',
};

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
