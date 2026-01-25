"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import api from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2, CreditCard, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

type PlanType = "starter" | "gold" | "diamond" | "platinum";

const PLAN_DETAILS: Record<PlanType, { name: string; price: string; priceValue: number; description: string; features: string[]; hasTrial: boolean }> = {
  starter: {
    name: "Starter",
    price: "$3/month",
    priceValue: 3,
    description: "Perfect for job seekers",
    features: ["30 CV creations/month", "3 AI generations/month", "All 50+ templates", "No ads"],
    hasTrial: false, // No trial - charges immediately
  },
  gold: {
    name: "Gold",
    price: "$6/month",
    priceValue: 6,
    description: "For active job hunters",
    features: ["150 CV creations/month", "10 AI generations/month", "ATS optimization", "No ads"],
    hasTrial: true, // 7-day free trial
  },
  diamond: {
    name: "Diamond",
    price: "$10/month",
    priceValue: 10,
    description: "Best for professionals",
    features: ["300 CV creations/month", "30 AI generations/month", "Cover letter builder", "Priority support"],
    hasTrial: true, // 7-day free trial
  },
  platinum: {
    name: "Platinum",
    price: "$30/month",
    priceValue: 30,
    description: "For power users & agencies",
    features: ["Unlimited CV creations", "100 AI generations/month", "Early access features", "Priority support"],
    hasTrial: false, // No trial - charges immediately
  },
};

// Calculate trial end date (7 days from now)
const getTrialEndDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const plan = searchParams.get("plan") as PlanType | null;
  const paymentStatus = searchParams.get("payment");

  useEffect(() => {
    // If payment was cancelled, show message
    if (paymentStatus === "cancelled") {
      setError("Payment was cancelled. You can try again when you're ready.");
    }
  }, [paymentStatus]);

  const handleCheckout = async () => {
    if (!plan) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/payments/create-checkout", { plan });
      const { url } = response.data as { url: string };

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (err: unknown) {
      console.error("Checkout error:", err);
      const apiError = err as { response?: { data?: { detail?: string } } };
      setError(apiError?.response?.data?.detail || "Failed to start checkout. Please try again.");
      setLoading(false);
    }
  };

  // Invalid plan
  if (!plan || !PLAN_DETAILS[plan]) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-32 pb-16">
          <div className="max-w-md mx-auto px-6 text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">Invalid Plan</h1>
            <p className="text-gray-400 mb-8">
              The selected plan is not valid. Please choose a plan from our pricing page.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-accent-green text-bg-primary px-6 py-3 rounded-lg font-semibold hover:bg-accent-teal transition"
            >
              <ArrowLeft size={18} />
              Back to Pricing
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const planDetails = PLAN_DETAILS[plan];

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-32 pb-16">
          <div className="max-w-md mx-auto px-6">
            <div className="bg-bg-card border border-white/5 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-accent-purple/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CreditCard className="w-8 h-8 text-accent-purple" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Sign in to Continue</h1>
              <p className="text-gray-400 mb-6">
                You need to sign in before purchasing the {planDetails.name} plan.
              </p>
              <div className="space-y-3">
                <Link
                  href={`/auth/login?redirect=/checkout?plan=${plan}`}
                  className="block w-full bg-accent-green text-bg-primary py-3 rounded-lg font-semibold hover:bg-accent-teal transition"
                >
                  Sign In
                </Link>
                <Link
                  href={`/auth/register?redirect=/checkout?plan=${plan}`}
                  className="block w-full border border-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/5 transition"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen pt-32 pb-16">
        <div className="max-w-md mx-auto px-6">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to Pricing
          </Link>

          <div className="bg-bg-card border border-white/5 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-accent-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CreditCard className="w-8 h-8 text-accent-green" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                {planDetails.hasTrial ? "Start Your Free Trial" : "Complete Your Purchase"}
              </h1>
              <p className="text-gray-400">
                {planDetails.hasTrial
                  ? `Try the ${planDetails.name} plan free for 7 days`
                  : `Subscribe to the ${planDetails.name} plan`
                }
              </p>
            </div>

            {/* Trial Banner - Only for plans with trial */}
            {planDetails.hasTrial && (
              <div className="bg-accent-green/10 border border-accent-green/30 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent-green/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-accent-green font-medium">7-Day Free Trial</p>
                    <p className="text-gray-400 text-sm">You won&apos;t be charged until {getTrialEndDate()}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Plan Summary */}
            <div className="bg-bg-primary border border-white/5 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{planDetails.name}</h3>
                  <p className="text-sm text-gray-400">{planDetails.description}</p>
                </div>
                <div className="text-right">
                  {planDetails.hasTrial ? (
                    <>
                      <p className="text-sm text-gray-400 line-through">{planDetails.price}</p>
                      <p className="text-2xl font-bold text-accent-green">$0 today</p>
                    </>
                  ) : (
                    <p className="text-2xl font-bold text-white">${planDetails.priceValue} today</p>
                  )}
                </div>
              </div>

              {/* Plan Features */}
              <ul className="space-y-2 mb-4">
                {planDetails.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                    <svg className="w-4 h-4 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-white/5 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Account</span>
                  <span className="text-white">{user?.email}</span>
                </div>
                {planDetails.hasTrial ? (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">After trial</span>
                    <span className="text-white">{planDetails.price}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Billing</span>
                    <span className="text-white">Monthly, starting today</span>
                  </div>
                )}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-accent-green text-bg-primary py-4 rounded-lg font-semibold hover:bg-accent-teal transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Redirecting to Stripe...
                </>
              ) : (
                <>
                  <CreditCard size={20} />
                  {planDetails.hasTrial ? "Start Free Trial" : "Subscribe Now"}
                </>
              )}
            </button>

            {/* Security Note */}
            <div className="mt-6 space-y-2">
              <p className="text-center text-xs text-gray-500">
                {planDetails.hasTrial
                  ? "Cancel anytime during your trial at no cost"
                  : "Cancel anytime. No long-term commitment."
                }
              </p>
              <p className="text-center text-xs text-gray-500">
                Secure payment powered by Stripe. Your payment information is never stored on our servers.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function CheckoutLoading() {
  return (
    <>
      <Header />
      <div className="min-h-screen pt-32 pb-16">
        <div className="max-w-md mx-auto px-6 text-center">
          <Loader2 className="w-8 h-8 text-accent-green animate-spin mx-auto" />
          <p className="text-gray-400 mt-4">Loading checkout...</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutContent />
    </Suspense>
  );
}
