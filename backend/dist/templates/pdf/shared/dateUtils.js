"use strict";
/**
 * Date localization utilities for PDF template generation
 * Converts English month abbreviations to localized versions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatLocalizedDate = formatLocalizedDate;
exports.formatDateRange = formatDateRange;
/**
 * Month abbreviation mappings by locale
 * Maps English month abbreviations to localized versions
 */
const monthAbbreviations = {
    en: {
        Jan: 'Jan', Feb: 'Feb', Mar: 'Mar', Apr: 'Apr',
        May: 'May', Jun: 'Jun', Jul: 'Jul', Aug: 'Aug',
        Sep: 'Sep', Oct: 'Oct', Nov: 'Nov', Dec: 'Dec'
    },
    es: {
        Jan: 'Ene', Feb: 'Feb', Mar: 'Mar', Apr: 'Abr',
        May: 'May', Jun: 'Jun', Jul: 'Jul', Aug: 'Ago',
        Sep: 'Sep', Oct: 'Oct', Nov: 'Nov', Dec: 'Dic'
    },
    fr: {
        Jan: 'janv.', Feb: 'févr.', Mar: 'mars', Apr: 'avr.',
        May: 'mai', Jun: 'juin', Jul: 'juil.', Aug: 'août',
        Sep: 'sept.', Oct: 'oct.', Nov: 'nov.', Dec: 'déc.'
    },
    de: {
        Jan: 'Jan.', Feb: 'Feb.', Mar: 'März', Apr: 'Apr.',
        May: 'Mai', Jun: 'Juni', Jul: 'Juli', Aug: 'Aug.',
        Sep: 'Sep.', Oct: 'Okt.', Nov: 'Nov.', Dec: 'Dez.'
    },
    ar: {
        Jan: 'يناير', Feb: 'فبراير', Mar: 'مارس', Apr: 'أبريل',
        May: 'مايو', Jun: 'يونيو', Jul: 'يوليو', Aug: 'أغسطس',
        Sep: 'سبتمبر', Oct: 'أكتوبر', Nov: 'نوفمبر', Dec: 'ديسمبر'
    },
};
/**
 * Full month name mappings for cases where full names are used
 */
const fullMonthNames = {
    en: {
        January: 'January', February: 'February', March: 'March', April: 'April',
        May: 'May', June: 'June', July: 'July', August: 'August',
        September: 'September', October: 'October', November: 'November', December: 'December'
    },
    es: {
        January: 'Enero', February: 'Febrero', March: 'Marzo', April: 'Abril',
        May: 'Mayo', June: 'Junio', July: 'Julio', August: 'Agosto',
        September: 'Septiembre', October: 'Octubre', November: 'Noviembre', December: 'Diciembre'
    },
    fr: {
        January: 'Janvier', February: 'Février', March: 'Mars', April: 'Avril',
        May: 'Mai', June: 'Juin', July: 'Juillet', August: 'Août',
        September: 'Septembre', October: 'Octobre', November: 'Novembre', December: 'Décembre'
    },
    de: {
        January: 'Januar', February: 'Februar', March: 'März', April: 'April',
        May: 'Mai', June: 'Juni', July: 'Juli', August: 'August',
        September: 'September', October: 'Oktober', November: 'November', December: 'Dezember'
    },
    ar: {
        January: 'يناير', February: 'فبراير', March: 'مارس', April: 'أبريل',
        May: 'مايو', June: 'يونيو', July: 'يوليو', August: 'أغسطس',
        September: 'سبتمبر', October: 'أكتوبر', November: 'نوفمبر', December: 'ديسمبر'
    },
};
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
function formatLocalizedDate(dateStr, locale = 'en') {
    if (!dateStr)
        return '';
    // If locale is English or not supported, return as-is
    const normalizedLocale = locale.toLowerCase().split('-')[0]; // Handle "en-US" -> "en"
    if (normalizedLocale === 'en' || !monthAbbreviations[normalizedLocale]) {
        return dateStr;
    }
    const abbrevMap = monthAbbreviations[normalizedLocale];
    const fullMap = fullMonthNames[normalizedLocale];
    let result = dateStr;
    // Replace full month names first (longer strings first to avoid partial matches)
    for (const [eng, localized] of Object.entries(fullMap)) {
        // Case-insensitive replacement, preserving surrounding context
        const regex = new RegExp(`\\b${eng}\\b`, 'gi');
        result = result.replace(regex, localized);
    }
    // Replace abbreviated month names
    for (const [eng, localized] of Object.entries(abbrevMap)) {
        // Match abbreviations with optional period (Jan or Jan.)
        const regex = new RegExp(`\\b${eng}\\.?\\b`, 'gi');
        result = result.replace(regex, localized);
    }
    return result;
}
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
function formatDateRange(startDate, endDate, locale = 'en', presentLabel = 'Present') {
    const start = formatLocalizedDate(startDate, locale);
    const end = endDate ? formatLocalizedDate(endDate, locale) : presentLabel;
    if (!start)
        return end;
    if (!end)
        return start;
    return `${start} – ${end}`;
}
//# sourceMappingURL=dateUtils.js.map