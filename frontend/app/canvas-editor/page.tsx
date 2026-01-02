'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { jsPDF } from 'jspdf';
import Konva from 'konva';
import { useCanvasStore, TextElement } from '@/store/useCanvasStore';
import CanvasToolbar from '@/components/canvas/CanvasToolbar';
import CanvasSidebar from '@/components/canvas/CanvasSidebar';
import TextEditor from '@/components/canvas/TextEditor';
import PropertiesPanel from '@/components/canvas/PropertiesPanel';

// Dynamically import CanvasWorkspace to avoid SSR issues with Konva
const CanvasWorkspace = dynamic(
    () => import('@/components/canvas/CanvasWorkspace'),
    { ssr: false, loading: () => <CanvasLoading /> }
);

function CanvasLoading() {
    return (
        <div className="flex-1 flex items-center justify-center bg-slate-800">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-accent-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-slate-400">Loading Canvas Editor...</p>
            </div>
        </div>
    );
}

export default function CanvasEditorPage() {
    const stageRef = useRef<Konva.Stage>(null);
    const [editingText, setEditingText] = useState<{
        element: TextElement;
        position: { x: number; y: number };
    } | null>(null);

    const {
        canvasWidth,
        canvasHeight,
        zoom,
        updateElement,
        saveToHistory,
        elements,
        deselectAll,
    } = useCanvasStore();

    // Add meta tag to disable Dark Reader extension on this page
    // This prevents canvas read errors from dark mode extensions
    useEffect(() => {
        const meta = document.createElement('meta');
        meta.name = 'darkreader-lock';
        document.head.appendChild(meta);
        return () => {
            document.head.removeChild(meta);
        };
    }, []);

    // Handle text editing
    const handleTextEdit = useCallback((element: TextElement, position: { x: number; y: number }) => {
        setEditingText({ element, position });
    }, []);

    const handleTextUpdate = useCallback((updates: Partial<TextElement>) => {
        if (editingText) {
            updateElement(editingText.element.id, updates);
            // Update the local editing state to reflect changes
            setEditingText((prev) =>
                prev
                    ? {
                        ...prev,
                        element: { ...prev.element, ...updates } as TextElement,
                    }
                    : null
            );
        }
    }, [editingText, updateElement]);

    const handleTextEditClose = useCallback(() => {
        setEditingText(null);
        saveToHistory();
    }, [saveToHistory]);

    // Export functionality using Konva's native export
    const handleExport = useCallback(async (format: 'pdf' | 'png' | 'jpeg') => {
        const stage = stageRef.current;
        if (!stage) {
            alert('Canvas not ready. Please try again.');
            return;
        }

        // Deselect all elements to hide transformer handles during export
        deselectAll();

        // Wait a frame for the transformer to update
        await new Promise(resolve => setTimeout(resolve, 50));

        // Use Konva's toDataURL with pixelRatio for high resolution
        // pixelRatio: 2 gives us 2x resolution for crisp exports
        const pixelRatio = 2;
        const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
        const quality = format === 'jpeg' ? 0.95 : 1;

        // Export at 1:1 scale (not affected by zoom)
        const oldScaleX = stage.scaleX();
        const oldScaleY = stage.scaleY();
        stage.scale({ x: 1, y: 1 });

        const dataUrl = stage.toDataURL({
            pixelRatio,
            mimeType,
            quality,
            width: canvasWidth,
            height: canvasHeight,
        });

        // Restore zoom
        stage.scale({ x: oldScaleX, y: oldScaleY });

        if (format === 'pdf') {
            // Create PDF with A4 dimensions
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            pdf.addImage(dataUrl, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('resume-canvas.pdf');
        } else {
            // Create download link for image
            const link = document.createElement('a');
            link.download = `resume-canvas.${format}`;
            link.href = dataUrl;
            link.click();
        }
    }, [canvasWidth, canvasHeight, deselectAll]);

    return (
        <div className="h-screen flex flex-col bg-slate-900 overflow-hidden">
            {/* Header */}
            <header className="h-14 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-4">
                    <Link
                        href="/builder"
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span className="text-sm">Back to Builder</span>
                    </Link>
                    <div className="w-px h-6 bg-slate-700" />
                    <div className="flex items-center gap-2">
                        <Sparkles className="text-accent-green" size={20} />
                        <span className="text-white font-semibold">Canvas Editor</span>
                        <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded">Beta</span>
                    </div>
                </div>

                <div className="text-sm text-slate-400">
                    {elements.length} element{elements.length !== 1 ? 's' : ''}
                </div>
            </header>

            {/* Toolbar */}
            <CanvasToolbar onExport={handleExport} />

            {/* Main content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <CanvasSidebar />

                {/* Canvas workspace */}
                <div className="flex-1 relative overflow-hidden">
                    <CanvasWorkspace onTextEdit={handleTextEdit} stageRef={stageRef} />

                    {/* Text editor overlay */}
                    {editingText && (
                        <TextEditor
                            element={editingText.element}
                            position={editingText.position}
                            zoom={zoom}
                            onUpdate={handleTextUpdate}
                            onClose={handleTextEditClose}
                        />
                    )}
                </div>

                {/* Properties Panel */}
                <PropertiesPanel />
            </div>

            {/* Tips footer */}
            <footer className="h-8 bg-slate-900 border-t border-slate-700 flex items-center justify-center text-xs text-slate-500 shrink-0">
                <span>
                    <strong>V</strong> Select &nbsp;|&nbsp;
                    <strong>T</strong> Text &nbsp;|&nbsp;
                    <strong>Delete</strong> Remove &nbsp;|&nbsp;
                    <strong>Cmd+D</strong> Duplicate &nbsp;|&nbsp;
                    <strong>Cmd+Z</strong> Undo &nbsp;|&nbsp;
                    Double-click text to edit
                </span>
            </footer>
        </div>
    );
}
