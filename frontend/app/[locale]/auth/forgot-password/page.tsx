'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Loader2, Mail, Lock, KeyRound, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import api from '@/lib/api';

type Step = 'request' | 'reset';

export default function ForgotPasswordPage() {
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations('Auth');
    const localizedHref = (path: string) => `/${locale}${path}`;

    const [step, setStep] = useState<Step>('request');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [info, setInfo] = useState<string | null>(null);

    // Step 1: request a reset code by email.
    // The backend always returns success (to prevent email enumeration), so we
    // advance to the code-entry step regardless of whether the email exists.
    const handleRequestCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            await api.post('/auth/forgot-password', { email });
            setInfo(t('resetCodeSentInfo', { email }));
            setStep('reset');
        } catch {
            // Network/server error — backend itself never reveals account existence.
            setError(t('couldNotSendCode'));
        } finally {
            setIsLoading(false);
        }
    };

    // Step 2: submit the code + new password.
    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validate the new password before hitting the API. The validator returns
        // a translation key (or null) so the message localizes with the page.
        const errorKey = validateNewPassword(newPassword, confirmPassword);
        if (errorKey) {
            setError(t(errorKey));
            return;
        }

        setIsLoading(true);
        try {
            await api.post('/auth/reset-password', {
                email,
                code: code.trim(),
                newPassword,
            });
            router.push(localizedHref('/auth/login') + '?reset=success');
        } catch (err) {
            const apiErr = err as { response?: { data?: { detail?: string } } };
            setError(apiErr.response?.data?.detail || t('resetFailed'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4 pt-24">
                <div className="bg-bg-card border border-border-subtle rounded-xl p-8 w-full max-w-md shadow-2xl">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-accent-green/10 rounded-full flex items-center justify-center">
                            <KeyRound className="w-8 h-8 text-accent-green" />
                        </div>
                    </div>

                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('resetTitle')}</h1>
                        <p className="text-gray-600 text-sm">
                            {step === 'request' ? t('resetRequestSubtitle') : t('resetCodeSubtitle')}
                        </p>
                    </div>

                    {/* Info banner */}
                    {info && step === 'reset' && (
                        <div className="bg-accent-green/10 border border-accent-green/40 text-accent-green px-4 py-3 rounded-lg mb-6 text-sm">
                            {info}
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg mb-6 text-sm">
                            {error}
                        </div>
                    )}

                    {step === 'request' ? (
                        <form onSubmit={handleRequestCode} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t('email')}</label>
                                <div className="relative">
                                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value); setError(null); }}
                                        className="w-full pl-10 pr-4 bg-white border border-gray-300 rounded-lg py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent transition"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-accent-green text-bg-primary font-bold py-3 rounded-lg hover:bg-accent-teal transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : t('sendResetCode')}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleResetPassword} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t('resetCodeLabel')}</label>
                                <div className="relative">
                                    <KeyRound size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={6}
                                        required
                                        value={code}
                                        onChange={(e) => { setCode(e.target.value.replace(/\D/g, '')); setError(null); }}
                                        className="w-full pl-10 pr-4 bg-white border border-gray-300 rounded-lg py-3 text-gray-900 tracking-[0.5em] font-semibold focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent transition"
                                        placeholder="000000"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t('newPassword')}</label>
                                <div className="relative">
                                    <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="password"
                                        required
                                        value={newPassword}
                                        onChange={(e) => { setNewPassword(e.target.value); setError(null); }}
                                        className="w-full pl-10 pr-4 bg-white border border-gray-300 rounded-lg py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent transition"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t('confirmNewPassword')}</label>
                                <div className="relative">
                                    <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => { setConfirmPassword(e.target.value); setError(null); }}
                                        className="w-full pl-10 pr-4 bg-white border border-gray-300 rounded-lg py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent transition"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-accent-green text-bg-primary font-bold py-3 rounded-lg hover:bg-accent-teal transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : t('resetPasswordAction')}
                            </button>

                            <button
                                type="button"
                                onClick={() => { setStep('request'); setError(null); }}
                                className="w-full text-gray-500 hover:text-gray-900 text-sm flex items-center justify-center gap-1.5 transition"
                            >
                                <ArrowLeft size={14} /> {t('useDifferentEmail')}
                            </button>
                        </form>
                    )}

                    <p className="text-center mt-6 text-gray-600 text-sm">
                        {t('rememberedIt')}{' '}
                        <Link href={localizedHref('/auth/login')} className="text-accent-green hover:underline">
                            {t('backToSignIn')}
                        </Link>
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// PASSWORD POLICY — your call.
//
// This is the one genuine product decision in this flow. The backend only
// enforces a hard floor (newPassword.length >= 8, see backend authService.ts
// resetPassword). Everything stronger than that is a UX-vs-friction trade-off
// that lives here, client-side, so users get instant feedback before submitting.
//
// Returns a translation KEY (looked up against the Auth namespace) to block
// submission, or null to allow it. Returning a key — not a finished string —
// keeps this function pure and lets the message localize across all 17 locales.
//
// Decide:
//   - Minimum length? (backend rejects < 8, so anything lower is pointless)
//   - Require confirm-password to match? (recommended — catches typos)
//   - Any complexity rules (uppercase / number / symbol)? Optional; stricter
//     rules frustrate users and the data on whether they improve security is mixed.
//     If you add one, add a matching Auth key (e.g. 'passwordNeedsNumber') to all
//     17 messages/*.json files so the new error localizes too.
//
// TODO(you): implement the policy you want. A reasonable starting point:
function validateNewPassword(
    password: string,
    confirmPassword: string,
): 'passwordTooShort' | 'passwordsDoNotMatch' | null {
    if (password.length < 8) {
        return 'passwordTooShort';
    }
    if (password !== confirmPassword) {
        return 'passwordsDoNotMatch';
    }
    return null;
}
