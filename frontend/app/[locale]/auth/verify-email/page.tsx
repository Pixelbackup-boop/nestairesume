'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useAuthStore } from '@/store/useAuthStore';
import { Loader2, Mail, RefreshCw } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import api from '@/lib/api';

export default function VerifyEmailPage() {
    const router = useRouter();
    const locale = useLocale();
    const searchParams = useSearchParams();
    const t = useTranslations('Auth');
    const { refreshUser } = useAuthStore();

    const email = searchParams.get('email') || '';
    const redirectParam = searchParams.get('redirect');
    const redirectTo = redirectParam?.startsWith('/') ? redirectParam : null;
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [resendCooldown, setResendCooldown] = useState(0);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const localizedHref = (path: string) => locale === 'en' ? path : `/${locale}${path}`;

    // Cooldown timer
    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    // Handle input change
    const handleChange = (index: number, value: string) => {
        if (value.length > 1) {
            // Handle paste
            const digits = value.replace(/\D/g, '').slice(0, 6).split('');
            const newCode = [...code];
            digits.forEach((digit, i) => {
                if (index + i < 6) {
                    newCode[index + i] = digit;
                }
            });
            setCode(newCode);
            // Focus on next empty input or last input
            const nextIndex = Math.min(index + digits.length, 5);
            inputRefs.current[nextIndex]?.focus();
        } else {
            // Single digit
            const newCode = [...code];
            newCode[index] = value.replace(/\D/g, '');
            setCode(newCode);

            // Auto-focus next input
            if (value && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
        setError(null);
    };

    // Handle backspace
    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Verify code
    const handleVerify = async () => {
        const fullCode = code.join('');
        if (fullCode.length !== 6) {
            setError(t('enterFullCode'));
            return;
        }

        setIsVerifying(true);
        setError(null);

        try {
            const response = await api.post('/auth/verify-email', {
                email,
                code: fullCode,
            });

            const data = response.data as { access_token: string };

            // Store token and refresh user
            localStorage.setItem('token', data.access_token);
            await refreshUser();

            // Redirect back to original page (or builder) with registered flag
            const postVerifyUrl = redirectTo
                ? redirectTo + (redirectTo.includes('?') ? '&' : '?') + 'registered=true'
                : localizedHref('/?registered=true');
            router.push(postVerifyUrl);
        } catch (err) {
            const apiErr = err as { response?: { data?: { detail?: string } } };
            setError(apiErr.response?.data?.detail || t('verificationFailed'));
        } finally {
            setIsVerifying(false);
        }
    };

    // Resend code
    const handleResend = async () => {
        if (resendCooldown > 0) return;

        setIsResending(true);
        setError(null);

        try {
            await api.post('/auth/resend-code', { email });
            setResendCooldown(60); // 60 second cooldown
            setCode(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } catch (err) {
            const apiErr = err as { response?: { data?: { detail?: string } } };
            setError(apiErr.response?.data?.detail || t('resendFailed'));
        } finally {
            setIsResending(false);
        }
    };

    // Auto-verify when all digits entered
    useEffect(() => {
        if (code.every(digit => digit !== '') && code.join('').length === 6) {
            handleVerify();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code]);

    if (!email) {
        router.push(localizedHref('/auth/register'));
        return null;
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4 pt-24">
                <div className="bg-bg-card border border-border-subtle rounded-xl p-8 w-full max-w-md shadow-2xl">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-accent-green/10 rounded-full flex items-center justify-center">
                            <Mail className="w-8 h-8 text-accent-green" />
                        </div>
                    </div>

                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('verifyEmail')}</h1>
                        <p className="text-gray-600 text-sm">
                            {t('verificationCodeSent')} <br />
                            <span className="font-medium text-gray-900">{email}</span>
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg mb-6 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Code Input */}
                    <div className="flex justify-center gap-2 mb-6">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => { inputRefs.current[index] = el; }}
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-12 h-14 text-center text-2xl font-bold bg-bg-card-light border border-border-subtle rounded-lg text-gray-900 focus:outline-none focus:border-accent-green focus:ring-2 focus:ring-accent-green/20 transition"
                                autoFocus={index === 0}
                            />
                        ))}
                    </div>

                    {/* Verify Button */}
                    <button
                        onClick={handleVerify}
                        disabled={isVerifying || code.some(d => d === '')}
                        className="w-full bg-accent-green text-bg-primary font-bold py-3 rounded-lg hover:bg-accent-teal transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isVerifying ? (
                            <>
                                <Loader2 className="animate-spin w-5 h-5" />
                                {t('verifying')}
                            </>
                        ) : (
                            t('verifyAndContinue')
                        )}
                    </button>

                    {/* Resend */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600 text-sm mb-2">{t('didntReceiveCode')}</p>
                        <button
                            onClick={handleResend}
                            disabled={isResending || resendCooldown > 0}
                            className="text-accent-green hover:underline text-sm font-medium disabled:text-gray-400 disabled:no-underline flex items-center justify-center gap-2 mx-auto"
                        >
                            {isResending ? (
                                <Loader2 className="animate-spin w-4 h-4" />
                            ) : (
                                <RefreshCw className="w-4 h-4" />
                            )}
                            {resendCooldown > 0
                                ? `${t('resendIn')} ${resendCooldown}s`
                                : t('resendCode')}
                        </button>
                    </div>

                    {/* Change Email */}
                    <p className="text-center mt-6 text-gray-500 text-xs">
                        {t('wrongEmail')}{' '}
                        <button
                            onClick={() => router.push(localizedHref('/auth/register') + (redirectTo ? `?redirect=${encodeURIComponent(redirectTo)}` : ''))}
                            className="text-accent-green hover:underline"
                        >
                            {t('changeEmail')}
                        </button>
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
}
