'use client';

import { useAdUnit } from '@/hooks/useAdUnit';
import type { AdSettings } from '@/lib/adConfig';

interface LeaderboardAdProps {
  slotType?: keyof AdSettings['slots'];
  className?: string;
}

export default function LeaderboardAd({
  slotType = 'leaderboard',
  className = '',
}: LeaderboardAdProps) {
  const { shouldHide, isPlaceholder, slotId, publisherId, estimatedCpm, adRef } = useAdUnit(slotType);

  if (shouldHide) return null;

  // Placeholder mode
  if (isPlaceholder) {
    return (
      <div className={`w-full ${className}`}>
        <div className="max-w-[728px] mx-auto">
          <div className="relative bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200 rounded-lg overflow-hidden">
            <div className="absolute top-2 left-2 bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded">
              AD
            </div>
            <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-medium px-2 py-0.5 rounded">
              CPM: {estimatedCpm}
            </div>
            {/* Desktop: 728x90 */}
            <div className="hidden md:flex items-center justify-center" style={{ height: '90px' }}>
              <div className="text-center">
                <p className="text-gray-400 text-sm font-medium">Leaderboard Ad</p>
                <p className="text-gray-300 text-xs mt-0.5">728 x 90</p>
              </div>
            </div>
            {/* Mobile: 320x100 */}
            <div className="flex md:hidden items-center justify-center" style={{ height: '100px' }}>
              <div className="text-center">
                <p className="text-gray-400 text-sm font-medium">Mobile Banner Ad</p>
                <p className="text-gray-300 text-xs mt-0.5">320 x 100</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Real ad mode
  if (!publisherId || !slotId) return null;

  return (
    <div ref={adRef} className={`w-full ${className}`}>
      <div className="max-w-[728px] mx-auto">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={publisherId}
          data-ad-slot={slotId}
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
