import { Request } from 'express';

// Country code to name mapping (ISO 3166-1 alpha-2)
const COUNTRY_NAMES: Record<string, string> = {
  US: 'United States', GB: 'United Kingdom', CA: 'Canada', AU: 'Australia',
  DE: 'Germany', FR: 'France', ES: 'Spain', IT: 'Italy', PT: 'Portugal',
  NL: 'Netherlands', PL: 'Poland', TR: 'Turkey', JP: 'Japan', KR: 'South Korea',
  CN: 'China', TW: 'Taiwan', TH: 'Thailand', VN: 'Vietnam', ID: 'Indonesia',
  MY: 'Malaysia', SG: 'Singapore', PH: 'Philippines', IN: 'India', PK: 'Pakistan',
  BD: 'Bangladesh', NP: 'Nepal', LK: 'Sri Lanka', AE: 'United Arab Emirates',
  SA: 'Saudi Arabia', EG: 'Egypt', NG: 'Nigeria', ZA: 'South Africa',
  KE: 'Kenya', GH: 'Ghana', BR: 'Brazil', MX: 'Mexico', AR: 'Argentina',
  CO: 'Colombia', CL: 'Chile', PE: 'Peru', SE: 'Sweden', NO: 'Norway',
  DK: 'Denmark', FI: 'Finland', IE: 'Ireland', CH: 'Switzerland', AT: 'Austria',
  BE: 'Belgium', CZ: 'Czech Republic', RO: 'Romania', HU: 'Hungary',
  GR: 'Greece', IL: 'Israel', RU: 'Russia', UA: 'Ukraine', NZ: 'New Zealand',
};

function getCountryName(code: string): string {
  return COUNTRY_NAMES[code.toUpperCase()] || code.toUpperCase();
}

/**
 * Extract country info from the request.
 * Uses Cloudflare's CF-IPCountry header (available on all Cloudflare plans).
 * Falls back to countryCode passed in the request body (set by frontend via CF header → cookie).
 */
export function getCountryFromRequest(req: Request, bodyCountryCode?: string): { country: string; countryCode: string } | null {
  // Cloudflare adds this header automatically
  const cfCountry = req.headers['cf-ipcountry'] as string | undefined;

  if (cfCountry && cfCountry !== 'XX' && cfCountry !== 'T1') {
    const code = cfCountry.toUpperCase();
    return {
      countryCode: code,
      country: getCountryName(code),
    };
  }

  // Fallback: countryCode passed from the frontend (read from CF header on the Next.js side)
  if (bodyCountryCode && bodyCountryCode.length === 2) {
    const code = bodyCountryCode.toUpperCase();
    return {
      countryCode: code,
      country: getCountryName(code),
    };
  }

  return null;
}
