'use client';

import React, { useState } from 'react';
import {
    Mail,
    Phone,
    MapPin,
    Globe,
    Linkedin,
    Github,
    Twitter,
    Instagram,
    Facebook,
    Youtube,
    Briefcase,
    GraduationCap,
    Award,
    Star,
    Heart,
    User,
    Users,
    Calendar,
    Clock,
    CheckCircle,
    Target,
    Lightbulb,
    Code,
    Palette,
    PenTool,
    Camera,
    Music,
    Book,
    FileText,
    Settings,
    Zap,
    TrendingUp,
    BarChart2,
    PieChart,
    Database,
    Cloud,
    Server,
    Smartphone,
    Monitor,
    Cpu,
    Wifi,
    Shield,
    Search,
    Layers,
    Grid,
    Layout,
    Box,
    Home,
    Building,
    MessageCircle,
    Send,
    Share2,
    Link,
    ExternalLink,
    ArrowRight,
    ArrowUp,
    ChevronRight,
    Play,
    Circle,
    Square,
    Triangle,
    Hexagon,
    Rocket,
    Coffee,
    Headphones,
    Mic,
    Video,
    LucideIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCanvasStore } from '@/store/useCanvasStore';

interface IconItem {
    name: string;
    icon: LucideIcon;
    category: 'contact' | 'social' | 'work' | 'education' | 'skills' | 'design' | 'tech' | 'general' | 'arrows' | 'shapes';
}

const iconLibrary: IconItem[] = [
    // Contact
    { name: 'Email', icon: Mail, category: 'contact' },
    { name: 'Phone', icon: Phone, category: 'contact' },
    { name: 'Location', icon: MapPin, category: 'contact' },
    { name: 'Website', icon: Globe, category: 'contact' },
    { name: 'User', icon: User, category: 'contact' },

    // Social
    { name: 'LinkedIn', icon: Linkedin, category: 'social' },
    { name: 'GitHub', icon: Github, category: 'social' },
    { name: 'X', icon: Twitter, category: 'social' },
    { name: 'Instagram', icon: Instagram, category: 'social' },
    { name: 'Facebook', icon: Facebook, category: 'social' },
    { name: 'YouTube', icon: Youtube, category: 'social' },

    // Work
    { name: 'Briefcase', icon: Briefcase, category: 'work' },
    { name: 'Building', icon: Building, category: 'work' },
    { name: 'Calendar', icon: Calendar, category: 'work' },
    { name: 'Clock', icon: Clock, category: 'work' },
    { name: 'Target', icon: Target, category: 'work' },
    { name: 'Trending', icon: TrendingUp, category: 'work' },
    { name: 'Chart', icon: BarChart2, category: 'work' },
    { name: 'Pie Chart', icon: PieChart, category: 'work' },

    // Education
    { name: 'Graduation', icon: GraduationCap, category: 'education' },
    { name: 'Book', icon: Book, category: 'education' },
    { name: 'Award', icon: Award, category: 'education' },
    { name: 'File', icon: FileText, category: 'education' },
    { name: 'Certificate', icon: Award, category: 'education' },

    // Skills
    { name: 'Star', icon: Star, category: 'skills' },
    { name: 'Check', icon: CheckCircle, category: 'skills' },
    { name: 'Lightbulb', icon: Lightbulb, category: 'skills' },
    { name: 'Zap', icon: Zap, category: 'skills' },
    { name: 'Rocket', icon: Rocket, category: 'skills' },

    // Design
    { name: 'Palette', icon: Palette, category: 'design' },
    { name: 'Pen', icon: PenTool, category: 'design' },
    { name: 'Camera', icon: Camera, category: 'design' },
    { name: 'Layers', icon: Layers, category: 'design' },
    { name: 'Layout', icon: Layout, category: 'design' },
    { name: 'Grid', icon: Grid, category: 'design' },

    // Tech
    { name: 'Code', icon: Code, category: 'tech' },
    { name: 'Database', icon: Database, category: 'tech' },
    { name: 'Cloud', icon: Cloud, category: 'tech' },
    { name: 'Server', icon: Server, category: 'tech' },
    { name: 'Monitor', icon: Monitor, category: 'tech' },
    { name: 'Smartphone', icon: Smartphone, category: 'tech' },
    { name: 'CPU', icon: Cpu, category: 'tech' },
    { name: 'Wifi', icon: Wifi, category: 'tech' },
    { name: 'Shield', icon: Shield, category: 'tech' },
    { name: 'Settings', icon: Settings, category: 'tech' },

    // General
    { name: 'Home', icon: Home, category: 'general' },
    { name: 'Heart', icon: Heart, category: 'general' },
    { name: 'Users', icon: Users, category: 'general' },
    { name: 'Message', icon: MessageCircle, category: 'general' },
    { name: 'Send', icon: Send, category: 'general' },
    { name: 'Link', icon: Link, category: 'general' },
    { name: 'Share', icon: Share2, category: 'general' },
    { name: 'Search', icon: Search, category: 'general' },
    { name: 'Coffee', icon: Coffee, category: 'general' },
    { name: 'Music', icon: Music, category: 'general' },
    { name: 'Headphones', icon: Headphones, category: 'general' },
    { name: 'Video', icon: Video, category: 'general' },
    { name: 'Mic', icon: Mic, category: 'general' },

    // Arrows
    { name: 'Arrow Right', icon: ArrowRight, category: 'arrows' },
    { name: 'Arrow Up', icon: ArrowUp, category: 'arrows' },
    { name: 'Chevron', icon: ChevronRight, category: 'arrows' },
    { name: 'External', icon: ExternalLink, category: 'arrows' },
    { name: 'Play', icon: Play, category: 'arrows' },

    // Shapes
    { name: 'Circle', icon: Circle, category: 'shapes' },
    { name: 'Square', icon: Square, category: 'shapes' },
    { name: 'Triangle', icon: Triangle, category: 'shapes' },
    { name: 'Hexagon', icon: Hexagon, category: 'shapes' },
    { name: 'Box', icon: Box, category: 'shapes' },
];

const categories = [
    { id: 'all', label: 'All' },
    { id: 'contact', label: 'Contact' },
    { id: 'social', label: 'Social' },
    { id: 'work', label: 'Work' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'design', label: 'Design' },
    { id: 'tech', label: 'Tech' },
    { id: 'general', label: 'General' },
];

interface IconsLibraryProps {
    onClose?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function IconsLibrary({ onClose }: IconsLibraryProps) {
    const t = useTranslations('Common');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedColor, setSelectedColor] = useState('#ffffff');

    const { addElement, backgroundColor } = useCanvasStore();

    const filteredIcons = iconLibrary.filter((item) => {
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const addIconAsShape = (iconItem: IconItem) => {
        // We'll create a text element with the icon rendered as SVG path
        // For simplicity, we'll create a rectangle with the icon name stored
        // In a real implementation, you'd convert the icon to SVG path data

        // Create a shape element that we'll enhance to support icons
        const iconColor = selectedColor || (backgroundColor === '#ffffff' ? '#333333' : '#ffffff');

        // For now, we'll add it as a text element with special formatting
        // The icon will be rendered via a special component
        const newElement = {
            id: crypto.randomUUID(),
            type: 'icon' as const,
            x: 100,
            y: 100,
            width: 40,
            height: 40,
            rotation: 0,
            opacity: 1,
            locked: false,
            visible: true,
            iconName: iconItem.name,
            fill: iconColor,
            stroke: 'transparent',
            strokeWidth: 0,
        };

        addElement(newElement);
    };

    const colorPresets = [
        '#ffffff', '#000000', '#333333', '#666666',
        '#00dc82', '#3b82f6', '#8b5cf6', '#ec4899',
        '#f59e0b', '#ef4444', '#10b981', '#06b6d4',
    ];

    return (
        <div className="space-y-4">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('searchIcons')}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-accent-green"
                />
            </div>

            {/* Color picker */}
            <div>
                <label className="text-xs text-gray-500 mb-2 block">Icon Color</label>
                <div className="flex flex-wrap gap-1">
                    {colorPresets.map((color) => (
                        <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`w-6 h-6 rounded border-2 transition-all ${
                                selectedColor === color ? 'border-accent-green scale-110' : 'border-gray-300'
                            }`}
                            style={{ backgroundColor: color }}
                        />
                    ))}
                    <input
                        type="color"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="w-6 h-6 rounded cursor-pointer border-0"
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-1">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-2 py-1 text-xs rounded transition-colors ${
                            selectedCategory === cat.id
                                ? 'bg-accent-green text-gray-900 font-medium'
                                : 'bg-white text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Icons Grid */}
            <div className="grid grid-cols-5 gap-1 max-h-64 overflow-y-auto">
                {filteredIcons.map((item) => {
                    const IconComponent = item.icon;
                    return (
                        <button
                            key={item.name}
                            onClick={() => addIconAsShape(item)}
                            className="p-3 bg-white hover:bg-gray-200 rounded-lg transition-colors flex flex-col items-center gap-1 group"
                            title={item.name}
                        >
                            <IconComponent
                                size={20}
                                className="text-gray-600 group-hover:text-gray-900 transition-colors"
                                style={{ color: selectedColor }}
                            />
                        </button>
                    );
                })}
            </div>

            {filteredIcons.length === 0 && (
                <p className="text-center text-gray-400 text-sm py-4">
                    No icons found
                </p>
            )}
        </div>
    );
}

// Export the icon library for use in rendering
export { iconLibrary };
export type { IconItem };
