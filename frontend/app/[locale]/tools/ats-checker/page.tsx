'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Upload, FileText, CheckCircle, AlertTriangle, XCircle, Loader2, RefreshCw, ArrowRight } from 'lucide-react';

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4444') + '/api/v1';
const siteUrl = 'https://www.bestairesumes.com';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

// ATS systems list
const atsSystems = ['Workday', 'Greenhouse', 'Taleo', 'iCIMS', 'Lever', 'BambooHR', 'ADP', 'SAP SuccessFactors'];

interface AtsCategory {
    name: string;
    score: number;
    maxScore: number;
    status: 'pass' | 'warning' | 'fail';
    details: string[];
}

interface AtsResult {
    score: number;
    categories: AtsCategory[];
    recommendations: string[];
    pageCount?: number;
}

type PageState = 'idle' | 'uploading' | 'results' | 'error';

function getScoreColor(score: number): string {
    if (score >= 80) return '#22c55e';
    if (score >= 50) return '#eab308';
    return '#ef4444';
}

function getScoreLabel(score: number): string {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Needs Work';
    return 'Poor';
}

function getStatusIcon(status: 'pass' | 'warning' | 'fail') {
    switch (status) {
        case 'pass': return <CheckCircle className="w-5 h-5 text-green-500" />;
        case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
        case 'fail': return <XCircle className="w-5 h-5 text-red-500" />;
    }
}

function getStatusBg(status: 'pass' | 'warning' | 'fail') {
    switch (status) {
        case 'pass': return 'border-green-200 bg-green-50/50';
        case 'warning': return 'border-yellow-200 bg-yellow-50/50';
        case 'fail': return 'border-red-200 bg-red-50/50';
    }
}

// ── Score Circle Component ─────────────────────────────

function ScoreCircle({ score }: { score: number }) {
    const [animatedScore, setAnimatedScore] = useState(0);
    const color = getScoreColor(score);
    const size = 180;
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (animatedScore / 100) * circumference;

    useEffect(() => {
        let frame: number;
        const duration = 1200;
        const start = performance.now();

        const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setAnimatedScore(Math.round(eased * score));
            if (progress < 1) frame = requestAnimationFrame(animate);
        };

        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [score]);

    return (
        <div className="relative flex flex-col items-center">
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e5e7eb" strokeWidth={strokeWidth} />
                <circle
                    cx={size / 2} cy={size / 2} r={radius} fill="none"
                    stroke={color} strokeWidth={strokeWidth}
                    strokeDasharray={circumference} strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold" style={{ color }}>{animatedScore}%</span>
                <span className="text-sm font-medium text-gray-500 mt-1">{getScoreLabel(score)}</span>
            </div>
        </div>
    );
}

// ── Main Page ──────────────────────────────────────────

export default function ATSCheckerPage() {
    const t = useTranslations('AtsChecker');
    const [state, setState] = useState<PageState>('idle');
    const [file, setFile] = useState<File | null>(null);
    const [result, setResult] = useState<AtsResult | null>(null);
    const [error, setError] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const resultRef = useRef<HTMLDivElement>(null);

    const validateFile = (f: File): string | null => {
        if (!ALLOWED_TYPES.includes(f.type)) return 'Only PDF and DOCX files are supported.';
        if (f.size > MAX_FILE_SIZE) return 'File size must be under 10MB.';
        return null;
    };

    const handleFile = useCallback((f: File) => {
        const err = validateFile(f);
        if (err) {
            setError(err);
            setState('error');
            return;
        }
        setFile(f);
        setError('');
        setState('idle');
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
        const f = e.dataTransfer.files[0];
        if (f) handleFile(f);
    }, [handleFile]);

    const handleCheck = async () => {
        if (!file) return;

        setState('uploading');
        setError('');

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${API_BASE}/ats/check`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Analysis failed');
            }

            setResult({
                score: data.score,
                categories: data.categories,
                recommendations: data.recommendations,
                pageCount: data.pageCount,
            });
            setState('results');

            // Scroll to results
            setTimeout(() => {
                resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
            setState('error');
        }
    };

    const handleReset = () => {
        setFile(null);
        setResult(null);
        setError('');
        setState('idle');
    };

    // FAQ items
    const faqItems = [
        { question: t('faq.whatIsAts.question'), answer: t('faq.whatIsAts.answer') },
        { question: t('faq.whyFail.question'), answer: t('faq.whyFail.answer') },
        { question: t('faq.bestFormat.question'), answer: t('faq.bestFormat.answer') },
        { question: t('faq.keywords.question'), answer: t('faq.keywords.answer') },
        { question: t('faq.twoColumn.question'), answer: t('faq.twoColumn.answer') },
        { question: t('faq.jobTitle.question'), answer: t('faq.jobTitle.answer') },
    ];

    // Schema markup — hardcoded SEO constants only (no user input)
    const schemaData = [
        {
            '@context': 'https://schema.org', '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
                { '@type': 'ListItem', position: 2, name: 'Tools', item: `${siteUrl}/tools` },
                { '@type': 'ListItem', position: 3, name: 'ATS Resume Checker' },
            ],
        },
        {
            '@context': 'https://schema.org', '@type': 'FAQPage',
            mainEntity: faqItems.map(item => ({
                '@type': 'Question', name: item.question,
                acceptedAnswer: { '@type': 'Answer', text: item.answer },
            })),
        },
        {
            '@context': 'https://schema.org', '@type': 'SoftwareApplication',
            name: 'ATS Resume Checker', applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            description: 'Free ATS resume checker that scans your resume for compatibility with Applicant Tracking Systems.',
        },
    ];

    return (
        <>
            <Header />
            {schemaData.map((schema, i) => (
                <script key={i} type="application/ld+json">{JSON.stringify(schema)}</script>
            ))}

            {/* Hero */}
            <section className="pt-32 pb-12 bg-gradient-to-b from-blue-50 to-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">{t('hero.badge')}</span>
                    <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 text-gray-900">
                        {t('hero.title')}<br />
                        <span className="text-blue-600">{t('hero.titleHighlight')}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-4 max-w-2xl mx-auto leading-relaxed">
                        <strong>{t('hero.statistic')}</strong>{' '}
                        {t('hero.description')}
                    </p>
                </div>
            </section>

            {/* ── Upload & Results Tool ── */}
            <section className="py-8 bg-white">
                <div className="max-w-4xl mx-auto px-6">

                    {/* Upload Zone */}
                    {state !== 'results' && (
                        <div
                            className={`rounded-2xl p-8 md:p-12 border-2 border-dashed transition-colors ${
                                dragActive
                                    ? 'border-blue-500 bg-blue-50'
                                    : error
                                    ? 'border-red-300 bg-red-50/50'
                                    : 'border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50'
                            }`}
                            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                            onDragLeave={() => setDragActive(false)}
                            onDrop={handleDrop}
                        >
                            <div className="text-center">
                                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                                    state === 'uploading' ? 'bg-blue-100' : file ? 'bg-green-100' : 'bg-blue-100'
                                }`}>
                                    {state === 'uploading' ? (
                                        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                                    ) : file ? (
                                        <FileText className="w-10 h-10 text-green-600" />
                                    ) : (
                                        <Upload className="w-10 h-10 text-blue-600" />
                                    )}
                                </div>

                                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('tool.title')}</h2>

                                {file ? (
                                    <div className="mb-6">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                                            <FileText className="w-4 h-4 text-blue-600" />
                                            <span className="text-sm font-medium text-gray-700">{file.name}</span>
                                            <span className="text-xs text-gray-400">({(file.size / 1024 / 1024).toFixed(1)} MB)</span>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                                        {t('tool.description')}
                                    </p>
                                )}

                                {error && (
                                    <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm">
                                        <XCircle className="w-4 h-4" />
                                        {error}
                                    </div>
                                )}

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                    {!file && (
                                        <>
                                            <button
                                                onClick={() => fileInputRef.current?.click()}
                                                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
                                            >
                                                <Upload className="w-5 h-5" />
                                                {t('tool.uploadBtn')}
                                            </button>
                                            <span className="text-sm text-gray-400">{t('tool.formats')}</span>
                                        </>
                                    )}

                                    {file && state !== 'uploading' && (
                                        <>
                                            <button
                                                onClick={handleCheck}
                                                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
                                            >
                                                {t('tool.checkBtn')}
                                                <ArrowRight className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={handleReset}
                                                className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition"
                                            >
                                                <RefreshCw className="w-4 h-4" />
                                                {t('tool.changeFile')}
                                            </button>
                                        </>
                                    )}

                                    {state === 'uploading' && (
                                        <p className="text-blue-600 font-medium">{t('tool.analyzing')}</p>
                                    )}
                                </div>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".pdf,.docx"
                                    className="hidden"
                                    onChange={(e) => {
                                        const f = e.target.files?.[0];
                                        if (f) handleFile(f);
                                    }}
                                />

                                <p className="text-xs text-gray-400 mt-4">{t('tool.subtext')}</p>
                            </div>
                        </div>
                    )}

                    {/* ── Results Panel ── */}
                    {state === 'results' && result && (
                        <div ref={resultRef} className="space-y-8">
                            {/* Score Header */}
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your ATS Compatibility Score</h2>
                                <ScoreCircle score={result.score} />
                                {result.pageCount && (
                                    <p className="text-sm text-gray-400 mt-4">{result.pageCount} page{result.pageCount > 1 ? 's' : ''} analyzed</p>
                                )}
                            </div>

                            {/* Category Breakdown */}
                            <div className="grid md:grid-cols-2 gap-4">
                                {result.categories.map((cat, i) => (
                                    <div key={i} className={`rounded-xl border p-5 ${getStatusBg(cat.status)}`}>
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                {getStatusIcon(cat.status)}
                                                <h3 className="font-bold text-gray-900">{cat.name}</h3>
                                            </div>
                                            <span className="text-sm font-semibold text-gray-600">{cat.score}/{cat.maxScore}</span>
                                        </div>
                                        {/* Score bar */}
                                        <div className="w-full h-2 bg-gray-200 rounded-full mb-3">
                                            <div
                                                className="h-2 rounded-full transition-all duration-700"
                                                style={{
                                                    width: `${(cat.score / cat.maxScore) * 100}%`,
                                                    backgroundColor: getScoreColor((cat.score / cat.maxScore) * 100),
                                                }}
                                            />
                                        </div>
                                        <ul className="space-y-1">
                                            {cat.details.map((detail, j) => (
                                                <li key={j} className="text-sm text-gray-600 flex items-start gap-1.5">
                                                    <span className="mt-1 shrink-0">
                                                        {detail.toLowerCase().includes('not') || detail.toLowerCase().includes('no ') || detail.toLowerCase().includes('few ')
                                                            ? '·'
                                                            : '✓'}
                                                    </span>
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            {/* Recommendations */}
                            {result.recommendations.length > 0 && (
                                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <AlertTriangle className="w-5 h-5 text-blue-600" />
                                        Recommendations
                                    </h3>
                                    <ul className="space-y-2">
                                        {result.recommendations.map((rec, i) => (
                                            <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                                <span className="text-blue-500 mt-0.5 shrink-0">{i + 1}.</span>
                                                {rec}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <button
                                    onClick={handleReset}
                                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Check Another Resume
                                </button>
                                <Link
                                    href="/builder"
                                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
                                >
                                    Build an ATS-Optimized Resume
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ── SEO Content (kept from original) ── */}

            {/* What ATS Checks For */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">{t('checks.title')}</h2>
                    <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">{t('checks.subtitle')}</p>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', titleKey: 'checks.keywords.title', descKey: 'checks.keywords.description' },
                            { icon: 'M4 6h16M4 10h16M4 14h16M4 18h16', titleKey: 'checks.formatting.title', descKey: 'checks.formatting.description' },
                            { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', titleKey: 'checks.contact.title', descKey: 'checks.contact.description' },
                            { icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', titleKey: 'checks.dates.title', descKey: 'checks.dates.description' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-2">{t(item.titleKey)}</h3>
                                        <p className="text-gray-600 text-sm">{t(item.descKey)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ATS Optimization Checklist */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">{t('checklist.title')}</h2>
                    <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">{t('checklist.subtitle')}</p>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-green-600 mb-4 flex items-center gap-2">
                                <CheckCircle className="w-6 h-6" />
                                {t('checklist.doThis')}
                            </h3>
                            <ul className="space-y-3">
                                {['singleColumn', 'keywords', 'standardHeadings', 'fileFormat', 'standardFonts', 'spellOut'].map(key => (
                                    <li key={key} className="flex items-start gap-3">
                                        <span className="text-green-500 mt-1">✓</span>
                                        <span className="text-gray-700">{t(`checklist.dos.${key}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
                                <XCircle className="w-6 h-6" />
                                {t('checklist.avoidThis')}
                            </h3>
                            <ul className="space-y-3">
                                {['tables', 'images', 'headers', 'creativeTitles', 'fancyFonts', 'lightText'].map(key => (
                                    <li key={key} className="flex items-start gap-3">
                                        <span className="text-red-500 mt-1">✗</span>
                                        <span className="text-gray-700">{t(`checklist.donts.${key}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular ATS Systems */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">{t('systems.title')}</h2>
                    <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">{t('systems.subtitle')}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {atsSystems.map(ats => (
                            <div key={ats} className="bg-white p-4 rounded-lg text-center border border-gray-200">
                                <span className="font-medium text-gray-700">{ats}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 bg-white">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t('faq.title')}</h2>
                    <div className="space-y-6">
                        {faqItems.map((item, i) => (
                            <div key={i} className="bg-gray-50 rounded-xl p-6">
                                <h3 className="font-bold text-lg text-gray-900 mb-2">{item.question}</h3>
                                <p className="text-gray-600">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Related Resources */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">{t('resources.title')}</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Link href="/blog/how-to-write-ats-friendly-resume" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
                            <h3 className="font-bold text-gray-900 mb-2">{t('resources.guide.title')}</h3>
                            <p className="text-gray-600 text-sm">{t('resources.guide.description')}</p>
                        </Link>
                        <Link href="/templates" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
                            <h3 className="font-bold text-gray-900 mb-2">{t('resources.templates.title')}</h3>
                            <p className="text-gray-600 text-sm">{t('resources.templates.description')}</p>
                        </Link>
                        <Link href="/resume-examples" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
                            <h3 className="font-bold text-gray-900 mb-2">{t('resources.examples.title')}</h3>
                            <p className="text-gray-600 text-sm">{t('resources.examples.description')}</p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600 text-center px-6">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{t('cta.title')}</h2>
                <p className="text-blue-100 max-w-2xl mx-auto mb-10 text-lg">{t('cta.description')}</p>
                <Link href="/onboarding" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition transform hover:scale-105 shadow-lg">
                    {t('cta.button')}
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </section>

            <Footer />
        </>
    );
}
