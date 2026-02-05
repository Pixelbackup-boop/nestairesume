'use client';

import React from 'react';
import { CanvasTemplate } from '@/store/useCanvasStore';

interface CanvasTemplatePreviewProps {
    template: CanvasTemplate;
    scale?: number;
}

export default function CanvasTemplatePreview({
    template,
    scale = 0.28,
}: CanvasTemplatePreviewProps) {
    const previewWidth = 595 * scale;
    const previewHeight = 842 * scale;

    return (
        <div
            className="relative overflow-hidden rounded-lg mx-auto"
            style={{
                width: previewWidth,
                height: previewHeight,
                backgroundColor: template.backgroundColor,
            }}
        >
            <svg
                width={previewWidth}
                height={previewHeight}
                viewBox="0 0 595 842"
                className="absolute inset-0"
            >
                {template.elements.map((element, index) => {
                    if (element.type === 'shape') {
                        if (element.shapeType === 'circle') {
                            return (
                                <ellipse
                                    key={index}
                                    cx={element.x + element.width / 2}
                                    cy={element.y + element.height / 2}
                                    rx={element.width / 2}
                                    ry={element.height / 2}
                                    fill={element.fill}
                                />
                            );
                        }
                        return (
                            <rect
                                key={index}
                                x={element.x}
                                y={element.y}
                                width={element.width}
                                height={element.height}
                                fill={element.fill}
                                rx={element.cornerRadius || 0}
                            />
                        );
                    }
                    if (element.type === 'text') {
                        const lines = element.text.split('\n');
                        const lineHeight = element.fontSize * (element.lineHeight || 1.4);
                        return (
                            <text
                                key={index}
                                x={element.x}
                                y={element.y + element.fontSize}
                                fill={element.fill}
                                fontSize={element.fontSize}
                                fontFamily={element.fontFamily || 'Inter, sans-serif'}
                                fontWeight={element.fontWeight || 'normal'}
                                textAnchor={element.align === 'center' ? 'middle' : element.align === 'right' ? 'end' : 'start'}
                                dominantBaseline="auto"
                            >
                                {lines.map((line, lineIndex) => (
                                    <tspan
                                        key={lineIndex}
                                        x={element.align === 'center' ? element.x + element.width / 2 : element.align === 'right' ? element.x + element.width : element.x}
                                        dy={lineIndex === 0 ? 0 : lineHeight}
                                    >
                                        {line}
                                    </tspan>
                                ))}
                            </text>
                        );
                    }
                    if (element.type === 'icon') {
                        return (
                            <circle
                                key={index}
                                cx={element.x + element.width / 2}
                                cy={element.y + element.height / 2}
                                r={element.width / 2}
                                fill={element.fill}
                                opacity={0.8}
                            />
                        );
                    }
                    if (element.type === 'image') {
                        const clipId = `clip-${index}`;
                        return (
                            <g key={index}>
                                <defs>
                                    <clipPath id={clipId}>
                                        <circle
                                            cx={element.x + element.width / 2}
                                            cy={element.y + element.height / 2}
                                            r={Math.min(element.width, element.height) / 2}
                                        />
                                    </clipPath>
                                </defs>
                                <image
                                    href={element.src}
                                    x={element.x}
                                    y={element.y}
                                    width={element.width}
                                    height={element.height}
                                    clipPath={`url(#${clipId})`}
                                    preserveAspectRatio="xMidYMid slice"
                                />
                            </g>
                        );
                    }
                    return null;
                })}
            </svg>
        </div>
    );
}
