import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'CanvasEditor.meta' });

  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function CanvasEditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
