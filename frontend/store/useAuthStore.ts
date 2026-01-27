import { create } from 'zustand';
import api from '../lib/api';

interface User {
    id: string;
    email: string;
    name: string;
    role: 'user' | 'admin';
    subscriptionTier?: string;
    subscriptionStatus?: string;
    trialEndsAt?: string;
    creditsRemaining?: number;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, fullName: string) => Promise<void>;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            // 1. Get Token - send as URL-encoded string
            const response = await api.post('/auth/token',
                `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            );

            const { access_token } = response.data as { access_token: string };
            localStorage.setItem('token', access_token);

            // 2. Fetch user profile to get role and other details
            const userResponse = await api.get('/auth/me');
            const userData = userResponse.data as { id: string; email: string; name?: string; role?: string; subscriptionTier?: string; subscriptionStatus?: string; trialEndsAt?: string; creditsRemaining?: number };

            set({
                isAuthenticated: true,
                user: {
                    id: userData.id,
                    email: userData.email,
                    name: userData.name || '',
                    role: (userData.role as 'user' | 'admin') || 'user',
                    subscriptionTier: userData.subscriptionTier,
                    subscriptionStatus: userData.subscriptionStatus,
                    trialEndsAt: userData.trialEndsAt,
                    creditsRemaining: userData.creditsRemaining,
                },
                isLoading: false
            });

        } catch (error: any) {
            set({
                error: error.response?.data?.detail || 'Login failed',
                isLoading: false
            });
            throw error;
        }
    },

    register: async (email, password, fullName) => {
        set({ isLoading: true, error: null });
        try {
            await api.post('/auth/register', {
                email,
                password,
                name: fullName
            });
            set({ isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.detail || 'Registration failed',
                isLoading: false
            });
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, isAuthenticated: false });
    },

    refreshUser: async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const userResponse = await api.get('/auth/me');
            const userData = userResponse.data as { id: string; email: string; name?: string; role?: string; subscriptionTier?: string; subscriptionStatus?: string; trialEndsAt?: string; creditsRemaining?: number };

            set({
                isAuthenticated: true,
                user: {
                    id: userData.id,
                    email: userData.email,
                    name: userData.name || '',
                    role: (userData.role as 'user' | 'admin') || 'user',
                    subscriptionTier: userData.subscriptionTier,
                    subscriptionStatus: userData.subscriptionStatus,
                    trialEndsAt: userData.trialEndsAt,
                    creditsRemaining: userData.creditsRemaining,
                },
            });
        } catch (error) {
            // Token might be invalid, logout
            localStorage.removeItem('token');
            set({ user: null, isAuthenticated: false });
        }
    },
}));
