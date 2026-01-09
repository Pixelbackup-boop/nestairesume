// Builder Templates - Public API
// Re-exports all builder template types, data, and functions

// Types
export type { BuilderTemplate, LayoutType, TemplateCategory, TemplateTheme } from './types';
export type { ThemeColor } from './colorPresets';
export type {
    ColorSchemaType,
    TemplateColorSchema,
    SingleColorPreset,
    DualColorPreset,
} from './templateColorSchemas';

// Sample Data
export {
    sampleResumeData,
    samplePreviewData,
    sampleProfiles,
    getSampleProfile,
    getSampleResumeDataWithProfile
} from './sampleData';

// Color Presets
export {
    colorPresets,
    colorToThemeId,
    generateTheme,
    getThemeById,
} from './colorPresets';

// Template Color Schemas
export {
    singleColorPresets,
    dualColorPresets,
    templateColorSchemas,
    getTemplateColorSchema,
    getPresetsForTemplate,
} from './templateColorSchemas';

// Templates & Functions
export {
    builderTemplates,
    getTemplateById,
    getLayoutPresetId,
    getLayoutType,
    getTemplateTheme,
    getTemplatesByCategory,
    getTemplateThumbnail,
} from './templates';
