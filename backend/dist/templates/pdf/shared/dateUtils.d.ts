/**
 * Date localization utilities for PDF template generation
 * Converts English month abbreviations to localized versions
 */
/**
 * Format a date string with localized month names
 * Handles various date formats: "Jan 2024", "January 2024", "2024-01", "01/2024", etc.
 *
 * @param dateStr - The date string to localize (e.g., "Jan 2024")
 * @param locale - The target locale (e.g., "es", "fr", "de", "ar")
 * @returns The localized date string
 *
 * @example
 * formatLocalizedDate("Jan 2024", "es") // "Ene 2024"
 * formatLocalizedDate("January 2024", "fr") // "Janvier 2024"
 * formatLocalizedDate("2024", "es") // "2024" (unchanged, no month)
 */
export declare function formatLocalizedDate(dateStr: string | undefined | null, locale?: string): string;
/**
 * Format a date range with localized months
 *
 * @param startDate - Start date string
 * @param endDate - End date string (or undefined for current)
 * @param locale - Target locale
 * @param presentLabel - Localized "Present" label for current dates
 * @returns Formatted date range string
 *
 * @example
 * formatDateRange("Jan 2020", "Dec 2023", "es") // "Ene 2020 - Dic 2023"
 * formatDateRange("Jan 2020", undefined, "es", "Presente") // "Ene 2020 - Presente"
 */
export declare function formatDateRange(startDate: string | undefined, endDate: string | undefined, locale?: string, presentLabel?: string): string;
//# sourceMappingURL=dateUtils.d.ts.map