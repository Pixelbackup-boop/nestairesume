'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import api from '@/lib/api';
import {
    Plus,
    Sparkles,
    FileText,
    Download,
    Clock,
    MoreVertical,
    Trash2,
    Edit3,
    Copy,
    ArrowRight,
    Zap,
    BarChart3,
    Calendar,
    Layout,
    Crown,
    CreditCard,
    Settings
} from 'lucide-react';

interface Resume {
    id: string;
    title: string;
    fullName: string;
    templateLayout: string;
    templateTheme: string;
    createdAt: string;
    updatedAt: string;
}

interface TemplateStats {
    layout: string;
    count: number;
    color: string;
}

export default function DashboardPage() {
    const router = useRouter();
    const { user, isAuthenticated } = useAuthStore();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    // Fetch user's resumes from API
    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const response = await api.get('/resumes');
                setResumes((response.data as Resume[]) || []);
            } catch (error) {
                console.error('Failed to fetch resumes:', error);
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchResumes();
        } else {
            setLoading(false);
        }
    }, [isAuthenticated]);

    // Calculate statistics
    const stats = {
        totalResumes: resumes.length,
        thisMonth: resumes.filter(r => {
            const date = new Date(r.createdAt);
            const now = new Date();
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        }).length,
        templates: resumes.reduce((acc, r) => {
            acc[r.templateLayout] = (acc[r.templateLayout] || 0) + 1;
            return acc;
        }, {} as Record<string, number>),
    };

    // Template usage stats for chart
    const templateStats: TemplateStats[] = [
        { layout: 'CLASSIC', count: stats.templates['CLASSIC'] || 0, color: 'bg-blue-500' },
        { layout: 'SIDEBAR', count: stats.templates['SIDEBAR'] || 0, color: 'bg-purple-500' },
        { layout: 'HEADER', count: stats.templates['HEADER'] || 0, color: 'bg-green-500' },
        { layout: 'MINIMAL', count: stats.templates['MINIMAL'] || 0, color: 'bg-orange-500' },
        { layout: 'CREATIVE', count: stats.templates['CREATIVE'] || 0, color: 'bg-pink-500' },
    ];

    const maxTemplateCount = Math.max(...templateStats.map(t => t.count), 1);

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // Delete resume
    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this resume?')) return;
        try {
            await api.delete(`/resumes/${id}`);
            setResumes(resumes.filter(r => r.id !== id));
        } catch (error) {
            console.error('Failed to delete resume:', error);
        }
        setActiveDropdown(null);
    };

    // Duplicate resume
    const handleDuplicate = async (resume: Resume) => {
        try {
            const response = await api.post('/resumes', {
                ...resume,
                title: `${resume.title} (Copy)`,
            });
            setResumes([response.data as Resume, ...resumes]);
        } catch (error) {
            console.error('Failed to duplicate resume:', error);
        }
        setActiveDropdown(null);
    };

    const quickActions = [
        { label: 'Software Engineer', icon: '💻' },
        { label: 'Product Manager', icon: '📊' },
        { label: 'Designer', icon: '🎨' },
        { label: 'Marketing', icon: '📈' },
        { label: 'Data Scientist', icon: '🔬' },
        { label: 'Sales', icon: '🤝' },
    ];

    return (
        <>
            <Header />
            <div className="min-h-screen bg-bg-primary pt-20">
                {/* Hero Section with CTA */}
                <div className="relative overflow-hidden">
                    {/* Background gradient effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-green/10 via-transparent to-accent-teal/10" />
                    <div className="absolute top-20 left-1/4 w-96 h-96 bg-accent-green/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-teal/10 rounded-full blur-3xl" />

                    <div className="relative max-w-7xl mx-auto px-6 py-12">
                        {/* Welcome + Stats Row */}
                        <div className="flex flex-col lg:flex-row gap-8 mb-12">
                            {/* Welcome Message */}
                            <div className="flex-1">
                                <h1 className="text-4xl md:text-5xl font-bold text-dark-teal mb-4">
                                    Welcome back{user?.name ? `, ${user.name}` : ''}! 👋
                                </h1>
                                <p className="text-xl text-text-secondary">
                                    Ready to land your dream job? Let's create a resume that stands out.
                                </p>
                            </div>

                            {/* Quick Stats Cards - responsive grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full lg:w-auto">
                                <div className="bg-bg-card border border-border-subtle rounded-xl p-4 md:p-5 shadow-sm">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-accent-green/20 flex items-center justify-center">
                                            <FileText size={18} className="text-accent-green md:hidden" />
                                            <FileText size={20} className="text-accent-green hidden md:block" />
                                        </div>
                                    </div>
                                    <div className="text-2xl md:text-3xl font-bold text-dark-teal">{stats.totalResumes}</div>
                                    <div className="text-xs md:text-sm text-text-secondary">Total Resumes</div>
                                </div>
                                <div className="bg-bg-card border border-border-subtle rounded-xl p-4 md:p-5 shadow-sm">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-accent-teal/20 flex items-center justify-center">
                                            <Calendar size={18} className="text-accent-teal md:hidden" />
                                            <Calendar size={20} className="text-accent-teal hidden md:block" />
                                        </div>
                                    </div>
                                    <div className="text-2xl md:text-3xl font-bold text-dark-teal">{stats.thisMonth}</div>
                                    <div className="text-xs md:text-sm text-text-secondary">This Month</div>
                                </div>
                                <div className="bg-bg-card border border-border-subtle rounded-xl p-4 md:p-5 hidden md:block shadow-sm">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                            <Layout size={20} className="text-purple-400" />
                                        </div>
                                    </div>
                                    <div className="text-3xl font-bold text-dark-teal">{Object.keys(stats.templates).length}</div>
                                    <div className="text-sm text-text-secondary">Templates Used</div>
                                </div>
                            </div>
                        </div>

                        {/* Main CTA Card */}
                        <div className="max-w-4xl">
                            <div className="relative group">
                                {/* Animated border gradient */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-accent-green via-accent-teal to-accent-green rounded-2xl blur-sm opacity-70 group-hover:opacity-100 transition duration-500" />

                                <div className="relative bg-bg-card border border-border-subtle rounded-2xl p-8">
                                    <div className="flex flex-col md:flex-row items-center gap-8">
                                        {/* Left side - Text */}
                                        <div className="flex-1 text-center md:text-left">
                                            <div className="inline-flex items-center gap-2 bg-accent-green/10 text-accent-green px-4 py-2 rounded-full text-sm font-medium mb-4">
                                                <Sparkles size={16} />
                                                AI-Powered Resume Builder
                                            </div>
                                            <h2 className="text-2xl md:text-3xl font-bold text-dark-teal mb-3">
                                                Create Your Perfect Resume
                                            </h2>

                                            {/* Quick role suggestions */}
                                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                                {quickActions.map((action) => (
                                                    <button
                                                        key={action.label}
                                                        onClick={() => router.push('/builder')}
                                                        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-border-subtle px-3 py-1.5 rounded-full text-sm text-text-secondary transition"
                                                    >
                                                        <span>{action.icon}</span>
                                                        {action.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Right side - CTA Button */}
                                        <div className="flex-shrink-0">
                                            <Link href="/builder">
                                                <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-accent-green to-accent-teal text-bg-primary px-8 py-5 rounded-xl font-bold text-lg shadow-lg shadow-accent-green/25 hover:shadow-accent-green/40 transition-all duration-300 hover:scale-105">
                                                    <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                                                    <span>Create New Resume</span>
                                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />

                                                    {/* Shine effect */}
                                                    <div className="absolute inset-0 rounded-xl overflow-hidden">
                                                        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                                    </div>
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subscription Status Card */}
                {user && (
                    <div className="max-w-7xl mx-auto px-6 py-8">
                        <div className="bg-bg-card border border-border-subtle rounded-xl p-6 shadow-sm">
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                        user.subscriptionTier === 'platinum' ? 'bg-amber-500/20' :
                                        user.subscriptionTier === 'diamond' ? 'bg-purple-500/20' :
                                        user.subscriptionTier === 'gold' ? 'bg-yellow-500/20' :
                                        user.subscriptionTier === 'starter' ? 'bg-green-500/20' :
                                        'bg-gray-100'
                                    }`}>
                                        <Crown size={24} className={
                                            user.subscriptionTier === 'platinum' ? 'text-amber-500' :
                                            user.subscriptionTier === 'diamond' ? 'text-purple-500' :
                                            user.subscriptionTier === 'gold' ? 'text-yellow-500' :
                                            user.subscriptionTier === 'starter' ? 'text-green-500' :
                                            'text-text-muted'
                                        } />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-semibold text-dark-teal capitalize">
                                                {user.subscriptionTier && user.subscriptionTier !== 'free' && user.subscriptionTier !== 'expired'
                                                    ? `${user.subscriptionTier} Plan`
                                                    : user.subscriptionTier === 'expired'
                                                        ? 'Expired Plan'
                                                        : 'No Active Plan'}
                                            </h3>
                                            {user.subscriptionTier && user.subscriptionTier !== 'free' && user.subscriptionTier !== 'expired' && (
                                                <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                                                    user.subscriptionStatus === 'trialing'
                                                        ? 'bg-blue-500/20 text-blue-600'
                                                        : 'bg-accent-green/20 text-accent-green'
                                                }`}>
                                                    {user.subscriptionStatus === 'trialing' ? 'Trial' : 'Active'}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-text-secondary">
                                            {user.subscriptionStatus === 'trialing' && user.trialEndsAt
                                                ? `Trial ends ${new Date(user.trialEndsAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                                                : user.creditsRemaining !== undefined && user.creditsRemaining > 0
                                                    ? `${user.creditsRemaining} downloads remaining`
                                                    : 'Upgrade to unlock more downloads'
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {(!user.subscriptionTier || user.subscriptionTier === 'free' || user.subscriptionTier === 'expired') && (
                                        <Link href="/pricing">
                                            <button className="flex items-center gap-2 bg-accent-green text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-accent-teal transition">
                                                <Zap size={16} />
                                                {user.subscriptionTier === 'expired' ? 'Resubscribe' : 'Subscribe'}
                                            </button>
                                        </Link>
                                    )}
                                    {user.subscriptionTier && user.subscriptionTier !== 'free' && user.subscriptionTier !== 'expired' && (
                                        <button
                                            onClick={async () => {
                                                try {
                                                    const response = await api.post('/payments/create-portal');
                                                    window.location.href = (response.data as { url: string }).url;
                                                } catch (err) {
                                                    console.error('Failed to open portal:', err);
                                                }
                                            }}
                                            className="flex items-center gap-2 border border-border-subtle text-text-secondary px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition"
                                        >
                                            <CreditCard size={16} />
                                            Manage Subscription
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Template Usage Stats */}
                {resumes.length > 0 && (
                    <div className="max-w-7xl mx-auto px-6 py-8">
                        <div className="bg-bg-card border border-border-subtle rounded-xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <BarChart3 size={24} className="text-accent-green" />
                                <h3 className="text-xl font-bold text-dark-teal">Template Usage</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                {templateStats.map((template) => (
                                    <div key={template.layout} className="bg-bg-card-light rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm font-medium text-text-secondary capitalize">
                                                {template.layout.toLowerCase()}
                                            </span>
                                            <span className="text-lg font-bold text-dark-teal">{template.count}</span>
                                        </div>
                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${template.color} rounded-full transition-all duration-500`}
                                                style={{ width: `${(template.count / maxTemplateCount) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Resume History Section */}
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <h3 className="text-2xl font-bold text-dark-teal">Your Resumes</h3>
                            {resumes.length > 0 && (
                                <span className="bg-accent-green/20 text-accent-green px-3 py-1 rounded-full text-sm font-medium">
                                    {resumes.length} total
                                </span>
                            )}
                        </div>
                        <Link href="/builder" className="text-accent-green hover:text-accent-teal transition flex items-center gap-2 text-sm font-medium">
                            <Plus size={16} /> New Resume
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-bg-card border border-border-subtle rounded-xl overflow-hidden animate-pulse shadow-sm">
                                    <div className="h-40 bg-gray-100" />
                                    <div className="p-4 space-y-3">
                                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : resumes.length === 0 ? (
                        /* Empty State */
                        <div className="bg-bg-card border border-border-subtle border-dashed rounded-xl p-12 text-center">
                            <div className="w-20 h-20 bg-accent-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FileText size={32} className="text-accent-green" />
                            </div>
                            <h4 className="text-xl font-semibold text-dark-teal mb-2">No resumes yet</h4>
                            <p className="text-text-secondary mb-6 max-w-md mx-auto">
                                Create your first AI-powered resume and start applying to your dream jobs today.
                            </p>
                            <Link href="/builder">
                                <button className="inline-flex items-center gap-2 bg-accent-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-teal transition">
                                    <Sparkles size={18} />
                                    Create Your First Resume
                                </button>
                            </Link>
                        </div>
                    ) : (
                        /* Resume Cards Grid */
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {resumes.map((resume) => (
                                <div
                                    key={resume.id}
                                    className="bg-bg-card border border-border-subtle rounded-xl overflow-hidden hover:border-accent-green/30 transition group shadow-sm"
                                >
                                    {/* Preview Thumbnail with Template Badge */}
                                    <div className="h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative">
                                        <FileText size={48} className="text-gray-300" />
                                        <div className="absolute top-3 left-3 flex gap-2">
                                            <span className="bg-blue-500/10 text-blue-600 px-2 py-1 rounded text-xs font-medium capitalize">
                                                {resume.templateLayout?.toLowerCase() || 'classic'}
                                            </span>
                                            <span className="bg-purple-500/10 text-purple-600 px-2 py-1 rounded text-xs font-medium capitalize">
                                                {resume.templateTheme?.toLowerCase() || 'navy'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-dark-teal group-hover:text-accent-green transition truncate">
                                                    {resume.title || 'Untitled Resume'}
                                                </h4>
                                                <p className="text-sm text-text-muted truncate">{resume.fullName || 'No name'}</p>
                                                <p className="text-xs text-text-secondary flex items-center gap-1 mt-1">
                                                    <Clock size={12} />
                                                    {formatDate(resume.updatedAt)}
                                                </p>
                                            </div>

                                            {/* Dropdown Menu */}
                                            <div className="relative">
                                                <button
                                                    onClick={() => setActiveDropdown(activeDropdown === resume.id ? null : resume.id)}
                                                    className="text-text-muted hover:text-dark-teal p-1"
                                                >
                                                    <MoreVertical size={18} />
                                                </button>
                                                {activeDropdown === resume.id && (
                                                    <div className="absolute right-0 top-8 w-40 bg-white border border-border-subtle rounded-lg shadow-xl z-10 py-1">
                                                        <button
                                                            onClick={() => handleDuplicate(resume)}
                                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-gray-50 transition"
                                                        >
                                                            <Copy size={14} /> Duplicate
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(resume.id)}
                                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition"
                                                        >
                                                            <Trash2 size={14} /> Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex gap-2 mt-4">
                                            <Link href={`/builder?id=${resume.id}`} className="flex-1">
                                                <button className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-text-secondary py-2 rounded-lg text-sm transition">
                                                    <Edit3 size={14} /> Edit
                                                </button>
                                            </Link>
                                            <button className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-text-secondary px-4 py-2 rounded-lg text-sm transition">
                                                <Download size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Add New Card */}
                            <Link href="/builder">
                                <div className="bg-bg-card border border-border-subtle border-dashed rounded-xl h-full min-h-[280px] flex flex-col items-center justify-center hover:border-accent-green/50 transition cursor-pointer group">
                                    <div className="w-16 h-16 bg-accent-green/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
                                        <Plus size={28} className="text-accent-green" />
                                    </div>
                                    <p className="text-text-secondary group-hover:text-accent-green transition">Create New Resume</p>
                                </div>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pro Tips Section */}
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="bg-gradient-to-r from-accent-green/10 to-accent-teal/10 border border-accent-green/20 rounded-2xl p-8">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 text-accent-green mb-2">
                                    <Zap size={20} />
                                    <span className="font-semibold">Pro Tip</span>
                                </div>
                                <h4 className="text-2xl font-bold text-dark-teal mb-2">
                                    Tailor your resume for each job
                                </h4>
                                <p className="text-text-secondary">
                                    Resumes tailored to specific job descriptions are 3x more likely to get interviews.
                                    Use our AI to quickly customize your resume for each application.
                                </p>
                            </div>
                            <div className="flex gap-6">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-accent-green">3x</div>
                                    <div className="text-sm text-text-secondary">More Interviews</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-accent-teal">85%</div>
                                    <div className="text-sm text-text-secondary">ATS Pass Rate</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
