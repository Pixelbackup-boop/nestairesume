"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAuthStore } from "@/store/useAuthStore";

interface Props {
  children: React.ReactNode;
}

export function AuthSyncProvider({ children }: Props) {
  const { data: session, status } = useSession();
  const { setFromNextAuth, refreshUser } = useAuthStore();

  useEffect(() => {
    if (status === "authenticated" && session) {
      setFromNextAuth(session);
    } else if (status === "unauthenticated") {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) {
        // Rehydrate auth state from JWT token (email/password login)
        refreshUser();
      } else {
        setFromNextAuth(null);
      }
    }
  }, [session, status, setFromNextAuth, refreshUser]);

  return <>{children}</>;
}
