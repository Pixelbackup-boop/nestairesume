'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowLeft, Sparkles, Loader2, Share2 } from 'lucide-react';
import type Konva from 'konva';
import { useCanvasStore, TextElement } from '@/store/useCanvasStore';
import PostToCommunityModal from '@/components/canvas/PostToCommunityModal';
import api from '@/lib/api';

// Dynamically import heavy canvas components to reduce initial bundle
const CanvasToolbar = dynamic(() => import('@/components/canvas/CanvasToolbar'), {
    ssr: false,
    loading: () => <div className="h-12 bg-gray-50 border-b border-gray-200 animate-pulse" />
});

const CanvasSidebar = dynamic(() => import('@/components/canvas/CanvasSidebar'), {
    ssr: false,
    loading: () => <div className="w-72 bg-gray-50 border-r border-gray-200 animate-pulse" />
});

const TextEditor = dynamic(() => import('@/components/canvas/TextEditor'), { ssr: false });

const PropertiesPanel = dynamic(() => import('@/components/canvas/PropertiesPanel'), {
    ssr: false,
    loading: () => <div className="w-72 bg-gray-50 border-l border-gray-200 animate-pulse" />
});

// Dynamically import CanvasWorkspace to avoid SSR issues with Konva
const CanvasWorkspace = dynamic(
    () => import('@/components/canvas/CanvasWorkspace'),
    { ssr: false, loading: () => <CanvasLoading /> }
);

function CanvasLoading() {
    const t = useTranslations('CanvasEditor');
    return (
        <div className="flex-1 flex items-center justify-center bg-white">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-accent-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-500">{t('loading')}</p>
            </div>
        </div>
    );
}

export default function CanvasEditorPage() {
    const locale = useLocale();
    const t = useTranslations('CanvasEditor');
    const searchParams = useSearchParams();
    const stageRef = useRef<Konva.Stage>(null);
    const [editingText, setEditingText] = useState<{
        element: TextElement;
        position: { x: number; y: number };
    } | null>(null);
    const [showPostModal, setShowPostModal] = useState(false);
    const [postThumbnail, setPostThumbnail] = useState<string | null>(null);
    const [loadingTemplate, setLoadingTemplate] = useState(false);

    const {
        canvasWidth,
        canvasHeight,
        zoom,
        updateElement,
        saveToHistory,
        elements,
        backgroundColor,
        backgroundGradient,
        deselectAll,
        loadCommunityTemplate,
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

    // Load community template from URL param
    useEffect(() => {
        const communityId = searchParams.get('community');
        if (!communityId) return;

        const loadTemplate = async () => {
            setLoadingTemplate(true);
            try {
                const response = await api.get<{
                    id: string;
                    name: string;
                    designData: string;
                }>(`/community/${communityId}`);
                loadCommunityTemplate(response.data.designData, response.data.name);
            } catch (error) {
                console.error('Failed to load community template:', error);
                alert(t('alerts.templateLoadFailed'));
            } finally {
                setLoadingTemplate(false);
            }
        };

        loadTemplate();
    }, [searchParams, loadCommunityTemplate]);

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
            alert(t('alerts.canvasNotReady'));
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
            // Dynamically import jsPDF only when needed (reduces initial bundle)
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

    // Handle posting to community
    const handleOpenPostModal = useCallback(async () => {
        const stage = stageRef.current;
        if (!stage) {
            alert(t('alerts.canvasNotReady'));
            return;
        }

        // Deselect all elements to hide transformer handles
        deselectAll();
        await new Promise(resolve => setTimeout(resolve, 50));

        // Generate thumbnail at lower resolution for preview
        const oldScaleX = stage.scaleX();
        const oldScaleY = stage.scaleY();
        stage.scale({ x: 1, y: 1 });

        const thumbnail = stage.toDataURL({
            pixelRatio: 0.5, // Lower resolution for thumbnail
            mimeType: 'image/jpeg',
            quality: 0.8,
            width: canvasWidth,
            height: canvasHeight,
        });

        stage.scale({ x: oldScaleX, y: oldScaleY });

        setPostThumbnail(thumbnail);
        setShowPostModal(true);
    }, [canvasWidth, canvasHeight, deselectAll]);

    // Get serialized design data for posting
    const getDesignData = useCallback(() => {
        return JSON.stringify({
            elements,
            backgroundColor,
            backgroundGradient,
        });
    }, [elements, backgroundColor, backgroundGradient]);

    return (
        <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
            {/* Mobile/Tablet Blocker - Canvas requires desktop for precise editing */}
            <div className="lg:hidden fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-accent-green/20 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-dark-teal mb-3">{t('desktop.title')}</h1>
                <p className="text-text-secondary mb-6 max-w-sm">
                    {t('desktop.description')}
                </p>
                <div className="space-y-3 w-full max-w-xs">
                    <Link
                        href={`/${locale}/builder`}
                        className="block w-full px-6 py-3 bg-gradient-to-r from-accent-green to-accent-teal text-white font-semibold rounded-xl text-center"
                    >
                        {t('desktop.useBuilder')}
                    </Link>
                    <Link
                        href={`/${locale}/dashboard`}
                        className="block w-full px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl text-center"
                    >
                        {t('desktop.backToDashboard')}
                    </Link>
                </div>
                <p className="mt-8 text-xs text-text-muted">
                    {t('desktop.mobileNote')}
                </p>
            </div>

            {/* Header */}
            <header className="h-14 bg-gray-50 border-b border-gray-200 flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-4">
                    <Link
                        href={`/${locale}/builder`}
                        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span className="text-sm">{t('header.backToBuilder')}</span>
                    </Link>
                    <div className="w-px h-6 bg-gray-200" />
                    <div className="flex items-center gap-2">
                        <Sparkles className="text-accent-green" size={20} />
                        <span className="text-gray-900 font-semibold">{t('header.title')}</span>
                        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded">{t('header.beta')}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">
                        {t('header.elements', { count: elements.length })}
                    </span>
                    <button
                        onClick={handleOpenPostModal}
                        disabled={elements.length === 0}
                        className="flex items-center gap-2 px-3 py-1.5 bg-accent-green text-gray-900 rounded-lg text-sm font-medium hover:bg-accent-teal transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Share2 size={16} />
                        {t('header.postToCommunity')}
                    </button>
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
            <footer className="h-8 bg-gray-50 border-t border-gray-200 flex items-center justify-center text-xs text-gray-400 shrink-0">
                <span>{t('shortcuts')}</span>
            </footer>

            {/* Post to Community Modal */}
            <PostToCommunityModal
                isOpen={showPostModal}
                onClose={() => setShowPostModal(false)}
                thumbnail={postThumbnail}
                designData={getDesignData()}
            />
        </div>
    );
}
