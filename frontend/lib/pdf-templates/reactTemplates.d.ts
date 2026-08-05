/**
 * Type declarations for the generated React template bundle.
 * The .js file is produced by scripts/build-pdf-react-templates.mjs (project
 * root) — do not edit it by hand; re-run the script to regenerate both the
 * backend and frontend copies.
 *
 * The renderer accepts the wire shapes the builder sends to /api/v1/pdf/*:
 * the resume store's ResumeData and a ThemeColor object. They are typed
 * loosely here because the bundle performs no validation of its own.
 */

export interface PdfRenderTranslations {
  sections?: Record<string, string>;
  labels?: Record<string, string>;
  isRtl?: boolean;
}

export declare function hasReactTemplate(templateId: string): boolean;

export declare function renderReactTemplate(
  templateId: string,
  data: Record<string, unknown>,
  theme: Record<string, unknown>,
  translations?: PdfRenderTranslations
): string;
