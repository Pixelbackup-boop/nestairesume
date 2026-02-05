'use client';

import React, { forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';

type InputType = 'text' | 'email' | 'tel' | 'url' | 'password' | 'number';

interface BaseInputProps {
  /** Input label */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Error message */
  error?: string;
  /** Help text shown below input */
  helpText?: string;
  /** Whether input is disabled */
  disabled?: boolean;
  /** Whether input is required */
  required?: boolean;
  /** Additional CSS classes for the container */
  className?: string;
  /** Additional CSS classes for the input */
  inputClassName?: string;
  /** Icon to show on the left side of the input */
  icon?: LucideIcon;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

interface TextInputProps extends BaseInputProps {
  /** Input type */
  type?: InputType;
  /** Input value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Input name */
  name?: string;
  /** Blur handler */
  onBlur?: () => void;
  /** Auto focus */
  autoFocus?: boolean;
  /** Max length */
  maxLength?: number;
}

interface TextAreaProps extends BaseInputProps {
  /** Whether this is a textarea */
  multiline: true;
  /** Input value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Input name */
  name?: string;
  /** Blur handler */
  onBlur?: () => void;
  /** Number of rows */
  rows?: number;
  /** Auto focus */
  autoFocus?: boolean;
  /** Max length */
  maxLength?: number;
}

export type FormInputProps = TextInputProps | TextAreaProps;

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5',
  lg: 'px-4 py-3 text-lg',
};

const iconSizes = {
  sm: 14,
  md: 16,
  lg: 18,
};

/**
 * Reusable form input component with consistent styling.
 *
 * Features:
 * - Supports text inputs and textareas
 * - Optional icon support
 * - Error state handling
 * - Consistent styling across the app
 *
 * @example
 * ```tsx
 * // Basic text input
 * <FormInput
 *   label="Email"
 *   value={email}
 *   onChange={setEmail}
 *   placeholder="Enter your email"
 *   error={errors.email}
 * />
 *
 * // With icon
 * <FormInput
 *   label="Email"
 *   value={email}
 *   onChange={setEmail}
 *   icon={Mail}
 *   type="email"
 * />
 *
 * // Textarea
 * <FormInput
 *   label="Description"
 *   value={description}
 *   onChange={setDescription}
 *   multiline
 *   rows={4}
 * />
 * ```
 */
export const FormInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormInputProps>(
  function FormInput(props, ref) {
    const {
      label,
      placeholder,
      error,
      helpText,
      disabled = false,
      required = false,
      className = '',
      inputClassName = '',
      icon: Icon,
      size = 'md',
      value,
      onChange,
      name,
      onBlur,
    } = props;

    const baseInputClasses = `
      w-full
      bg-bg-card
      border
      ${error ? 'border-red-500' : 'border-border-subtle'}
      rounded-lg
      text-gray-900
      placeholder-gray-400
      focus:outline-none
      focus:border-accent-green
      transition-colors
      disabled:opacity-50
      disabled:cursor-not-allowed
      ${Icon ? 'pl-10' : ''}
      ${sizeClasses[size]}
      ${inputClassName}
    `.replace(/\s+/g, ' ').trim();

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      onChange(e.target.value);
    };

    const isTextArea = 'multiline' in props && props.multiline;

    return (
      <div className={`space-y-1.5 ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {Icon && (
            <Icon
              size={iconSizes[size]}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          )}

          {isTextArea ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              value={value}
              onChange={handleChange}
              onBlur={onBlur}
              name={name}
              placeholder={placeholder}
              disabled={disabled}
              required={required}
              rows={(props as TextAreaProps).rows || 3}
              autoFocus={(props as TextAreaProps).autoFocus}
              maxLength={(props as TextAreaProps).maxLength}
              className={baseInputClasses}
            />
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              type={(props as TextInputProps).type || 'text'}
              value={value}
              onChange={handleChange}
              onBlur={onBlur}
              name={name}
              placeholder={placeholder}
              disabled={disabled}
              required={required}
              autoFocus={(props as TextInputProps).autoFocus}
              maxLength={(props as TextInputProps).maxLength}
              className={baseInputClasses}
            />
          )}
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {helpText && !error && (
          <p className="text-sm text-gray-500">{helpText}</p>
        )}
      </div>
    );
  }
);

export default FormInput;
