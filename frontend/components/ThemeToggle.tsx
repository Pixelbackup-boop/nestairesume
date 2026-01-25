'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  scrolled?: boolean;
  isHomePage?: boolean;
}

export default function ThemeToggle({ scrolled = true, isHomePage = false }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine text colors based on scroll state and page (matching LanguageSwitcher pattern)
  const useDarkText = scrolled || !isHomePage;
  const buttonTextColor = useDarkText ? 'text-dark-teal/70 hover:text-dark-teal' : 'text-white/80 hover:text-white';
  const buttonHoverBg = useDarkText ? 'hover:bg-gray-100' : 'hover:bg-white/10';

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  // Show placeholder during SSR to avoid layout shift
  if (!mounted) {
    return (
      <button
        className={`p-2 rounded-lg transition-colors ${buttonTextColor} ${buttonHoverBg}`}
        aria-label="Toggle theme"
      >
        <Sun size={18} />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-colors ${buttonTextColor} ${buttonHoverBg}`}
      aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
