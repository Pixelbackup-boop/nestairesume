'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Stage, Layer, Rect, Text, Image, Circle, Star, Line, Transformer, Group, Path } from 'react-konva';
import Konva from 'konva';
import { useCanvasStore, AnyCanvasElement, TextElement, ImageElement, ShapeElement, IconElement } from '@/store/useCanvasStore';

// Icon SVG paths for rendering (subset of lucide icons)
const iconPaths: Record<string, string> = {
    'Email': 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
    'Phone': 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
    'Location': 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
    'Website': 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z',
    'LinkedIn': 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z',
    'GitHub': 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22',
    'X': 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z',
    'Briefcase': 'M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16',
    'GraduationCap': 'M22 10l-10-6L2 10l10 6 10-6z M6 12v5c3 3 9 3 12 0v-5',
    'Award': 'M12 15l-2 5 2-1 2 1-2-5z M8.21 13.89L7 23l5-3 5 3-1.21-9.12 M12 2a7 7 0 1 0 0 14 7 7 0 0 0 0-14z',
    'Star': 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    'User': 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
    'Calendar': 'M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z M16 2v4 M8 2v4 M3 10h18',
    'CheckCircle': 'M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3',
    'Code': 'M16 18l6-6-6-6 M8 6l-6 6 6 6',
    'Heart': 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
    'Zap': 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    'Target': 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z',
    'Lightbulb': 'M9 18h6 M10 22h4 M12 2a7 7 0 0 0-4 12.9V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.1A7 7 0 0 0 12 2z',
};

// Snap guide threshold in pixels
const SNAP_THRESHOLD = 8;

// Helper to calculate image scale for 'cover' fit
const calculateCoverScale = (
    imgWidth: number,
    imgHeight: number,
    containerWidth: number,
    containerHeight: number
): { scaleX: number; scaleY: number; offsetX: number; offsetY: number } => {
    const imgRatio = imgWidth / imgHeight;
    const containerRatio = containerWidth / containerHeight;

    let scale: number;
    if (imgRatio > containerRatio) {
        // Image is wider - fit by height
        scale = containerHeight / imgHeight;
    } else {
        // Image is taller - fit by width
        scale = containerWidth / imgWidth;
    }

    const scaledWidth = imgWidth * scale;
    const scaledHeight = imgHeight * scale;

    return {
        scaleX: scale,
        scaleY: scale,
        offsetX: (scaledWidth - containerWidth) / 2 / scale,
        offsetY: (scaledHeight - containerHeight) / 2 / scale,
    };
};

interface CanvasWorkspaceProps {
    onTextEdit?: (element: TextElement, position: { x: number; y: number }) => void;
    stageRef?: React.RefObject<Konva.Stage | null>;
}

export default function CanvasWorkspace({ onTextEdit, stageRef: externalStageRef }: CanvasWorkspaceProps) {
    const internalStageRef = useRef<Konva.Stage>(null);
    const stageRef = externalStageRef || internalStageRef;
    const transformerRef = useRef<Konva.Transformer>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const {
        canvasWidth,
        canvasHeight,
        backgroundColor,
        backgroundGradient,
        elements,
        selectedElementIds,
        zoom,
        activeTool,
        selectElement,
        deselectAll,
        updateElement,
        addElement,
        activeShapeType,
        saveToHistory,
    } = useCanvasStore();

    const [loadedImages, setLoadedImages] = useState<Record<string, HTMLImageElement>>({});
    const [loadedShapeImages, setLoadedShapeImages] = useState<Record<string, HTMLImageElement>>({});
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [isReady, setIsReady] = useState(false);
    const [snapLines, setSnapLines] = useState<{ points: number[]; orientation: 'H' | 'V' }[]>([]);
    const [editingImageShapeId, setEditingImageShapeId] = useState<string | null>(null);

    // Load images for ImageElements
    useEffect(() => {
        const imageElements = elements.filter((el): el is ImageElement => el.type === 'image' && !!el.src);

        imageElements.forEach((el) => {
            if (!loadedImages[el.id] && el.src) {
                const img = new window.Image();
                img.crossOrigin = 'anonymous';
                img.onload = () => {
                    setLoadedImages((prev) => ({ ...prev, [el.id]: img }));
                };
                img.src = el.src;
            }
        });
    }, [elements, loadedImages]);

    // Load images for ShapeElements with imageSrc
    useEffect(() => {
        const shapeElements = elements.filter(
            (el): el is ShapeElement => el.type === 'shape' && !!el.imageSrc
        );

        shapeElements.forEach((el) => {
            const existing = loadedShapeImages[el.id];
            // Load if no image yet OR if src changed (user uploaded new image)
            if (el.imageSrc && (!existing || existing.src !== el.imageSrc)) {
                const img = new window.Image();
                img.crossOrigin = 'anonymous';
                img.onload = () => {
                    setLoadedShapeImages((prev) => ({ ...prev, [el.id]: img }));
                };
                img.src = el.imageSrc;
            }
        });
    }, [elements]); // eslint-disable-line react-hooks/exhaustive-deps

    // Update container size and mark as ready
    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth;
                const height = containerRef.current.offsetHeight;
                setContainerSize({ width, height });
                // Only mark as ready when we have valid dimensions
                if (width > 0 && height > 0) {
                    setIsReady(true);
                }
            }
        };
        // Use requestAnimationFrame to ensure DOM is painted
        const rafId = requestAnimationFrame(updateSize);
        window.addEventListener('resize', updateSize);
        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', updateSize);
        };
    }, []);

    // Update transformer when selection changes
    useEffect(() => {
        if (transformerRef.current && stageRef.current) {
            const stage = stageRef.current;
            const nodes = selectedElementIds
                .map((id) => stage.findOne(`#${id}`))
                .filter((node): node is Konva.Node => node !== undefined);

            transformerRef.current.nodes(nodes);
            transformerRef.current.getLayer()?.batchDraw();
        }
    }, [selectedElementIds, elements]);

    // Handle stage click
    const handleStageClick = useCallback((e: Konva.KonvaEventObject<MouseEvent>) => {
        // Click on empty space - deselect
        if (e.target === e.target.getStage()) {
            deselectAll();
            setEditingImageShapeId(null);
            return;
        }

        // Handle tool-specific behavior
        if (activeTool === 'text') {
            const stage = stageRef.current;
            if (!stage) return;

            const pointer = stage.getPointerPosition();
            if (!pointer) return;

            const scale = zoom;
            const x = (pointer.x - (containerSize.width - canvasWidth * zoom) / 2) / scale;
            const y = (pointer.y - (containerSize.height - canvasHeight * zoom) / 2) / scale;

            const newText: TextElement = {
                id: crypto.randomUUID(),
                type: 'text',
                x,
                y,
                width: 200,
                height: 30,
                rotation: 0,
                opacity: 1,
                locked: false,
                visible: true,
                text: 'Double-click to edit',
                fontSize: 24,
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fill: backgroundColor === '#ffffff' || backgroundColor === '#fafafa' ? '#333333' : '#ffffff',
                align: 'left',
                lineHeight: 1.4,
                letterSpacing: 0,
            };
            addElement(newText);
            return;
        }

        if (activeTool === 'shape') {
            const stage = stageRef.current;
            if (!stage) return;

            const pointer = stage.getPointerPosition();
            if (!pointer) return;

            const scale = zoom;
            const x = (pointer.x - (containerSize.width - canvasWidth * zoom) / 2) / scale;
            const y = (pointer.y - (containerSize.height - canvasHeight * zoom) / 2) / scale;

            const newShape: ShapeElement = {
                id: crypto.randomUUID(),
                type: 'shape',
                shapeType: activeShapeType,
                x,
                y,
                width: 100,
                height: 100,
                rotation: 0,
                opacity: 1,
                locked: false,
                visible: true,
                fill: '#00dc82',
                stroke: 'transparent',
                strokeWidth: 0,
                cornerRadius: activeShapeType === 'rectangle' ? 8 : undefined,
                innerRadius: activeShapeType === 'star' ? 0.4 : undefined,
            };
            addElement(newShape);
            return;
        }
    }, [activeTool, addElement, backgroundColor, canvasWidth, canvasHeight, containerSize, deselectAll, zoom, activeShapeType]);

    // Handle element selection
    const handleElementClick = useCallback((e: Konva.KonvaEventObject<MouseEvent>, element: AnyCanvasElement) => {
        e.cancelBubble = true;

        if (element.locked) return;

        const isShiftPressed = e.evt.shiftKey;
        selectElement(element.id, isShiftPressed);
    }, [selectElement]);

    // Handle double-click on text
    const handleTextDblClick = useCallback((e: Konva.KonvaEventObject<MouseEvent>, element: TextElement) => {
        e.cancelBubble = true;

        const stage = stageRef.current;
        if (!stage) return;

        const textNode = stage.findOne(`#${element.id}`);
        if (!textNode) return;

        const textPosition = textNode.getAbsolutePosition();

        onTextEdit?.(element, {
            x: textPosition.x,
            y: textPosition.y,
        });
    }, [onTextEdit]);

    // Handle double-click on shape with image → enter reposition mode
    const handleShapeImageDblClick = useCallback((e: Konva.KonvaEventObject<MouseEvent>, element: ShapeElement) => {
        e.cancelBubble = true;
        if (element.imageSrc) {
            setEditingImageShapeId(element.id);
        }
    }, []);

    // Exit image edit mode on Escape
    useEffect(() => {
        if (!editingImageShapeId) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setEditingImageShapeId(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [editingImageShapeId]);

    // Calculate snap guides during drag
    const handleDragMove = useCallback((e: Konva.KonvaEventObject<DragEvent>, element: AnyCanvasElement) => {
        const node = e.target;
        const nodeBox = {
            x: node.x(),
            y: node.y(),
            width: element.width,
            height: element.height,
        };

        const guides: { points: number[]; orientation: 'H' | 'V' }[] = [];
        let snappedX = nodeBox.x;
        let snappedY = nodeBox.y;

        // Canvas edges and center
        const canvasGuides = {
            vertical: [0, canvasWidth / 2, canvasWidth],
            horizontal: [0, canvasHeight / 2, canvasHeight],
        };

        // Add other elements' edges
        elements.forEach((el) => {
            if (el.id === element.id) return;
            canvasGuides.vertical.push(el.x, el.x + el.width / 2, el.x + el.width);
            canvasGuides.horizontal.push(el.y, el.y + el.height / 2, el.y + el.height);
        });

        // Check vertical snaps (x-axis)
        const nodeEdgesX = [nodeBox.x, nodeBox.x + nodeBox.width / 2, nodeBox.x + nodeBox.width];
        for (const guideX of canvasGuides.vertical) {
            for (let i = 0; i < nodeEdgesX.length; i++) {
                const diff = guideX - nodeEdgesX[i];
                if (Math.abs(diff) < SNAP_THRESHOLD) {
                    snappedX = nodeBox.x + diff;
                    guides.push({
                        points: [guideX, 0, guideX, canvasHeight],
                        orientation: 'V',
                    });
                    break;
                }
            }
        }

        // Check horizontal snaps (y-axis)
        const nodeEdgesY = [nodeBox.y, nodeBox.y + nodeBox.height / 2, nodeBox.y + nodeBox.height];
        for (const guideY of canvasGuides.horizontal) {
            for (let i = 0; i < nodeEdgesY.length; i++) {
                const diff = guideY - nodeEdgesY[i];
                if (Math.abs(diff) < SNAP_THRESHOLD) {
                    snappedY = nodeBox.y + diff;
                    guides.push({
                        points: [0, guideY, canvasWidth, guideY],
                        orientation: 'H',
                    });
                    break;
                }
            }
        }

        // Apply snapped position
        node.x(snappedX);
        node.y(snappedY);

        setSnapLines(guides);
    }, [elements, canvasWidth, canvasHeight]);

    // Handle drag end
    const handleDragEnd = useCallback((e: Konva.KonvaEventObject<DragEvent>, element: AnyCanvasElement) => {
        setSnapLines([]); // Clear snap guides
        updateElement(element.id, {
            x: e.target.x(),
            y: e.target.y(),
        });
        saveToHistory();
    }, [updateElement, saveToHistory]);

    // Handle transform end
    const handleTransformEnd = useCallback((e: Konva.KonvaEventObject<Event>, element: AnyCanvasElement) => {
        const node = e.target;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();

        node.scaleX(1);
        node.scaleY(1);

        updateElement(element.id, {
            x: node.x(),
            y: node.y(),
            width: Math.max(20, node.width() * scaleX),
            height: Math.max(20, node.height() * scaleY),
            rotation: node.rotation(),
        });
        saveToHistory();
    }, [updateElement, saveToHistory]);

    // Render individual element
    const renderElement = (element: AnyCanvasElement) => {
        const isSelected = selectedElementIds.includes(element.id);
        const commonProps = {
            id: element.id,
            x: element.x,
            y: element.y,
            rotation: element.rotation,
            opacity: element.opacity,
            visible: element.visible,
            draggable: !element.locked && activeTool === 'select',
            onClick: (e: Konva.KonvaEventObject<MouseEvent>) => handleElementClick(e, element),
            onDragMove: (e: Konva.KonvaEventObject<DragEvent>) => handleDragMove(e, element),
            onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => handleDragEnd(e, element),
            onTransformEnd: (e: Konva.KonvaEventObject<Event>) => handleTransformEnd(e, element),
        };

        switch (element.type) {
            case 'text':
                // If text has background color, wrap in Group with Rect
                if (element.backgroundColor) {
                    return (
                        <Group
                            key={element.id}
                            {...commonProps}
                        >
                            <Rect
                                width={element.width}
                                height={element.height}
                                fill={element.backgroundColor}
                                cornerRadius={4}
                            />
                            <Text
                                text={element.text}
                                fontSize={element.fontSize}
                                fontFamily={element.fontFamily}
                                fontStyle={element.fontStyle === 'italic' ? 'italic' : undefined}
                                fontWeight={element.fontWeight === 'bold' ? 'bold' : undefined}
                                fill={element.fill}
                                align={element.align}
                                lineHeight={element.lineHeight}
                                letterSpacing={element.letterSpacing}
                                width={element.width}
                                height={element.height}
                                padding={8}
                                verticalAlign="middle"
                                onDblClick={(e) => handleTextDblClick(e, element)}
                            />
                        </Group>
                    );
                }
                return (
                    <Text
                        key={element.id}
                        {...commonProps}
                        text={element.text}
                        fontSize={element.fontSize}
                        fontFamily={element.fontFamily}
                        fontStyle={element.fontStyle === 'italic' ? 'italic' : undefined}
                        fontWeight={element.fontWeight === 'bold' ? 'bold' : undefined}
                        fill={element.fill}
                        align={element.align}
                        lineHeight={element.lineHeight}
                        letterSpacing={element.letterSpacing}
                        width={element.width}
                        onDblClick={(e) => handleTextDblClick(e, element)}
                    />
                );

            case 'image':
                if (!loadedImages[element.id] && element.src) {
                    // Placeholder for loading image
                    return (
                        <Rect
                            key={element.id}
                            {...commonProps}
                            width={element.width}
                            height={element.height}
                            fill="#e2e8f0"
                            stroke="#cbd5e0"
                            strokeWidth={1}
                        />
                    );
                }
                if (!element.src) {
                    // Placeholder for empty image slot
                    return (
                        <React.Fragment key={element.id}>
                            <Rect
                                {...commonProps}
                                width={element.width}
                                height={element.height}
                                fill="#f1f5f9"
                                stroke="#94a3b8"
                                strokeWidth={2}
                                dash={[8, 4]}
                            />
                            <Text
                                x={element.x + element.width / 2 - 50}
                                y={element.y + element.height / 2 - 10}
                                text="Drop Image"
                                fontSize={14}
                                fontFamily="Inter"
                                fill="#64748b"
                                width={100}
                                align="center"
                            />
                        </React.Fragment>
                    );
                }
                return (
                    <Image
                        key={element.id}
                        {...commonProps}
                        image={loadedImages[element.id]}
                        width={element.width}
                        height={element.height}
                    />
                );

            case 'shape':
                const shapeImage = loadedShapeImages[element.id];
                const hasImageFill = element.imageSrc && shapeImage;
                const isEditingImage = editingImageShapeId === element.id;

                // Calculate image positioning for 'cover' fit
                const getImageProps = () => {
                    if (!shapeImage || shapeImage.width === 0 || shapeImage.height === 0) return null;
                    const { scaleX, scaleY, offsetX, offsetY } = calculateCoverScale(
                        shapeImage.width,
                        shapeImage.height,
                        element.width,
                        element.height
                    );
                    return { scaleX, scaleY, offsetX, offsetY };
                };

                const imageProps = hasImageFill ? getImageProps() : null;

                // Image position: convert image-space offsets to screen-space, then add user pan offset
                const imgX = imageProps ? -(imageProps.offsetX * imageProps.scaleX) + (element.imageOffsetX ?? 0) : 0;
                const imgY = imageProps ? -(imageProps.offsetY * imageProps.scaleY) + (element.imageOffsetY ?? 0) : 0;

                // Clamp drag so image always covers the shape
                const handleShapeImageDragMove = (e: Konva.KonvaEventObject<DragEvent>) => {
                    if (!imageProps || !shapeImage) return;
                    const node = e.target;
                    const baseX = -(imageProps.offsetX * imageProps.scaleX);
                    const baseY = -(imageProps.offsetY * imageProps.scaleY);
                    const scaledW = shapeImage.width * imageProps.scaleX;
                    const scaledH = shapeImage.height * imageProps.scaleY;
                    const maxPanX = (scaledW - element.width) / 2;
                    const maxPanY = (scaledH - element.height) / 2;
                    const clampedX = Math.max(baseX - maxPanX, Math.min(baseX + maxPanX, node.x()));
                    const clampedY = Math.max(baseY - maxPanY, Math.min(baseY + maxPanY, node.y()));
                    node.x(clampedX);
                    node.y(clampedY);
                };

                const handleShapeImageDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
                    if (!imageProps) return;
                    e.cancelBubble = true;
                    const baseX = -(imageProps.offsetX * imageProps.scaleX);
                    const baseY = -(imageProps.offsetY * imageProps.scaleY);
                    updateElement(element.id, {
                        imageOffsetX: e.target.x() - baseX,
                        imageOffsetY: e.target.y() - baseY,
                    } as Partial<ShapeElement>);
                    saveToHistory();
                };

                // Shared image props for all shape types
                const shapeImgProps = {
                    image: shapeImage!,
                    x: imgX,
                    y: imgY,
                    scaleX: imageProps?.scaleX ?? 1,
                    scaleY: imageProps?.scaleY ?? 1,
                    ...(isEditingImage ? {
                        draggable: true,
                        onDragMove: handleShapeImageDragMove,
                        onDragEnd: handleShapeImageDragEnd,
                    } : {}),
                };

                switch (element.shapeType) {
                    case 'circle':
                        if (hasImageFill && imageProps) {
                            const radius = Math.min(element.width, element.height) / 2;
                            return (
                                <Group
                                    key={element.id}
                                    {...commonProps}
                                    draggable={!isEditingImage && commonProps.draggable}
                                    onDblClick={(e) => handleShapeImageDblClick(e, element)}
                                    clipFunc={(ctx) => {
                                        ctx.arc(element.width / 2, element.height / 2, radius, 0, Math.PI * 2, false);
                                    }}
                                >
                                    <Image {...shapeImgProps} />
                                    {element.stroke !== 'transparent' && element.strokeWidth > 0 && (
                                        <Circle
                                            x={element.width / 2}
                                            y={element.height / 2}
                                            radius={radius}
                                            stroke={element.stroke}
                                            strokeWidth={element.strokeWidth}
                                            listening={!isEditingImage}
                                        />
                                    )}
                                    {isEditingImage && (
                                        <Circle
                                            x={element.width / 2}
                                            y={element.height / 2}
                                            radius={radius}
                                            stroke="#3b82f6"
                                            strokeWidth={2}
                                            dash={[6, 3]}
                                            listening={false}
                                        />
                                    )}
                                </Group>
                            );
                        }
                        return (
                            <Circle
                                key={element.id}
                                {...commonProps}
                                x={element.x + element.width / 2}
                                y={element.y + element.height / 2}
                                radius={Math.min(element.width, element.height) / 2}
                                fill={element.fill}
                                stroke={element.stroke}
                                strokeWidth={element.strokeWidth}
                            />
                        );
                    case 'star':
                        if (hasImageFill && imageProps) {
                            const outerRadius = Math.min(element.width, element.height) / 2;
                            const innerRadius = outerRadius * (element.innerRadius ?? 0.4);
                            const numPoints = 5;
                            return (
                                <Group
                                    key={element.id}
                                    {...commonProps}
                                    draggable={!isEditingImage && commonProps.draggable}
                                    onDblClick={(e) => handleShapeImageDblClick(e, element)}
                                    clipFunc={(ctx) => {
                                        const centerX = element.width / 2;
                                        const centerY = element.height / 2;
                                        ctx.beginPath();
                                        for (let i = 0; i < numPoints * 2; i++) {
                                            const radius = i % 2 === 0 ? outerRadius : innerRadius;
                                            const angle = (i * Math.PI) / numPoints - Math.PI / 2;
                                            const x = centerX + Math.cos(angle) * radius;
                                            const y = centerY + Math.sin(angle) * radius;
                                            if (i === 0) {
                                                ctx.moveTo(x, y);
                                            } else {
                                                ctx.lineTo(x, y);
                                            }
                                        }
                                        ctx.closePath();
                                    }}
                                >
                                    <Image {...shapeImgProps} />
                                    {element.stroke !== 'transparent' && element.strokeWidth > 0 && (
                                        <Star
                                            x={element.width / 2}
                                            y={element.height / 2}
                                            numPoints={5}
                                            innerRadius={innerRadius}
                                            outerRadius={outerRadius}
                                            stroke={element.stroke}
                                            strokeWidth={element.strokeWidth}
                                            listening={!isEditingImage}
                                        />
                                    )}
                                </Group>
                            );
                        }
                        return (
                            <Star
                                key={element.id}
                                {...commonProps}
                                x={element.x + element.width / 2}
                                y={element.y + element.height / 2}
                                numPoints={5}
                                innerRadius={Math.min(element.width, element.height) / 2 * (element.innerRadius ?? 0.4)}
                                outerRadius={Math.min(element.width, element.height) / 2}
                                fill={element.fill}
                                stroke={element.stroke}
                                strokeWidth={element.strokeWidth}
                            />
                        );
                    case 'line':
                        return (
                            <Line
                                key={element.id}
                                {...commonProps}
                                points={[0, 0, element.width, 0]}
                                stroke={element.fill}
                                strokeWidth={element.height}
                            />
                        );
                    default:
                        // Rectangle
                        if (hasImageFill && imageProps) {
                            const cornerRadius = element.cornerRadius ?? 0;
                            return (
                                <Group
                                    key={element.id}
                                    {...commonProps}
                                    draggable={!isEditingImage && commonProps.draggable}
                                    onDblClick={(e) => handleShapeImageDblClick(e, element)}
                                    clipFunc={(ctx) => {
                                        if (cornerRadius > 0) {
                                            const width = element.width;
                                            const height = element.height;
                                            const r = Math.min(cornerRadius, width / 2, height / 2);
                                            ctx.beginPath();
                                            ctx.moveTo(r, 0);
                                            ctx.lineTo(width - r, 0);
                                            ctx.quadraticCurveTo(width, 0, width, r);
                                            ctx.lineTo(width, height - r);
                                            ctx.quadraticCurveTo(width, height, width - r, height);
                                            ctx.lineTo(r, height);
                                            ctx.quadraticCurveTo(0, height, 0, height - r);
                                            ctx.lineTo(0, r);
                                            ctx.quadraticCurveTo(0, 0, r, 0);
                                            ctx.closePath();
                                        } else {
                                            ctx.rect(0, 0, element.width, element.height);
                                        }
                                    }}
                                >
                                    <Image {...shapeImgProps} />
                                    {element.stroke !== 'transparent' && element.strokeWidth > 0 && (
                                        <Rect
                                            width={element.width}
                                            height={element.height}
                                            stroke={element.stroke}
                                            strokeWidth={element.strokeWidth}
                                            cornerRadius={element.cornerRadius}
                                            listening={!isEditingImage}
                                        />
                                    )}
                                </Group>
                            );
                        }
                        return (
                            <Rect
                                key={element.id}
                                {...commonProps}
                                width={element.width}
                                height={element.height}
                                fill={element.fill}
                                stroke={element.stroke}
                                strokeWidth={element.strokeWidth}
                                cornerRadius={element.cornerRadius}
                            />
                        );
                }

            case 'icon':
                const iconElement = element as IconElement;
                const iconPath = iconPaths[iconElement.iconName];
                const iconScale = Math.min(iconElement.width, iconElement.height) / 24; // Icons are 24x24 viewBox

                if (iconPath) {
                    return (
                        <Group
                            key={element.id}
                            {...commonProps}
                        >
                            <Path
                                data={iconPath}
                                fill="none"
                                stroke={iconElement.fill}
                                strokeWidth={2 / iconScale}
                                scaleX={iconScale}
                                scaleY={iconScale}
                                strokeLineCap="round"
                                strokeLineJoin="round"
                            />
                        </Group>
                    );
                }
                // Fallback for icons without paths
                return (
                    <Group
                        key={element.id}
                        {...commonProps}
                    >
                        <Circle
                            x={iconElement.width / 2}
                            y={iconElement.height / 2}
                            radius={Math.min(iconElement.width, iconElement.height) / 2}
                            stroke={iconElement.fill}
                            strokeWidth={2}
                        />
                        <Text
                            x={0}
                            y={iconElement.height / 2 - 6}
                            width={iconElement.width}
                            text={iconElement.iconName.charAt(0)}
                            fontSize={12}
                            fill={iconElement.fill}
                            align="center"
                        />
                    </Group>
                );

            default:
                return null;
        }
    };

    // Calculate canvas position for centering
    const offsetX = (containerSize.width - canvasWidth * zoom) / 2;
    const offsetY = Math.max(20, (containerSize.height - canvasHeight * zoom) / 2);

    // Generate background style
    const getBackgroundFill = () => {
        if (backgroundGradient.enabled) {
            return undefined; // Will use linearGradient
        }
        return backgroundColor;
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full overflow-auto bg-white"
            style={{ minHeight: '100%' }}
        >
            {!isReady ? (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-8 h-8 border-2 border-accent-green border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                        <p className="text-gray-400 text-sm">Initializing canvas...</p>
                    </div>
                </div>
            ) : (
            <div
                className="absolute"
                style={{
                    left: Math.max(0, offsetX),
                    top: Math.max(20, offsetY),
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                }}
            >
                <Stage
                    ref={stageRef}
                    width={canvasWidth * zoom}
                    height={canvasHeight * zoom}
                    scaleX={zoom}
                    scaleY={zoom}
                    onClick={handleStageClick}
                    style={{ cursor: activeTool === 'text' ? 'text' : activeTool === 'shape' ? 'crosshair' : 'default' }}
                >
                    <Layer>
                        {/* Background */}
                        <Rect
                            x={0}
                            y={0}
                            width={canvasWidth}
                            height={canvasHeight}
                            fill={getBackgroundFill()}
                            fillLinearGradientStartPoint={backgroundGradient.enabled ? { x: 0, y: 0 } : undefined}
                            fillLinearGradientEndPoint={
                                backgroundGradient.enabled
                                    ? {
                                        x: Math.cos((backgroundGradient.direction * Math.PI) / 180) * canvasWidth,
                                        y: Math.sin((backgroundGradient.direction * Math.PI) / 180) * canvasHeight,
                                    }
                                    : undefined
                            }
                            fillLinearGradientColorStops={
                                backgroundGradient.enabled
                                    ? [0, backgroundGradient.start, 1, backgroundGradient.end]
                                    : undefined
                            }
                        />

                        {/* Elements */}
                        {elements.map(renderElement)}

                        {/* Snap/Alignment Guides */}
                        {snapLines.map((line, i) => (
                            <Line
                                key={`snap-${i}`}
                                points={line.points}
                                stroke="#00dc82"
                                strokeWidth={1}
                                dash={[4, 4]}
                            />
                        ))}

                        {/* Transformer */}
                        <Transformer
                            ref={transformerRef}
                            boundBoxFunc={(oldBox, newBox) => {
                                // Limit resize
                                if (newBox.width < 20 || newBox.height < 20) {
                                    return oldBox;
                                }
                                return newBox;
                            }}
                            rotateEnabled={true}
                            enabledAnchors={[
                                'top-left',
                                'top-right',
                                'bottom-left',
                                'bottom-right',
                                'middle-left',
                                'middle-right',
                                'top-center',
                                'bottom-center',
                            ]}
                            borderStroke="#00dc82"
                            anchorFill="#00dc82"
                            anchorStroke="#ffffff"
                            anchorSize={10}
                            anchorCornerRadius={2}
                        />
                    </Layer>
                </Stage>
            </div>
            )}

            {/* Zoom indicator */}
            <div className="absolute bottom-4 right-4 bg-gray-50/90 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                {Math.round(zoom * 100)}%
            </div>
        </div>
    );
}
