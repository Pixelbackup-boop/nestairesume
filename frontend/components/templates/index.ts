// Template System Exports
// Public API for the template system

// Main component
export { default as UnifiedTemplate } from './UnifiedTemplate';

// Types
export type { LayoutType } from './UnifiedTemplate';
export type { TemplateProps, TemplateMeta, TemplateRegistryEntry, TemplateCategory } from './shared/types';

// Registry functions
export {
    templateRegistry,
    getTemplateById,
    getTemplatesByCategory,
    getTemplateCategories,
    getTemplateIdFromLayout,
} from './layouts';
