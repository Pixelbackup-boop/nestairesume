'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../../store/useAuthStore';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const { login, isLoading, error } = useAuthStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            router.push('/');
        } catch (err) {
            // Error handled in store
        }
    };

    return (
        <div className="min-h-screen bg-bg-light flex items-center justify-center p-4">
            <div className="bg-white border border-border-subtle rounded-xl p-8 w-full max-w-md shadow-lg">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-dark-teal mb-2">Welcome Back</h1>
                    <p className="text-text-secondary">Sign in to continue building your resume</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-dark-teal mb-2">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-bg-card-light border border-border-subtle rounded-lg px-4 py-3 text-dark-teal focus:outline-none focus:border-accent-green transition"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-dark-teal mb-2">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-bg-card-light border border-border-subtle rounded-lg px-4 py-3 text-dark-teal focus:outline-none focus:border-accent-green transition"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-accent-green text-white font-bold py-3 rounded-lg hover:bg-accent-teal transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : 'Sign In'}
                    </button>
                </form>

                <p className="text-center mt-6 text-text-secondary text-sm">
                    Don't have an account?{' '}
                    <Link href="/auth/register" className="text-accent-green hover:underline">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
}
