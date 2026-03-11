'use client';

import { useResumeStore } from '../../store/useResumeStore';
import { Twitter, Github, Dribbble, Instagram } from 'lucide-react';

// Behance icon component (not in lucide-react)
const BehanceIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
    </svg>
);

const socialLinks = [
    { key: 'x', label: 'X', icon: Twitter, placeholder: 'x.com/username' },
    { key: 'github', label: 'GitHub', icon: Github, placeholder: 'github.com/username' },
    { key: 'dribbble', label: 'Dribbble', icon: Dribbble, placeholder: 'dribbble.com/username' },
    { key: 'behance', label: 'Behance', icon: BehanceIcon, placeholder: 'behance.net/username' },
    { key: 'instagram', label: 'Instagram', icon: Instagram, placeholder: 'instagram.com/username' },
] as const;

export default function SocialLinksSection() {
    const { resumeData, updatePersonalInfo } = useResumeStore();
    const { personalInfo } = resumeData;

    const handleChange = (key: string, value: string) => {
        updatePersonalInfo({ [key]: value });
    };

    return (
        <div className="space-y-4">
            <p className="text-xs text-gray-500">Add your social media profiles to your resume.</p>

            <div className="space-y-3">
                {socialLinks.map(({ key, icon: Icon, placeholder }) => (
                    <div key={key} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-bg-card border border-border-subtle rounded-lg flex items-center justify-center text-gray-400">
                            <Icon size={16} />
                        </div>
                        <div className="flex-1">
                            <input
                                type="text"
                                value={(personalInfo as Record<string, string>)[key] || ''}
                                onChange={(e) => handleChange(key, e.target.value)}
                                placeholder={placeholder}
                                className="w-full bg-bg-card border border-border-subtle rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-accent-green transition"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
