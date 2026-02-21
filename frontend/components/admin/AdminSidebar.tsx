"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  ChevronLeft,
  LogOut,
  Bot,
  Settings,
  Megaphone,
  MessageCircle,
  MessageSquare,
  X,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { href: "/admin/users", label: "Users", icon: <Users size={20} /> },
  { href: "/admin/blog", label: "Blog Posts", icon: <FileText size={20} /> },
  { href: "/admin/auto-blog", label: "Auto Blog", icon: <Bot size={20} /> },
  { href: "/admin/payments", label: "Payments", icon: <CreditCard size={20} /> },
  { href: "/admin/plans", label: "Plans", icon: <Settings size={20} /> },
  { href: "/admin/ads", label: "Ads", icon: <Megaphone size={20} /> },
  { href: "/admin/seo", label: "SEO & Analytics", icon: <Bot size={20} /> },
  { href: "/admin/live-chat", label: "Live Chat", icon: <MessageCircle size={20} /> },
  { href: "/admin/feedback", label: "Feedback", icon: <MessageSquare size={20} /> },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className={`
      fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-40
      transform transition-transform duration-300 ease-in-out
      lg:translate-x-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="Best AI Resume Logo"
            width={36}
            height={36}
            className="rounded-lg shadow-lg shadow-accent-green/20"
          />
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 text-lg leading-none">Best AI Resume</span>
            <span className="text-[10px] text-accent-purple font-medium tracking-wider">ADMIN PANEL</span>
          </div>
        </Link>
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition lg:hidden"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(item.href)
                ? "bg-accent-purple/10 text-accent-purple"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
          >
            <span className={isActive(item.href) ? "text-accent-purple" : ""}>
              {item.icon}
            </span>
            {item.label}
            {isActive(item.href) && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-purple" />
            )}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 space-y-1">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft size={20} />
          Back to Site
        </Link>
        <button
          onClick={() => {
            handleLogout();
            onClose?.();
          }}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:text-red-500 hover:bg-gray-50 transition-colors"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
