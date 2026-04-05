'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

// Stripe branded wordmark — uses Stripe's official brand color (#635BFF)
function StripeLogo({ className = '', light = false }: { className?: string; light?: boolean }) {
  return (
    <span
      className={`font-bold tracking-tight ${className}`}
      style={{
        color: light ? 'rgba(255,255,255,0.7)' : '#635BFF',
        fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
      }}
      aria-label="Stripe"
    >
      stripe
    </span>
  );
}

// Lock icon
function LockIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

// Shield check icon
function ShieldCheckIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

// Payment card brand icons — using inline styles for reliable rendering in Tailwind v4
const cardStyle: React.CSSProperties = {
  height: 28,
  width: 44,
  borderRadius: 4,
  border: '1px solid #e5e7eb',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fff',
  flexShrink: 0,
};

function VisaIcon() {
  return (
    <span style={{ ...cardStyle, backgroundColor: '#1A1F71', borderColor: '#1A1F71', position: 'relative', overflow: 'hidden' }} aria-label="Visa">
      {/* Gold accent stripe */}
      <span style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(to right, #F7B600, #F79E1B)' }} />
      <span style={{ fontSize: 11, fontWeight: 800, fontStyle: 'italic', letterSpacing: -0.5, color: '#fff', position: 'relative', zIndex: 1, marginTop: -2 }}>VISA</span>
    </span>
  );
}

function MastercardIcon() {
  return (
    <span style={cardStyle} aria-label="Mastercard">
      <svg width="26" height="16" viewBox="0 0 32 20" fill="none">
        <circle cx="12" cy="10" r="6" fill="#EB001B" />
        <circle cx="20" cy="10" r="6" fill="#F79E1B" />
        <path d="M16 5.46a5.97 5.97 0 0 1 0 9.08 5.97 5.97 0 0 1 0-9.08z" fill="#FF5F00" />
      </svg>
    </span>
  );
}

function AmexIcon() {
  return (
    <span style={{ ...cardStyle, backgroundColor: '#006FCF', borderColor: '#006FCF' }} aria-label="American Express">
      <span style={{ fontSize: 8, fontWeight: 800, color: '#fff', letterSpacing: 0.5 }}>AMEX</span>
    </span>
  );
}

function ApplePayIcon() {
  return (
    <span style={cardStyle} aria-label="Apple Pay">
      <span style={{ fontSize: 10, fontWeight: 600, color: '#000' }}>&#63743; Pay</span>
    </span>
  );
}

function GooglePayIcon() {
  return (
    <span style={cardStyle} aria-label="Google Pay">
      <svg width="30" height="14" viewBox="0 0 30 14" fill="none">
        <path d="M14.26 7.1v2.7h-.86V3.2h2.28c.55 0 1.01.18 1.39.55.39.36.58.8.58 1.32 0 .53-.19.97-.58 1.33-.37.36-.84.54-1.39.54h-1.42v.16zm0-3.1v2.14h1.44c.33 0 .6-.11.82-.33.23-.22.34-.49.34-.8 0-.3-.11-.56-.34-.78a1.09 1.09 0 0 0-.82-.33h-1.44v.1z" fill="#5F6368" />
        <path d="M20.2 5.38c.63 0 1.13.17 1.49.51.36.34.54.8.54 1.39v2.82h-.82v-.64h-.04c-.35.52-.82.78-1.4.78-.5 0-.91-.15-1.25-.44-.33-.3-.5-.67-.5-1.12 0-.47.18-.85.55-1.13.37-.28.86-.42 1.47-.42.52 0 .95.1 1.28.28v-.2c0-.33-.13-.61-.38-.84a1.24 1.24 0 0 0-.87-.34c-.5 0-.9.21-1.18.64l-.76-.48c.42-.63 1.04-.95 1.87-.95v-.06zm-1.1 3.44c0 .25.1.45.32.61.21.16.45.24.72.24.39 0 .73-.14 1.02-.43.29-.29.43-.62.43-.99-.27-.21-.64-.31-1.13-.31-.36 0-.65.09-.89.26-.24.17-.36.38-.36.62h-.11z" fill="#5F6368" />
        <path d="M27.1 5.52l-2.9 6.68h-.88l1.08-2.34-1.91-4.34h.93l1.39 3.36h.02l1.35-3.36h.92z" fill="#5F6368" />
        <path d="M10.44 6.72c0-.27-.02-.53-.07-.78H7.04v1.47h1.9a1.63 1.63 0 0 1-.7 1.07v.88h1.13c.66-.61 1.07-1.52 1.07-2.64z" fill="#4285F4" />
        <path d="M7.04 10.2c.95 0 1.74-.31 2.32-.85l-1.13-.88c-.32.21-.72.34-1.19.34-.91 0-1.69-.62-1.96-1.45H3.92v.91A3.5 3.5 0 0 0 7.04 10.2z" fill="#34A853" />
        <path d="M5.08 7.36a2.1 2.1 0 0 1 0-1.34v-.91H3.92a3.5 3.5 0 0 0 0 3.16l1.16-.91z" fill="#FBBC04" />
        <path d="M7.04 4.57c.51 0 .97.18 1.33.52l1-.99A3.37 3.37 0 0 0 7.04 3.2a3.5 3.5 0 0 0-3.12 1.91l1.16.91c.27-.83 1.05-1.45 1.96-1.45z" fill="#EA4335" />
      </svg>
    </span>
  );
}

/**
 * Full trust badge — use below pricing grids on homepage and pricing page.
 * Shows Stripe logo, payment method icons, PCI compliance, and encryption info.
 */
export function StripeTrustBadgeFull({ className = '' }: { className?: string }) {
  const t = useTranslations('TrustBadge');

  return (
    <div className={`mt-10 ${className}`}>
      {/* Main trust bar */}
      <div className="flex flex-col items-center gap-5">
        {/* Row 1: Stripe powered + payment methods */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2 text-gray-500">
            <LockIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{t('poweredBy')}</span>
            <StripeLogo className="text-base" />
          </div>

          <span className="hidden sm:block w-px h-5 bg-gray-200" />

          {/* Payment method icons */}
          <div className="flex items-center gap-1.5 opacity-70">
            <VisaIcon />
            <MastercardIcon />
            <AmexIcon />
            <ApplePayIcon />
            <GooglePayIcon />
          </div>
        </div>

        {/* Row 2: Security badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheckIcon className="w-3.5 h-3.5" />
            <span>{t('pciCompliant')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <LockIcon className="w-3.5 h-3.5" />
            <span>{t('encrypted')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            <span>{t('noCardStored')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Compact inline badge — use on CTA buttons or in modals.
 * Shows lock + "Secure checkout via Stripe" in a single line.
 */
export function StripeTrustBadgeCompact({ className = '' }: { className?: string }) {
  const t = useTranslations('TrustBadge');

  return (
    <div className={`flex items-center justify-center gap-1.5 text-xs text-gray-400 ${className}`}>
      <LockIcon className="w-3 h-3" />
      <span>{t('secureCheckout')}</span>
      <StripeLogo className="text-xs" />
    </div>
  );
}

/**
 * Inline badge for dark backgrounds (e.g., Diamond card with teal gradient).
 */
export function StripeTrustBadgeLight({ className = '' }: { className?: string }) {
  const t = useTranslations('TrustBadge');

  return (
    <div className={`flex items-center justify-center gap-1.5 text-xs text-white/50 ${className}`}>
      <LockIcon className="w-3 h-3" />
      <span>{t('secureCheckout')}</span>
      <StripeLogo className="text-xs" light />
    </div>
  );
}
