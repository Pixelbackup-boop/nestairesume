import { create } from 'zustand';
import api from '../lib/api';

interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, fullName: string) => Promise<void>;
    logout: () => void;
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

            const { access_token } = response.data;
            localStorage.setItem('token', access_token);

            // 2. Set User State (For MVP we assume success means authenticated)
            // Ideally we would fetch user profile here. 
            // mocking user object for now based on email
            set({
                isAuthenticated: true,
                user: { id: '1', email, name: 'User' },
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
}));
