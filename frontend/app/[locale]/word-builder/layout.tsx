import type { Metadata } from 'next';

// Word builder is an app/tool route (like /builder, /canvas-editor), not an
// indexable content page. Without this, it inherited the homepage canonical
// (pointing at "/") while staying indexable — the exact "Duplicate, Google
// chose different canonical than user" conflict. noindex resolves it.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function WordBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
