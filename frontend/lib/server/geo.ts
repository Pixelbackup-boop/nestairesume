/**
 * Country capture from Cloudflare's CF-IPCountry header.
 * Ported from backend getCountryFromRequest (backend/src/lib/geoLocation.ts).
 */

export interface GeoInfo {
  country: string;
  countryCode: string;
}

// Static ISO 3166-1 alpha-2 → name map, same as the backend's.
// Deliberately NOT Intl.DisplayNames: its names track the runtime's CLDR version,
// and admin analytics groups users by the stored `country` string — a CLDR rename
// (e.g. 'Czech Republic' → 'Czechia') would split one countryCode into two rows.
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
  return COUNTRY_NAMES[code] || code;
}

/** 'XX' (unknown) and 'T1' (Tor) are Cloudflare's non-country sentinels. */
export function getCountryFromHeaders(headers: Headers): GeoInfo | null {
  const cfCountry = headers.get('cf-ipcountry');
  if (!cfCountry || cfCountry === 'XX' || cfCountry === 'T1') return null;

  const code = cfCountry.toUpperCase();
  return { countryCode: code, country: getCountryName(code) };
}

/** Header wins; body countryCode is the fallback — same precedence as the backend. */
export function getCountryFromRequest(request: Request, bodyCountryCode?: string): GeoInfo | null {
  const fromHeader = getCountryFromHeaders(request.headers);
  if (fromHeader) return fromHeader;

  if (bodyCountryCode && bodyCountryCode.length === 2) {
    const code = bodyCountryCode.toUpperCase();
    return { countryCode: code, country: getCountryName(code) };
  }

  return null;
}
