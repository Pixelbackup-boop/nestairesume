"use client";

import { useEffect, useRef } from "react";

interface MegaMenuPanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function MegaMenuPanel({ isOpen, onClose, children }: MegaMenuPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        // Don't close if clicking a nav trigger button (parent handles toggle)
        const target = e.target as HTMLElement;
        if (target.closest("[data-mega-trigger]")) return;
        onClose();
      }
    };
    const timer = setTimeout(() => document.addEventListener("mousedown", handler), 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handler);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-2xl shadow-black/10 z-50 mega-menu-enter"
      role="menu"
      aria-orientation="horizontal"
    >
      <div className="max-w-6xl mx-auto px-4 py-6 lg:px-6 lg:py-8">
        {children}
      </div>
    </div>
  );
}
