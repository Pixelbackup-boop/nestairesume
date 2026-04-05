'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import {
  Crown,
  CreditCard,
  Download,
  FileText,
  Sparkles,
  Mail,
  Loader2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuthStore } from '@/store/useAuthStore';
import { useBillingStore } from '@/store/useBillingStore';
import { useUsageStore, formatUsage } from '@/store/useUsageStore';
import CancelSubscriptionModal from '@/components/billing/CancelSubscriptionModal';
import ChangePlanModal from '@/components/billing/ChangePlanModal';
import api from '@/lib/api';

const TIER_COLORS: Record<string, string> = {
  starter: 'bg-emerald-100 text-emerald-600',
  gold: 'bg-amber-100 text-amber-600',
  diamond: 'bg-violet-100 text-violet-600',
  platinum: 'bg-gray-200 text-gray-700',
};

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-700',
  past_due: 'bg-red-100 text-red-700',
  canceled: 'bg-gray-100 text-gray-600',
  trialing: 'bg-blue-100 text-blue-700',
};

export default function BillingPage() {
  const t = useTranslations('Billing');
  const locale = useLocale();
  const { isAuthenticated, user } = useAuthStore();
  const { subscription, invoices, isLoading, error, fetchBilling } = useBillingStore();
  const { usage, fetchUsage } = useUsageStore();

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [changePlanOpen, setChangePlanOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchBilling();
      fetchUsage();
    }
  }, [isAuthenticated, fetchBilling, fetchUsage]);

  // Auto-dismiss toast
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleUpdatePayment = async () => {
    try {
      const response = await api.post<{ url: string }>('/payments/create-portal', {
        returnUrl: `${window.location.origin}/${locale}/billing`,
      });
      window.location.href = response.data.url;
    } catch {
      setMessage({ type: 'error', text: 'Failed to open payment settings' });
    }
  };

  const handleReactivate = async () => {
    try {
      await useBillingStore.getState().reactivateSubscription();
      await fetchBilling();
      setMessage({ type: 'success', text: t('cancel.reactivateSuccess') });
    } catch {
      setMessage({ type: 'error', text: 'Failed to reactivate subscription' });
    }
  };

  const formatDate = (timestamp: number) =>
    new Date(timestamp * 1000).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });

  const formatAmount = (cents: number, currency: string) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(cents / 100);

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-32 pb-16">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <p className="text-gray-500">Please sign in to view billing.</p>
            <Link href={`/${locale}/auth/login?redirect=/billing`} className="text-emerald-600 underline mt-2 inline-block">
              Sign In
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Loading
  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-32 pb-16">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mx-auto" />
            <p className="text-gray-500 mt-4">{t('loading')}</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const tier = subscription?.plan || user?.subscriptionTier || 'free';
  const tierColor = TIER_COLORS[tier] || 'bg-gray-100 text-gray-600';

  return (
    <>
      <Header />
      <div className="min-h-screen pt-28 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">{t('title')}</h1>

          {/* Toast */}
          {message && (
            <div className={`mb-6 px-4 py-3 rounded-xl text-sm flex items-center justify-between ${
              message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              <span>{message.text}</span>
              <button onClick={() => setMessage(null)} className="ml-4 opacity-60 hover:opacity-100">&times;</button>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
              <AlertCircle size={16} />
              {t('error')}
              <button onClick={fetchBilling} className="ml-auto text-red-500 hover:text-red-700">
                <RefreshCw size={14} />
              </button>
            </div>
          )}

          {/* ====== Card 1: Current Plan ====== */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">{t('currentPlan.title')}</h2>

            {!subscription || tier === 'free' || tier === 'expired' ? (
              /* No active plan */
              <div className="text-center py-4">
                <Crown className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-900 mb-1">{t('currentPlan.noPlan')}</h3>
                <p className="text-gray-500 text-sm mb-4">{t('currentPlan.noPlanDesc')}</p>
                <Link
                  href={`/${locale}/pricing`}
                  className="inline-flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-600 transition"
                >
                  {t('currentPlan.subscribeCta')}
                </Link>
              </div>
            ) : (
              /* Active plan */
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tierColor}`}>
                      <Crown size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{t('currentPlan.plan', { plan: subscription.planDisplayName })}</h3>
                      <p className="text-sm text-gray-500">
                        {t('currentPlan.nextBilling')}: {formatDate(subscription.currentPeriodEnd)}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[subscription.status] || 'bg-gray-100 text-gray-600'}`}>
                    {t(`currentPlan.${subscription.status === 'past_due' ? 'pastDue' : subscription.status}` as Parameters<typeof t>[0])}
                  </span>
                </div>

                {/* Cancellation warning */}
                {subscription.cancelAtPeriodEnd && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                    <p className="text-amber-800 text-sm font-medium">
                      {t('currentPlan.cancelScheduled', { date: formatDate(subscription.currentPeriodEnd) })}
                    </p>
                    <p className="text-amber-600 text-xs mt-1">{t('currentPlan.cancelScheduledDesc')}</p>
                    <button
                      onClick={handleReactivate}
                      className="mt-3 px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition"
                    >
                      {t('currentPlan.reactivate')}
                    </button>
                  </div>
                )}

                {/* Action buttons */}
                {!subscription.cancelAtPeriodEnd && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => setChangePlanOpen(true)}
                      className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                      {t('currentPlan.changePlan')}
                    </button>
                    <button
                      onClick={() => setCancelOpen(true)}
                      className="py-2.5 px-4 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition"
                    >
                      {t('currentPlan.cancelSubscription')}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ====== Card 2: Payment Method ====== */}
          {subscription && tier !== 'free' && tier !== 'expired' && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-4">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">{t('paymentMethod.title')}</h2>

              {subscription.paymentMethod ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                      <CreditCard size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {t('paymentMethod.cardEnding', {
                          brand: subscription.paymentMethod.brand.charAt(0).toUpperCase() + subscription.paymentMethod.brand.slice(1),
                          last4: subscription.paymentMethod.last4,
                        })}
                      </p>
                      <p className="text-sm text-gray-500">
                        {t('paymentMethod.expires', {
                          month: String(subscription.paymentMethod.expMonth).padStart(2, '0'),
                          year: subscription.paymentMethod.expYear,
                        })}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleUpdatePayment}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                  >
                    {t('paymentMethod.update')}
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-gray-500 text-sm">{t('paymentMethod.noMethod')}</p>
                  <button
                    onClick={handleUpdatePayment}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                  >
                    {t('paymentMethod.update')}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ====== Card 3: Usage Summary ====== */}
          {usage && tier !== 'free' && tier !== 'expired' && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-4">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">{t('usage.title')}</h2>

              <div className="grid grid-cols-2 gap-4">
                {([
                  { key: 'cv' as const, label: t('usage.cvCreations'), icon: FileText, color: 'bg-blue-500' },
                  { key: 'ai' as const, label: t('usage.aiGenerations'), icon: Sparkles, color: 'bg-purple-500' },
                  { key: 'download' as const, label: t('usage.downloads'), icon: Download, color: 'bg-emerald-500' },
                  { key: 'coverLetter' as const, label: t('usage.coverLetters'), icon: Mail, color: 'bg-amber-500' },
                ]).map(({ key, label, icon: Icon, color }) => {
                  const data = usage.usage[key];
                  if (!data) return null;
                  const pct = data.limit === -1 ? 0 : Math.min(100, (data.used / data.limit) * 100);

                  return (
                    <div key={key} className="bg-gray-50 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon size={14} className="text-gray-500" />
                        <span className="text-xs font-medium text-gray-600">{label}</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">
                        {data.limit === -1 ? `${data.used} / ${t('usage.unlimited')}` : formatUsage(data.used, data.limit)}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className={`h-1.5 rounded-full ${color} transition-all`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ====== Card 4: Billing History ====== */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">{t('history.title')}</h2>

            {invoices.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-6">{t('history.noHistory')}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-2 font-medium text-gray-500">{t('history.date')}</th>
                      <th className="text-left py-2 font-medium text-gray-500">{t('history.description')}</th>
                      <th className="text-right py-2 font-medium text-gray-500">{t('history.amount')}</th>
                      <th className="text-center py-2 font-medium text-gray-500">{t('history.status')}</th>
                      <th className="text-right py-2 font-medium text-gray-500">{t('history.download')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map(invoice => {
                      const statusKey = invoice.status === 'paid' ? 'paid'
                        : invoice.status === 'open' ? 'open'
                        : invoice.status === 'void' ? 'void'
                        : invoice.status === 'uncollectible' ? 'uncollectible'
                        : 'draft';

                      return (
                        <tr key={invoice.id} className="border-b border-gray-50">
                          <td className="py-3 text-gray-700">{formatDate(invoice.date)}</td>
                          <td className="py-3 text-gray-700">{invoice.description}</td>
                          <td className="py-3 text-right font-medium text-gray-900">
                            {formatAmount(invoice.amount, invoice.currency)}
                          </td>
                          <td className="py-3 text-center">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              statusKey === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                              statusKey === 'open' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {t(`history.${statusKey}` as Parameters<typeof t>[0])}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            {invoice.pdfUrl && (
                              <a
                                href={invoice.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-600 hover:text-emerald-700 text-xs font-medium"
                              >
                                {t('history.downloadPdf')}
                              </a>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {subscription && (
        <>
          <CancelSubscriptionModal
            isOpen={cancelOpen}
            onClose={() => setCancelOpen(false)}
            planName={subscription.planDisplayName}
            periodEnd={subscription.currentPeriodEnd}
            onSuccess={text => setMessage({ type: 'success', text })}
          />
          <ChangePlanModal
            isOpen={changePlanOpen}
            onClose={() => setChangePlanOpen(false)}
            currentPlan={subscription.plan}
            onSuccess={text => setMessage({ type: 'success', text })}
          />
        </>
      )}

      <Footer />
    </>
  );
}
