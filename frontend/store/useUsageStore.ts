import { create } from 'zustand';
import api from '../lib/api';

interface UsageLimit {
  used: number;
  limit: number; // -1 means unlimited
}

interface UsageData {
  tier: string;
  usage: {
    cv: UsageLimit;
    ai: UsageLimit;
    aiToday: UsageLimit;
    download: UsageLimit;
    coverLetter: UsageLimit;
  };
}

interface UsageState {
  usage: UsageData | null;
  isLoading: boolean;
  error: string | null;
  fetchUsage: () => Promise<void>;
  checkLimit: (type: 'cv' | 'ai' | 'download' | 'coverLetter') => { canUse: boolean; remaining: number; limit: number };
  getUsagePercentage: (type: 'cv' | 'ai' | 'download' | 'coverLetter') => number;
}

export const useUsageStore = create<UsageState>((set, get) => ({
  usage: null,
  isLoading: false,
  error: null,

  fetchUsage: async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) return;

    set({ isLoading: true, error: null });

    try {
      const response = await api.get<UsageData>('/payments/usage');
      set({ usage: response.data, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.detail || 'Failed to fetch usage',
        isLoading: false,
      });
    }
  },

  checkLimit: (type) => {
    const { usage } = get();
    if (!usage) {
      return { canUse: false, remaining: 0, limit: 0 };
    }

    const usageData = usage.usage[type];
    if (!usageData) {
      return { canUse: false, remaining: 0, limit: 0 };
    }

    // -1 means unlimited
    if (usageData.limit === -1) {
      return { canUse: true, remaining: Infinity, limit: -1 };
    }

    const remaining = Math.max(0, usageData.limit - usageData.used);
    return {
      canUse: remaining > 0,
      remaining,
      limit: usageData.limit,
    };
  },

  getUsagePercentage: (type) => {
    const { usage } = get();
    if (!usage) return 0;

    const usageData = usage.usage[type];
    if (!usageData || usageData.limit === -1) return 0;

    return Math.min(100, (usageData.used / usageData.limit) * 100);
  },
}));

// Helper hook for displaying usage in UI
export function formatUsage(used: number, limit: number): string {
  if (limit === -1) {
    return `${used} / Unlimited`;
  }
  return `${used} / ${limit}`;
}

export function formatRemaining(remaining: number, limit: number): string {
  if (limit === -1) {
    return 'Unlimited';
  }
  return `${remaining} remaining`;
}
