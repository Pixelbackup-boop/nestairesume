import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useUsageStore, formatUsage, formatRemaining } from '../useUsageStore';

// Mock the api module
vi.mock('../../lib/api', () => ({
  default: {
    get: vi.fn(),
  },
}));

import api from '../../lib/api';

const mockUsageData = {
  tier: 'pro',
  usage: {
    cv: { used: 3, limit: 10 },
    ai: { used: 50, limit: -1 },
    aiToday: { used: 5, limit: 20 },
    download: { used: 7, limit: 10 },
    coverLetter: { used: 10, limit: 10 },
  },
};

beforeEach(() => {
  useUsageStore.setState(useUsageStore.getInitialState());
  vi.restoreAllMocks();
});

describe('useUsageStore initial state', () => {
  it('starts with null usage', () => {
    expect(useUsageStore.getState().usage).toBeNull();
  });

  it('starts not loading', () => {
    expect(useUsageStore.getState().isLoading).toBe(false);
  });

  it('starts with no error', () => {
    expect(useUsageStore.getState().error).toBeNull();
  });
});

describe('checkLimit', () => {
  it('returns canUse=false when no usage data', () => {
    const result = useUsageStore.getState().checkLimit('cv');
    expect(result).toEqual({ canUse: false, remaining: 0, limit: 0 });
  });

  it('returns unlimited for limit=-1', () => {
    useUsageStore.setState({ usage: mockUsageData });
    const result = useUsageStore.getState().checkLimit('ai');
    expect(result.canUse).toBe(true);
    expect(result.remaining).toBe(Infinity);
    expect(result.limit).toBe(-1);
  });

  it('calculates remaining correctly for partial usage', () => {
    useUsageStore.setState({ usage: mockUsageData });
    const result = useUsageStore.getState().checkLimit('cv');
    expect(result.canUse).toBe(true);
    expect(result.remaining).toBe(7); // 10 - 3
    expect(result.limit).toBe(10);
  });

  it('returns canUse=false when limit exhausted', () => {
    useUsageStore.setState({ usage: mockUsageData });
    const result = useUsageStore.getState().checkLimit('coverLetter');
    expect(result.canUse).toBe(false);
    expect(result.remaining).toBe(0); // 10 - 10
  });

  it('clamps remaining to 0 (never negative)', () => {
    const overused = {
      ...mockUsageData,
      usage: {
        ...mockUsageData.usage,
        cv: { used: 15, limit: 10 },
      },
    };
    useUsageStore.setState({ usage: overused });
    const result = useUsageStore.getState().checkLimit('cv');
    expect(result.remaining).toBe(0);
  });
});

describe('getUsagePercentage', () => {
  it('returns 0 when no usage data', () => {
    expect(useUsageStore.getState().getUsagePercentage('cv')).toBe(0);
  });

  it('returns 0 for unlimited features', () => {
    useUsageStore.setState({ usage: mockUsageData });
    expect(useUsageStore.getState().getUsagePercentage('ai')).toBe(0);
  });

  it('calculates percentage correctly', () => {
    useUsageStore.setState({ usage: mockUsageData });
    expect(useUsageStore.getState().getUsagePercentage('cv')).toBe(30); // 3/10 * 100
  });

  it('caps at 100% even if overused', () => {
    const overused = {
      ...mockUsageData,
      usage: {
        ...mockUsageData.usage,
        cv: { used: 15, limit: 10 },
      },
    };
    useUsageStore.setState({ usage: overused });
    expect(useUsageStore.getState().getUsagePercentage('cv')).toBe(100);
  });
});

describe('fetchUsage', () => {
  it('does nothing without a token', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    await useUsageStore.getState().fetchUsage();
    expect(api.get).not.toHaveBeenCalled();
  });

  it('sets loading state and fetches data', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('fake-token');
    vi.mocked(api.get).mockResolvedValue({ data: mockUsageData });

    await useUsageStore.getState().fetchUsage();

    const state = useUsageStore.getState();
    expect(state.usage).toEqual(mockUsageData);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('handles API errors', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('fake-token');
    vi.mocked(api.get).mockRejectedValue({
      response: { data: { detail: 'Unauthorized' } },
    });

    await useUsageStore.getState().fetchUsage();

    const state = useUsageStore.getState();
    expect(state.error).toBe('Unauthorized');
    expect(state.isLoading).toBe(false);
  });

  it('uses fallback error message', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('fake-token');
    vi.mocked(api.get).mockRejectedValue(new Error('Network error'));

    await useUsageStore.getState().fetchUsage();
    expect(useUsageStore.getState().error).toBe('Failed to fetch usage');
  });
});

describe('formatUsage', () => {
  it('shows "Unlimited" for limit=-1', () => {
    expect(formatUsage(50, -1)).toBe('50 / Unlimited');
  });

  it('shows used / limit for finite limits', () => {
    expect(formatUsage(3, 10)).toBe('3 / 10');
  });
});

describe('formatRemaining', () => {
  it('shows "Unlimited" for limit=-1', () => {
    expect(formatRemaining(Infinity, -1)).toBe('Unlimited');
  });

  it('shows remaining count for finite limits', () => {
    expect(formatRemaining(7, 10)).toBe('7 remaining');
  });
});
