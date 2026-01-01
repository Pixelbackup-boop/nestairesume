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
}

export interface TemplateInfo {
  id: string;
  name: string;
  layout: string;
  theme: string;
  isPremium: boolean;
  previewUrl?: string;
}

export const LAYOUTS = ["CLASSIC", "SIDEBAR", "HEADER", "MINIMAL", "CREATIVE"] as const;
export const THEMES = ["NAVY", "TEAL", "DARK", "PURPLE"] as const;

export const THEME_COLORS: Record<string, { primary: string; secondary: string; accent: string }> = {
  NAVY: { primary: "#1e3a5f", secondary: "#2c5282", accent: "#4299e1" },
  TEAL: { primary: "#234e52", secondary: "#285e61", accent: "#38b2ac" },
  DARK: { primary: "#1a202c", secondary: "#2d3748", accent: "#718096" },
  PURPLE: { primary: "#44337a", secondary: "#553c9a", accent: "#805ad5" },
};
