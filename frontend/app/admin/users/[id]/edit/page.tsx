"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, AlertCircle, Loader2 } from "lucide-react";
import api from "@/lib/api";
import Link from "next/link";

interface UserEditData {
  name: string;
  email: string;
  role: string;
  subscriptionTier: string;
  creditsRemaining: number;
  isSuspended: boolean;
}

export default function UserEditPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<UserEditData>({
    name: "",
    email: "",
    role: "user",
    subscriptionTier: "free",
    creditsRemaining: 0,
    isSuspended: false,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/admin/users/${params.id}`);
        const user = response.data as { name: string; email: string; role: string; subscriptionTier: string; creditsRemaining: number; isSuspended: boolean };
        setFormData({
          name: user.name,
          email: user.email,
          role: user.role,
          subscriptionTier: user.subscriptionTier,
          creditsRemaining: user.creditsRemaining,
          isSuspended: user.isSuspended,
        });
      } catch (err: any) {
        setError(err.response?.data?.detail || "Failed to load user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await api.put(`/admin/users/${params.id}`, formData);
      router.push(`/admin/users/${params.id}`);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to update user");
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
          ? parseInt(value)
          : value,
    }));
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-white/5 rounded w-48" />
        <div className="h-96 bg-white/5 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Back Link */}
      <Link
        href={`/admin/users/${params.id}`}
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Back to User
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Edit User</h1>
        <p className="text-gray-400 mt-1">Update user details and permissions.</p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="text-red-400" size={20} />
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-bg-card border border-white/5 rounded-xl p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 bg-bg-primary border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-purple/50 transition-colors"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 bg-bg-primary border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-purple/50 transition-colors"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-bg-primary border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent-purple/50 transition-colors"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Subscription Tier */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Subscription Tier
            </label>
            <select
              name="subscriptionTier"
              value={formData.subscriptionTier}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-bg-primary border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent-purple/50 transition-colors"
            >
              <option value="free">Free</option>
              <option value="starter">Starter</option>
              <option value="gold">Gold</option>
              <option value="diamond">Diamond</option>
            </select>
          </div>

          {/* Credits */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Credits Remaining
            </label>
            <input
              type="number"
              name="creditsRemaining"
              value={formData.creditsRemaining}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2.5 bg-bg-primary border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent-purple/50 transition-colors"
            />
          </div>

          {/* Suspended */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isSuspended"
              id="isSuspended"
              checked={formData.isSuspended}
              onChange={handleChange}
              className="w-4 h-4 rounded border-white/20 bg-bg-primary text-accent-purple focus:ring-accent-purple/50"
            />
            <label htmlFor="isSuspended" className="text-sm text-gray-300">
              Account suspended
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-accent-purple text-white rounded-lg font-medium hover:bg-accent-purple/90 transition-colors disabled:opacity-50"
          >
            {saving ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <Link
            href={`/admin/users/${params.id}`}
            className="px-6 py-2.5 text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
