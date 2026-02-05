'use client';

import { useState, useCallback, useEffect } from 'react';
import { useUsageStore } from '@/store/useUsageStore';

export type LimitType = 'cv' | 'ai' | 'download' | 'coverLetter';

interface LimitCheckResult {
  canProceed: boolean;
  remaining: number;
  limit: number;
  used: number;
  showWarning: boolean;
}

interface LimitErrorInfo {
  type: LimitType;
  code: string;
  used: number;
  limit: number;
}

interface ModalState {
  isOpen: boolean;
  type: LimitType | null;
  used: number;
  limit: number;
}

interface UseLimitCheckReturn {
  checkBeforeAction: (type: LimitType) => LimitCheckResult;
  handleApiError: (error: unknown) => LimitErrorInfo | null;
  modalState: ModalState;
  openModal: (type: LimitType, used: number, limit: number) => void;
  closeModal: () => void;
  isLoading: boolean;
  currentTier: string;
  isTrialing: boolean;
}

// Map API error codes to limit types
const ERROR_CODE_TO_TYPE: Record<string, LimitType> = {
  CV_LIMIT_REACHED: 'cv',
  AI_LIMIT_REACHED: 'ai',
  TRIAL_DAILY_LIMIT_REACHED: 'ai',
  DOWNLOAD_LIMIT_REACHED: 'download',
  COVER_LETTER_LIMIT_REACHED: 'coverLetter',
};

// Upgrade path from current tier to next
export const UPGRADE_PATH: Record<string, string> = {
  free: 'starter',
  starter: 'gold',
  gold: 'diamond',
  diamond: 'platinum',
  platinum: '', // Already at max
  expired: 'starter',
};

export function useLimitCheck(): UseLimitCheckReturn {
  const { checkLimit, usage, isLoading, fetchUsage } = useUsageStore();
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    type: null,
    used: 0,
    limit: 0,
  });

  // Fetch usage on mount if not already loaded
  useEffect(() => {
    if (!usage && !isLoading) {
      fetchUsage();
    }
  }, [usage, isLoading, fetchUsage]);

  const checkBeforeAction = useCallback((type: LimitType): LimitCheckResult => {
    const { canUse, remaining, limit } = checkLimit(type);
    const usageData = usage?.usage[type];
    const used = usageData?.used ?? 0;

    // Calculate warning threshold (20% remaining or 2, whichever is larger)
    const warningThreshold = limit === -1 ? 0 : limit <= 5 ? 2 : Math.ceil(limit * 0.2);

    return {
      canProceed: canUse,
      remaining,
      limit,
      used,
      showWarning: limit !== -1 && remaining <= warningThreshold && remaining > 0,
    };
  }, [checkLimit, usage]);

  const handleApiError = useCallback((error: unknown): LimitErrorInfo | null => {
    const apiError = error as {
      response?: {
        status?: number;
        data?: {
          code?: string;
          error?: string;
          used?: number;
          limit?: number;
        };
      };
    };

    // Check for 429 status with limit error code
    if (apiError?.response?.status === 429 && apiError?.response?.data?.code) {
      const code = apiError.response.data.code;
      const type = ERROR_CODE_TO_TYPE[code];

      if (type) {
        return {
          type,
          code,
          used: apiError.response.data.used ?? 0,
          limit: apiError.response.data.limit ?? 0,
        };
      }
    }

    // Check for 403 subscription required
    if (apiError?.response?.status === 403 && apiError?.response?.data?.code === 'SUBSCRIPTION_REQUIRED') {
      return {
        type: 'cv', // Default to CV for subscription required
        code: 'SUBSCRIPTION_REQUIRED',
        used: 0,
        limit: 0,
      };
    }

    return null;
  }, []);

  const openModal = useCallback((type: LimitType, used: number, limit: number) => {
    setModalState({ isOpen: true, type, used, limit });
  }, []);

  const closeModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return {
    checkBeforeAction,
    handleApiError,
    modalState,
    openModal,
    closeModal,
    isLoading,
    currentTier: usage?.tier ?? 'free',
    isTrialing: usage?.isTrialing ?? false,
  };
}
