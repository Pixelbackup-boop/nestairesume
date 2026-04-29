import api from "./api";

export interface TawkSettings {
  enabled: boolean;
  propertyId: string;
  widgetId: string;
}

// Cache to avoid repeated API calls
let cachedSettings: TawkSettings | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 15000; // 15s — short enough that admin toggle reflects quickly

export async function getTawkSettings(): Promise<TawkSettings> {
  const now = Date.now();

  if (cachedSettings && now - lastFetchTime < CACHE_TTL) {
    return cachedSettings;
  }

  try {
    const response = await api.get<TawkSettings>("/tawk/settings");
    cachedSettings = response.data;
    lastFetchTime = now;
    return cachedSettings;
  } catch {
    return { enabled: false, propertyId: "", widgetId: "" };
  }
}
