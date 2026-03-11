import { create } from 'zustand';

// Canvas element types
export type CanvasElementType = 'text' | 'image' | 'shape' | 'icon';

export interface CanvasElement {
    id: string;
    type: CanvasElementType;
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
    opacity: number;
    locked: boolean;
    visible: boolean;
}

export interface TextElement extends CanvasElement {
    type: 'text';
    text: string;
    fontSize: number;
    fontFamily: string;
    fontStyle: 'normal' | 'italic';
    fontWeight: 'normal' | 'bold';
    fill: string;
    backgroundColor?: string; // Background color behind text
    align: 'left' | 'center' | 'right';
    lineHeight: number;
    letterSpacing: number;
}

export interface ImageElement extends CanvasElement {
    type: 'image';
    src: string;
    cropX?: number;
    cropY?: number;
    cropWidth?: number;
    cropHeight?: number;
    filters?: {
        brightness: number;
        contrast: number;
        saturation: number;
    };
}

export interface ShapeElement extends CanvasElement {
    type: 'shape';
    shapeType: 'rectangle' | 'circle' | 'line' | 'star' | 'polygon';
    fill: string;
    stroke: string;
    strokeWidth: number;
    cornerRadius?: number;
    sides?: number; // For polygon
    innerRadius?: number; // For star
    // Image fill properties for clipping images to shapes
    imageSrc?: string; // Base64 or URL of image to fill the shape
    imageFit?: 'cover' | 'contain' | 'fill'; // How the image fits within the shape
    imageOffsetX?: number; // User-adjustable X pan within shape (0 = centered)
    imageOffsetY?: number; // User-adjustable Y pan within shape (0 = centered)
}

export interface IconElement extends CanvasElement {
    type: 'icon';
    iconName: string;
    fill: string;
    stroke: string;
    strokeWidth: number;
}

export type AnyCanvasElement = TextElement | ImageElement | ShapeElement | IconElement;

export interface CanvasTemplate {
    id: string;
    name: string;
    thumbnail: string;
    category: 'creative' | 'professional' | 'minimal' | 'modern';
    backgroundColor: string;
    backgroundGradient?: {
        start: string;
        end: string;
        direction: number;
    };
    elements: AnyCanvasElement[];
}

export interface CanvasState {
    // Canvas settings
    canvasWidth: number;
    canvasHeight: number;
    backgroundColor: string;
    backgroundGradient: {
        enabled: boolean;
        start: string;
        end: string;
        direction: number;
    };

    // Elements
    elements: AnyCanvasElement[];
    selectedElementIds: string[];

    // History for undo/redo
    history: AnyCanvasElement[][];
    historyIndex: number;

    // UI state
    zoom: number;
    activeTool: 'select' | 'text' | 'image' | 'shape' | 'pan';
    activeShapeType: ShapeElement['shapeType'];

    // Selected template
    selectedTemplateId: string | null;
}

interface CanvasActions {
    // Element CRUD
    addElement: (element: AnyCanvasElement) => void;
    updateElement: (id: string, updates: Partial<AnyCanvasElement>) => void;
    removeElement: (id: string) => void;
    duplicateElement: (id: string) => void;

    // Selection
    selectElement: (id: string, addToSelection?: boolean) => void;
    deselectAll: () => void;
    selectAll: () => void;

    // Element ordering
    bringToFront: (id: string) => void;
    sendToBack: (id: string) => void;
    moveUp: (id: string) => void;
    moveDown: (id: string) => void;

    // Canvas settings
    setCanvasSize: (width: number, height: number) => void;
    setBackgroundColor: (color: string) => void;
    setBackgroundGradient: (gradient: CanvasState['backgroundGradient']) => void;
    setZoom: (zoom: number) => void;

    // Tools
    setActiveTool: (tool: CanvasState['activeTool']) => void;
    setActiveShapeType: (shapeType: ShapeElement['shapeType']) => void;

    // Templates
    loadTemplate: (template: CanvasTemplate) => void;
    loadCommunityTemplate: (designData: string, name: string) => void;
    clearCanvas: () => void;

    // History
    saveToHistory: () => void;
    undo: () => void;
    redo: () => void;

    // Batch operations
    setElements: (elements: AnyCanvasElement[]) => void;
}

// A4 size at 96 DPI (standard screen)
const A4_WIDTH = 595;  // ~210mm at 72dpi, scaled for screen
const A4_HEIGHT = 842; // ~297mm at 72dpi, scaled for screen

const initialState: CanvasState = {
    canvasWidth: A4_WIDTH,
    canvasHeight: A4_HEIGHT,
    backgroundColor: '#ffffff',
    backgroundGradient: {
        enabled: false,
        start: '#ffffff',
        end: '#f0f0f0',
        direction: 180,
    },
    elements: [],
    selectedElementIds: [],
    history: [[]],
    historyIndex: 0,
    zoom: 1,
    activeTool: 'select',
    activeShapeType: 'rectangle',
    selectedTemplateId: null,
};

export const useCanvasStore = create<CanvasState & CanvasActions>((set, get) => ({
    ...initialState,

    // Element CRUD
    addElement: (element) => {
        set((state) => ({
            elements: [...state.elements, element],
            selectedElementIds: [element.id],
        }));
        get().saveToHistory();
    },

    updateElement: (id, updates) => {
        set((state) => ({
            elements: state.elements.map((el) =>
                el.id === id ? { ...el, ...updates } as AnyCanvasElement : el
            ),
        }));
    },

    removeElement: (id) => {
        set((state) => ({
            elements: state.elements.filter((el) => el.id !== id),
            selectedElementIds: state.selectedElementIds.filter((sid) => sid !== id),
        }));
        get().saveToHistory();
    },

    duplicateElement: (id) => {
        const state = get();
        const element = state.elements.find((el) => el.id === id);
        if (element) {
            const newElement: AnyCanvasElement = {
                ...element,
                id: crypto.randomUUID(),
                x: element.x + 20,
                y: element.y + 20,
            };
            set((state) => ({
                elements: [...state.elements, newElement],
                selectedElementIds: [newElement.id],
            }));
            get().saveToHistory();
        }
    },

    // Selection
    selectElement: (id, addToSelection = false) => {
        set((state) => ({
            selectedElementIds: addToSelection
                ? [...state.selectedElementIds, id]
                : [id],
        }));
    },

    deselectAll: () => set({ selectedElementIds: [] }),

    selectAll: () => {
        set((state) => ({
            selectedElementIds: state.elements.map((el) => el.id),
        }));
    },

    // Element ordering
    bringToFront: (id) => {
        set((state) => {
            const element = state.elements.find((el) => el.id === id);
            if (!element) return state;
            return {
                elements: [
                    ...state.elements.filter((el) => el.id !== id),
                    element,
                ],
            };
        });
        get().saveToHistory();
    },

    sendToBack: (id) => {
        set((state) => {
            const element = state.elements.find((el) => el.id === id);
            if (!element) return state;
            return {
                elements: [
                    element,
                    ...state.elements.filter((el) => el.id !== id),
                ],
            };
        });
        get().saveToHistory();
    },

    moveUp: (id) => {
        set((state) => {
            const index = state.elements.findIndex((el) => el.id === id);
            if (index === -1 || index === state.elements.length - 1) return state;
            const newElements = [...state.elements];
            [newElements[index], newElements[index + 1]] = [newElements[index + 1], newElements[index]];
            return { elements: newElements };
        });
        get().saveToHistory();
    },

    moveDown: (id) => {
        set((state) => {
            const index = state.elements.findIndex((el) => el.id === id);
            if (index <= 0) return state;
            const newElements = [...state.elements];
            [newElements[index], newElements[index - 1]] = [newElements[index - 1], newElements[index]];
            return { elements: newElements };
        });
        get().saveToHistory();
    },

    // Canvas settings
    setCanvasSize: (width, height) => set({ canvasWidth: width, canvasHeight: height }),
    setBackgroundColor: (color) => set({ backgroundColor: color }),
    setBackgroundGradient: (gradient) => set({ backgroundGradient: gradient }),
    setZoom: (zoom) => set({ zoom: Math.max(0.1, Math.min(3, zoom)) }),

    // Tools
    setActiveTool: (tool) => set({ activeTool: tool }),
    setActiveShapeType: (shapeType) => set({ activeShapeType: shapeType }),

    // Templates
    loadTemplate: (template) => {
        set({
            elements: template.elements.map((el) => ({
                ...el,
                id: crypto.randomUUID(), // Generate new IDs
            })),
            backgroundColor: template.backgroundColor,
            backgroundGradient: template.backgroundGradient
                ? {
                    enabled: true,
                    start: template.backgroundGradient.start,
                    end: template.backgroundGradient.end,
                    direction: template.backgroundGradient.direction,
                }
                : initialState.backgroundGradient,
            selectedTemplateId: template.id,
            selectedElementIds: [],
            history: [[]],
            historyIndex: 0,
        });
        get().saveToHistory();
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loadCommunityTemplate: (designData, _name) => {
        try {
            const parsed = JSON.parse(designData);
            // Handle both array format and object with elements property
            const elements = Array.isArray(parsed) ? parsed : (parsed.elements || []);
            set({
                elements: elements.map((el: AnyCanvasElement) => ({
                    ...el,
                    id: crypto.randomUUID(), // Generate new IDs
                })),
                backgroundColor: parsed.backgroundColor || '#ffffff',
                backgroundGradient: parsed.backgroundGradient
                    ? {
                        enabled: true,
                        start: parsed.backgroundGradient.start,
                        end: parsed.backgroundGradient.end,
                        direction: parsed.backgroundGradient.direction,
                    }
                    : initialState.backgroundGradient,
                selectedElementIds: [],
                history: [[]],
                historyIndex: 0,
            });
            get().saveToHistory();
        } catch (error) {
            console.error('Failed to parse community template:', error);
        }
    },

    clearCanvas: () => {
        set({
            ...initialState,
            history: [[]],
            historyIndex: 0,
        });
    },

    // History
    saveToHistory: () => {
        set((state) => {
            const newHistory = state.history.slice(0, state.historyIndex + 1);
            newHistory.push([...state.elements]);
            return {
                history: newHistory.slice(-50), // Keep last 50 states
                historyIndex: Math.min(newHistory.length - 1, 49),
            };
        });
    },

    undo: () => {
        set((state) => {
            if (state.historyIndex <= 0) return state;
            const newIndex = state.historyIndex - 1;
            return {
                elements: [...state.history[newIndex]],
                historyIndex: newIndex,
                selectedElementIds: [],
            };
        });
    },

    redo: () => {
        set((state) => {
            if (state.historyIndex >= state.history.length - 1) return state;
            const newIndex = state.historyIndex + 1;
            return {
                elements: [...state.history[newIndex]],
                historyIndex: newIndex,
                selectedElementIds: [],
            };
        });
    },

    // Batch operations
    setElements: (elements) => set({ elements }),
}));
