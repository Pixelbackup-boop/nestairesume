'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { User, LayoutDashboard, LogOut, ChevronDown, Shield } from 'lucide-react';
import { getAvatarId, getAvatarSrc } from '@/lib/avatar';

interface UserDropdownProps {
  scrolled?: boolean;
  isHomePage?: boolean;
}

export default function UserDropdown({ scrolled = true, isHomePage = false }: UserDropdownProps) {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('Navigation');
  const { user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleLogout = () => {
    logout();
    router.push(`/${locale}`);
    setIsOpen(false);
  };

  if (!user) return null;

  const avatarId = getAvatarId(user.id, user.image);
  const avatarSrc = getAvatarSrc(avatarId);

  // Determine text colors based on scroll state and page
  const useDarkText = scrolled || !isHomePage;
  const buttonTextColor = useDarkText ? 'text-dark-teal/70 hover:text-dark-teal' : 'text-white/80 hover:text-white';
  const buttonHoverBg = useDarkText ? 'hover:bg-gray-100' : 'hover:bg-white/10';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-2 py-1.5 text-sm font-medium transition-colors rounded-lg ${buttonTextColor} ${buttonHoverBg}`}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <img
          src={avatarSrc}
          alt="Avatar"
          className="w-8 h-8 rounded-full bg-gray-100"
        />
        <span className="hidden md:inline max-w-[100px] truncate">
          {user.name?.split(' ')[0] || 'User'}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-full right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50"
          role="menu"
        >
          {/* User info header */}
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
            <p className="text-sm font-medium text-dark-teal truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>

          {/* Menu items */}
          <div className="py-1">
            <Link
              href={`/${locale}/profile`}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-dark-teal/70 hover:bg-gray-50 hover:text-dark-teal transition"
              role="menuitem"
            >
              <User size={16} />
              {t('profile') || 'Profile'}
            </Link>
            <Link
              href={`/${locale}/dashboard`}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-dark-teal/70 hover:bg-gray-50 hover:text-dark-teal transition"
              role="menuitem"
            >
              <LayoutDashboard size={16} />
              {t('dashboard')}
            </Link>
            {user.role === 'admin' && (
              <Link
                href={`/${locale}/admin`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-dark-teal/70 hover:bg-gray-50 hover:text-dark-teal transition"
                role="menuitem"
              >
                <Shield size={16} />
                {t('admin')}
              </Link>
            )}
          </div>

          {/* Logout */}
          <div className="py-1 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
              role="menuitem"
            >
              <LogOut size={16} />
              {t('logout')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
