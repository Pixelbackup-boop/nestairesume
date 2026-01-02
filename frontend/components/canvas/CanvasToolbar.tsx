'use client';

import React from 'react';
import {
    MousePointer2,
    Type,
    Image,
    Square,
    Circle,
    Star,
    Minus,
    Undo2,
    Redo2,
    ZoomIn,
    ZoomOut,
    Download,
    Trash2,
    Copy,
    Layers,
    ChevronUp,
    ChevronDown,
    Save,
    FolderOpen,
} from 'lucide-react';
import { useCanvasStore, ShapeElement, AnyCanvasElement } from '@/store/useCanvasStore';

const STORAGE_KEY = 'canvas-editor-project';

interface SavedProject {
    name: string;
    savedAt: string;
    elements: AnyCanvasElement[];
    backgroundColor: string;
    backgroundGradient: {
        enabled: boolean;
        start: string;
        end: string;
        direction: number;
    };
}

interface CanvasToolbarProps {
    onExport: (format: 'pdf' | 'png' | 'jpeg') => void;
}

export default function CanvasToolbar({ onExport }: CanvasToolbarProps) {
    const {
        activeTool,
        setActiveTool,
        activeShapeType,
        setActiveShapeType,
        zoom,
        setZoom,
        undo,
        redo,
        history,
        historyIndex,
        selectedElementIds,
        removeElement,
        duplicateElement,
        bringToFront,
        sendToBack,
        elements,
        backgroundColor,
        backgroundGradient,
        setElements,
        setBackgroundColor,
        setBackgroundGradient,
    } = useCanvasStore();

    const [showSaveMenu, setShowSaveMenu] = React.useState(false);
    const [hasSavedProject, setHasSavedProject] = React.useState(false);

    // Check for saved project on mount (client-side only)
    React.useEffect(() => {
        setHasSavedProject(!!localStorage.getItem(STORAGE_KEY));
    }, []);

    // Save project to localStorage
    const handleSave = () => {
        const project: SavedProject = {
            name: 'My Resume',
            savedAt: new Date().toISOString(),
            elements,
            backgroundColor,
            backgroundGradient,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
        setHasSavedProject(true);
        setShowSaveMenu(false);
        alert('Project saved successfully!');
    };

    // Load project from localStorage
    const handleLoad = () => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) {
            alert('No saved project found.');
            return;
        }
        try {
            const project: SavedProject = JSON.parse(saved);
            setElements(project.elements);
            setBackgroundColor(project.backgroundColor);
            setBackgroundGradient(project.backgroundGradient);
            setShowSaveMenu(false);
            alert('Project loaded successfully!');
        } catch {
            alert('Failed to load project.');
        }
    };

    const tools = [
        { id: 'select' as const, icon: MousePointer2, label: 'Select (V)' },
        { id: 'text' as const, icon: Type, label: 'Text (T)' },
        { id: 'image' as const, icon: Image, label: 'Image (I)' },
        { id: 'shape' as const, icon: Square, label: 'Shape (S)' },
    ];

    const shapes: { id: ShapeElement['shapeType']; icon: React.ElementType; label: string }[] = [
        { id: 'rectangle', icon: Square, label: 'Rectangle' },
        { id: 'circle', icon: Circle, label: 'Circle' },
        { id: 'star', icon: Star, label: 'Star' },
        { id: 'line', icon: Minus, label: 'Line' },
    ];

    const canUndo = historyIndex > 0;
    const canRedo = historyIndex < history.length - 1;
    const hasSelection = selectedElementIds.length > 0;

    // Keyboard shortcuts
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Don't trigger if typing in input
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }

            switch (e.key.toLowerCase()) {
                case 'v':
                    setActiveTool('select');
                    break;
                case 't':
                    setActiveTool('text');
                    break;
                case 'i':
                    setActiveTool('image');
                    break;
                case 's':
                    setActiveTool('shape');
                    break;
                case 'delete':
                case 'backspace':
                    if (hasSelection) {
                        selectedElementIds.forEach((id) => removeElement(id));
                    }
                    break;
                case 'd':
                    if ((e.metaKey || e.ctrlKey) && hasSelection) {
                        e.preventDefault();
                        selectedElementIds.forEach((id) => duplicateElement(id));
                    }
                    break;
                case 'z':
                    if (e.metaKey || e.ctrlKey) {
                        e.preventDefault();
                        if (e.shiftKey) {
                            redo();
                        } else {
                            undo();
                        }
                    }
                    break;
                case '=':
                case '+':
                    if (e.metaKey || e.ctrlKey) {
                        e.preventDefault();
                        setZoom(zoom + 0.1);
                    }
                    break;
                case '-':
                    if (e.metaKey || e.ctrlKey) {
                        e.preventDefault();
                        setZoom(zoom - 0.1);
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [setActiveTool, hasSelection, selectedElementIds, removeElement, duplicateElement, undo, redo, zoom, setZoom]);

    return (
        <div className="h-14 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-4">
            {/* Left - Tools */}
            <div className="flex items-center gap-1">
                {tools.map((tool) => (
                    <button
                        key={tool.id}
                        onClick={() => setActiveTool(tool.id)}
                        className={`p-2.5 rounded-lg transition-colors ${
                            activeTool === tool.id
                                ? 'bg-accent-green text-slate-900'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                        title={tool.label}
                    >
                        <tool.icon size={20} />
                    </button>
                ))}

                {/* Shape selector dropdown */}
                {activeTool === 'shape' && (
                    <div className="flex items-center gap-1 ml-2 pl-2 border-l border-slate-700">
                        {shapes.map((shape) => (
                            <button
                                key={shape.id}
                                onClick={() => setActiveShapeType(shape.id)}
                                className={`p-2 rounded-lg transition-colors ${
                                    activeShapeType === shape.id
                                        ? 'bg-slate-700 text-accent-green'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                }`}
                                title={shape.label}
                            >
                                <shape.icon size={18} />
                            </button>
                        ))}
                    </div>
                )}

                {/* Divider */}
                <div className="w-px h-8 bg-slate-700 mx-2" />

                {/* Undo/Redo */}
                <button
                    onClick={undo}
                    disabled={!canUndo}
                    className={`p-2.5 rounded-lg transition-colors ${
                        canUndo
                            ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                            : 'text-slate-600 cursor-not-allowed'
                    }`}
                    title="Undo (Cmd+Z)"
                >
                    <Undo2 size={20} />
                </button>
                <button
                    onClick={redo}
                    disabled={!canRedo}
                    className={`p-2.5 rounded-lg transition-colors ${
                        canRedo
                            ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                            : 'text-slate-600 cursor-not-allowed'
                    }`}
                    title="Redo (Cmd+Shift+Z)"
                >
                    <Redo2 size={20} />
                </button>
            </div>

            {/* Center - Selection actions */}
            {hasSelection && (
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => selectedElementIds.forEach((id) => duplicateElement(id))}
                        className="p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        title="Duplicate (Cmd+D)"
                    >
                        <Copy size={20} />
                    </button>
                    <button
                        onClick={() => selectedElementIds.forEach((id) => removeElement(id))}
                        className="p-2.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                        title="Delete"
                    >
                        <Trash2 size={20} />
                    </button>

                    <div className="w-px h-8 bg-slate-700 mx-2" />

                    <button
                        onClick={() => selectedElementIds.forEach((id) => bringToFront(id))}
                        className="p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        title="Bring to Front"
                    >
                        <ChevronUp size={20} />
                    </button>
                    <button
                        onClick={() => selectedElementIds.forEach((id) => sendToBack(id))}
                        className="p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        title="Send to Back"
                    >
                        <ChevronDown size={20} />
                    </button>
                </div>
            )}

            {/* Right - Zoom & Export */}
            <div className="flex items-center gap-1">
                <button
                    onClick={() => setZoom(zoom - 0.1)}
                    disabled={zoom <= 0.2}
                    className="p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors disabled:text-slate-600 disabled:cursor-not-allowed"
                    title="Zoom Out"
                >
                    <ZoomOut size={20} />
                </button>
                <span className="text-slate-300 text-sm w-16 text-center font-medium">
                    {Math.round(zoom * 100)}%
                </span>
                <button
                    onClick={() => setZoom(zoom + 0.1)}
                    disabled={zoom >= 3}
                    className="p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors disabled:text-slate-600 disabled:cursor-not-allowed"
                    title="Zoom In"
                >
                    <ZoomIn size={20} />
                </button>

                <div className="w-px h-8 bg-slate-700 mx-2" />

                {/* Save/Load buttons */}
                <button
                    onClick={handleSave}
                    className="p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="Save Project (Cmd+S)"
                >
                    <Save size={20} />
                </button>
                <button
                    onClick={handleLoad}
                    disabled={!hasSavedProject}
                    className={`p-2.5 rounded-lg transition-colors ${
                        hasSavedProject
                            ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                            : 'text-slate-600 cursor-not-allowed'
                    }`}
                    title="Load Project"
                >
                    <FolderOpen size={20} />
                </button>

                <div className="w-px h-8 bg-slate-700 mx-2" />

                {/* Export dropdown */}
                <div className="relative group">
                    <button className="flex items-center gap-2 px-4 py-2 bg-accent-green text-slate-900 rounded-lg font-medium hover:bg-accent-green/90 transition-colors">
                        <Download size={18} />
                        Export
                    </button>
                    <div className="absolute right-0 top-full mt-1 bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 min-w-[140px]">
                        <button
                            onClick={() => onExport('pdf')}
                            className="w-full px-4 py-2.5 text-left text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                        >
                            Download PDF
                        </button>
                        <button
                            onClick={() => onExport('png')}
                            className="w-full px-4 py-2.5 text-left text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                        >
                            Download PNG
                        </button>
                        <button
                            onClick={() => onExport('jpeg')}
                            className="w-full px-4 py-2.5 text-left text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                        >
                            Download JPEG
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
