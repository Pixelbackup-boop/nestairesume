'use client';

import { useState } from 'react';
import RewardedVideoAd from '@/components/ads/RewardedVideoAd';

export default function TestAdsTools() {
  const [questionsCompleted, setQuestionsCompleted] = useState(3);
  const [totalQuestions, setTotalQuestions] = useState(3);
  const [showRewardWall, setShowRewardWall] = useState(true);
  const [unlockedQuestions, setUnlockedQuestions] = useState(0);

  const handleRewardEarned = () => {
    setUnlockedQuestions((prev) => prev + 5);
    setTotalQuestions((prev) => prev + 5);
    setShowRewardWall(false);
  };

  const handleContinuePractice = () => {
    setShowRewardWall(true);
  };

  const questions = [
    {
      id: 1,
      question: 'Tell me about yourself.',
      status: 'completed',
      feedback: 'Good structure, but consider adding more specific achievements.',
    },
    {
      id: 2,
      question: 'What is your greatest weakness?',
      status: 'completed',
      feedback: 'Great self-awareness! The improvement plan was well articulated.',
    },
    {
      id: 3,
      question: 'Where do you see yourself in 5 years?',
      status: 'completed',
      feedback: 'Excellent alignment with company goals. Very compelling answer.',
    },
  ];

  const lockedQuestions = [
    'Describe a time you faced a conflict at work.',
    'Why do you want to work here?',
    'What makes you unique?',
    'Tell me about a challenging project.',
    'How do you handle pressure?',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Tool Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-2xl">🎤</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Mock Interview</h1>
            <p className="text-gray-600">Practice with AI-powered feedback</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
            Free: 3 questions
          </span>
          <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
            Watch ad: +5 questions
          </span>
          <span className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">
            Pro: Unlimited
          </span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium text-gray-900">Interview Progress</span>
          <span className="text-sm text-gray-600">{questionsCompleted}/{totalQuestions} questions</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500"
            style={{ width: `${(questionsCompleted / totalQuestions) * 100}%` }}
          ></div>
        </div>
        {unlockedQuestions > 0 && (
          <p className="text-sm text-green-600 mt-2">
            +{unlockedQuestions} questions unlocked via rewarded ad!
          </p>
        )}
      </div>

      {/* Completed Questions */}
      <div className="space-y-4 mb-8">
        <h2 className="text-xl font-bold text-gray-900">Completed Questions</h2>
        {questions.map((q) => (
          <div
            key={q.id}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">Question {q.id}</h3>
                <p className="text-gray-700 mb-3">{q.question}</p>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">AI Feedback:</span> {q.feedback}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* ▼▼▼ REWARD WALL: AFTER FREE QUESTIONS ▼▼▼ */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {showRewardWall ? (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Continue Practicing</h2>
          <RewardedVideoAd
            onRewardEarned={handleRewardEarned}
            rewardDescription="5 more interview questions"
            estimatedCpm="$20-40"
            videoDuration={30}
          />
        </div>
      ) : (
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-xl font-bold text-green-800 mb-2">Questions Unlocked!</h3>
            <p className="text-green-700 mb-4">You now have access to 5 more interview questions.</p>
            <button
              onClick={handleContinuePractice}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Continue Practicing
            </button>
          </div>
        </div>
      )}
      {/* ═══════════════════════════════════════════════════════════ */}

      {/* Locked Questions Preview */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Questions</h2>
        <div className="space-y-3">
          {lockedQuestions.map((q, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex items-center gap-4 opacity-60"
            >
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-600">{q}</p>
                <p className="text-xs text-gray-400 mt-1">Watch ad or upgrade to unlock</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tool Features */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">AI Mock Interview Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-lg">🎯</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Industry-Specific Questions</h4>
              <p className="text-sm text-gray-600">Tailored to your target role and industry</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-lg">🤖</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">AI-Powered Feedback</h4>
              <p className="text-sm text-gray-600">Get detailed analysis of your responses</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-lg">📈</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Progress Tracking</h4>
              <p className="text-sm text-gray-600">Track improvement over time</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-lg">🎙️</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Voice Recording</h4>
              <p className="text-sm text-gray-600">Practice speaking your answers aloud</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade CTA */}
      <div className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white text-center">
        <h3 className="text-xl font-bold mb-2">Upgrade to Pro for Unlimited Practice</h3>
        <p className="text-white/80 mb-4">
          Get unlimited questions, advanced analytics, and personalized improvement plans.
        </p>
        <button className="bg-white text-purple-600 font-bold py-3 px-8 rounded-lg hover:bg-purple-50 transition-colors">
          Upgrade Now - $9.99/month
        </button>
      </div>
    </div>
  );
}
