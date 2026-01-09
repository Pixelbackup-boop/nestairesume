'use client';

/**
 * CircularProgress Component
 * Renders a circular progress indicator showing percentage completion.
 * Commonly used for skills, strengths, or language proficiency visualization.
 *
 * Usage:
 * <CircularProgress value={75} size={60} color="#2563eb" />
 */

interface CircularProgressProps {
    /** Progress value from 0-100 */
    value: number;
    /** Diameter of the circle in pixels */
    size?: number;
    /** Stroke/progress color (primary color) */
    color?: string;
    /** Background track color */
    trackColor?: string;
    /** Stroke width as percentage of size */
    strokeWidth?: number;
    /** Whether to show the percentage text */
    showValue?: boolean;
    /** Font size for the value text */
    fontSize?: number;
    /** Optional label below the circle */
    label?: string;
    /** Label font size */
    labelFontSize?: number;
    /** Scale factor for responsive sizing */
    scale?: number;
}

export default function CircularProgress({
    value,
    size = 60,
    color = '#2563eb',
    trackColor = '#e5e7eb',
    strokeWidth = 8,
    showValue = true,
    fontSize = 14,
    label,
    labelFontSize = 10,
    scale = 1,
}: CircularProgressProps) {
    // Apply scale
    const scaledSize = size * scale;
    const scaledFontSize = fontSize * scale;
    const scaledLabelFontSize = labelFontSize * scale;
    const scaledStrokeWidth = strokeWidth * scale;

    // Calculate SVG properties
    const radius = (scaledSize - scaledStrokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: scale < 1 ? '2px' : '4px',
            }}
        >
            <div style={{ position: 'relative', width: scaledSize, height: scaledSize }}>
                <svg
                    width={scaledSize}
                    height={scaledSize}
                    style={{ transform: 'rotate(-90deg)' }}
                >
                    {/* Background track */}
                    <circle
                        cx={scaledSize / 2}
                        cy={scaledSize / 2}
                        r={radius}
                        fill="none"
                        stroke={trackColor}
                        strokeWidth={scaledStrokeWidth}
                    />
                    {/* Progress arc */}
                    <circle
                        cx={scaledSize / 2}
                        cy={scaledSize / 2}
                        r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth={scaledStrokeWidth}
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 0.3s ease' }}
                    />
                </svg>
                {/* Center value */}
                {showValue && (
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: scaledFontSize,
                            fontWeight: 600,
                            color: '#374151',
                        }}
                    >
                        {value}%
                    </div>
                )}
            </div>
            {/* Label */}
            {label && (
                <span
                    style={{
                        fontSize: scaledLabelFontSize,
                        color: '#374151',
                        textAlign: 'center',
                        maxWidth: scaledSize,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {label}
                </span>
            )}
        </div>
    );
}
