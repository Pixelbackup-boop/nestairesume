'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { X, Check, Loader2 } from 'lucide-react';
import { useDialogA11y } from '@/hooks/useDialogA11y';
import { useBillingStore } from '@/store/useBillingStore';
import api from '@/lib/api';

interface ChangePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: string;
  onSuccess: (message: string) => void;
}

type PlanLimits = Record<string, { cvLimit: number; aiLimit: number; downloadLimit: number; coverLetterLimit: number }>;

const PLAN_ORDER = ['starter', 'gold', 'diamond', 'platinum'] as const;
const PLAN_COLORS: Record<string, string> = {
  starter: 'border-emerald-300 bg-emerald-50',
  gold: 'border-amber-300 bg-amber-50',
  diamond: 'border-violet-300 bg-violet-50',
  platinum: 'border-gray-400 bg-gray-50',
};

export default function ChangePlanModal({
  isOpen,
  onClose,
  currentPlan,
  onSuccess,
}: ChangePlanModalProps) {
  const t = useTranslations('Billing.changePlan');
  const tPricing = useTranslations('Pricing');
  const { changePlan, getProrationPreview, fetchBilling } = useBillingStore();
  const { dialogProps } = useDialogA11y({ isOpen, onClose, labelId: 'change-plan-title' });

  const [plans, setPlans] = useState<PlanLimits | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [proration, setProration] = useState<{ amount: number; currency: string; isCredit: boolean } | null>(null);
  const [prorationLoading, setProrationLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      api.get<PlanLimits>('/payments/plans').then(res => setPlans(res.data)).catch(() => {});
    }
  }, [isOpen]);

  useEffect(() => {
    if (!selectedPlan || selectedPlan === currentPlan) {
      setProration(null);
      return;
    }

    setProrationLoading(true);
    getProrationPreview(selectedPlan)
      .then(setProration)
      .catch(() => setProration(null))
      .finally(() => setProrationLoading(false));
  }, [selectedPlan, currentPlan, getProrationPreview]);

  const handleConfirm = async () => {
    if (!selectedPlan || selectedPlan === currentPlan) return;

    setLoading(true);
    try {
      await changePlan(selectedPlan);
      await fetchBilling();
      const planName = tPricing(`${selectedPlan}.name` as Parameters<typeof tPricing>[0]);
      onSuccess(t('success', { plan: planName }));
      handleClose();
    } catch {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedPlan(null);
    setProration(null);
    setLoading(false);
    onClose();
  };

  const formatAmount = (amount: number, currency: string) => {
    const abs = Math.abs(amount) / 100;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(abs);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      <div {...dialogProps} className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition z-10"
        >
          <X size={20} />
        </button>

        <div className="px-6 pt-6 pb-4">
          <h2 id="change-plan-title" className="text-xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>

          {/* Plan cards */}
          <div className="grid grid-cols-2 gap-3">
            {PLAN_ORDER.map(plan => {
              const isCurrent = plan === currentPlan;
              const isSelected = plan === selectedPlan;
              const limits = plans?.[plan];

              return (
                <button
                  key={plan}
                  onClick={() => !isCurrent && setSelectedPlan(plan)}
                  disabled={isCurrent}
                  className={`relative p-4 rounded-xl border-2 text-left transition ${
                    isSelected
                      ? 'border-emerald-500 ring-2 ring-emerald-200'
                      : isCurrent
                        ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                        : `${PLAN_COLORS[plan]} hover:shadow-md cursor-pointer`
                  }`}
                >
                  {isCurrent && (
                    <span className="absolute -top-2 left-3 px-2 py-0.5 bg-gray-500 text-white text-[10px] font-bold rounded-full">
                      {t('current')}
                    </span>
                  )}
                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <Check size={16} className="text-emerald-500" />
                    </div>
                  )}
                  <h3 className="font-bold text-gray-900">
                    {tPricing(`${plan}.name` as Parameters<typeof tPricing>[0])}
                  </h3>
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    {tPricing(`${plan}.price` as Parameters<typeof tPricing>[0])}
                    <span className="text-xs font-normal text-gray-500">
                      {tPricing(`${plan}.period` as Parameters<typeof tPricing>[0])}
                    </span>
                  </p>
                  {limits && (
                    <p className="text-[11px] text-gray-500 mt-1.5">
                      {limits.cvLimit === -1 ? 'Unlimited' : limits.cvLimit} CVs, {limits.downloadLimit} downloads
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Proration preview */}
        {selectedPlan && selectedPlan !== currentPlan && (
          <div className="px-6 pb-4">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              {prorationLoading ? (
                <p className="text-sm text-gray-500">{t('loading')}</p>
              ) : proration ? (
                <p className="text-sm font-medium text-gray-700">
                  {proration.isCredit
                    ? t('credit', { amount: formatAmount(proration.amount, proration.currency) })
                    : t('proration', { amount: formatAmount(proration.amount, proration.currency) })
                  }
                </p>
              ) : null}
            </div>
          </div>
        )}

        {/* Confirm button */}
        <div className="px-6 pb-6">
          <button
            onClick={handleConfirm}
            disabled={!selectedPlan || selectedPlan === currentPlan || loading || prorationLoading}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <><Loader2 size={18} className="animate-spin" /> ...</>
            ) : (
              t('confirm')
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
