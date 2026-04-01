'use client';

import { useAdUnit } from '@/hooks/useAdUnit';
import type { AdSettings } from '@/lib/adConfig';

interface MultiplexAdProps {
  slotType?: keyof AdSettings['slots'];
  className?: string;
}

export default function MultiplexAd({
  slotType = 'multiplex',
  className = '',
}: MultiplexAdProps) {
  const { shouldHide, isPlaceholder, slotId, publisherId, estimatedCpm, adRef } = useAdUnit(slotType);

  if (shouldHide) return null;

  // Placeholder mode
  if (isPlaceholder) {
    return (
      <div className={`w-full ${className}`}>
        <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded">AD</span>
              <span className="text-gray-500 text-sm font-medium">Recommended Content</span>
            </div>
            <span className="bg-green-600 text-white text-xs font-medium px-2 py-0.5 rounded">
              CPM: {estimatedCpm}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-br from-gray-200 to-gray-100 h-24 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="p-3">
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-2 bg-gray-100 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-center">
            <span className="text-gray-400 text-xs">Multiplex / Related Content Ad — Powered by Google AdSense</span>
          </div>
        </div>
      </div>
    );
  }

  // Real ad mode
  if (!publisherId || !slotId) return null;

  return (
    <div ref={adRef} className={`w-full ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={publisherId}
        data-ad-slot={slotId}
        data-ad-format="autorelaxed"
      />
    </div>
  );
}
