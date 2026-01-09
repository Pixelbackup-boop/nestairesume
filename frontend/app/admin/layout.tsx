"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isAuthenticated, refreshUser } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Try to restore session from token
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/auth/login?redirect=/admin");
        return;
      }

      // Refresh user data from API
      await refreshUser();

      // Small delay to let state update
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Re-check auth state after refresh
      const store = useAuthStore.getState();

      if (!store.isAuthenticated) {
        router.push("/auth/login?redirect=/admin");
        return;
      }

      if (store.user?.role !== "admin") {
        router.push("/dashboard");
        return;
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [router, refreshUser]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-accent-purple" />
          <p className="text-gray-400 text-sm">Verifying access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <AdminSidebar />
      <main className="ml-64 min-h-screen">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
