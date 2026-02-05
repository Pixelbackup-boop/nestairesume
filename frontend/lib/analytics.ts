/**
 * Analytics Tracking Utility
 *
 * Unified analytics interface for tracking user events.
 * Supports Google Analytics 4 (GA4) and can be extended for other providers.
 *
 * Setup:
 * 1. Add your GA4 Measurement ID to .env: NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 * 2. Import and use trackEvent() in your components
 */

// Type definitions for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Event categories for organized tracking
 */
export const EventCategory = {
  RESUME: 'resume',
  PDF: 'pdf',
  TEMPLATE: 'template',
  AUTH: 'auth',
  SUBSCRIPTION: 'subscription',
  AI: 'ai',
  NAVIGATION: 'navigation',
  ENGAGEMENT: 'engagement',
} as const;

type EventCategoryType = (typeof EventCategory)[keyof typeof EventCategory];

/**
 * Predefined event names for consistency
 */
export const EventName = {
  // Resume events
  RESUME_CREATED: 'resume_created',
  RESUME_SAVED: 'resume_saved',
  RESUME_DELETED: 'resume_deleted',
  RESUME_DUPLICATED: 'resume_duplicated',

  // PDF events
  PDF_GENERATED: 'pdf_generated',
  PDF_DOWNLOADED: 'pdf_downloaded',
  PDF_PREVIEWED: 'pdf_previewed',
  DOCX_DOWNLOADED: 'docx_downloaded',

  // Template events
  TEMPLATE_SELECTED: 'template_selected',
  TEMPLATE_PREVIEWED: 'template_previewed',
  TEMPLATE_CUSTOMIZED: 'template_customized',

  // Auth events
  SIGNUP_STARTED: 'signup_started',
  SIGNUP_COMPLETED: 'signup_completed',
  LOGIN_COMPLETED: 'login_completed',
  LOGOUT: 'logout',

  // Subscription events
  UPGRADE_STARTED: 'upgrade_started',
  UPGRADE_COMPLETED: 'upgrade_completed',
  TRIAL_STARTED: 'trial_started',
  TRIAL_ENDED: 'trial_ended',

  // AI events
  AI_ENHANCE_STARTED: 'ai_enhance_started',
  AI_ENHANCE_COMPLETED: 'ai_enhance_completed',
  AI_SUMMARY_GENERATED: 'ai_summary_generated',
  AI_BULLETS_GENERATED: 'ai_bullets_generated',

  // Engagement events
  PAGE_VIEW: 'page_view',
  BUTTON_CLICK: 'button_click',
  FORM_STARTED: 'form_started',
  FORM_COMPLETED: 'form_completed',
  ERROR_OCCURRED: 'error_occurred',
} as const;

type EventNameType = (typeof EventName)[keyof typeof EventName];

/**
 * Event parameters interface
 */
interface EventParams {
  category?: EventCategoryType;
  label?: string;
  value?: number;
  [key: string]: string | number | boolean | undefined;
}

/**
 * Check if analytics is available
 */
function isAnalyticsAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
}

/**
 * Track a custom event
 *
 * @example
 * trackEvent(EventName.PDF_GENERATED, {
 *   category: EventCategory.PDF,
 *   label: 'modern-sidebar',
 *   value: 1,
 *   template_id: 'modern-sidebar',
 *   file_size: 245000
 * });
 */
export function trackEvent(
  eventName: EventNameType | string,
  params?: EventParams
): void {
  if (!isAnalyticsAvailable()) {
    // Log in development for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] ${eventName}`, params);
    }
    return;
  }

  try {
    window.gtag!('event', eventName, {
      event_category: params?.category,
      event_label: params?.label,
      value: params?.value,
      ...params,
    });
  } catch (error) {
    console.error('Analytics error:', error);
  }
}

/**
 * Track page views (for SPA navigation)
 */
export function trackPageView(path: string, title?: string): void {
  if (!isAnalyticsAvailable()) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] Page view: ${path}`);
    }
    return;
  }

  try {
    window.gtag!('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
    });
  } catch (error) {
    console.error('Analytics page view error:', error);
  }
}

/**
 * Set user properties (after login)
 */
export function setUserProperties(properties: {
  user_id?: string;
  subscription_plan?: string;
  account_type?: string;
  [key: string]: string | undefined;
}): void {
  if (!isAnalyticsAvailable()) return;

  try {
    window.gtag!('set', 'user_properties', properties);

    if (properties.user_id) {
      window.gtag!('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
        user_id: properties.user_id,
      });
    }
  } catch (error) {
    console.error('Analytics user properties error:', error);
  }
}

/**
 * Track timing (for performance monitoring)
 */
export function trackTiming(
  category: string,
  variable: string,
  valueMs: number,
  label?: string
): void {
  if (!isAnalyticsAvailable()) return;

  try {
    window.gtag!('event', 'timing_complete', {
      name: variable,
      value: Math.round(valueMs),
      event_category: category,
      event_label: label,
    });
  } catch (error) {
    console.error('Analytics timing error:', error);
  }
}

/**
 * Track errors
 */
export function trackError(
  errorMessage: string,
  fatal: boolean = false,
  context?: Record<string, string>
): void {
  trackEvent(EventName.ERROR_OCCURRED, {
    category: EventCategory.ENGAGEMENT,
    label: errorMessage,
    fatal: fatal.toString(),
    ...context,
  });
}

// ============================================
// Convenience functions for common events
// ============================================

/**
 * Track PDF generation
 */
export function trackPdfGenerated(templateId: string, fileSize?: number): void {
  trackEvent(EventName.PDF_GENERATED, {
    category: EventCategory.PDF,
    label: templateId,
    template_id: templateId,
    file_size: fileSize,
  });
}

/**
 * Track PDF download
 */
export function trackPdfDownloaded(templateId: string): void {
  trackEvent(EventName.PDF_DOWNLOADED, {
    category: EventCategory.PDF,
    label: templateId,
    template_id: templateId,
  });
}

/**
 * Track template selection
 */
export function trackTemplateSelected(templateId: string, source?: string): void {
  trackEvent(EventName.TEMPLATE_SELECTED, {
    category: EventCategory.TEMPLATE,
    label: templateId,
    template_id: templateId,
    source: source || 'builder',
  });
}

/**
 * Track AI feature usage
 */
export function trackAiUsage(
  feature: 'enhance' | 'summary' | 'bullets' | 'other',
  success: boolean,
  durationMs?: number
): void {
  const eventName =
    feature === 'enhance'
      ? EventName.AI_ENHANCE_COMPLETED
      : feature === 'summary'
      ? EventName.AI_SUMMARY_GENERATED
      : feature === 'bullets'
      ? EventName.AI_BULLETS_GENERATED
      : 'ai_feature_used';

  trackEvent(eventName, {
    category: EventCategory.AI,
    label: feature,
    success: success.toString(),
    duration_ms: durationMs,
  });
}

/**
 * Track signup/login
 */
export function trackAuth(
  action: 'signup' | 'login' | 'logout',
  method?: string
): void {
  const eventName =
    action === 'signup'
      ? EventName.SIGNUP_COMPLETED
      : action === 'login'
      ? EventName.LOGIN_COMPLETED
      : EventName.LOGOUT;

  trackEvent(eventName, {
    category: EventCategory.AUTH,
    label: method,
    method,
  });
}

/**
 * Track subscription events
 */
export function trackSubscription(
  action: 'upgrade_started' | 'upgrade_completed' | 'trial_started',
  plan?: string
): void {
  trackEvent(action, {
    category: EventCategory.SUBSCRIPTION,
    label: plan,
    plan,
  });
}
