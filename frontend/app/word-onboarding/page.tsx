import { redirect } from 'next/navigation';

/**
 * Root /word-onboarding route — redirects to the localized version.
 * The actual page lives at /[locale]/word-onboarding/page.tsx
 * which has proper next-intl context (NextIntlClientProvider).
 */
export default function WordOnboardingRedirect() {
    redirect('/en/word-onboarding');
}
