import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | Best AI Resume',
  description: 'The page you are looking for does not exist. Browse resume examples, templates, or return to the homepage.',
};

export default function NotFound() {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "'Poppins', 'Segoe UI', sans-serif" }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f0fdf9 0%, #e8faf4 50%, #f5f5f5 100%)',
            padding: '24px',
          }}
        >
          <div style={{ maxWidth: '480px', textAlign: 'center' }}>
            <div
              style={{
                fontSize: '120px',
                fontWeight: 800,
                lineHeight: 1,
                color: '#00d4aa',
                marginBottom: '8px',
              }}
            >
              404
            </div>
            <h1
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#1a3a3a',
                marginBottom: '12px',
              }}
            >
              Page Not Found
            </h1>
            <p
              style={{
                fontSize: '16px',
                color: '#1a3a3a',
                opacity: 0.7,
                lineHeight: 1.6,
                marginBottom: '32px',
              }}
            >
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
              Let&apos;s get you back on track.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link
                href="/en"
                style={{
                  display: 'block',
                  padding: '14px 24px',
                  backgroundColor: '#00d4aa',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '16px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
              >
                Back to Home
              </Link>
              <Link
                href="/en/resume-examples"
                style={{
                  display: 'block',
                  padding: '14px 24px',
                  backgroundColor: 'rgba(0, 212, 170, 0.1)',
                  color: '#00d4aa',
                  fontWeight: 600,
                  fontSize: '16px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                }}
              >
                Browse Resume Examples
              </Link>
              <Link
                href="/en/templates"
                style={{
                  display: 'block',
                  padding: '14px 24px',
                  backgroundColor: 'rgba(0, 212, 170, 0.1)',
                  color: '#00d4aa',
                  fontWeight: 600,
                  fontSize: '16px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                }}
              >
                View Templates
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
