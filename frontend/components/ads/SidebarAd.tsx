'use client';

import { useAdUnit } from '@/hooks/useAdUnit';
import type { AdSettings } from '@/lib/adConfig';

interface SidebarAdProps {
  slotType?: keyof AdSettings['slots'];
  className?: string;
}

export default function SidebarAd({
  slotType = 'sidebarDisplay',
  className = '',
}: SidebarAdProps) {
  const { shouldHide, isPlaceholder, slotId, publisherId, estimatedCpm, adRef } = useAdUnit(slotType);

  if (shouldHide) return null;

  // Placeholder mode
  if (isPlaceholder) {
    return (
      <div className={`hidden lg:block ${className}`}>
        <div className="bg-gray-100 rounded-xl border border-gray-200 overflow-hidden">
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6" style={{ minHeight: '250px' }}>
            <div className="absolute top-2 left-2 bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded">
              AD
            </div>
            <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-medium px-2 py-0.5 rounded">
              CPM: {estimatedCpm}
            </div>
            <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-400 text-sm font-medium">Sidebar Display Ad</p>
            <p className="text-gray-300 text-xs mt-1">300x250 / 300x600</p>
          </div>
          <div className="bg-gray-50 px-3 py-2 text-center">
            <span className="text-gray-400 text-xs">Powered by Google AdSense</span>
          </div>
        </div>
      </div>
    );
  }

  // Real ad mode
  if (!publisherId || !slotId) return null;

  return (
    <div ref={adRef} className={`hidden lg:block ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '300px', minHeight: '250px' }}
        data-ad-client={publisherId}
        data-ad-slot={slotId}
        data-ad-format="auto"
      />
    </div>
  );
}
