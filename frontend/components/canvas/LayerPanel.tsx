'use client';

import React from 'react';
import {
    Eye,
    EyeOff,
    Lock,
    Unlock,
    Type,
    Square,
    Circle,
    Star,
    Image as ImageIcon,
    GripVertical,
    Trash2,
    Minus,
} from 'lucide-react';
import { useCanvasStore, AnyCanvasElement, ShapeElement } from '@/store/useCanvasStore';

export default function LayerPanel() {
    const {
        elements,
        selectedElementIds,
        selectElement,
        updateElement,
        removeElement,
        moveUp,
        moveDown,
        saveToHistory,
    } = useCanvasStore();

    // Reverse elements so topmost layer appears first
    const reversedElements = [...elements].reverse();

    const getElementIcon = (element: AnyCanvasElement) => {
        switch (element.type) {
            case 'text':
                return <Type size={14} />;
            case 'image':
                return <ImageIcon size={14} />;
            case 'shape':
                const shape = element as ShapeElement;
                switch (shape.shapeType) {
                    case 'circle':
                        return <Circle size={14} />;
                    case 'star':
                        return <Star size={14} />;
                    case 'line':
                        return <Minus size={14} />;
                    default:
                        return <Square size={14} />;
                }
            default:
                return <Square size={14} />;
        }
    };

    const getElementName = (element: AnyCanvasElement) => {
        switch (element.type) {
            case 'text':
                const text = (element as any).text || 'Text';
                return text.length > 15 ? text.slice(0, 15) + '...' : text;
            case 'image':
                return (element as any).src ? 'Image' : 'Image Placeholder';
            case 'shape':
                const shape = element as ShapeElement;
                return shape.shapeType.charAt(0).toUpperCase() + shape.shapeType.slice(1);
            default:
                return 'Element';
        }
    };

    const handleDragStart = (e: React.DragEvent, index: number) => {
        e.dataTransfer.setData('layerIndex', index.toString());
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, targetIndex: number) => {
        e.preventDefault();
        const sourceIndex = parseInt(e.dataTransfer.getData('layerIndex'));
        if (sourceIndex === targetIndex) return;

        // Convert reversed indices to actual element indices
        const actualSourceIndex = elements.length - 1 - sourceIndex;
        const actualTargetIndex = elements.length - 1 - targetIndex;

        const element = elements[actualSourceIndex];
        if (!element) return;

        // Move element to new position
        if (actualSourceIndex < actualTargetIndex) {
            // Moving down in the list (up in layer order)
            for (let i = actualSourceIndex; i < actualTargetIndex; i++) {
                moveUp(element.id);
            }
        } else {
            // Moving up in the list (down in layer order)
            for (let i = actualSourceIndex; i > actualTargetIndex; i--) {
                moveDown(element.id);
            }
        }
    };

    const toggleVisibility = (element: AnyCanvasElement, e: React.MouseEvent) => {
        e.stopPropagation();
        updateElement(element.id, { visible: !element.visible });
        saveToHistory();
    };

    const toggleLock = (element: AnyCanvasElement, e: React.MouseEvent) => {
        e.stopPropagation();
        updateElement(element.id, { locked: !element.locked });
        saveToHistory();
    };

    const handleDelete = (element: AnyCanvasElement, e: React.MouseEvent) => {
        e.stopPropagation();
        removeElement(element.id);
    };

    if (elements.length === 0) {
        return (
            <div className="p-4 text-center text-slate-500 text-sm">
                <p>No elements yet.</p>
                <p className="text-xs mt-1">Add elements from the sidebar.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <div className="px-4 py-2 border-b border-slate-700">
                <h3 className="text-sm font-medium text-slate-300">Layers</h3>
                <p className="text-xs text-slate-500">{elements.length} element{elements.length !== 1 ? 's' : ''}</p>
            </div>

            <div className="flex-1 overflow-y-auto">
                {reversedElements.map((element, index) => {
                    const isSelected = selectedElementIds.includes(element.id);

                    return (
                        <div
                            key={element.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}
                            onClick={() => selectElement(element.id)}
                            className={`group flex items-center gap-2 px-2 py-2 border-b border-slate-800 cursor-pointer transition-colors ${
                                isSelected
                                    ? 'bg-accent-green/10 border-l-2 border-l-accent-green'
                                    : 'hover:bg-slate-800/50 border-l-2 border-l-transparent'
                            } ${!element.visible ? 'opacity-50' : ''}`}
                        >
                            {/* Drag handle */}
                            <div className="cursor-grab active:cursor-grabbing text-slate-600 hover:text-slate-400">
                                <GripVertical size={14} />
                            </div>

                            {/* Element icon */}
                            <div className={`${isSelected ? 'text-accent-green' : 'text-slate-400'}`}>
                                {getElementIcon(element)}
                            </div>

                            {/* Element name */}
                            <span className={`flex-1 text-xs truncate ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                                {getElementName(element)}
                            </span>

                            {/* Actions (show on hover or if locked/hidden) */}
                            <div className={`flex items-center gap-1 ${!element.visible || element.locked ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                                <button
                                    onClick={(e) => toggleVisibility(element, e)}
                                    className={`p-1 rounded transition-colors ${
                                        element.visible ? 'text-slate-500 hover:text-white' : 'text-yellow-500'
                                    }`}
                                    title={element.visible ? 'Hide' : 'Show'}
                                >
                                    {element.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                                </button>
                                <button
                                    onClick={(e) => toggleLock(element, e)}
                                    className={`p-1 rounded transition-colors ${
                                        element.locked ? 'text-accent-green' : 'text-slate-500 hover:text-white'
                                    }`}
                                    title={element.locked ? 'Unlock' : 'Lock'}
                                >
                                    {element.locked ? <Lock size={12} /> : <Unlock size={12} />}
                                </button>
                                <button
                                    onClick={(e) => handleDelete(element, e)}
                                    className="p-1 rounded text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                                    title="Delete"
                                >
                                    <Trash2 size={12} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
