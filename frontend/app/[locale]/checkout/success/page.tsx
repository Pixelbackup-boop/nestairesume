"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, Sparkles, ArrowRight, Download, Zap, Crown, Loader2 } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Lazy load Confetti (~25KB) - only needed on success page
const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

type PlanType = "starter" | "gold" | "diamond";

const PLAN_BENEFITS: Record<PlanType, { name: string; icon: typeof Zap; color: string; benefits: string[] }> = {
  starter: {
    name: "Starter",
    icon: Download,
    color: "text-green-400",
    benefits: [
      "10 resume downloads",
      "All templates unlocked",
      "PDF export",
      "Never expires",
    ],
  },
  gold: {
    name: "Gold",
    icon: Zap,
    color: "text-yellow-400",
    benefits: [
      "50 downloads per month",
      "ATS optimization",
      "Priority support",
      "All templates",
    ],
  },
  diamond: {
    name: "Diamond",
    icon: Crown,
    color: "text-purple-400",
    benefits: [
      "150 downloads per month",
      "Premium templates",
      "Cover letter generator",
      "LinkedIn optimization",
      "Priority support",
    ],
  },
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { refreshUser } = useAuthStore();
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const plan = searchParams.get("plan") as PlanType | null;

  useEffect(() => {
    // Get window size for confetti
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    // Refresh user data to get updated subscription
    refreshUser();

    // Stop confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
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

      <div className="min-h-screen pt-32 pb-16">
        <div className="max-w-xl mx-auto px-6 text-center">
          {/* Success Icon */}
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-accent-green/20 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="w-12 h-12 text-accent-green" />
            </div>
            <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-accent-green/20 animate-ping" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Welcome to {planDetails?.name || "your new plan"}! Your account has been upgraded.
          </p>

          {/* Plan Benefits Card */}
          {planDetails && (
            <div className="bg-bg-card border border-white/10 rounded-2xl p-8 mb-8 text-left">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${planDetails.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{planDetails.name} Plan</h3>
                  <p className="text-sm text-gray-400">Your new benefits</p>
                </div>
              </div>

              <ul className="space-y-3">
                {planDetails.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-accent-green/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-accent-green" />
                    </div>
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="space-y-4">
            <Link
              href="/builder"
              className="flex items-center justify-center gap-2 w-full bg-accent-green text-bg-primary py-4 rounded-xl font-semibold hover:bg-accent-teal transition"
            >
              <Sparkles size={20} />
              Create Your Resume
              <ArrowRight size={20} />
            </Link>

            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 w-full border border-white/10 text-white py-4 rounded-xl font-semibold hover:bg-white/5 transition"
            >
              Go to Dashboard
            </Link>
          </div>

          {/* Receipt Note */}
          <p className="text-sm text-gray-500 mt-8">
            A receipt has been sent to your email. You can manage your subscription anytime from your dashboard.
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
      <div className="min-h-screen pt-32 pb-16">
        <div className="max-w-md mx-auto px-6 text-center">
          <Loader2 className="w-8 h-8 text-accent-green animate-spin mx-auto" />
          <p className="text-gray-400 mt-4">Loading...</p>
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
