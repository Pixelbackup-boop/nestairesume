'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
                fontSize: '64px',
                fontWeight: 800,
                lineHeight: 1,
                color: '#00d4aa',
                marginBottom: '16px',
              }}
            >
              Oops!
            </div>
            <h1
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#1a3a3a',
                marginBottom: '12px',
              }}
            >
              Something went wrong
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
              An unexpected error occurred. Your data is safe — try refreshing the page.
            </p>
            <button
              onClick={reset}
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                backgroundColor: '#00d4aa',
                color: '#fff',
                fontWeight: 600,
                fontSize: '16px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
