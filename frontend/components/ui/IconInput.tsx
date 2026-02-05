'use client';

import React, { forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';

interface IconInputProps {
  /** Input label */
  label: string;
  /** Input value */
  value: string;
  /** Change handler - can accept string or event */
  onChange: ((value: string) => void) | ((e: React.ChangeEvent<HTMLInputElement>) => void);
  /** Input name (for form handling) */
  name?: string;
  /** Icon component */
  icon: LucideIcon;
  /** Input type */
  type?: 'text' | 'email' | 'tel' | 'url';
  /** Placeholder text */
  placeholder?: string;
  /** Error message */
  error?: string;
  /** Whether input is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Input field with an icon on the left side.
 *
 * This component is specifically designed for contact information fields
 * like email, phone, location, website, and social links.
 *
 * @example
 * ```tsx
 * <IconInput
 *   label="Email"
 *   name="email"
 *   value={personalInfo.email}
 *   onChange={(e) => handleChange(e)}
 *   icon={Mail}
 *   type="email"
 *   placeholder="your@email.com"
 * />
 *
 * // Or with direct value handler
 * <IconInput
 *   label="Phone"
 *   value={phone}
 *   onChange={setPhone}
 *   icon={Phone}
 *   type="tel"
 *   placeholder="+1 (555) 123-4567"
 * />
 * ```
 */
export const IconInput = forwardRef<HTMLInputElement, IconInputProps>(
  function IconInput(
    {
      label,
      value,
      onChange,
      name,
      icon: Icon,
      type = 'text',
      placeholder,
      error,
      disabled = false,
      className = '',
    },
    ref
  ) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Check if onChange expects a string or an event
      const handler = onChange as (arg: string | React.ChangeEvent<HTMLInputElement>) => void;
      // If the function has a length of 1 and doesn't look like it expects an event,
      // pass the value directly. Otherwise, pass the event.
      if (name) {
        // If name is provided, it's likely using event-based handling
        handler(e);
      } else {
        // Otherwise, pass the value directly
        handler(e.target.value);
      }
    };

    return (
      <div className={`space-y-2 ${className}`}>
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="relative">
          <Icon
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            ref={ref}
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`
              w-full
              bg-bg-card-light
              border
              ${error ? 'border-red-500' : 'border-border-subtle'}
              rounded-lg
              pl-10
              pr-4
              py-2.5
              text-gray-900
              placeholder-gray-400
              focus:outline-none
              focus:border-accent-green
              transition-colors
              disabled:opacity-50
              disabled:cursor-not-allowed
            `.replace(/\s+/g, ' ').trim()}
          />
        </div>
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

export default IconInput;
