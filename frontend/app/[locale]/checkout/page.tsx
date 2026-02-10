"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useAuthStore } from "@/store/useAuthStore";
import api from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2, CreditCard, AlertCircle, ArrowLeft, Clock, Shield, Check, Zap, Crown, Download } from "lucide-react";
import Link from "next/link";

type PlanType = "starter" | "gold" | "diamond" | "platinum";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const { isAuthenticated, user } = useAuthStore();
  const t = useTranslations("Checkout");
  const locale = useLocale();

  // Calculate trial end date (7 days from now)
  const getTrialEndDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString(locale, { month: "long", day: "numeric", year: "numeric" });
  };

  const PLAN_DETAILS: Record<PlanType, {
    name: string;
    price: string;
    priceValue: number;
    description: string;
    features: string[];
    hasTrial: boolean;
    color: string;
    bgColor: string;
    icon: typeof Zap;
  }> = {
    starter: {
      name: t("plans.starter.name"),
      price: t("plans.starter.price"),
      priceValue: 3,
      description: t("plans.starter.description"),
      features: t.raw("plans.starter.features") as string[],
      hasTrial: false,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      icon: Download,
    },
    gold: {
      name: t("plans.gold.name"),
      price: t("plans.gold.price"),
      priceValue: 6,
      description: t("plans.gold.description"),
      features: t.raw("plans.gold.features") as string[],
      hasTrial: true,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      icon: Zap,
    },
    diamond: {
      name: t("plans.diamond.name"),
      price: t("plans.diamond.price"),
      priceValue: 10,
      description: t("plans.diamond.description"),
      features: t.raw("plans.diamond.features") as string[],
      hasTrial: true,
      color: "text-violet-600",
      bgColor: "bg-violet-50",
      icon: Crown,
    },
    platinum: {
      name: t("plans.platinum.name"),
      price: t("plans.platinum.price"),
      priceValue: 30,
      description: t("plans.platinum.description"),
      features: t.raw("plans.platinum.features") as string[],
      hasTrial: false,
      color: "text-slate-700",
      bgColor: "bg-slate-100",
      icon: Crown,
    },
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const plan = searchParams.get("plan") as PlanType | null;
  const paymentStatus = searchParams.get("payment");

  useEffect(() => {
    if (paymentStatus === "cancelled") {
      setError(t("errors.cancelled"));
    }
  }, [paymentStatus, t]);

  const handleCheckout = async () => {
    if (!plan) return;

    const token = localStorage.getItem('token');
    if (!token) {
      setError(t("errors.sessionExpired"));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/payments/create-checkout", { plan });
      const { url } = response.data as { url: string };
      window.location.href = url;
    } catch (err: unknown) {
      console.error("Checkout error:", JSON.stringify(err, null, 2));

      const apiError = err as {
        response?: { data?: { detail?: string; error?: string; message?: string }; status?: number };
        message?: string;
      };

      let errorMessage = t("errors.failedCheckout");

      if (apiError?.response?.status === 401) {
        errorMessage = t("errors.sessionExpired");
      } else if (apiError?.response?.data?.detail) {
        errorMessage = apiError.response.data.detail;
      } else if (apiError?.response?.data?.error) {
        errorMessage = apiError.response.data.error;
      } else if (apiError?.response?.data?.message) {
        errorMessage = apiError.response.data.message;
      } else if (apiError?.message) {
        errorMessage = apiError.message === 'Network error'
          ? t("errors.networkError")
          : apiError.message;
      }

      setError(errorMessage);
      setLoading(false);
    }
  };

  // Invalid plan
  if (!plan || !PLAN_DETAILS[plan]) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-28 pb-16 bg-gradient-to-b from-red-50/50 to-white">
          <div className="max-w-md mx-auto px-6">
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-3">{t("invalidPlan.title")}</h1>
              <p className="text-gray-600 mb-8">
                {t("invalidPlan.description")}
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition shadow-lg shadow-emerald-200"
              >
                <ArrowLeft size={18} />
                {t("invalidPlan.backBtn")}
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const planDetails = PLAN_DETAILS[plan];
  const Icon = planDetails.icon;

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-28 pb-16 bg-gradient-to-b from-violet-50/50 to-white">
          <div className="max-w-md mx-auto px-6">
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-br from-violet-500 to-purple-600 px-8 py-8 text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <CreditCard className="w-8 h-8 text-violet-500" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">{t("signIn.title")}</h1>
                <p className="text-violet-100">
                  {t("signIn.subtitle", { plan: planDetails.name })}
                </p>
              </div>
              <div className="p-8">
                <div className="space-y-3">
                  <Link
                    href={`/auth/login?redirect=/checkout?plan=${plan}`}
                    className="flex items-center justify-center w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition shadow-lg shadow-emerald-200"
                  >
                    {t("signIn.signInBtn")}
                  </Link>
                  <Link
                    href={`/auth/register?redirect=/checkout?plan=${plan}`}
                    className="flex items-center justify-center w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition"
                  >
                    {t("signIn.createAccountBtn")}
                  </Link>
                </div>
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
      <div className="min-h-screen pt-28 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-lg mx-auto px-6">
          {/* Back Link */}
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            {t("invalidPlan.backBtn")}
          </Link>

          {/* Checkout Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 px-8 py-8 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CreditCard className="w-8 h-8 text-emerald-500" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                {planDetails.hasTrial ? t("header.startTrial") : t("header.completePurchase")}
              </h1>
              <p className="text-emerald-100">
                {planDetails.hasTrial
                  ? t("header.tryPlan", { plan: planDetails.name })
                  : t("header.subscribePlan", { plan: planDetails.name })
                }
              </p>
            </div>

            <div className="p-8">
              {/* Trial Banner */}
              {planDetails.hasTrial && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-emerald-700 font-semibold">{t("trial.badge")}</p>
                      <p className="text-emerald-600 text-sm">{t("trial.notChargedUntil", { date: getTrialEndDate() })}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Plan Summary */}
              <div className={`${planDetails.bgColor} rounded-2xl p-6 mb-6`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <Icon className={`w-5 h-5 ${planDetails.color}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{planDetails.name}</h3>
                      <p className="text-sm text-gray-600">{planDetails.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {planDetails.hasTrial ? (
                      <>
                        <p className="text-sm text-gray-400 line-through">{planDetails.price}</p>
                        <p className="text-2xl font-bold text-emerald-600">$0 today</p>
                      </>
                    ) : (
                      <p className="text-2xl font-bold text-gray-900">${planDetails.priceValue}</p>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2">
                  {planDetails.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Account Info */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{t("billing.account")}</span>
                  <span className="text-gray-900 font-medium">{user?.email}</span>
                </div>
                {planDetails.hasTrial ? (
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-gray-600">{t("billing.afterTrial")}</span>
                    <span className="text-gray-900 font-medium">{planDetails.price}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-gray-600">{t("billing.billing")}</span>
                    <span className="text-gray-900 font-medium">{t("billing.monthlyStarting")}</span>
                  </div>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t("submit.redirecting")}
                  </>
                ) : (
                  <>
                    <CreditCard size={20} />
                    {planDetails.hasTrial ? t("submit.startTrial") : t("submit.subscribeNow")}
                  </>
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="px-8 py-5 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>{t("secure")}</span>
              </div>
              <p className="text-center text-xs text-gray-400 mt-2">
                {planDetails.hasTrial
                  ? t("cancelTrialNote")
                  : t("cancelNote")
                }
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
  const t = useTranslations("Checkout");
  return (
    <>
      <Header />
      <div className="min-h-screen pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-md mx-auto px-6 text-center">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mx-auto" />
          <p className="text-gray-600 mt-4">{t("loading")}</p>
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
