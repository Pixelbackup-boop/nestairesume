import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDialogA11y } from '../useDialogA11y';

describe('useDialogA11y', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('dialogProps', () => {
    it('returns correct ARIA dialog attributes', () => {
      const { result } = renderHook(() =>
        useDialogA11y({ isOpen: true, onClose: mockOnClose, labelId: 'modal-title' }),
      );

      expect(result.current.dialogProps.role).toBe('dialog');
      expect(result.current.dialogProps['aria-modal']).toBe(true);
      expect(result.current.dialogProps['aria-labelledby']).toBe('modal-title');
    });

    it('provides a ref for the dialog container', () => {
      const { result } = renderHook(() =>
        useDialogA11y({ isOpen: false, onClose: mockOnClose, labelId: 'test' }),
      );

      expect(result.current.dialogRef).toBeDefined();
      expect(result.current.dialogRef.current).toBeNull(); // Not mounted
    });
  });

  describe('Escape key', () => {
    it('calls onClose when Escape is pressed while open', () => {
      renderHook(() =>
        useDialogA11y({ isOpen: true, onClose: mockOnClose, labelId: 'test' }),
      );

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when closed', () => {
      renderHook(() =>
        useDialogA11y({ isOpen: false, onClose: mockOnClose, labelId: 'test' }),
      );

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('cleanup', () => {
    it('removes keydown listener on unmount', () => {
      const spy = vi.spyOn(document, 'removeEventListener');

      const { unmount } = renderHook(() =>
        useDialogA11y({ isOpen: true, onClose: mockOnClose, labelId: 'test' }),
      );

      unmount();
      expect(spy).toHaveBeenCalledWith('keydown', expect.any(Function));
      spy.mockRestore();
    });
  });
});
