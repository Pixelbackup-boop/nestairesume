"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, Sparkles, ArrowRight, Download, Zap, Crown, Loader2, Mail, Settings } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Lazy load Confetti (~25KB) - only needed on success page
const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

type PlanType = "starter" | "gold" | "diamond" | "platinum";

const PLAN_BENEFITS: Record<PlanType, { name: string; icon: typeof Zap; color: string; bgColor: string; benefits: string[] }> = {
  starter: {
    name: "Starter",
    icon: Download,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    benefits: [
      "30 CV creations per month",
      "3 AI generations per month",
      "3 PDF downloads per month",
      "All freemium templates",
      "No ads",
    ],
  },
  gold: {
    name: "Gold",
    icon: Zap,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    benefits: [
      "150 CV creations per month",
      "10 AI generations per month",
      "10 PDF downloads per month",
      "ATS optimization",
      "Cover letter builder",
    ],
  },
  diamond: {
    name: "Diamond",
    icon: Crown,
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    benefits: [
      "300 CV creations per month",
      "30 AI generations per month",
      "25 PDF downloads per month",
      "All premium templates",
      "Priority support",
    ],
  },
  platinum: {
    name: "Platinum",
    icon: Crown,
    color: "text-slate-700",
    bgColor: "bg-slate-100",
    benefits: [
      "Unlimited CV creations",
      "100 AI generations per month",
      "Unlimited PDF downloads",
      "All premium templates",
      "Priority support",
      "Early access to new features",
    ],
  },
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const { refreshUser } = useAuthStore();
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const plan = searchParams.get("plan") as PlanType | null;

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    // Poll refreshUser until webhook updates subscription (Stripe webhook can lag 2-10s)
    const MAX_RETRIES = 5;
    const RETRY_INTERVAL_MS = 2000;
    let retryCount = 0;
    let retryTimeout: NodeJS.Timeout | null = null;

    const pollSubscription = async () => {
      await refreshUser();
      const currentUser = useAuthStore.getState().user;
      const isStillFree = !currentUser?.subscriptionTier || currentUser.subscriptionTier === 'free';

      if (isStillFree && retryCount < MAX_RETRIES) {
        retryCount++;
        retryTimeout = setTimeout(pollSubscription, RETRY_INTERVAL_MS);
      }
    };

    pollSubscription();

    const confettiTimer = setTimeout(() => setShowConfetti(false), 5000);

    return () => {
      if (retryTimeout) clearTimeout(retryTimeout);
      clearTimeout(confettiTimer);
    };
  }, [refreshUser]);

  const planDetails = plan && PLAN_BENEFITS[plan] ? PLAN_BENEFITS[plan] : null;
  const Icon = planDetails?.icon || CheckCircle;

  return (
    <>
      <Header />

      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          colors={["#00dc82", "#00a67d", "#10b981", "#34d399", "#6ee7b7"]}
        />
      )}

      <div className="min-h-screen pt-28 pb-16 bg-gradient-to-b from-emerald-50/50 to-white">
        <div className="max-w-lg mx-auto px-6">
          {/* Success Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
            {/* Header with gradient */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 px-8 py-10 text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CheckCircle className="w-10 h-10 text-emerald-500" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Payment Successful!
              </h1>
              <p className="text-emerald-100 text-lg">
                Welcome to {planDetails?.name || "your new plan"}!
              </p>
            </div>

            {/* Plan Benefits */}
            <div className="px-8 py-8">
              {planDetails && (
                <div className={`${planDetails.bgColor} rounded-2xl p-6 mb-6`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm`}>
                      <Icon className={`w-5 h-5 ${planDetails.color}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{planDetails.name} Plan</h3>
                      <p className="text-sm text-gray-600">Your new benefits</p>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {planDetails.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="space-y-3">
                <Link
                  href="/builder"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition shadow-lg shadow-emerald-200"
                >
                  <Sparkles size={20} />
                  Create Your Resume
                  <ArrowRight size={20} />
                </Link>

                <Link
                  href="/dashboard"
                  className="flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition"
                >
                  <Settings size={18} />
                  Go to Dashboard
                </Link>
              </div>
            </div>

            {/* Footer Note */}
            <div className="px-8 py-5 bg-gray-50 border-t border-gray-100">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">
                  A receipt has been sent to your email. You can manage your subscription anytime from your{" "}
                  <Link href="/dashboard" className="text-emerald-600 font-medium hover:underline">
                    dashboard
                  </Link>.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Questions? Contact us at{" "}
            <a href="mailto:support@bestairesumes.com" className="text-emerald-600 hover:underline">
              support@bestairesumes.com
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

function SuccessLoading() {
  return (
    <>
      <Header />
      <div className="min-h-screen pt-32 pb-16 bg-gradient-to-b from-emerald-50/50 to-white">
        <div className="max-w-md mx-auto px-6 text-center">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mx-auto" />
          <p className="text-gray-600 mt-4">Loading your subscription details...</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<SuccessLoading />}>
      <SuccessContent />
    </Suspense>
  );
}
