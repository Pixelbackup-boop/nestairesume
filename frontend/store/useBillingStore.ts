import { create } from 'zustand';
import api from '../lib/api';

interface PaymentMethodInfo {
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
}

interface SubscriptionInfo {
  plan: string;
  planDisplayName: string;
  status: string;
  currentPeriodEnd: number;
  cancelAtPeriodEnd: boolean;
  cancelAt: number | null;
  paymentMethod: PaymentMethodInfo | null;
}

interface InvoiceInfo {
  id: string;
  number: string | null;
  date: number;
  amount: number;
  currency: string;
  status: string | null;
  pdfUrl: string | null;
  hostedUrl: string | null;
  description: string;
}

interface ProrationPreview {
  amount: number;
  currency: string;
  isCredit: boolean;
}

interface BillingState {
  subscription: SubscriptionInfo | null;
  invoices: InvoiceInfo[];
  isLoading: boolean;
  error: string | null;
  fetchBilling: () => Promise<void>;
  cancelSubscription: (immediately?: boolean) => Promise<{ effectiveDate: number }>;
  reactivateSubscription: () => Promise<void>;
  changePlan: (plan: string) => Promise<void>;
  getProrationPreview: (plan: string) => Promise<ProrationPreview>;
}

export const useBillingStore = create<BillingState>((set) => ({
  subscription: null,
  invoices: [],
  isLoading: false,
  error: null,

  fetchBilling: async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) return;

    set({ isLoading: true, error: null });

    try {
      const response = await api.get<{ subscription: SubscriptionInfo | null; invoices: InvoiceInfo[] }>('/payments/billing');
      set({
        subscription: response.data.subscription,
        invoices: response.data.invoices,
        isLoading: false,
      });
    } catch (error: unknown) {
      const err = error as { response?: { data?: { detail?: string } } };
      set({
        error: err.response?.data?.detail || 'Failed to fetch billing info',
        isLoading: false,
      });
    }
  },

  cancelSubscription: async (immediately = false) => {
    const response = await api.post<{ effectiveDate: number }>('/payments/cancel', { immediately });
    return response.data;
  },

  reactivateSubscription: async () => {
    await api.post('/payments/reactivate');
  },

  changePlan: async (plan: string) => {
    await api.post('/payments/change-plan', { plan });
  },

  getProrationPreview: async (plan: string) => {
    const response = await api.get<ProrationPreview>(`/payments/proration-preview?plan=${plan}`);
    return response.data;
  },
}));
