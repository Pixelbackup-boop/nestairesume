// Canvas Template Helpers
// Shared element creation functions for canvas templates

import type { TextElement, ShapeElement, IconElement, ImageElement } from '@/store/useCanvasStore';

// A4 dimensions at 72 DPI
export const A4_WIDTH = 595;
export const A4_HEIGHT = 842;

/**
 * Create a text element with sensible defaults.
 */
export const createText = (
    overrides: Partial<TextElement> & { text: string; x: number; y: number }
): TextElement => ({
    id: crypto.randomUUID(),
    type: 'text',
    width: 200,
    height: 30,
    rotation: 0,
    opacity: 1,
    locked: false,
    visible: true,
    fontSize: 16,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fill: '#333333',
    align: 'left',
    lineHeight: 1.4,
    letterSpacing: 0,
    ...overrides,
});

/**
 * Create a shape element with sensible defaults.
 */
export const createShape = (
    overrides: Partial<ShapeElement> & { x: number; y: number; width: number; height: number }
): ShapeElement => ({
    id: crypto.randomUUID(),
    type: 'shape',
    shapeType: 'rectangle',
    rotation: 0,
    opacity: 1,
    locked: false,
    visible: true,
    fill: '#00dc82',
    stroke: 'transparent',
    strokeWidth: 0,
    cornerRadius: 0,
    ...overrides,
});

/**
 * Create an icon element with sensible defaults.
 */
export const createIcon = (
    overrides: Partial<IconElement> & { iconName: string; x: number; y: number }
): IconElement => ({
    id: crypto.randomUUID(),
    type: 'icon',
    width: 20,
    height: 20,
    rotation: 0,
    opacity: 1,
    locked: false,
    visible: true,
    fill: '#333333',
    stroke: 'transparent',
    strokeWidth: 0,
    ...overrides,
});

/**
 * Create an image element with sensible defaults.
 */
export const createImage = (
    overrides: Partial<ImageElement> & { src: string; x: number; y: number; width: number; height: number }
): ImageElement => ({
    id: crypto.randomUUID(),
    type: 'image',
    rotation: 0,
    opacity: 1,
    locked: false,
    visible: true,
    ...overrides,
});

/**
 * Create an image placeholder (empty src for user upload).
 */
export const createImagePlaceholder = (
    overrides: Partial<ImageElement> & { x: number; y: number; width: number; height: number }
): ImageElement => ({
    id: crypto.randomUUID(),
    type: 'image',
    rotation: 0,
    opacity: 1,
    locked: false,
    visible: true,
    src: '', // Will be replaced when user uploads
    ...overrides,
});
