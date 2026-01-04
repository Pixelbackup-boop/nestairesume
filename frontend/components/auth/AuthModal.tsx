'use client';

import React, { useState } from 'react';
import {
    X,
    Mail,
    Lock,
    User,
    Eye,
    EyeOff,
    Loader2,
    Github,
    Chrome,
} from 'lucide-react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialMode?: 'login' | 'signup';
}

type AuthMode = 'login' | 'signup';

export default function AuthModal({
    isOpen,
    onClose,
    onSuccess,
    initialMode = 'login',
}: AuthModalProps) {
    const [mode, setMode] = useState<AuthMode>(initialMode);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // TODO: Replace with actual authentication
            // For now, simulate successful auth
            console.log('Auth data:', { mode, ...formData });

            // Store a simple flag in localStorage for demo
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userName', formData.name || formData.email.split('@')[0]);

            onSuccess();
        } catch (err) {
            setError('Authentication failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialAuth = async (provider: 'google' | 'github') => {
        setError('');
        setIsLoading(true);

        try {
            // Simulate social auth
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log('Social auth:', provider);

            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userName', 'User');

            onSuccess();
        } catch (err) {
            setError(`${provider} authentication failed.`);
        } finally {
            setIsLoading(false);
        }
    };

    const updateFormData = (field: keyof typeof formData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setError('');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-fadeIn">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition z-10"
                >
                    <X size={20} />
                </button>

                {/* Header */}
                <div className="px-8 pt-8 pb-6 text-center">
                    <div className="w-14 h-14 bg-accent-green/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <div className="w-8 h-8 bg-accent-green rounded-md flex items-center justify-center font-bold text-slate-900">
                            R
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                        {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-slate-400 text-sm">
                        {mode === 'login'
                            ? 'Sign in to download your resume'
                            : 'Sign up to save and download your resumes'}
                    </p>
                </div>

                {/* Mode Tabs */}
                <div className="px-8 mb-6">
                    <div className="flex bg-slate-700/50 rounded-lg p-1">
                        <button
                            onClick={() => setMode('login')}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                                mode === 'login'
                                    ? 'bg-slate-600 text-white'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setMode('signup')}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                                mode === 'signup'
                                    ? 'bg-slate-600 text-white'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>

                {/* Social Auth */}
                <div className="px-8 mb-6">
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => handleSocialAuth('google')}
                            disabled={isLoading}
                            className="flex items-center justify-center gap-2 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-white transition disabled:opacity-50"
                        >
                            <Chrome size={18} />
                            Google
                        </button>
                        <button
                            onClick={() => handleSocialAuth('github')}
                            disabled={isLoading}
                            className="flex items-center justify-center gap-2 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-white transition disabled:opacity-50"
                        >
                            <Github size={18} />
                            GitHub
                        </button>
                    </div>

                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-slate-700" />
                        <span className="text-xs text-slate-500">or continue with email</span>
                        <div className="flex-1 h-px bg-slate-700" />
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-8 pb-8">
                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        {/* Name (Signup only) */}
                        {mode === 'signup' && (
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                                    />
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => updateFormData('name', e.target.value)}
                                        placeholder="John Smith"
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-accent-green transition"
                                        required={mode === 'signup'}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                                />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => updateFormData('email', e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-accent-green transition"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <Lock
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                                />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => updateFormData('password', e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-12 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-accent-green transition"
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Forgot Password (Login only) */}
                    {mode === 'login' && (
                        <div className="mt-3 text-right">
                            <button
                                type="button"
                                className="text-sm text-accent-green hover:underline"
                            >
                                Forgot password?
                            </button>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-6 py-3 bg-accent-green text-slate-900 rounded-lg font-semibold hover:bg-accent-teal transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                            </>
                        ) : mode === 'login' ? (
                            'Sign In'
                        ) : (
                            'Create Account'
                        )}
                    </button>

                    {/* Terms (Signup only) */}
                    {mode === 'signup' && (
                        <p className="mt-4 text-xs text-slate-500 text-center">
                            By signing up, you agree to our{' '}
                            <a href="#" className="text-accent-green hover:underline">
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="#" className="text-accent-green hover:underline">
                                Privacy Policy
                            </a>
                        </p>
                    )}
                </form>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
            `}</style>
        </div>
    );
}
