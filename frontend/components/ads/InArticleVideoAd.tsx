'use client';

import { useState } from 'react';
import { useAdUnit } from '@/hooks/useAdUnit';

interface InArticleVideoAdProps {
  slotType?: 'blogInArticle' | 'resumeInArticle' | 'careerInArticle';
  className?: string;
  showPositionIndicator?: boolean;
}

export default function InArticleVideoAd({
  slotType = 'blogInArticle',
  className = '',
  showPositionIndicator = false,
}: InArticleVideoAdProps) {
  const { shouldHide, isPlaceholder, slotId, publisherId, estimatedCpm, adRef } = useAdUnit(slotType);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  if (shouldHide) return null;

  const adNetwork = 'Google Ad Manager';

  // Placeholder mode - show visual placeholder
  if (isPlaceholder) {
    return (
      <div className={`my-8 ${className}`}>
        <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-xl border border-gray-700">
          <div className="absolute top-2 left-2 z-10 bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded">
            AD
          </div>
          <div className="absolute top-2 right-2 z-10 bg-green-600 text-white text-xs font-medium px-2 py-0.5 rounded">
            Est. CPM: {estimatedCpm}
          </div>

          <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            {!isPlaying ? (
              <div className="text-center">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="w-20 h-20 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 motion-safe:hover:scale-110 mb-4"
                >
                  <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
                <p className="text-white/80 text-lg font-medium">In-Article Video Ad</p>
                <p className="text-white/50 text-sm mt-1">Click to preview ad experience</p>
              </div>
            ) : (
              <div className="w-full h-full relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-pulse">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-6xl mb-4">📺</div>
                      <p className="text-xl font-bold">Video Ad Playing</p>
                      <p className="text-sm opacity-70 mt-2">30-second advertisement</p>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-4">
                      <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                        <div className="h-full bg-white w-1/3 rounded-full animate-[progress_30s_linear]"></div>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-white hover:text-yellow-400 transition-colors"
                    >
                      {isMuted ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-400 text-sm">Powered by {adNetwork}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-xs">Autoplay muted</span>
              <span className="text-gray-500 text-xs">|</span>
              <span className="text-gray-500 text-xs">Skippable after 5s</span>
            </div>
          </div>
        </div>

        {showPositionIndicator && (
          <div className="mt-3 flex items-center justify-center gap-2 text-sm">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Ad Position: After 2nd Paragraph
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 font-medium">
              Video Format
            </span>
          </div>
        )}
      </div>
    );
  }

  // Real ad mode
  if (!publisherId || !slotId) return null;

  return (
    <div ref={adRef} className={`my-8 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={publisherId}
        data-ad-slot={slotId}
        data-ad-format="fluid"
        data-ad-layout-key="-6t+ed+2i-1n-4w"
      />
    </div>
  );
}
