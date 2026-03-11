'use client';

import { useState, useCallback, useMemo } from 'react';

type FieldError<T> = Partial<Record<keyof T, string>>;

interface UseFormStateOptions<T extends Record<string, unknown>> {
  /** Initial form values */
  initialValues: T;
  /** Validation function (optional) */
  validate?: (values: T) => FieldError<T>;
  /** Called when form is submitted and valid */
  onSubmit?: (values: T) => void | Promise<void>;
}

interface UseFormStateReturn<T extends Record<string, unknown>> {
  /** Current form values */
  values: T;
  /** Field errors */
  errors: FieldError<T>;
  /** Whether form has been touched */
  touched: Partial<Record<keyof T, boolean>>;
  /** Whether form is currently submitting */
  isSubmitting: boolean;
  /** Whether form has any errors */
  hasErrors: boolean;
  /** Whether form is valid (no errors and all required fields filled) */
  isValid: boolean;
  /** Update a single field */
  setField: <K extends keyof T>(field: K, value: T[K]) => void;
  /** Update multiple fields at once */
  setFields: (fields: Partial<T>) => void;
  /** Get props for an input field */
  getFieldProps: <K extends keyof T>(field: K) => {
    value: T[K];
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onBlur: () => void;
    name: string;
  };
  /** Mark a field as touched */
  touchField: (field: keyof T) => void;
  /** Reset form to initial values */
  reset: () => void;
  /** Handle form submission */
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  /** Set error for a specific field */
  setError: (field: keyof T, error: string) => void;
  /** Clear all errors */
  clearErrors: () => void;
}

/**
 * Custom hook for managing form state with validation.
 *
 * Features:
 * - Type-safe field updates
 * - Built-in validation support
 * - Touch tracking for showing errors only after interaction
 * - Easy input binding with getFieldProps
 *
 * @example
 * ```tsx
 * const { values, setField, getFieldProps, handleSubmit, errors } = useFormState({
 *   initialValues: { name: '', email: '' },
 *   validate: (values) => {
 *     const errors: Partial<Record<keyof typeof values, string>> = {};
 *     if (!values.email.includes('@')) errors.email = 'Invalid email';
 *     return errors;
 *   },
 *   onSubmit: async (values) => {
 *     await api.saveUser(values);
 *   }
 * });
 *
 * // In JSX:
 * <input {...getFieldProps('name')} />
 * <input {...getFieldProps('email')} />
 * {errors.email && <span>{errors.email}</span>}
 * ```
 */
export function useFormState<T extends Record<string, unknown>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormStateOptions<T>): UseFormStateReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FieldError<T>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate and get errors
  const validationErrors = useMemo(() => {
    return validate ? validate(values) : {};
  }, [values, validate]);

  const hasErrors = useMemo(() => {
    return Object.keys(validationErrors).length > 0;
  }, [validationErrors]);

  const isValid = useMemo(() => {
    return !hasErrors;
  }, [hasErrors]);

  // Update a single field
  const setField = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    setErrors((prev) => {
      if (prev[field]) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [field]: _, ...rest } = prev;
        return rest as FieldError<T>;
      }
      return prev;
    });
  }, []);

  // Update multiple fields
  const setFields = useCallback((fields: Partial<T>) => {
    setValues((prev) => ({ ...prev, ...fields }));
  }, []);

  // Mark field as touched
  const touchField = useCallback((field: keyof T) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  // Get props for input binding
  const getFieldProps = useCallback(
    <K extends keyof T>(field: K) => ({
      value: values[field],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = e.target.type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : e.target.value;
        setField(field, value as T[K]);
      },
      onBlur: () => touchField(field),
      name: String(field),
    }),
    [values, setField, touchField]
  );

  // Reset form
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Handle submission
  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();

      // Mark all fields as touched
      const allTouched = Object.keys(values).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {} as Record<keyof T, boolean>
      );
      setTouched(allTouched);

      // Validate
      const validationErrors = validate ? validate(values) : {};
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        return;
      }

      // Submit
      setIsSubmitting(true);
      try {
        await onSubmit?.(values);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validate, onSubmit]
  );

  // Set error for a field
  const setError = useCallback((field: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  }, []);

  // Clear all errors
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    values,
    errors: { ...validationErrors, ...errors },
    touched,
    isSubmitting,
    hasErrors,
    isValid,
    setField,
    setFields,
    getFieldProps,
    touchField,
    reset,
    handleSubmit,
    setError,
    clearErrors,
  };
}

export default useFormState;
