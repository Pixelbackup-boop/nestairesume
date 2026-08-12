/**
 * Admin-editable site settings stored in the AppSetting D1 table as one JSON
 * blob per key. Replaces the Express backend's data/*.json files on disk
 * (Workers has no fs). Reads merge the stored value over per-key defaults so
 * newly added fields get sane values without a data migration.
 */
import type { PrismaClient } from '@/lib/generated/prisma/client';

export interface AdSettings {
  adsEnabled: boolean;
  usePlaceholders: boolean;
  adsensePublisherId: string;
  slots: {
    blogInArticle: string;
    resumeInArticle: string;
    careerInArticle: string;
    toolsRewarded: string;
    sidebarDisplay: string;
    leaderboard: string;
    multiplex: string;
    toolsBetweenSection: string;
  };
  estimatedMonthlyViews: {
    blog: number;
    resume: number;
    career: number;
    tools: number;
  };
  updatedAt?: string;
}

export interface TawkSettings {
  enabled: boolean;
  propertyId: string;
  widgetId: string;
  updatedAt?: string;
}

export interface TrustpilotSettings {
  enabled: boolean;
  businessUnitId: string;
  templateId: string;
  locale: string;
  updatedAt?: string;
}

const AD_DEFAULTS: AdSettings = {
  adsEnabled: false,
  usePlaceholders: true,
  adsensePublisherId: '',
  slots: {
    blogInArticle: '',
    resumeInArticle: '',
    careerInArticle: '',
    toolsRewarded: '',
    sidebarDisplay: '',
    leaderboard: '',
    multiplex: '',
    toolsBetweenSection: '',
  },
  estimatedMonthlyViews: {
    blog: 50000,
    resume: 200000,
    career: 20000,
    tools: 10000,
  },
};

const TAWK_DEFAULTS: TawkSettings = {
  enabled: false,
  propertyId: '',
  widgetId: 'default',
};

// Defaults match the values the Express backend shipped (originally the
// hardcoded Footer.tsx widget) so the Trustpilot box keeps rendering.
const TRUSTPILOT_DEFAULTS: TrustpilotSettings = {
  enabled: true,
  businessUnitId: '6996e90345c20b813450f36a',
  templateId: '56278e9abfbbba0bdcd568bc',
  locale: 'en-US',
};

interface SettingsByKey {
  ads: AdSettings;
  tawk: TawkSettings;
  trustpilot: TrustpilotSettings;
}

const DEFAULTS: SettingsByKey = {
  ads: AD_DEFAULTS,
  tawk: TAWK_DEFAULTS,
  trustpilot: TRUSTPILOT_DEFAULTS,
};

export type SettingKey = keyof SettingsByKey;

export async function getSetting<K extends SettingKey>(
  db: PrismaClient,
  key: K
): Promise<SettingsByKey[K]> {
  const row = await db.appSetting.findUnique({ where: { key } });
  if (!row) return { ...DEFAULTS[key] };
  try {
    return { ...DEFAULTS[key], ...JSON.parse(row.value) };
  } catch {
    return { ...DEFAULTS[key] };
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Shallow merge plus a one-level-deep merge of nested objects, matching the
 * Express backend's saveAdSettings: a partial body like
 * `{ slots: { blogInArticle: "123" } }` updates that key without wiping the
 * sibling slot IDs. Flat settings (tawk/trustpilot) are unaffected.
 */
function mergeSetting<T extends object>(current: T, partial: Partial<T>): T {
  const merged: Record<string, unknown> = { ...current, ...partial };
  for (const [prop, partialValue] of Object.entries(partial) as [string, unknown][]) {
    const currentValue = (current as Record<string, unknown>)[prop];
    if (isPlainObject(currentValue) && isPlainObject(partialValue)) {
      merged[prop] = { ...currentValue, ...partialValue };
    }
  }
  return merged as T;
}

export async function saveSetting<K extends SettingKey>(
  db: PrismaClient,
  key: K,
  partial: Partial<SettingsByKey[K]>
): Promise<SettingsByKey[K]> {
  const current = await getSetting(db, key);
  const updated = { ...mergeSetting(current, partial), updatedAt: new Date().toISOString() };
  const value = JSON.stringify(updated);
  await db.appSetting.upsert({
    where: { key },
    create: { key, value },
    update: { value },
  });
  return updated;
}
