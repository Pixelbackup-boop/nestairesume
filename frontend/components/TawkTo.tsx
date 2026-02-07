"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

const TAWK_PROPERTY_ID = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
const TAWK_WIDGET_ID = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

declare global {
  interface Window {
    Tawk_API?: {
      visitor?: { name: string; email: string };
      setAttributes?: (attrs: Record<string, string>, callback?: (error: unknown) => void) => void;
      onLoad?: () => void;
    };
  }
}

export default function TawkTo() {
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!TAWK_PROPERTY_ID || !TAWK_WIDGET_ID) return;
    if (!window.Tawk_API) return;

    if (isAuthenticated && user?.email) {
      window.Tawk_API.setAttributes?.({
        name: user.name || "User",
        email: user.email,
        id: user.id,
      });
    }
  }, [user, isAuthenticated]);

  if (!TAWK_PROPERTY_ID || !TAWK_WIDGET_ID) return null;

  // Pre-set visitor info before widget loads (for already-authenticated users)
  const visitorSetup =
    isAuthenticated && user?.email
      ? `Tawk_API.visitor = { name: ${JSON.stringify(user.name || "User")}, email: ${JSON.stringify(user.email)} };`
      : "";

  return (
    <Script id="tawk-to" strategy="afterInteractive">{`
      var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      ${visitorSetup}
      (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
      })();
    `}</Script>
  );
}
