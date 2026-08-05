/**
 * Type declarations for the generated DOCX template bundle.
 * The .js file is produced by scripts/build-docx-templates.mjs (project root)
 * — do not edit it by hand; re-run the script to regenerate.
 *
 * Returns the full wrapped HTML document for html-to-docx. Accepts the same
 * wire shapes as the PDF routes (resume store data + theme object).
 */

export declare function renderDocxHtml(
  data: Record<string, unknown>,
  templateId: string,
  theme: Record<string, unknown>,
  translations?: { sections?: Record<string, string>; labels?: Record<string, string> },
  locale?: string
): string;
