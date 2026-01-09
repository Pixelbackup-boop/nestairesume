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

// Individual template components (for direct use)
export {
    ClassicProfessional,
    EuropassClassic,
    SidebarModern,
    HeaderBoldCreative,
    MinimalClean,
} from './layouts';

// Legacy named exports (for backward compatibility)
export {
    ClassicTemplate,
    SidebarTemplate,
    HeaderTemplate,
    MinimalTemplate,
} from './UnifiedTemplate';
