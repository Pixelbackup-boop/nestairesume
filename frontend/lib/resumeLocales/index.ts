/**
 * Aggregates all locale bundles and exports unified data maps
 * for use by aiResumeGenerator.ts
 */

import type { LocaleData, SummaryTemplates, JobDescriptions, TitlePrefixes, MasterDegree, ProficiencyLabels, LocaleLanguage } from './types';
export type { LocaleData, SummaryTemplates, JobDescriptions, TitlePrefixes, MasterDegree, ProficiencyLabels, LocaleLanguage, JobCategory, ExperienceLevel, LocaleBundle } from './types';

import en from './en';
import es from './es';
import fr from './fr';
import de from './de';
import ar from './ar';
import ja from './ja';
import ko from './ko';
import it from './it';
import pt from './pt';
import tr from './tr';
import vi from './vi';
import th from './th';
import zh from './zh';
import ms from './ms';
import id from './id';
import pl from './pl';
import nl from './nl';

const allLocales = { en, es, fr, de, ar, ja, ko, it, pt, tr, vi, th, zh, ms, id, pl, nl };

// Aggregated maps
export const localeDataMap: Record<string, LocaleData> = Object.fromEntries(
    Object.entries(allLocales).map(([key, bundle]) => [key, bundle.localeData])
);

export const summaryTemplatesMap: Record<string, SummaryTemplates> = Object.fromEntries(
    Object.entries(allLocales).map(([key, bundle]) => [key, bundle.summaryTemplates])
);

export const jobDescriptionsMap: Record<string, JobDescriptions> = Object.fromEntries(
    Object.entries(allLocales).map(([key, bundle]) => [key, bundle.jobDescriptions])
);

export const masterDegreesMap: Record<string, MasterDegree> = Object.fromEntries(
    Object.entries(allLocales).map(([key, bundle]) => [key, bundle.masterDegree])
);

export const phoneFormatsMap: Record<string, string> = Object.fromEntries(
    Object.entries(allLocales).map(([key, bundle]) => [key, bundle.phoneFormat])
);

export const titlePrefixesMap: Record<string, TitlePrefixes> = Object.fromEntries(
    Object.entries(allLocales).map(([key, bundle]) => [key, bundle.titlePrefixes])
);

export const skillNamesMap: Record<string, Record<string, string[]>> = Object.fromEntries(
    Object.entries(allLocales).map(([key, bundle]) => [key, bundle.skillNames])
);

export const languagesMap: Record<string, LocaleLanguage[]> = Object.fromEntries(
    Object.entries(allLocales).map(([key, bundle]) => [key, bundle.languages])
);

export const interestsMap: Record<string, string[]> = Object.fromEntries(
    Object.entries(allLocales).map(([key, bundle]) => [key, bundle.interests])
);

export const strengthsMap: Record<string, string[]> = Object.fromEntries(
    Object.entries(allLocales).map(([key, bundle]) => [key, bundle.strengths])
);

export const proficiencyLabelsMap: Record<string, ProficiencyLabels> = Object.fromEntries(
    Object.entries(allLocales).map(([key, bundle]) => [key, bundle.proficiencyLabels])
);
