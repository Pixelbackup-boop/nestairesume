import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Under Maintenance | Best AI Resume',
  description: 'Our site is currently undergoing scheduled maintenance. We will be back shortly.',
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f0fdf9 0%, #e8faf4 50%, #f5f5f5 100%)',
        padding: '24px',
        fontFamily: "'Poppins', 'Segoe UI', sans-serif",
      }}
    >
      <div style={{ maxWidth: '520px', textAlign: 'center' }}>
        {/* Gear/Wrench Icon */}
        <div style={{ marginBottom: '24px' }}>
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00d4aa"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ margin: '0 auto' }}
          >
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
        </div>

        <h1
          style={{
            fontSize: '32px',
            fontWeight: 700,
            color: '#1a3a3a',
            marginBottom: '12px',
            lineHeight: 1.2,
          }}
        >
          Under Maintenance
        </h1>

        <p
          style={{
            fontSize: '17px',
            color: '#1a3a3a',
            opacity: 0.7,
            lineHeight: 1.7,
            marginBottom: '32px',
          }}
        >
          We&apos;re currently performing scheduled maintenance to improve your
          experience. We&apos;ll be back shortly &mdash; thank you for your patience!
        </p>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            backgroundColor: 'rgba(0, 212, 170, 0.1)',
            borderRadius: '10px',
            color: '#00d4aa',
            fontWeight: 600,
            fontSize: '15px',
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          We&apos;ll be back soon
        </div>
      </div>
    </div>
  );
}
