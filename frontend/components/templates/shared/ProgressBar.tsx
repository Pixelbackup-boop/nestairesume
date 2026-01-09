'use client';

/**
 * ProgressBar Component
 * Renders a horizontal progress bar for skill/proficiency visualization.
 *
 * Supports multiple styles:
 * - 'solid': Solid filled bar (default)
 * - 'dots': Discrete dots indicating level
 * - 'segments': Segmented bar with gaps
 *
 * Usage:
 * <ProgressBar value={80} color="#2563eb" />
 * <ProgressBar value={4} maxValue={5} variant="dots" />
 */

type ProgressVariant = 'solid' | 'dots' | 'segments';

interface ProgressBarProps {
    /** Progress value (0-100 for solid/segments, 1-5 for dots) */
    value: number;
    /** Maximum value (default: 100 for solid/segments, 5 for dots) */
    maxValue?: number;
    /** Visual style variant */
    variant?: ProgressVariant;
    /** Progress color */
    color?: string;
    /** Background/track color */
    trackColor?: string;
    /** Height of the bar (solid/segments) or size of dots */
    height?: number;
    /** Width of the bar (optional, defaults to 100%) */
    width?: string | number;
    /** Scale factor for responsive sizing */
    scale?: number;
    /** Border radius for solid bar */
    borderRadius?: number;
    /** Optional label to show alongside */
    label?: string;
    /** Whether to show value text */
    showValue?: boolean;
}

export default function ProgressBar({
    value,
    maxValue,
    variant = 'solid',
    color = '#2563eb',
    trackColor = '#e5e7eb',
    height = 8,
    width = '100%',
    scale = 1,
    borderRadius = 4,
    label,
    showValue = false,
}: ProgressBarProps) {
    const scaledHeight = height * scale;
    const scaledBorderRadius = borderRadius * scale;
    const fontSize = Math.max(8, 10 * scale);

    // For dots variant, default maxValue to 5
    const max = maxValue ?? (variant === 'dots' ? 5 : 100);
    const percentage = Math.min(100, (value / max) * 100);

    // Render dots variant
    if (variant === 'dots') {
        const dotCount = max;
        const filledDots = Math.round((value / max) * dotCount);
        const dotSize = scaledHeight;

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: scale < 1 ? '2px' : '4px' }}>
                {label && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize, color: '#374151' }}>{label}</span>
                        {showValue && <span style={{ fontSize: fontSize * 0.9, color: '#6b7280' }}>{value}/{max}</span>}
                    </div>
                )}
                <div style={{ display: 'flex', gap: dotSize * 0.5 }}>
                    {Array.from({ length: dotCount }).map((_, i) => (
                        <div
                            key={i}
                            style={{
                                width: dotSize,
                                height: dotSize,
                                borderRadius: '50%',
                                backgroundColor: i < filledDots ? color : trackColor,
                                transition: 'background-color 0.2s ease',
                            }}
                        />
                    ))}
                </div>
            </div>
        );
    }

    // Render segments variant
    if (variant === 'segments') {
        const segmentCount = max <= 10 ? max : 10;
        const filledSegments = Math.round((value / max) * segmentCount);
        const segmentGap = 2 * scale;

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: scale < 1 ? '2px' : '4px' }}>
                {label && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize, color: '#374151' }}>{label}</span>
                        {showValue && <span style={{ fontSize: fontSize * 0.9, color: '#6b7280' }}>{value}%</span>}
                    </div>
                )}
                <div style={{ display: 'flex', gap: segmentGap, width }}>
                    {Array.from({ length: segmentCount }).map((_, i) => (
                        <div
                            key={i}
                            style={{
                                flex: 1,
                                height: scaledHeight,
                                borderRadius: scaledBorderRadius,
                                backgroundColor: i < filledSegments ? color : trackColor,
                                transition: 'background-color 0.2s ease',
                            }}
                        />
                    ))}
                </div>
            </div>
        );
    }

    // Render solid variant (default)
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: scale < 1 ? '2px' : '4px' }}>
            {label && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize, color: '#374151' }}>{label}</span>
                    {showValue && <span style={{ fontSize: fontSize * 0.9, color: '#6b7280' }}>{value}%</span>}
                </div>
            )}
            <div
                style={{
                    width,
                    height: scaledHeight,
                    backgroundColor: trackColor,
                    borderRadius: scaledBorderRadius,
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        width: `${percentage}%`,
                        height: '100%',
                        backgroundColor: color,
                        borderRadius: scaledBorderRadius,
                        transition: 'width 0.3s ease',
                    }}
                />
            </div>
        </div>
    );
}
