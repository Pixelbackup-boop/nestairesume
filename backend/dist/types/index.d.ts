export interface ExperienceItem {
    company: string;
    position: string;
    location?: string;
    startDate: string;
    endDate?: string;
    isCurrent: boolean;
    bullets: string[];
}
export interface EducationItem {
    institution: string;
    degree: string;
    fieldOfStudy?: string;
    startDate: string;
    endDate?: string;
    gpa?: string;
}
export interface ProjectItem {
    name: string;
    description: string;
    technologies: string[];
    url?: string;
}
export interface ResumeData {
    id?: string;
    userId?: string;
    title: string;
    targetRole?: string;
    targetCompany?: string;
    fullName: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedinUrl?: string;
    portfolioUrl?: string;
    summary?: string;
    experiences?: ExperienceItem[];
    education?: EducationItem[];
    skills?: string[];
    certifications?: string[];
    projects?: ProjectItem[];
    languages?: string[];
    templateLayout?: string;
    templateTheme?: string;
    customThemeColor?: string;
    atsScore?: number;
    isMaster?: boolean;
}
export interface UserPayload {
    id: string;
    email: string;
    role: string;
}
export type UserRole = "user" | "admin";
export type SubscriptionTier = "free" | "starter" | "gold" | "diamond" | "platinum" | "expired";
export type SubscriptionStatus = "active" | "canceled" | "past_due";
export interface BlogPostData {
    id?: string;
    slug: string;
    title: string;
    description: string;
    content: string;
    image?: string;
    imageAlt?: string;
    category: string;
    tags: string[];
    author: string;
    featured?: boolean;
    published?: boolean;
    publishedAt?: Date;
}
export interface PaymentData {
    id?: string;
    userId: string;
    stripePaymentId: string;
    amount: number;
    currency?: string;
    status: "succeeded" | "pending" | "failed";
    type: "subscription" | "one_time";
    plan?: string;
}
export interface TemplateInfo {
    id: string;
    name: string;
    layout: string;
    theme: string;
    isPremium: boolean;
    previewUrl?: string;
}
export declare const LAYOUTS: readonly ["CLASSIC", "SIDEBAR", "HEADER", "MINIMAL", "CREATIVE"];
export declare const THEMES: readonly ["NAVY", "TEAL", "DARK", "PURPLE"];
export declare const THEME_COLORS: Record<string, {
    primary: string;
    secondary: string;
    accent: string;
}>;
//# sourceMappingURL=index.d.ts.map