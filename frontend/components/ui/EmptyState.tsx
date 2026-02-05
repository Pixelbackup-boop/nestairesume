'use client';

import React from 'react';
import { LucideIcon, Plus, FileX } from 'lucide-react';

type EmptyStateVariant = 'default' | 'dashed' | 'centered' | 'compact';

interface EmptyStateProps {
  /** Icon to display */
  icon?: LucideIcon;
  /** Title text */
  title: string;
  /** Description text */
  description?: string;
  /** Primary action */
  action?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  /** Secondary action */
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  /** Visual variant */
  variant?: EmptyStateVariant;
  /** Additional CSS classes */
  className?: string;
}

const variantStyles: Record<EmptyStateVariant, string> = {
  default: 'bg-bg-card rounded-lg p-6',
  dashed: 'border-2 border-dashed border-border-subtle rounded-lg p-6',
  centered: 'flex flex-col items-center justify-center min-h-[200px] p-6',
  compact: 'py-4 px-3',
};

/**
 * Empty state component for displaying when there's no content.
 *
 * Features:
 * - Multiple visual variants
 * - Optional icon, description, and actions
 * - Consistent styling across the app
 *
 * @example
 * ```tsx
 * // Basic usage
 * <EmptyState
 *   title="No experience added yet"
 *   description="Add your work experience to make your resume stand out"
 *   action={{
 *     label: "Add Experience",
 *     onClick: handleAddExperience,
 *     icon: Plus
 *   }}
 * />
 *
 * // Compact variant for lists
 * <EmptyState
 *   variant="compact"
 *   title="No items"
 *   action={{ label: "Add", onClick: handleAdd }}
 * />
 *
 * // Dashed border variant
 * <EmptyState
 *   variant="dashed"
 *   icon={Upload}
 *   title="Drop files here"
 *   description="or click to browse"
 * />
 * ```
 */
export function EmptyState({
  icon: Icon = FileX,
  title,
  description,
  action,
  secondaryAction,
  variant = 'default',
  className = '',
}: EmptyStateProps) {
  const ActionIcon = action?.icon || Plus;

  return (
    <div
      className={`
        text-center
        ${variantStyles[variant]}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {/* Icon */}
      {variant !== 'compact' && (
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <Icon size={24} className="text-gray-400" />
          </div>
        </div>
      )}

      {/* Title */}
      <h3
        className={`
          font-medium text-gray-900
          ${variant === 'compact' ? 'text-sm' : 'text-base'}
        `.trim()}
      >
        {title}
      </h3>

      {/* Description */}
      {description && variant !== 'compact' && (
        <p className="mt-2 text-sm text-gray-500 max-w-sm mx-auto">
          {description}
        </p>
      )}

      {/* Actions */}
      {(action || secondaryAction) && (
        <div
          className={`
            flex items-center justify-center gap-3
            ${variant === 'compact' ? 'mt-2' : 'mt-4'}
          `.trim()}
        >
          {action && (
            <button
              onClick={action.onClick}
              className={`
                inline-flex items-center gap-2
                bg-accent-green
                text-gray-900
                font-medium
                rounded-lg
                hover:bg-accent-teal
                transition-colors
                ${variant === 'compact' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2'}
              `.replace(/\s+/g, ' ').trim()}
            >
              <ActionIcon size={variant === 'compact' ? 14 : 16} />
              {action.label}
            </button>
          )}

          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className={`
                text-gray-600
                hover:text-gray-900
                font-medium
                transition-colors
                ${variant === 'compact' ? 'text-sm' : ''}
              `.trim()}
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default EmptyState;
