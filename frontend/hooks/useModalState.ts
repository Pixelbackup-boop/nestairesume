'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface UseModalStateOptions<T> {
  /** Initial state value */
  initialState: T;
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal should close */
  onClose?: () => void;
  /** Whether to prevent closing (e.g., during loading) */
  preventClose?: boolean;
  /** Whether to lock body scroll when open */
  lockScroll?: boolean;
  /** Whether to handle escape key */
  handleEscape?: boolean;
}

interface UseModalStateReturn<T> {
  /** Current state value */
  state: T;
  /** Update state */
  setState: React.Dispatch<React.SetStateAction<T>>;
  /** Loading state */
  isLoading: boolean;
  /** Set loading state */
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  /** Reset state to initial values */
  reset: () => void;
}

/**
 * Custom hook for managing modal state with common modal behaviors.
 *
 * Features:
 * - Auto-resets state when modal opens
 * - Handles escape key to close modal
 * - Locks body scroll when modal is open
 * - Prevents closing during loading state
 *
 * @example
 * ```tsx
 * const { state, setState, isLoading, setIsLoading } = useModalState({
 *   initialState: { name: '', email: '' },
 *   isOpen,
 *   onClose,
 *   preventClose: isLoading
 * });
 * ```
 */
export function useModalState<T>({
  initialState,
  isOpen,
  onClose,
  preventClose = false,
  lockScroll = true,
  handleEscape = true,
}: UseModalStateOptions<T>): UseModalStateReturn<T> {
  const [state, setState] = useState<T>(initialState);
  const [isLoading, setIsLoading] = useState(false);

  // Store initial state in ref to avoid stale closure issues
  const initialStateRef = useRef(initialState);
  initialStateRef.current = initialState;

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setState(initialStateRef.current);
      setIsLoading(false);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    if (!handleEscape || !isOpen || !onClose) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !preventClose && !isLoading) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, preventClose, isLoading, handleEscape]);

  // Lock body scroll
  useEffect(() => {
    if (!lockScroll) return;

    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow || 'unset';
      };
    }
  }, [isOpen, lockScroll]);

  // Reset function
  const reset = useCallback(() => {
    setState(initialStateRef.current);
    setIsLoading(false);
  }, []);

  return {
    state,
    setState,
    isLoading,
    setIsLoading,
    reset,
  };
}

export default useModalState;
