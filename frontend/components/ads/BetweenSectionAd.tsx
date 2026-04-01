'use client';

import { useAdUnit } from '@/hooks/useAdUnit';
import type { AdSettings } from '@/lib/adConfig';

interface BetweenSectionAdProps {
  slotType?: keyof AdSettings['slots'];
  className?: string;
}

export default function BetweenSectionAd({
  slotType = 'toolsBetweenSection',
  className = '',
}: BetweenSectionAdProps) {
  const { shouldHide, isPlaceholder, slotId, publisherId, estimatedCpm, adRef } = useAdUnit(slotType);

  if (shouldHide) return null;

  // Placeholder mode
  if (isPlaceholder) {
    return (
      <div className={`max-w-4xl mx-auto px-6 py-8 ${className}`}>
        <div className="relative bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200 rounded-xl overflow-hidden">
          <div className="absolute top-3 left-3 bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded">
            AD
          </div>
          <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-medium px-2 py-0.5 rounded">
            CPM: {estimatedCpm}
          </div>
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <svg className="w-10 h-10 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
              <p className="text-gray-400 text-sm font-medium">Between Section Display Ad</p>
              <p className="text-gray-300 text-xs mt-1">Responsive — Auto-sized</p>
            </div>
          </div>
          <div className="bg-gray-50 px-3 py-2 text-center border-t border-gray-200">
            <span className="text-gray-400 text-xs">Powered by Google AdSense</span>
          </div>
        </div>
      </div>
    );
  }

  // Real ad mode
  if (!publisherId || !slotId) return null;

  return (
    <div ref={adRef} className={`max-w-4xl mx-auto px-6 py-8 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={publisherId}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
