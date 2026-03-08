import { redirect } from 'next/navigation';

/**
 * Root /onboarding route — redirects to the localized version.
 * The actual onboarding page lives at /[locale]/onboarding/page.tsx
 * which has proper next-intl context (NextIntlClientProvider).
 */
export default function OnboardingRedirect() {
    redirect('/en/onboarding');
}
