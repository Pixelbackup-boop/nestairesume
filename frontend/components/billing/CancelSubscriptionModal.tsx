'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { X, AlertTriangle } from 'lucide-react';
import { useDialogA11y } from '@/hooks/useDialogA11y';
import { useBillingStore } from '@/store/useBillingStore';

interface CancelSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  periodEnd: number;
  onSuccess: (message: string) => void;
}

export default function CancelSubscriptionModal({
  isOpen,
  onClose,
  planName,
  periodEnd,
  onSuccess,
}: CancelSubscriptionModalProps) {
  const t = useTranslations('Billing.cancel');
  const { cancelSubscription, fetchBilling } = useBillingStore();
  const { dialogProps } = useDialogA11y({ isOpen, onClose, labelId: 'cancel-modal-title' });

  const [step, setStep] = useState<'choose' | 'confirm'>(  'choose');
  const [immediately, setImmediately] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [loading, setLoading] = useState(false);

  const endDate = new Date(periodEnd * 1000).toLocaleDateString();

  const handleConfirm = async () => {
    if (confirmText !== 'CANCEL') return;

    setLoading(true);
    try {
      await cancelSubscription(immediately);
      await fetchBilling();
      onSuccess(t('success'));
      handleClose();
    } catch {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep('choose');
    setImmediately(false);
    setConfirmText('');
    setLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      <div {...dialogProps} className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition z-10"
        >
          <X size={20} />
        </button>

        {step === 'choose' ? (
          <>
            {/* Header */}
            <div className="px-6 pt-6 pb-4 text-center">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="text-red-500" size={32} />
              </div>
              <h2 id="cancel-modal-title" className="text-xl font-bold text-gray-900 mb-2">
                {t('warning')}
              </h2>
            </div>

            {/* Warning bullets */}
            <div className="px-6 pb-4">
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                  {t('keepAccess', { plan: planName, date: endDate })}
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                  {t('loseAccess')}
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                  {t('resubscribe')}
                </li>
              </ul>
            </div>

            {/* Options */}
            <div className="px-6 pb-6 space-y-3">
              <button
                onClick={() => { setImmediately(false); setStep('confirm'); }}
                className="w-full py-3 border border-red-200 text-red-600 rounded-xl font-medium hover:bg-red-50 transition"
              >
                {t('cancelAtEnd')}
              </button>
              <button
                onClick={() => { setImmediately(true); setStep('confirm'); }}
                className="w-full py-3 border border-gray-200 text-gray-500 rounded-xl font-medium hover:bg-gray-50 transition text-sm"
              >
                {t('cancelImmediately')}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Confirm step */}
            <div className="px-6 pt-6 pb-4 text-center">
              <h2 id="cancel-modal-title" className="text-xl font-bold text-gray-900 mb-2">
                {t('confirmTitle')}
              </h2>
              {immediately && (
                <p className="text-red-500 text-sm font-medium mb-3">
                  {t('immediateWarning')}
                </p>
              )}
              <p className="text-gray-500 text-sm">{t('confirmText')}</p>
            </div>

            <div className="px-6 pb-6 space-y-4">
              <input
                type="text"
                value={confirmText}
                onChange={e => setConfirmText(e.target.value.toUpperCase())}
                placeholder={t('confirmPlaceholder')}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-center text-lg font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-300"
                autoFocus
              />
              <button
                onClick={handleConfirm}
                disabled={confirmText !== 'CANCEL' || loading}
                className="w-full py-3.5 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '...' : t('confirmButton')}
              </button>
              <button
                onClick={() => setStep('choose')}
                className="w-full py-3 text-gray-500 hover:text-gray-700 text-sm transition"
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
