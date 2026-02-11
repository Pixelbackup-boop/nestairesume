import { describe, it, expect } from 'vitest';
import {
  hexToRgb,
  getLuminance,
  getContrastText,
  parseDualColor,
  hexToRgba,
} from '../colorUtils';

describe('hexToRgb', () => {
  it('parses hex with # prefix', () => {
    expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 });
  });

  it('parses hex without # prefix', () => {
    expect(hexToRgb('00ff00')).toEqual({ r: 0, g: 255, b: 0 });
  });

  it('parses black', () => {
    expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
  });

  it('parses white', () => {
    expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
  });

  it('returns {0,0,0} for invalid hex', () => {
    expect(hexToRgb('xyz')).toEqual({ r: 0, g: 0, b: 0 });
    expect(hexToRgb('')).toEqual({ r: 0, g: 0, b: 0 });
    expect(hexToRgb('#ff')).toEqual({ r: 0, g: 0, b: 0 });
  });

  it('is case-insensitive', () => {
    expect(hexToRgb('#AABBCC')).toEqual(hexToRgb('#aabbcc'));
  });
});

describe('getLuminance', () => {
  it('returns 0 for black', () => {
    expect(getLuminance('#000000')).toBe(0);
  });

  it('returns 1 for white', () => {
    expect(getLuminance('#ffffff')).toBe(1);
  });

  it('weights green highest (0.7152)', () => {
    const lumGreen = getLuminance('#00ff00');
    const lumRed = getLuminance('#ff0000');
    const lumBlue = getLuminance('#0000ff');
    expect(lumGreen).toBeGreaterThan(lumRed);
    expect(lumGreen).toBeGreaterThan(lumBlue);
    expect(lumRed).toBeGreaterThan(lumBlue);
  });

  it('returns value between 0 and 1 for mid-gray', () => {
    const lum = getLuminance('#808080');
    expect(lum).toBeGreaterThan(0);
    expect(lum).toBeLessThan(1);
  });
});

describe('getContrastText', () => {
  it('returns light text for dark backgrounds', () => {
    expect(getContrastText('#000000')).toBe('#f8fafc');
    expect(getContrastText('#1e3a8a')).toBe('#f8fafc');
    expect(getContrastText('#1a3a3a')).toBe('#f8fafc');
  });

  it('returns dark text for light backgrounds', () => {
    expect(getContrastText('#ffffff')).toBe('#1e293b');
    expect(getContrastText('#f8fafc')).toBe('#1e293b');
    expect(getContrastText('#dbeafe')).toBe('#1e293b');
  });

  it('uses 0.179 luminance threshold (WCAG 2.0)', () => {
    // Colors near the threshold — verify the boundary behavior
    // #757575 has luminance ~0.178 (below 0.179) → light text
    expect(getContrastText('#757575')).toBe('#f8fafc');
    // #767676 has luminance ~0.181 (above 0.179) → dark text
    expect(getContrastText('#767676')).toBe('#1e293b');
  });
});

describe('parseDualColor', () => {
  const defaults = { primary: '#0f172a', secondary: '#facc15' };

  it('returns defaults for undefined input', () => {
    expect(parseDualColor(undefined)).toEqual(defaults);
  });

  it('returns defaults for empty string', () => {
    expect(parseDualColor('')).toEqual(defaults);
  });

  it('uses single color as secondary (backward compat)', () => {
    const result = parseDualColor('#ff0000');
    expect(result.primary).toBe(defaults.primary);
    expect(result.secondary).toBe('#ff0000');
  });

  it('parses "primary|secondary" format', () => {
    const result = parseDualColor('#111111|#222222');
    expect(result.primary).toBe('#111111');
    expect(result.secondary).toBe('#222222');
  });

  it('falls back to defaults for empty parts', () => {
    const result = parseDualColor('|#222222');
    expect(result.primary).toBe(defaults.primary);
    expect(result.secondary).toBe('#222222');
  });

  it('accepts custom defaults', () => {
    const custom = { primary: '#aaa', secondary: '#bbb' };
    expect(parseDualColor(undefined, custom)).toEqual(custom);
  });
});

describe('hexToRgba', () => {
  it('converts hex to rgba with given opacity', () => {
    expect(hexToRgba('#ff0000', 0.5)).toBe('rgba(255, 0, 0, 0.5)');
  });

  it('handles opacity 0', () => {
    expect(hexToRgba('#000000', 0)).toBe('rgba(0, 0, 0, 0)');
  });

  it('handles opacity 1', () => {
    expect(hexToRgba('#ffffff', 1)).toBe('rgba(255, 255, 255, 1)');
  });

  it('works without # prefix', () => {
    expect(hexToRgba('0000ff', 0.8)).toBe('rgba(0, 0, 255, 0.8)');
  });
});
