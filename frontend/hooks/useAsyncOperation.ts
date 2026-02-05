'use client';

import { useState, useCallback, useRef } from 'react';

interface UseAsyncOperationOptions<T, Args extends unknown[]> {
  /** The async function to execute */
  asyncFn: (...args: Args) => Promise<T>;
  /** Optional delay before executing (for UX feedback) */
  delay?: number;
  /** Callback on success */
  onSuccess?: (result: T) => void;
  /** Callback on error */
  onError?: (error: Error) => void;
  /** Callback when operation completes (success or error) */
  onFinally?: () => void;
}

interface UseAsyncOperationReturn<T, Args extends unknown[]> {
  /** Execute the async operation */
  execute: (...args: Args) => Promise<T | undefined>;
  /** Whether the operation is in progress */
  isLoading: boolean;
  /** Error from the last operation */
  error: Error | null;
  /** Result from the last successful operation */
  data: T | null;
  /** Reset the state */
  reset: () => void;
}

/**
 * Custom hook for managing async operations with loading, error, and success states.
 *
 * Features:
 * - Automatic loading state management
 * - Optional delay for UX feedback
 * - Error handling with callbacks
 * - Prevents race conditions with request tracking
 *
 * @example
 * ```tsx
 * const { execute, isLoading, error } = useAsyncOperation({
 *   asyncFn: async (id: string) => api.fetchUser(id),
 *   delay: 500,
 *   onSuccess: (user) => console.log('Fetched:', user),
 *   onError: (err) => toast.error(err.message),
 * });
 *
 * // Later: execute('user-123')
 * ```
 */
export function useAsyncOperation<T, Args extends unknown[] = []>({
  asyncFn,
  delay = 0,
  onSuccess,
  onError,
  onFinally,
}: UseAsyncOperationOptions<T, Args>): UseAsyncOperationReturn<T, Args> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  // Track the latest request to prevent race conditions
  const requestIdRef = useRef(0);

  const execute = useCallback(
    async (...args: Args): Promise<T | undefined> => {
      const currentRequestId = ++requestIdRef.current;

      setIsLoading(true);
      setError(null);

      try {
        // Optional delay for UX feedback
        if (delay > 0) {
          await new Promise((resolve) => setTimeout(resolve, delay));
        }

        const result = await asyncFn(...args);

        // Only update state if this is still the latest request
        if (currentRequestId === requestIdRef.current) {
          setData(result);
          onSuccess?.(result);
          return result;
        }
      } catch (err) {
        // Only update state if this is still the latest request
        if (currentRequestId === requestIdRef.current) {
          const error = err instanceof Error ? err : new Error(String(err));
          setError(error);
          onError?.(error);
        }
      } finally {
        // Only update loading state if this is still the latest request
        if (currentRequestId === requestIdRef.current) {
          setIsLoading(false);
          onFinally?.();
        }
      }

      return undefined;
    },
    [asyncFn, delay, onSuccess, onError, onFinally]
  );

  const reset = useCallback(() => {
    requestIdRef.current++;
    setIsLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    execute,
    isLoading,
    error,
    data,
    reset,
  };
}

/**
 * Simpler version for operations that don't need to track result data.
 *
 * @example
 * ```tsx
 * const { execute, isLoading } = useAsyncAction(
 *   async () => {
 *     await api.deleteItem(itemId);
 *     onClose();
 *   },
 *   { delay: 300 }
 * );
 * ```
 */
export function useAsyncAction(
  asyncFn: () => Promise<void>,
  options: { delay?: number; onError?: (error: Error) => void } = {}
) {
  const { execute, isLoading, error } = useAsyncOperation({
    asyncFn,
    delay: options.delay,
    onError: options.onError,
  });

  return { execute, isLoading, error };
}

export default useAsyncOperation;
