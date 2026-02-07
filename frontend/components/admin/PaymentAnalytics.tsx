"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Loader2,
} from "lucide-react";
import api from "@/lib/api";

interface AnalyticsData {
  dailyRevenue: Array<{ date: string; revenue: number; count: number }>;
  monthlyRevenue: Array<{ month: string; revenue: number; count: number }>;
  revenueByPlan: Record<string, { revenue: number; count: number }>;
  growth: {
    currentMonth: number;
    previousMonth: number;
    percentChange: number;
  };
  topCustomers: Array<{
    name: string;
    email: string;
    totalSpent: number;
    count: number;
  }>;
}

const PLAN_COLORS: Record<string, string> = {
  starter: "#3b82f6",
  gold: "#eab308",
  diamond: "#ec4899",
  platinum: "#8b5cf6",
  other: "#6b7280",
};

const PLAN_LABELS: Record<string, string> = {
  starter: "Starter",
  gold: "Gold",
  diamond: "Diamond",
  platinum: "Platinum",
  other: "Other",
};

const formatCurrency = (cents: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(cents / 100);

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string }>;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm">
      <p className="text-gray-500 font-medium mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-gray-900">
          {entry.name === "revenue"
            ? formatCurrency(entry.value)
            : `${entry.value} transactions`}
        </p>
      ))}
    </div>
  );
};

export default function PaymentAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get<AnalyticsData>(
          "/admin/payments/analytics"
        );
        setData(response.data);
      } catch {
        // Silently fail — stats cards above already show basic data
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-12 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-accent-purple" />
      </div>
    );
  }

  if (!data) return null;

  const planEntries = Object.entries(data.revenueByPlan).map(
    ([plan, stats]) => ({
      name: PLAN_LABELS[plan] || plan,
      value: stats.revenue,
      count: stats.count,
      color: PLAN_COLORS[plan] || PLAN_COLORS.other,
    })
  );

  return (
    <div className="space-y-6">
      {/* Row 1: Revenue Trend + Growth & Plan Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Revenue Trend — spans 2 cols */}
        <div className="lg:col-span-2 bg-white border border-gray-200 shadow-sm rounded-xl p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Revenue Trend (Last 30 Days)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.dailyRevenue}>
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(d) => d.slice(5)}
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(v) => `$${v / 100}`}
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                  width={60}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                  name="revenue"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right column: Growth + Plan Breakdown */}
        <div className="space-y-6">
          {/* MoM Growth */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3">
              Month-over-Month
            </h3>
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  data.growth.percentChange >= 0
                    ? "bg-green-50"
                    : "bg-red-50"
                }`}
              >
                {data.growth.percentChange >= 0 ? (
                  <TrendingUp className="text-green-600" size={24} />
                ) : (
                  <TrendingDown className="text-red-600" size={24} />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {data.growth.percentChange > 0 ? "+" : ""}
                    {data.growth.percentChange}%
                  </span>
                  {data.growth.percentChange >= 0 ? (
                    <ArrowUpRight className="text-green-600" size={18} />
                  ) : (
                    <ArrowDownRight className="text-red-600" size={18} />
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  {formatCurrency(data.growth.currentMonth)} vs{" "}
                  {formatCurrency(data.growth.previousMonth)} last month
                </p>
              </div>
            </div>
          </div>

          {/* Revenue by Plan */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Revenue by Plan
            </h3>
            {planEntries.length === 0 ? (
              <p className="text-gray-400 text-sm py-4 text-center">
                No data yet
              </p>
            ) : (
              <div className="flex items-center gap-4">
                <div className="w-28 h-28 flex-shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={planEntries}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={50}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {planEntries.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-2">
                  {planEntries.map((entry) => (
                    <div
                      key={entry.name}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-gray-700">{entry.name}</span>
                      </div>
                      <span className="text-gray-900 font-medium">
                        {formatCurrency(entry.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Row 2: Monthly Revenue + Top Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Revenue Bar Chart */}
        <div className="lg:col-span-2 bg-white border border-gray-200 shadow-sm rounded-xl p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Monthly Revenue (Last 12 Months)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(v) => `$${v / 100}`}
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                  width={60}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value) =>
                    value === "revenue" ? "Revenue" : "Transactions"
                  }
                />
                <Bar
                  dataKey="revenue"
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                  name="revenue"
                />
                <Bar
                  dataKey="count"
                  fill="#00d4aa"
                  radius={[4, 4, 0, 0]}
                  name="count"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Customers */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-4 flex items-center gap-2">
            <Users size={16} />
            Top Customers
          </h3>
          {data.topCustomers.length === 0 ? (
            <p className="text-gray-400 text-sm py-4 text-center">
              No customers yet
            </p>
          ) : (
            <div className="space-y-3">
              {data.topCustomers.map((customer, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {customer.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {customer.email}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-3">
                    <p className="text-sm font-semibold text-gray-900">
                      {formatCurrency(customer.totalSpent)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {customer.count} payment{customer.count > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
