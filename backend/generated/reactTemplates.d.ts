/**
 * Type declarations for the generated React template bundle.
 * The .js file is produced by scripts/build-pdf-react-templates.mjs — do not edit it.
 */
import { PdfResumeData, PdfTheme, PdfTranslations } from '../src/types/pdf';

export declare function hasReactTemplate(templateId: string): boolean;

export declare function renderReactTemplate(
    templateId: string,
    data: PdfResumeData,
    theme: PdfTheme,
    translations?: PdfTranslations & { isRtl?: boolean }
): string;
