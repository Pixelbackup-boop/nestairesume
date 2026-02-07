"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Loader2, Menu } from "lucide-react";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { refreshUser } = useAuthStore();
  const isLoginPage = pathname === "/admin/login";
  const [isChecking, setIsChecking] = useState(!isLoginPage);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    // Skip auth check on the login page itself
    if (isLoginPage) return;

    const checkAuth = async () => {
      // Try to restore session from token
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/admin/login");
        return;
      }

      // Refresh user data from API
      await refreshUser();

      // Small delay to let state update
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Re-check auth state after refresh
      const store = useAuthStore.getState();

      if (!store.isAuthenticated) {
        router.push("/admin/login");
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

  // Login page renders without the admin shell
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-accent-purple" />
          <p className="text-gray-500 text-sm">Verifying access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <AdminSidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center px-4 z-20">
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
        >
          <Menu size={24} />
        </button>
        <span className="ml-3 font-semibold text-gray-900">Admin Panel</span>
      </div>

      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
