/**
 * Translation helpers for PDF template generation
 * Provides default English translations when frontend doesn't pass translations
 */
import { PdfTranslations } from '../../../types/pdf';
/**
 * Default English translations for backward compatibility
 * Used when frontend doesn't provide translations
 */
export declare const defaultTranslations: PdfTranslations;
/**
 * Safely get translation value with fallback to default English
 * @param translations - Optional translations from frontend
 * @returns Complete translations object with defaults filled in
 */
export declare function getTranslations(translations?: PdfTranslations): PdfTranslations;
//# sourceMappingURL=translations.d.ts.map