'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useAuthStore } from '@/store/useAuthStore';
import { Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RegisterPage() {
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations('Auth');
    const { register, isLoading, error } = useAuthStore();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const localizedHref = (path: string) => `/${locale}${path}`;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(email, password, name);
            router.push(localizedHref('/auth/login'));
        } catch (err) {
            // Error handled in store
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4 pt-24">
                <div className="bg-bg-card border border-border-subtle rounded-xl p-8 w-full max-w-md shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">{t('createAccount')}</h1>
                        <p className="text-gray-400">{t('createAccountSubtitle')}</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg mb-6 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">{t('fullName')}</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-bg-card-light border border-border-subtle rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-green transition"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">{t('email')}</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-bg-card-light border border-border-subtle rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-green transition"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">{t('password')}</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-bg-card-light border border-border-subtle rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-green transition"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-accent-green text-bg-primary font-bold py-3 rounded-lg hover:bg-accent-teal transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : t('register')}
                        </button>
                    </form>

                    <p className="text-center mt-6 text-gray-400 text-sm">
                        {t('hasAccount')}{' '}
                        <Link href={localizedHref('/auth/login')} className="text-accent-green hover:underline">
                            {t('signIn')}
                        </Link>
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
}
