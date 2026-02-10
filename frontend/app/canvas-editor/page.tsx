'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import type Konva from 'konva';
import { useCanvasStore, TextElement } from '@/store/useCanvasStore';

// Dynamic imports with ssr: false for all canvas components (browser-only APIs)
const CanvasToolbar = dynamic(() => import('@/components/canvas/CanvasToolbar'), {
    ssr: false,
    loading: () => <div className="h-12 bg-slate-800 border-b border-slate-700 animate-pulse" />
});
const CanvasSidebar = dynamic(() => import('@/components/canvas/CanvasSidebar'), {
    ssr: false,
    loading: () => <div className="w-64 bg-slate-800 border-r border-slate-700 animate-pulse" />
});
const TextEditor = dynamic(() => import('@/components/canvas/TextEditor'), { ssr: false });
const PropertiesPanel = dynamic(() => import('@/components/canvas/PropertiesPanel'), {
    ssr: false,
    loading: () => <div className="w-72 bg-slate-800 border-l border-slate-700 animate-pulse" />
});

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
            // Dynamic import to avoid SSR issues — jsPDF is browser-only
            const { jsPDF } = await import('jspdf');
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
            {/* Mobile/Tablet Blocker - Canvas requires desktop for precise editing */}
            <div className="lg:hidden fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-accent-green/20 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-dark-teal mb-3">Desktop Required</h1>
                <p className="text-text-secondary mb-6 max-w-sm">
                    The Canvas Editor requires a larger screen for precise design work.
                    Please use a laptop or desktop computer to access this feature.
                </p>
                <div className="space-y-3 w-full max-w-xs">
                    <Link
                        href="/builder"
                        className="block w-full px-6 py-3 bg-gradient-to-r from-accent-green to-accent-teal text-white font-semibold rounded-xl text-center"
                    >
                        Use Standard Builder Instead
                    </Link>
                    <Link
                        href="/dashboard"
                        className="block w-full px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl text-center"
                    >
                        Back to Dashboard
                    </Link>
                </div>
                <p className="mt-8 text-xs text-text-muted">
                    The standard resume builder works great on mobile!
                </p>
            </div>

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
