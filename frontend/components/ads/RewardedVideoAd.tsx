'use client';

import { useState, useEffect } from 'react';

interface RewardedVideoAdProps {
  onRewardEarned?: () => void;
  rewardDescription?: string;
  estimatedCpm?: string;
  videoDuration?: number;
}

export default function RewardedVideoAd({
  onRewardEarned,
  rewardDescription = '5 more interview questions',
  estimatedCpm = '$20-40',
  videoDuration = 30
}: RewardedVideoAdProps) {
  const [isWatching, setIsWatching] = useState(false);
  const [countdown, setCountdown] = useState(videoDuration);
  const [isCompleted, setIsCompleted] = useState(false);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let skipTimer: NodeJS.Timeout;

    if (isWatching && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      // Allow skip after 5 seconds
      skipTimer = setTimeout(() => {
        setCanSkip(true);
      }, 5000);
    }

    if (countdown === 0 && isWatching) {
      setIsCompleted(true);
      setIsWatching(false);
      onRewardEarned?.();
    }

    return () => {
      clearInterval(timer);
      clearTimeout(skipTimer);
    };
  }, [isWatching, countdown, onRewardEarned]);

  const handleStartWatching = () => {
    setIsWatching(true);
    setCountdown(videoDuration);
    setCanSkip(false);
  };

  const handleSkip = () => {
    setIsWatching(false);
    setCountdown(videoDuration);
    setCanSkip(false);
  };

  const handleReset = () => {
    setIsCompleted(false);
    setCountdown(videoDuration);
  };

  if (isCompleted) {
    return (
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-8 text-center text-white shadow-xl">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold mb-2">Reward Unlocked!</h3>
        <p className="text-white/80 mb-4">You&apos;ve earned: {rewardDescription}</p>
        <div className="flex items-center justify-center gap-2 text-sm bg-white/20 rounded-full px-4 py-2 w-fit mx-auto">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Continue with your unlocked content</span>
        </div>
        <button
          onClick={handleReset}
          className="mt-4 text-sm text-white/60 hover:text-white underline"
        >
          Reset demo
        </button>
      </div>
    );
  }

  if (isWatching) {
    return (
      <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-xl">
        {/* AD Label */}
        <div className="absolute top-3 left-3 z-10 bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded">
          REWARDED AD
        </div>

        {/* Skip Button */}
        {canSkip && (
          <button
            onClick={handleSkip}
            className="absolute top-3 right-3 z-10 bg-white/20 hover:bg-white/30 text-white text-sm px-3 py-1 rounded transition-colors"
          >
            Skip Ad
          </button>
        )}

        {/* Video Content */}
        <div className="aspect-video bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center relative">
          <div className="absolute inset-0 overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
          </div>

          <div className="relative z-10 text-center text-white">
            <div className="text-7xl mb-4">📹</div>
            <p className="text-2xl font-bold mb-2">Rewarded Video Ad</p>
            <p className="text-lg opacity-80">Watch to earn your reward</p>
          </div>
        </div>

        {/* Progress Bar & Countdown */}
        <div className="bg-gray-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/70 text-sm">Watching ad...</span>
            <span className="text-white font-bold text-lg">{countdown}s</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-1000 ease-linear"
              style={{ width: `${((videoDuration - countdown) / videoDuration) * 100}%` }}
            ></div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
            <span>Reward: {rewardDescription}</span>
            <span>Est. CPM: {estimatedCpm}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div>
            <h3 className="text-white font-bold">Want more content?</h3>
            <p className="text-gray-400 text-sm">Watch a short video to unlock</p>
          </div>
        </div>
        <div className="bg-green-600 text-white text-xs font-medium px-2 py-1 rounded">
          CPM: {estimatedCpm}
        </div>
      </div>

      {/* Reward Preview */}
      <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🎁</div>
          <div>
            <p className="text-white font-medium">Your Reward</p>
            <p className="text-green-400 text-sm">{rewardDescription}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleStartWatching}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-green-500/25"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
          <span>Watch {videoDuration}s Video → Get Reward</span>
        </button>

        <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
          <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <span>Upgrade to Pro - Unlimited Access</span>
        </button>
      </div>

      {/* Info Footer */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Rewarded video • Opt-in only • Higher revenue</span>
      </div>

      {/* Position Indicator (for demo) */}
      <div className="mt-4 flex items-center justify-center gap-2 text-sm">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-medium">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Ad Position: Feature Unlock Wall
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 font-medium">
          Rewarded Format
        </span>
      </div>
    </div>
  );
}
