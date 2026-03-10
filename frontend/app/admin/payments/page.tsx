"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  DollarSign,
  CreditCard,
  Calendar,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import api from "@/lib/api";
import StatsCard from "@/components/admin/StatsCard";
import PaymentAnalytics from "@/components/admin/PaymentAnalytics";

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  type: string;
  plan: string | null;
  createdAt: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

interface PaymentsResponse {
  payments: Payment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface PaymentStats {
  totalRevenue: number;
  totalPayments: number;
  monthlyRevenue: number;
  averageOrderValue: number;
}

export default function PaymentsPage() {
  const [data, setData] = useState<PaymentsResponse | null>(null);
  const [stats, setStats] = useState<PaymentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const [paymentsRes, statsRes] = await Promise.all([
        api.get("/admin/payments", { params: { page: String(page), limit: "15" } }),
        api.get("/admin/payments/stats"),
      ]);
      setData(paymentsRes.data as PaymentsResponse);
      setStats(statsRes.data as PaymentStats);
      setError(null);
    } catch (err) {
      setError((err as { response?: { data?: { detail?: string } } }).response?.data?.detail || "Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cents / 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      succeeded: "bg-accent-green/20 text-accent-green",
      pending: "bg-yellow-100 text-yellow-600",
      failed: "bg-red-100 text-red-500",
    };
    return styles[status] || styles.pending;
  };

  const getPlanBadge = (plan: string | null) => {
    if (!plan) return "bg-gray-100 text-gray-500";
    const styles: Record<string, string> = {
      diamond: "bg-accent-pink/20 text-accent-pink",
      gold: "bg-yellow-100 text-yellow-600",
      starter: "bg-accent-blue/20 text-accent-blue",
    };
    return styles[plan] || "bg-gray-100 text-gray-500";
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-center gap-4">
        <AlertCircle className="text-red-600" size={24} />
        <div>
          <p className="text-red-600 font-medium">Error loading payments</p>
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-500 mt-1">
          View revenue and payment history.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-xl animate-pulse" />
          ))
        ) : (
          <>
            <StatsCard
              title="Total Revenue"
              value={formatCurrency(stats?.totalRevenue || 0)}
              icon={DollarSign}
              color="green"
            />
            <StatsCard
              title="This Month"
              value={formatCurrency(stats?.monthlyRevenue || 0)}
              icon={Calendar}
              color="purple"
            />
            <StatsCard
              title="Total Transactions"
              value={stats?.totalPayments || 0}
              icon={CreditCard}
              color="blue"
            />
            <StatsCard
              title="Avg Order Value"
              value={formatCurrency(stats?.averageOrderValue || 0)}
              icon={TrendingUp}
              color="pink"
            />
          </>
        )}
      </div>

      {/* Analytics Charts */}
      <PaymentAnalytics />

      {/* Payments Table */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Payment History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Transaction</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Customer</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Plan</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Amount</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-100 rounded w-24" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-100 rounded w-32" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-100 rounded w-16" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-100 rounded w-16" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-100 rounded w-20" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-100 rounded w-32" />
                    </td>
                  </tr>
                ))
              ) : data?.payments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No payments yet
                  </td>
                </tr>
              ) : (
                data?.payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-gray-900 font-mono text-sm">
                          {payment.id.slice(0, 8)}...
                        </p>
                        <p className="text-gray-500 text-xs capitalize">
                          {payment.type}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/users/${payment.user.id}`} className="block group">
                        <p className="text-gray-900 group-hover:text-accent-purple transition-colors">{payment.user.name}</p>
                        <p className="text-gray-500 text-sm group-hover:text-accent-purple/70 transition-colors">{payment.user.email}</p>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getPlanBadge(payment.plan)}`}>
                        {payment.plan || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900 font-medium">
                        {formatCurrency(payment.amount)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getStatusBadge(payment.status)}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {formatDate(payment.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Showing {(page - 1) * 15 + 1} to {Math.min(page * 15, data.total)} of {data.total} payments
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm text-gray-700">
                Page {page} of {data.totalPages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === data.totalPages}
                className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
