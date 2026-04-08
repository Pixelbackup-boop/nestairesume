import { create } from 'zustand';
import api from '../lib/api';

function getGeoCookie(): string | undefined {
    if (typeof document === 'undefined') return undefined;
    const match = document.cookie.match(/(?:^|;\s*)geo_country=([^;]*)/);
    return match?.[1] || undefined;
}

interface User {
    id: string;
    email: string;
    name: string;
    image?: string | null;
    role: 'user' | 'admin';
    subscriptionTier?: string;
    subscriptionStatus?: string;
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFromNextAuth: (session: any) => void;
    updateProfile: (data: { name?: string; email?: string; avatarId?: number }) => Promise<void>;
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
            const geo = getGeoCookie();
            const body = `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}${geo ? `&countryCode=${encodeURIComponent(geo)}` : ''}`;
            const response = await api.post('/auth/token',
                body,
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            );

            const { access_token } = response.data as { access_token: string };
            localStorage.setItem('token', access_token);
            // Presence-only cookie so Next.js middleware can gate protected routes server-side
            document.cookie = 'auth_token=1; path=/; SameSite=Strict; Max-Age=2592000';

            // 2. Fetch user profile to get role and other details
            const userResponse = await api.get('/auth/me');
            const userData = userResponse.data as { id: string; email: string; name?: string; image?: string | null; role?: string; subscriptionTier?: string; subscriptionStatus?: string };

            set({
                isAuthenticated: true,
                user: {
                    id: userData.id,
                    email: userData.email,
                    name: userData.name || '',
                    image: userData.image,
                    role: (userData.role as 'user' | 'admin') || 'user',
                    subscriptionTier: userData.subscriptionTier,
                    subscriptionStatus: userData.subscriptionStatus,
                },
                isLoading: false
            });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                name: fullName,
                countryCode: getGeoCookie(),
            });
            set({ isLoading: false });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        document.cookie = 'auth_token=; path=/; Max-Age=0';
        set({ user: null, isAuthenticated: false });
    },

    refreshUser: async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const userResponse = await api.get('/auth/me');
            const userData = userResponse.data as { id: string; email: string; name?: string; image?: string | null; role?: string; subscriptionTier?: string; subscriptionStatus?: string };

            set({
                isAuthenticated: true,
                user: {
                    id: userData.id,
                    email: userData.email,
                    name: userData.name || '',
                    image: userData.image,
                    role: (userData.role as 'user' | 'admin') || 'user',
                    subscriptionTier: userData.subscriptionTier,
                    subscriptionStatus: userData.subscriptionStatus,
                },
            });
        } catch {
            // Token might be invalid, clear everything
            localStorage.removeItem('token');
            document.cookie = 'auth_token=; path=/; Max-Age=0';
            set({ user: null, isAuthenticated: false });
        }
    },

    setFromNextAuth: (session) => {
        if (session?.user) {
            set({
                isAuthenticated: true,
                user: {
                    id: session.user.id || session.user.email,
                    email: session.user.email,
                    name: session.user.name || '',
                    role: 'user',
                },
            });
        } else {
            set({ user: null, isAuthenticated: false });
        }
    },

    updateProfile: async (data) => {
        try {
            const response = await api.patch('/auth/profile', data);
            const updated = response.data as { id: string; email: string; name: string; image?: string | null; role: string };

            set((state) => ({
                user: state.user ? {
                    ...state.user,
                    name: updated.name,
                    email: updated.email,
                    image: updated.image,
                } : null,
            }));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            throw error;
        }
    },
}));
