// Canvas Templates - Public API
// Re-exports all canvas template types, data, and functions

// Re-export types from store (canonical location)
export type {
    CanvasTemplate,
    TextElement,
    ShapeElement,
    IconElement,
    ImageElement,
    AnyCanvasElement,
} from '@/store/useCanvasStore';

// Helpers
export {
    createText,
    createShape,
    createIcon,
    createImage,
    createImagePlaceholder,
    A4_WIDTH,
    A4_HEIGHT,
} from './helpers';

// Templates - now from individual files in templates/ folder
export {
    canvasTemplates,
    getCanvasTemplateById,
    getCanvasTemplatesByCategory,
    getCanvasCategories,
    // Individual templates for direct access
    classicProfessionalTemplate,
    modernSidebarTemplate,
    minimalCleanTemplate,
    boldCreativeTemplate,
    twoColumnTemplate,
} from './templates';
