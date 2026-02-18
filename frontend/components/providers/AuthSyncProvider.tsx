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
      // Sync backend JWT to localStorage so api.ts can use it for Authorization header
      const accessToken = (session as any).accessToken;
      if (accessToken) {
        localStorage.setItem("token", accessToken);
      }
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
