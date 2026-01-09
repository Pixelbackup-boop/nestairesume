"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import api from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2, CreditCard, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

type PlanType = "starter" | "gold" | "diamond";

const PLAN_DETAILS: Record<PlanType, { name: string; price: string; description: string }> = {
  starter: {
    name: "Starter",
    price: "$3",
    description: "One-time purchase - 10 downloads that never expire",
  },
  gold: {
    name: "Gold",
    price: "$6/month",
    description: "Monthly subscription - 50 downloads per month + ATS optimization",
  },
  diamond: {
    name: "Diamond",
    price: "$10/month",
    description: "Monthly subscription - 150 downloads/month + Premium templates + Cover letters",
  },
};

export default function CheckoutPage() {
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
      const { url } = response.data;

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
                Complete Your Purchase
              </h1>
              <p className="text-gray-400">
                You&apos;re about to purchase the {planDetails.name} plan
              </p>
            </div>

            {/* Plan Summary */}
            <div className="bg-bg-primary border border-white/5 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{planDetails.name}</h3>
                  <p className="text-sm text-gray-400">{planDetails.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">{planDetails.price}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Account</span>
                  <span className="text-white">{user?.email}</span>
                </div>
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
                  Continue to Payment
                </>
              )}
            </button>

            {/* Security Note */}
            <p className="text-center text-xs text-gray-500 mt-6">
              Secure payment powered by Stripe. Your payment information is never stored on our servers.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
