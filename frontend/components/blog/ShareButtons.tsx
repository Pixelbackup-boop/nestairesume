'use client';

import { useState } from 'react';
import { Twitter, Linkedin, Facebook, Link2, Check } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'hover:text-[#1DA1F2]',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:text-[#0A66C2]',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:text-[#1877F2]',
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error('Failed to copy');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500 mr-2">Share:</span>
      {shareLinks.map(({ name, icon: Icon, href, color }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 rounded-lg bg-gray-100 text-gray-600 transition-colors ${color} hover:bg-gray-200`}
          title={`Share on ${name}`}
        >
          <Icon size={18} />
        </a>
      ))}
      <button
        onClick={copyToClipboard}
        className={`p-2 rounded-lg bg-gray-100 transition-colors hover:bg-gray-200 ${
          copied ? 'text-accent-green' : 'text-gray-600 hover:text-gray-900'
        }`}
        title="Copy link"
      >
        {copied ? <Check size={18} /> : <Link2 size={18} />}
      </button>
    </div>
  );
}
