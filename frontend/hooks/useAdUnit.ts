'use client';

import { useState, useEffect, useRef } from 'react';
import { getAdSettings, AdSettings, estimatedCpm as cpmEstimates } from '@/lib/adConfig';
import { useAuthStore } from '@/store/useAuthStore';

const PAID_TIERS = ['starter', 'gold', 'diamond', 'platinum'];

type SlotType = keyof AdSettings['slots'];

interface UseAdUnitResult {
  settings: AdSettings | null;
  loading: boolean;
  shouldHide: boolean;
  isPlaceholder: boolean;
  slotId: string;
  publisherId: string;
  estimatedCpm: string;
  adRef: React.RefObject<HTMLDivElement | null>;
  pushAd: () => void;
}

export function useAdUnit(slotType: SlotType): UseAdUnitResult {
  const { user } = useAuthStore();
  const [settings, setSettings] = useState<AdSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getAdSettings()
      .then(setSettings)
      .finally(() => setLoading(false));
  }, []);

  const pushAd = () => {
    if (settings && !settings.usePlaceholders && settings.adsEnabled && adRef.current) {
      try {
        const adsbygoogle = (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle || [];
        adsbygoogle.push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  };

  useEffect(() => {
    if (settings && !settings.usePlaceholders && settings.adsEnabled) {
      pushAd();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  const isPaid = !!(user?.subscriptionTier && PAID_TIERS.includes(user.subscriptionTier));
  const shouldHide = loading || !settings?.adsEnabled || isPaid;
  const isPlaceholder = !!(settings?.usePlaceholders);

  return {
    settings,
    loading,
    shouldHide,
    isPlaceholder,
    slotId: settings?.slots[slotType] || '',
    publisherId: settings?.publisherId || '',
    estimatedCpm: cpmEstimates[slotType] || '$5-10',
    adRef,
    pushAd,
  };
}
