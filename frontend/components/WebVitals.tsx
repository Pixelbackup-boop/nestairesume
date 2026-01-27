"use client";

import { useReportWebVitals } from "next/web-vitals";

export default function WebVitals() {
  useReportWebVitals((metric) => {
    // Log in development for debugging
    if (process.env.NODE_ENV === "development") {
      console.log(`[Web Vital] ${metric.name}: ${Math.round(metric.value)}ms (${metric.rating})`);
    }

    // Send to analytics endpoint in production
    // Replace with your analytics service (GA4, Vercel Analytics, etc.)
    if (process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
      fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: metric.name,
          value: Math.round(metric.value),
          rating: metric.rating,
          id: metric.id,
          page: window.location.pathname,
        }),
        keepalive: true,
      }).catch(() => {});
    }
  });

  return null;
}
