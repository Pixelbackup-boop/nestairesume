"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAuthStore } from "@/store/useAuthStore";

interface Props {
  children: React.ReactNode;
}

export function AuthSyncProvider({ children }: Props) {
  const { data: session, status } = useSession();
  const { setFromNextAuth } = useAuthStore();

  useEffect(() => {
    if (status === "authenticated" && session) {
      setFromNextAuth(session);
    } else if (status === "unauthenticated") {
      // Check if there's a legacy token in localStorage
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        setFromNextAuth(null);
      }
    }
  }, [session, status, setFromNextAuth]);

  return <>{children}</>;
}
