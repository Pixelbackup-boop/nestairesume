"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Save, Loader2, Infinity } from "lucide-react";
import api from "@/lib/api";

interface PlanLimits {
  name: string;
  cvLimit: number;
  aiLimit: number;
  downloadLimit: number;
  coverLetterLimit: number;
}

type PlansData = Record<string, PlanLimits>;

const PLAN_ORDER = ["starter", "gold", "diamond", "platinum"] as const;

const PLAN_COLORS: Record<string, { badge: string; border: string; accent: string }> = {
  starter: { badge: "bg-blue-100 text-blue-700", border: "border-blue-200", accent: "text-blue-600" },
  gold: { badge: "bg-yellow-100 text-yellow-700", border: "border-yellow-200", accent: "text-yellow-600" },
  diamond: { badge: "bg-pink-100 text-pink-700", border: "border-pink-200", accent: "text-pink-600" },
  platinum: { badge: "bg-purple-100 text-purple-700", border: "border-purple-200", accent: "text-purple-600" },
};

const LIMIT_LABELS = [
  { key: "cvLimit", label: "CV Creations / month" },
  { key: "aiLimit", label: "AI Generations / month" },
  { key: "downloadLimit", label: "Downloads / month" },
  { key: "coverLetterLimit", label: "Cover Letters / month" },
] as const;

// lib/api.ts throws plain ApiError object literals, not Error instances —
// read .message off either shape so server {detail} text reaches the UI.
function getErrorMessage(err: unknown, fallback: string): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "object" && err !== null && "message" in err) {
    const message = (err as { message?: unknown }).message;
    if (typeof message === "string" && message) return message;
  }
  return fallback;
}

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<PlansData | null>(null);
  const [edited, setEdited] = useState<PlansData>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await api.get("/admin/plans");
      setPlans(res.data as PlansData);
      setEdited(structuredClone(res.data as PlansData));
      setError(null);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Failed to load plans"));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (planType: string, field: string, value: string) => {
    const num = value === "" ? 0 : parseInt(value, 10);
    if (isNaN(num)) return;
    setEdited((prev) => ({
      ...prev,
      [planType]: { ...prev[planType], [field]: num },
    }));
    setSuccess((prev) => ({ ...prev, [planType]: false }));
  };

  const toggleUnlimited = (planType: string, field: string) => {
    const current = edited[planType]?.[field as keyof PlanLimits] as number;
    const newVal = current === -1 ? 10 : -1;
    setEdited((prev) => ({
      ...prev,
      [planType]: { ...prev[planType], [field]: newVal },
    }));
    setSuccess((prev) => ({ ...prev, [planType]: false }));
  };

  const hasChanges = (planType: string) => {
    if (!plans?.[planType] || !edited[planType]) return false;
    return LIMIT_LABELS.some(
      ({ key }) => plans[planType][key] !== edited[planType][key]
    );
  };

  const handleSave = async (planType: string) => {
    setSaving((prev) => ({ ...prev, [planType]: true }));
    try {
      const { cvLimit, aiLimit, downloadLimit, coverLetterLimit } = edited[planType];
      await api.put(`/admin/plans/${planType}`, {
        cvLimit,
        aiLimit,
        downloadLimit,
        coverLetterLimit,
      });
      const res = await api.get("/admin/plans");
      setPlans(res.data as PlansData);
      setEdited(structuredClone(res.data as PlansData));
      setSuccess((prev) => ({ ...prev, [planType]: true }));
      setTimeout(() => setSuccess((prev) => ({ ...prev, [planType]: false })), 3000);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Failed to save"));
    } finally {
      setSaving((prev) => ({ ...prev, [planType]: false }));
    }
  };

  if (error && !plans) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-center gap-4">
        <AlertCircle className="text-red-600" size={24} />
        <div>
          <p className="text-red-600 font-medium">Error loading plans</p>
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Plan Limits</h1>
        <p className="text-gray-500 mt-1">
          Subscription plan limits per tier. On this deployment limits are compile-time constants — runtime editing is not supported yet.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-80 bg-gray-100 rounded-xl animate-pulse" />
            ))
          : PLAN_ORDER.map((planType) => {
              const plan = edited[planType];
              if (!plan) return null;
              const colors = PLAN_COLORS[planType];

              return (
                <div
                  key={planType}
                  className={`bg-white border ${colors.border} rounded-xl overflow-hidden shadow-sm`}
                >
                  {/* Card Header */}
                  <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${colors.badge}`}>
                      {plan.name}
                    </span>
                    {success[planType] && (
                      <span className="text-green-600 text-sm font-medium">Saved!</span>
                    )}
                  </div>

                  {/* Limit Inputs */}
                  <div className="p-5 space-y-4">
                    {LIMIT_LABELS.map(({ key, label }) => {
                      const val = plan[key] as number;
                      const isUnlimited = val === -1;

                      return (
                        <div key={key} className="flex items-center justify-between gap-4">
                          <label className="text-sm text-gray-600 flex-shrink-0 w-44">
                            {label}
                          </label>
                          <div className="flex items-center gap-2">
                            {isUnlimited ? (
                              <div className="flex items-center gap-1.5 text-green-600 text-sm font-medium px-3 py-1.5">
                                <Infinity size={16} />
                                Unlimited
                              </div>
                            ) : (
                              <input
                                type="number"
                                value={val}
                                onChange={(e) => handleChange(planType, key, e.target.value)}
                                className="w-24 bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 text-gray-900 text-sm text-right focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500"
                              />
                            )}
                            <button
                              onClick={() => toggleUnlimited(planType, key)}
                              className={`text-xs px-2 py-1 rounded font-medium transition-colors ${
                                isUnlimited
                                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                                  : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                              }`}
                              title={isUnlimited ? "Set a limit" : "Set unlimited (-1)"}
                            >
                              {isUnlimited ? "Set Limit" : "∞"}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Save Button */}
                  <div className="px-5 pb-5">
                    <button
                      onClick={() => handleSave(planType)}
                      disabled={!hasChanges(planType) || saving[planType]}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        hasChanges(planType)
                          ? "bg-purple-600 hover:bg-purple-700 text-white shadow-sm"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {saving[planType] ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Save size={16} />
                      )}
                      {saving[planType] ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              );
            })}
      </div>

      {/* Help Text */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-500">
        <p><strong className="text-gray-700">How it works:</strong> Limits are compile-time constants in <code>lib/server/subscriptionLimits.ts</code>. Saving returns 501 Not Implemented — changing a limit requires a code change and redeploy.</p>
        <p className="mt-2"><strong className="text-gray-700">-1 = Unlimited:</strong> Use the infinity toggle to set a limit to unlimited (-1). This removes the cap for that metric.</p>
      </div>
    </div>
  );
}
