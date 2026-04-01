'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RewardedVideoAd from '@/components/ads/RewardedVideoAd';
import LeaderboardAd from '@/components/ads/LeaderboardAd';
import MultiplexAd from '@/components/ads/MultiplexAd';
import {
  Sparkles,
  Play,
  ArrowRight,
  CheckCircle,
  XCircle,
  RefreshCw,
  Briefcase,
  Target,
  MessageSquare,
  Star,
  Lightbulb,
  Trophy,
} from 'lucide-react';

interface InterviewQuestion {
  id: string;
  text: string;
  category: 'behavioral' | 'situational' | 'technical' | 'general';
  difficulty: 'entry' | 'mid' | 'senior';
}

interface AnswerFeedback {
  score: number;
  strengths: string[];
  improvements: string[];
  sampleAnswer: string;
}

interface QuestionResult {
  question: InterviewQuestion;
  answer: string;
  feedback: AnswerFeedback | null;
}

type Stage = 'setup' | 'interview' | 'results';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4444';

export default function MockInterviewPage() {
  const locale = useLocale();
  const t = useTranslations('MockInterview');

  // Experience levels with translations
  const EXPERIENCE_LEVELS = [
    { value: 'entry', label: t('setup.levels.entry.label'), description: t('setup.levels.entry.description') },
    { value: 'mid', label: t('setup.levels.mid.label'), description: t('setup.levels.mid.description') },
    { value: 'senior', label: t('setup.levels.senior.label'), description: t('setup.levels.senior.description') },
  ];

  // Setup state
  const [jobTitle, setJobTitle] = useState('');
  const [level, setLevel] = useState<'entry' | 'mid' | 'senior'>('mid');
  const [questionCount, setQuestionCount] = useState(5);

  // Interview state
  const [stage, setStage] = useState<Stage>('setup');
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [results, setResults] = useState<QuestionResult[]>([]);

  // Loading states
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Rewarded ad state - unlocks bonus practice questions
  const [hasBonusUnlocked, setHasBonusUnlocked] = useState(false);

  // Start the interview - generate questions
  const startInterview = async () => {
    if (!jobTitle.trim()) {
      setError(t('errors.enterJobTitle'));
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/api/v1/interview/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: jobTitle.trim(),
          level,
          questionCount,
          locale,
        }),
      });

      if (!response.ok) {
        throw new Error(t('errors.generateFailed'));
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || t('errors.generateFailed'));
      }

      setQuestions(data.data.questions);
      setResults([]);
      setCurrentQuestionIndex(0);
      setCurrentAnswer('');
      setStage('interview');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errors.startFailed'));
    } finally {
      setIsGenerating(false);
    }
  };

  // Submit answer and get feedback
  const submitAnswer = async () => {
    if (!currentAnswer.trim() || currentAnswer.trim().length < 20) {
      setError(t('errors.detailedAnswer'));
      return;
    }

    setIsEvaluating(true);
    setError(null);

    const currentQuestion = questions[currentQuestionIndex];

    try {
      const response = await fetch(`${API_BASE}/api/v1/interview/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQuestion.text,
          answer: currentAnswer.trim(),
          jobTitle,
          locale,
        }),
      });

      let feedback: AnswerFeedback | null = null;

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          feedback = data.data;
        }
      }

      // Store result
      const result: QuestionResult = {
        question: currentQuestion,
        answer: currentAnswer.trim(),
        feedback,
      };

      setResults(prev => [...prev, result]);

      // Move to next question or finish
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setCurrentAnswer('');
      } else {
        setStage('results');
      }
    } catch {
      // Still record the answer even if evaluation fails
      const result: QuestionResult = {
        question: currentQuestion,
        answer: currentAnswer.trim(),
        feedback: null,
      };
      setResults(prev => [...prev, result]);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setCurrentAnswer('');
      } else {
        setStage('results');
      }
    } finally {
      setIsEvaluating(false);
    }
  };

  // Skip current question
  const skipQuestion = () => {
    const result: QuestionResult = {
      question: questions[currentQuestionIndex],
      answer: '',
      feedback: null,
    };
    setResults(prev => [...prev, result]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setCurrentAnswer('');
    } else {
      setStage('results');
    }
  };

  // Restart interview
  const restartInterview = () => {
    setStage('setup');
    setQuestions([]);
    setResults([]);
    setCurrentQuestionIndex(0);
    setCurrentAnswer('');
    setError(null);
  };

  // Calculate average score
  const averageScore = results.length > 0
    ? results.filter(r => r.feedback).reduce((sum, r) => sum + (r.feedback?.score || 0), 0) /
      results.filter(r => r.feedback).length
    : 0;

  // Render score stars
  const renderStars = (score: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(i => (
          <Star
            key={i}
            className={`w-5 h-5 ${i <= score ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080b12]">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/20 text-accent-purple mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">{t('hero.badge')}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('hero.title')}
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t('hero.description')}
            </p>
          </div>

          {/* Error Display */}
          <div role="alert" aria-live="polite">
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-3">
                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-300">{error}</p>
              </div>
            )}
          </div>

          {/* Stage: Setup */}
          {stage === 'setup' && (
            <div className="bg-[#0d1117] rounded-2xl border border-gray-800 p-6 md:p-8">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-accent-purple" />
                {t('setup.title')}
              </h2>

              <div className="space-y-6">
                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('setup.jobTitle')}
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder={t('setup.jobTitlePlaceholder')}
                      className="w-full pl-10 pr-4 py-3 bg-[#161b22] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-accent-purple focus:outline-none"
                    />
                  </div>
                </div>

                {/* Experience Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('setup.experienceLevel')}
                  </label>
                  <div className="grid grid-cols-3 gap-3" role="radiogroup" aria-label={t('setup.experienceLevel')}>
                    {EXPERIENCE_LEVELS.map(exp => (
                      <button
                        key={exp.value}
                        role="radio"
                        aria-checked={level === exp.value}
                        onClick={() => setLevel(exp.value as 'entry' | 'mid' | 'senior')}
                        className={`p-4 rounded-lg border transition-all text-left ${
                          level === exp.value
                            ? 'border-accent-purple bg-accent-purple/20 text-white'
                            : 'border-gray-700 bg-[#161b22] text-gray-400 hover:border-gray-600'
                        }`}
                      >
                        <div className="font-medium">{exp.label}</div>
                        <div className="text-xs mt-1 opacity-70">{exp.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question Count */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('setup.questionCount', { count: questionCount })}
                  </label>
                  <input
                    type="range"
                    min={3}
                    max={10}
                    value={questionCount}
                    onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                    className="w-full accent-accent-purple"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{t('setup.quick')}</span>
                    <span>{t('setup.thorough')}</span>
                  </div>
                </div>

                {/* Start Button */}
                <button
                  onClick={startInterview}
                  disabled={isGenerating || !jobTitle.trim()}
                  className="w-full py-4 bg-accent-purple hover:bg-accent-purple/90 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      {t('setup.generating')}
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      {t('setup.startButton')}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Stage: Interview */}
          {stage === 'interview' && questions.length > 0 && (
            <div className="space-y-6">
              {/* Progress */}
              <div className="bg-[#0d1117] rounded-xl border border-gray-800 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">
                    {t('interview.progress', { current: currentQuestionIndex + 1, total: questions.length })}
                  </span>
                  <span className="text-sm text-accent-purple font-medium">
                    {questions[currentQuestionIndex].category}
                  </span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-accent-purple h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="bg-[#0d1117] rounded-2xl border border-gray-800 p-6 md:p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-accent-purple/20 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-accent-purple" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      {questions[currentQuestionIndex].text}
                    </h3>
                  </div>
                </div>

                {/* Answer Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('interview.yourAnswer')}
                  </label>
                  <textarea
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    placeholder={t('interview.answerPlaceholder')}
                    rows={8}
                    className="w-full px-4 py-3 bg-[#161b22] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-accent-purple focus:outline-none resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {t('interview.answerTip')}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={skipQuestion}
                    className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
                  >
                    {t('interview.skip')}
                  </button>
                  <button
                    onClick={submitAnswer}
                    disabled={isEvaluating || !currentAnswer.trim()}
                    className="px-8 py-3 bg-accent-green hover:bg-accent-green/90 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                  >
                    {isEvaluating ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        {t('interview.evaluating')}
                      </>
                    ) : currentQuestionIndex < questions.length - 1 ? (
                      <>
                        {t('interview.submitContinue')}
                        <ArrowRight className="w-5 h-5" />
                      </>
                    ) : (
                      <>
                        {t('interview.submitFinish')}
                        <CheckCircle className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-accent-purple/10 border border-accent-purple/30 rounded-lg p-4 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-accent-purple flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-300">
                  <strong className="text-white">{t('interview.starReminder')}</strong>{' '}
                  {t('interview.starDescription')}
                </div>
              </div>
            </div>
          )}

          {/* Stage: Results */}
          {stage === 'results' && (
            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-[#0d1117] rounded-2xl border border-gray-800 p-6 md:p-8 text-center">
                <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">{t('results.complete')}</h2>
                <p className="text-gray-400 mb-4">
                  {t('results.summary', { answered: results.filter(r => r.answer).length, total: results.length })}
                </p>
                {averageScore > 0 && (
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <span className="text-gray-300">{t('results.averageScore')}</span>
                    {renderStars(Math.round(averageScore))}
                    <span className="text-white font-semibold">({averageScore.toFixed(1)}/5)</span>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={restartInterview}
                    className="px-6 py-3 bg-accent-purple hover:bg-accent-purple/90 text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    {t('results.startNew')}
                  </button>
                </div>
              </div>

              {/* Rewarded Video Ad - Unlock Bonus Practice */}
              {!hasBonusUnlocked && (
                <div className="mt-6">
                  <RewardedVideoAd
                    onRewardEarned={() => {
                      setHasBonusUnlocked(true);
                      setQuestionCount(10);
                    }}
                    rewardDescription={t('results.bonusQuestions')}
                  />
                </div>
              )}

              {hasBonusUnlocked && (
                <div className="bg-accent-green/10 border border-accent-green/30 rounded-xl p-4 mt-6 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent-green flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">{t('results.bonusUnlocked')}</p>
                    <p className="text-sm text-gray-400">{t('results.bonusDescription')}</p>
                  </div>
                </div>
              )}

              {/* Individual Results */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">{t('results.detailedFeedback')}</h3>
                {results.map((result, index) => (
                  <div key={index} className="bg-[#0d1117] rounded-xl border border-gray-800 p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <span className="text-xs text-accent-purple font-medium uppercase">
                          {t('results.questionLabel', { number: index + 1 })} • {result.question.category}
                        </span>
                        <h4 className="text-white font-medium mt-1">{result.question.text}</h4>
                      </div>
                      {result.feedback && renderStars(result.feedback.score)}
                    </div>

                    {result.answer ? (
                      <>
                        <div className="bg-[#161b22] rounded-lg p-4 mb-4">
                          <p className="text-sm text-gray-300">{result.answer}</p>
                        </div>

                        {result.feedback && (
                          <div className="space-y-4">
                            {result.feedback.strengths.length > 0 && (
                              <div>
                                <h5 className="text-sm font-medium text-green-400 flex items-center gap-2 mb-2">
                                  <CheckCircle className="w-4 h-4" />
                                  {t('results.strengths')}
                                </h5>
                                <ul className="text-sm text-gray-300 space-y-1">
                                  {result.feedback.strengths.map((s, i) => (
                                    <li key={i}>• {s}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {result.feedback.improvements.length > 0 && (
                              <div>
                                <h5 className="text-sm font-medium text-yellow-400 flex items-center gap-2 mb-2">
                                  <Lightbulb className="w-4 h-4" />
                                  {t('results.improvements')}
                                </h5>
                                <ul className="text-sm text-gray-300 space-y-1">
                                  {result.feedback.improvements.map((imp, i) => (
                                    <li key={i}>• {imp}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {result.feedback.sampleAnswer && (
                              <div>
                                <h5 className="text-sm font-medium text-accent-purple flex items-center gap-2 mb-2">
                                  <Target className="w-4 h-4" />
                                  {t('results.sampleAnswer')}
                                </h5>
                                <p className="text-sm text-gray-400 italic">
                                  {result.feedback.sampleAnswer}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-sm text-gray-500 italic">{t('results.skipped')}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Related Resources */}
              <div className="bg-[#0d1117] rounded-xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">{t('results.continuePrep')}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link
                    href={`/${locale}/blog/star-method-interview-questions`}
                    className="p-4 bg-[#161b22] rounded-lg hover:bg-[#1c2128] transition-colors group"
                  >
                    <h4 className="text-white font-medium group-hover:text-accent-purple transition-colors">
                      {t('results.resources.starMethod.title')}
                    </h4>
                    <p className="text-sm text-gray-400 mt-1">
                      {t('results.resources.starMethod.description')}
                    </p>
                  </Link>
                  <Link
                    href={`/${locale}/blog/tell-me-about-yourself-answer`}
                    className="p-4 bg-[#161b22] rounded-lg hover:bg-[#1c2128] transition-colors group"
                  >
                    <h4 className="text-white font-medium group-hover:text-accent-purple transition-colors">
                      {t('results.resources.tellMe.title')}
                    </h4>
                    <p className="text-sm text-gray-400 mt-1">
                      {t('results.resources.tellMe.description')}
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

            {/* Leaderboard Ad */}
            <LeaderboardAd className="max-w-4xl mx-auto px-6 py-8" />

            {/* External Resources */}
            <section className="py-8 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('externalResources.title')}</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        <a href="https://www.bls.gov/ooh/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
                            <span className="text-gray-400">↗</span>
                            <span className="text-sm text-gray-700">{t('externalResources.blsCareerOutlook')}</span>
                        </a>
                        <a href="https://www.shrm.org/topics-tools/tools/hr-answers/what-are-applicant-tracking-systems" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition border border-gray-100">
                            <span className="text-gray-400">↗</span>
                            <span className="text-sm text-gray-700">{t('externalResources.shrmInterviewPractices')}</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Multiplex Ad */}
            <MultiplexAd className="max-w-4xl mx-auto px-6 py-8" />

      <Footer />
    </div>
  );
}
