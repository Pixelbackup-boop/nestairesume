import { describe, it, expect } from 'vitest';
import {
  generateTheme,
  layoutPresets,
  colorPresets,
  getPatternSVG,
  getBackgroundStyle,
  getGoogleFontsUrl,
  fontSizes,
  fontPresets,
  themes,
  patterns,
  baseLayouts,
  fontPairings,
  userFontPresets,
  getFontFamily,
} from '../themes';

describe('generateTheme', () => {
  it('returns all required ThemeColor fields', () => {
    const theme = generateTheme('#1e3a8a');
    expect(theme).toHaveProperty('name', 'Custom');
    expect(theme).toHaveProperty('primary', '#1e3a8a');
    expect(theme).toHaveProperty('secondary');
    expect(theme).toHaveProperty('accent');
    expect(theme).toHaveProperty('text', '#334155');
    expect(theme).toHaveProperty('background', '#ffffff');
    expect(theme).toHaveProperty('heading');
  });

  it('derives secondary by lightening (+40)', () => {
    const theme = generateTheme('#000000');
    // All channels shift by +40: 0+40=40 → hex 28
    expect(theme.secondary).toMatch(/^#/);
    expect(theme.secondary).not.toBe('#000000');
  });

  it('derives heading by darkening (-20)', () => {
    const theme = generateTheme('#ffffff');
    // All channels shift by -20: 255-20=235 → hex eb
    expect(theme.heading).toMatch(/^#/);
    expect(theme.heading).not.toBe('#ffffff');
  });
});

describe('layoutPresets', () => {
  it('generates 49 total layouts', () => {
    // classic: 3×3+1=10, sidebar: 2×3×2=12, header: 3×3=9, minimal: 3×3=9, creative: 3×3=9
    expect(layoutPresets).toHaveLength(49);
  });

  it('each layout has required fields', () => {
    for (const layout of layoutPresets) {
      expect(layout.id).toBeTruthy();
      expect(layout.baseLayout).toBeTruthy();
      expect(layout.name).toBeDefined();
      expect(layout.category).toBeTruthy();
      expect(layout.sectionSpacing).toBeTruthy();
      expect(layout.contentOrder.length).toBeGreaterThan(0);
    }
  });

  it('has all base layout types represented', () => {
    const baseTypes = new Set(layoutPresets.map((l) => l.baseLayout));
    expect(baseTypes).toEqual(
      new Set(['classic', 'sidebar', 'header', 'minimal', 'creative'])
    );
  });

  it('each layout has a unique id', () => {
    const ids = layoutPresets.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('colorPresets', () => {
  it('has 20 color presets', () => {
    expect(colorPresets).toHaveLength(20);
  });

  it('each preset has an id and valid hex primary', () => {
    for (const preset of colorPresets) {
      expect(preset.id).toBeTruthy();
      expect(preset.primary).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });

  it('all ids are unique', () => {
    const ids = colorPresets.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('themes record', () => {
  it('is indexed by color preset ids', () => {
    expect(Object.keys(themes)).toHaveLength(colorPresets.length);
    for (const preset of colorPresets) {
      expect(themes[preset.id!]).toBeDefined();
      expect(themes[preset.id!].primary).toBe(preset.primary);
    }
  });
});

describe('getPatternSVG', () => {
  const knownPatterns = [
    'dots', 'lines', 'grid', 'diagonal', 'crosshatch',
    'chevron', 'hexagon', 'waves', 'diamond',
  ];

  it.each(knownPatterns)('returns a data URI for "%s" pattern', (pattern) => {
    const result = getPatternSVG(pattern, '#000000', 50);
    expect(result).toContain('url("data:image/svg+xml');
  });

  it('returns "none" for unknown pattern', () => {
    expect(getPatternSVG('unknown', '#000', 50)).toBe('none');
    expect(getPatternSVG('none', '#000', 50)).toBe('none');
  });

  it('encodes the color into the SVG', () => {
    const result = getPatternSVG('dots', '#ff0000', 80);
    expect(result).toContain(encodeURIComponent('#ff0000'));
  });

  it('normalizes opacity from 0-100 to 0-1', () => {
    const result = getPatternSVG('dots', '#000', 50);
    expect(result).toContain('0.5');
  });
});

describe('getBackgroundStyle', () => {
  it('returns solid background by default', () => {
    const style = getBackgroundStyle({
      type: 'solid',
      color: '#ffffff',
      pattern: 'none',
      patternOpacity: 10,
    });
    expect(style).toEqual({ backgroundColor: '#ffffff' });
  });

  it('returns gradient background', () => {
    const style = getBackgroundStyle({
      type: 'gradient',
      color: '#ffffff',
      gradientDirection: 'to right',
      gradientEnd: '#000000',
      pattern: 'none',
      patternOpacity: 10,
    });
    expect(style.background).toContain('linear-gradient');
    expect(style.background).toContain('to right');
    expect(style.background).toContain('#000000');
  });

  it('uses default gradient values when not specified', () => {
    const style = getBackgroundStyle({
      type: 'gradient',
      color: '#ffffff',
      pattern: 'none',
      patternOpacity: 10,
    });
    expect(style.background).toContain('to bottom');
    expect(style.background).toContain('#f8fafc');
  });

  it('returns pattern background with SVG', () => {
    const style = getBackgroundStyle({
      type: 'pattern',
      color: '#ffffff',
      pattern: 'dots',
      patternOpacity: 20,
    });
    expect(style.backgroundColor).toBe('#ffffff');
    expect(style.backgroundImage).toContain('data:image/svg+xml');
  });

  it('falls back to solid when pattern is "none"', () => {
    const style = getBackgroundStyle({
      type: 'pattern',
      color: '#eff6ff',
      pattern: 'none',
      patternOpacity: 10,
    });
    expect(style).toEqual({ backgroundColor: '#eff6ff' });
  });
});

describe('getGoogleFontsUrl', () => {
  it('returns null for no arguments', () => {
    expect(getGoogleFontsUrl()).toBeNull();
  });

  it('returns null for system fonts (no googleFont)', () => {
    expect(getGoogleFontsUrl('Georgia', 'Times New Roman')).toBeNull();
  });

  it('returns valid URL for a Google font', () => {
    const url = getGoogleFontsUrl('Inter');
    expect(url).toContain('fonts.googleapis.com');
    expect(url).toContain('Inter');
  });

  it('deduplicates repeated fonts', () => {
    const url = getGoogleFontsUrl('Inter', 'Inter');
    const occurrences = (url || '').split('family=Inter').length - 1;
    expect(occurrences).toBe(1);
  });

  it('combines multiple Google fonts', () => {
    const url = getGoogleFontsUrl('Inter', 'Poppins');
    expect(url).toContain('Inter');
    expect(url).toContain('Poppins');
  });
});

describe('getFontFamily', () => {
  it('returns font family for known font', () => {
    expect(getFontFamily('Inter')).toContain('Inter');
  });

  it('returns Inter fallback for unknown font', () => {
    expect(getFontFamily('NonExistentFont')).toBe("'Inter', sans-serif");
  });
});

describe('fontSizes', () => {
  it('has small, medium, and large presets', () => {
    expect(fontSizes.small).toBeDefined();
    expect(fontSizes.medium).toBeDefined();
    expect(fontSizes.large).toBeDefined();
  });

  it('each preset has name, base, heading, subheading', () => {
    for (const size of Object.values(fontSizes)) {
      expect(size.name).toBeTruthy();
      expect(size.base).toMatch(/\d+px/);
      expect(size.heading).toMatch(/\d+px/);
      expect(size.subheading).toMatch(/\d+px/);
    }
  });
});

describe('static data arrays', () => {
  it('baseLayouts has 5 layouts', () => {
    expect(baseLayouts).toHaveLength(5);
  });

  it('patterns has 10 entries', () => {
    expect(patterns).toHaveLength(10);
  });

  it('fontPairings has 10 entries', () => {
    expect(fontPairings).toHaveLength(10);
  });

  it('userFontPresets is a subset of fontPresets (first 10)', () => {
    expect(userFontPresets).toHaveLength(10);
    expect(userFontPresets).toEqual(fontPresets.slice(0, 10));
  });
});
