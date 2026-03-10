'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useAuthStore } from '@/store/useAuthStore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import api from '@/lib/api';
import { getAvatarId, getAvatarSrc } from '@/lib/avatar';
import { User, Mail, Lock, Check, AlertCircle, Eye, EyeOff, Edit3, ArrowRight } from 'lucide-react';

type EmailChangeStep = 'display' | 'input' | 'verify';

export default function ProfilePage() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('Profile');
  const { user, updateProfile, refreshUser, isAuthenticated } = useAuthStore();

  // Form states
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(1);

  // Email change states
  const [emailChangeStep, setEmailChangeStep] = useState<EmailChangeStep>('display');
  const [newEmail, setNewEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [sendingCode, setSendingCode] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);
  const codeInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Password form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // UI states
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Initialize form when user data loads
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setSelectedAvatar(getAvatarId(user.id, user.image));
    }
  }, [user]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push(`/${locale}/auth/login`);
      }
    }
  }, [isAuthenticated, locale, router]);

  // Refresh user on mount
  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  if (!user) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-bg-primary pt-24 pb-12 flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setMessage(null);

    try {
      const updates: { name?: string; avatarId?: number } = {};

      if (name !== user.name) updates.name = name;
      if (selectedAvatar !== getAvatarId(user.id, user.image)) updates.avatarId = selectedAvatar;

      if (Object.keys(updates).length === 0) {
        setMessage({ type: 'error', text: t('noChanges') || 'No changes to save' });
        setSavingProfile(false);
        return;
      }

      await updateProfile(updates);
      setMessage({ type: 'success', text: t('profileUpdated') || 'Profile updated successfully' });
    } catch (err) {
      const apiErr = err as { response?: { data?: { detail?: string } } };
      setMessage({
        type: 'error',
        text: apiErr.response?.data?.detail || t('updateFailed') || 'Update failed'
      });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleRequestEmailChange = async () => {
    if (!newEmail || newEmail === user.email) {
      setMessage({ type: 'error', text: t('enterNewEmail') || 'Please enter a new email address' });
      return;
    }

    setSendingCode(true);
    setMessage(null);

    try {
      await api.post('/auth/request-email-change', { newEmail });
      setEmailChangeStep('verify');
      setMessage({ type: 'success', text: t('codeSent') || 'Verification code sent to your new email' });
      // Focus first code input
      setTimeout(() => codeInputRefs.current[0]?.focus(), 100);
    } catch (err) {
      const apiErr = err as { response?: { data?: { detail?: string } } };
      setMessage({
        type: 'error',
        text: apiErr.response?.data?.detail || t('emailChangeFailed') || 'Failed to send verification code'
      });
    } finally {
      setSendingCode(false);
    }
  };

  const handleVerifyEmailChange = async () => {
    const code = verificationCode.join('');
    if (code.length !== 6) {
      setMessage({ type: 'error', text: t('enterCode') || 'Please enter the 6-digit code' });
      return;
    }

    setVerifyingCode(true);
    setMessage(null);

    try {
      await api.post('/auth/verify-email-change', { newEmail, code });
      await refreshUser();
      setEmailChangeStep('display');
      setNewEmail('');
      setVerificationCode(['', '', '', '', '', '']);
      setMessage({ type: 'success', text: t('emailChanged') || 'Email changed successfully' });
    } catch (err) {
      const apiErr = err as { response?: { data?: { detail?: string } } };
      setMessage({
        type: 'error',
        text: apiErr.response?.data?.detail || t('verificationFailed') || 'Verification failed'
      });
    } finally {
      setVerifyingCode(false);
    }
  };

  const handleCodeInput = (index: number, value: string) => {
    // Only allow digits
    const digit = value.replace(/\D/g, '').slice(-1);
    const newCode = [...verificationCode];
    newCode[index] = digit;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (digit && index < 5) {
      codeInputRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
  };

  const handleCodePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData.length === 6) {
      setVerificationCode(pastedData.split(''));
      codeInputRefs.current[5]?.focus();
    }
  };

  const cancelEmailChange = () => {
    setEmailChangeStep('display');
    setNewEmail('');
    setVerificationCode(['', '', '', '', '', '']);
    setMessage(null);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: t('passwordMismatch') || 'Passwords do not match' });
      return;
    }

    if (newPassword.length < 8) {
      setMessage({ type: 'error', text: t('passwordTooShort') || 'Password must be at least 8 characters' });
      return;
    }

    setSavingPassword(true);
    setMessage(null);

    try {
      await api.post('/auth/change-password', {
        currentPassword,
        newPassword
      });
      setMessage({ type: 'success', text: t('passwordChanged') || 'Password changed successfully' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      const apiErr = err as { response?: { data?: { detail?: string } } };
      setMessage({
        type: 'error',
        text: apiErr.response?.data?.detail || t('passwordChangeFailed') || 'Password change failed'
      });
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-bg-primary pt-24 pb-12">
        <div className="max-w-2xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-dark-teal mb-8">
            {t('title') || 'Profile Settings'}
          </h1>

          {/* Message toast */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              message.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {message.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
              {message.text}
            </div>
          )}

          {/* Avatar Selection */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
            <h2 className="text-lg font-semibold text-dark-teal mb-4">
              {t('chooseAvatar') || 'Choose Avatar'}
            </h2>
            <div className="flex gap-4 flex-wrap">
              {[1, 2, 3, 4, 5].map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSelectedAvatar(id)}
                  className={`w-16 h-16 rounded-full overflow-hidden border-3 transition-all ${
                    selectedAvatar === id
                      ? 'border-accent-green ring-4 ring-accent-green/20 scale-110'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getAvatarSrc(id)}
                    alt={`Avatar ${id}`}
                    className="w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Profile Form (Name only) */}
          <form onSubmit={handleProfileUpdate} className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
            <h2 className="text-lg font-semibold text-dark-teal mb-4">
              {t('accountDetails') || 'Account Details'}
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                {t('name') || 'Name'}
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-green/20 focus:border-accent-green transition-colors"
                  placeholder={t('namePlaceholder') || 'Your full name'}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={savingProfile}
              className="mt-6 w-full bg-accent-green text-white py-3 rounded-lg font-semibold hover:bg-accent-teal transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {savingProfile
                ? (t('saving') || 'Saving...')
                : (t('saveChanges') || 'Save Changes')}
            </button>
          </form>

          {/* Email Change Section */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
            <h2 className="text-lg font-semibold text-dark-teal mb-4">
              {t('emailAddress') || 'Email Address'}
            </h2>

            {emailChangeStep === 'display' && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-gray-400" />
                  <span className="text-gray-700">{user.email}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setEmailChangeStep('input')}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-accent-green hover:bg-accent-green/10 rounded-lg transition-colors"
                >
                  <Edit3 size={16} />
                  {t('changeEmail') || 'Change'}
                </button>
              </div>
            )}

            {emailChangeStep === 'input' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">
                    {t('newEmail') || 'New Email Address'}
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-green/20 focus:border-accent-green transition-colors"
                      placeholder={t('emailPlaceholder') || 'your@newemail.com'}
                      autoFocus
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5">
                    {t('emailChangeHint') || 'A verification code will be sent to this email'}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={cancelEmailChange}
                    className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    {t('cancel') || 'Cancel'}
                  </button>
                  <button
                    type="button"
                    onClick={handleRequestEmailChange}
                    disabled={sendingCode || !newEmail}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-accent-green text-white rounded-lg font-semibold hover:bg-accent-teal transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sendingCode ? (
                      t('sending') || 'Sending...'
                    ) : (
                      <>
                        {t('sendCode') || 'Send Code'}
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {emailChangeStep === 'verify' && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    {t('enterCodeSentTo') || 'Enter the 6-digit code sent to'}{' '}
                    <span className="font-medium text-dark-teal">{newEmail}</span>
                  </p>
                  <div className="flex gap-2 justify-center" onPaste={handleCodePaste}>
                    {verificationCode.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => { codeInputRefs.current[index] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleCodeInput(index, e.target.value)}
                        onKeyDown={(e) => handleCodeKeyDown(index, e)}
                        className="w-12 h-14 text-center text-2xl font-bold border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-green/20 focus:border-accent-green transition-colors"
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={cancelEmailChange}
                    className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    {t('cancel') || 'Cancel'}
                  </button>
                  <button
                    type="button"
                    onClick={handleVerifyEmailChange}
                    disabled={verifyingCode || verificationCode.join('').length !== 6}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-accent-green text-white rounded-lg font-semibold hover:bg-accent-teal transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {verifyingCode ? (
                      t('verifying') || 'Verifying...'
                    ) : (
                      <>
                        <Check size={18} />
                        {t('verifyCode') || 'Verify'}
                      </>
                    )}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setEmailChangeStep('input')}
                  className="w-full text-sm text-gray-500 hover:text-dark-teal transition-colors"
                >
                  {t('useAnotherEmail') || 'Use a different email address'}
                </button>
              </div>
            )}
          </div>

          {/* Password Change Form */}
          <form onSubmit={handlePasswordChange} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-dark-teal mb-4">
              {t('changePassword') || 'Change Password'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  {t('currentPassword') || 'Current Password'}
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-green/20 focus:border-accent-green transition-colors"
                    placeholder="********"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  {t('newPassword') || 'New Password'}
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-green/20 focus:border-accent-green transition-colors"
                    placeholder="********"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {t('passwordHint') || 'Must be at least 8 characters'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  {t('confirmPassword') || 'Confirm New Password'}
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-green/20 focus:border-accent-green transition-colors"
                    placeholder="********"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={savingPassword || !currentPassword || !newPassword || !confirmPassword}
              className="mt-6 w-full bg-gray-100 text-dark-teal py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {savingPassword
                ? (t('changingPassword') || 'Changing...')
                : (t('changePasswordBtn') || 'Change Password')}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
