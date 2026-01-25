/**
 * Resume Import Service
 * Handles file uploads to the backend for parsing and AI enhancement
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4444';

export interface ParsedPersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  summary: string;
  jobTitle: string;
}

export interface ParsedExperience {
  id: string;
  title: string;
  company: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface ParsedEducation {
  id: string;
  school: string;
  degree: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface ParsedSkill {
  id: string;
  name: string;
  level: number;
}

export interface ParsedLanguage {
  id: string;
  name: string;
  proficiency: 'native' | 'fluent' | 'advanced' | 'intermediate' | 'basic';
  level: number;
}

export interface ParsedCertification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface ParsedResumeData {
  personalInfo: ParsedPersonalInfo;
  experience: ParsedExperience[];
  education: ParsedEducation[];
  skills: ParsedSkill[];
  languages: ParsedLanguage[];
  certifications: ParsedCertification[];
}

export interface ParseResult {
  success: boolean;
  data?: Partial<ParsedResumeData>;
  warnings?: string[];
  isLinkedIn?: boolean;
  error?: string;
}

// Allowed file types
export const ALLOWED_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export const ALLOWED_EXTENSIONS = ['.pdf', '.docx'];
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

/**
 * Validate a file before upload
 */
export function validateFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!ext || !['pdf', 'docx'].includes(ext)) {
      return {
        valid: false,
        error: 'Please upload a PDF or DOCX file',
      };
    }
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: 'File size exceeds 10MB limit',
    };
  }

  return { valid: true };
}

/**
 * Parse a resume file using the backend API
 */
export async function parseResumeFile(
  file: File,
  locale: string = 'en'
): Promise<ParseResult> {
  // Validate first
  const validation = validateFile(file);
  if (!validation.valid) {
    return {
      success: false,
      error: validation.error,
    };
  }

  // Create form data
  const formData = new FormData();
  formData.append('file', file);
  formData.append('locale', locale);

  try {
    const response = await fetch(`${API_BASE}/api/v1/resume/parse`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Failed to parse resume',
      };
    }

    return result as ParseResult;
  } catch (error) {
    console.error('Resume parse error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error. Please try again.',
    };
  }
}

/**
 * Get file type display name
 */
export function getFileTypeLabel(file: File): string {
  if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
    return 'PDF';
  }
  if (
    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.name.endsWith('.docx')
  ) {
    return 'Word Document';
  }
  return 'Document';
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
