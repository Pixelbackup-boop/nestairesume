import { NextResponse } from 'next/server';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bestairesumes.com';

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${siteUrl}/sitemap/0.xml</loc></sitemap>
  <sitemap><loc>${siteUrl}/sitemap/1.xml</loc></sitemap>
  <sitemap><loc>${siteUrl}/sitemap/2.xml</loc></sitemap>
  <sitemap><loc>${siteUrl}/sitemap/3.xml</loc></sitemap>
  <sitemap><loc>${siteUrl}/sitemap/4.xml</loc></sitemap>
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
