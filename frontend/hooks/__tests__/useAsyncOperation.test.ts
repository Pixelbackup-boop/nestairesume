import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAsyncOperation, useAsyncAction } from '../useAsyncOperation';

beforeEach(() => {
  vi.useRealTimers();
});

describe('useAsyncOperation', () => {
  describe('initial state', () => {
    it('starts with no loading, no error, no data', () => {
      const { result } = renderHook(() =>
        useAsyncOperation({ asyncFn: async () => 'test' })
      );
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.data).toBeNull();
    });
  });

  describe('execute', () => {
    it('sets data on success', async () => {
      const { result } = renderHook(() =>
        useAsyncOperation({ asyncFn: async () => 42 })
      );

      await act(() => result.current.execute());
      expect(result.current.data).toBe(42);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('returns the result on success', async () => {
      const { result } = renderHook(() =>
        useAsyncOperation({ asyncFn: async () => 'hello' })
      );

      let returnValue: string | undefined;
      await act(async () => {
        returnValue = await result.current.execute();
      });
      expect(returnValue).toBe('hello');
    });

    it('sets error on failure', async () => {
      const { result } = renderHook(() =>
        useAsyncOperation({
          asyncFn: async () => { throw new Error('Boom'); },
        })
      );

      await act(() => result.current.execute());
      expect(result.current.error?.message).toBe('Boom');
      expect(result.current.data).toBeNull();
      expect(result.current.isLoading).toBe(false);
    });

    it('wraps non-Error throws in Error', async () => {
      const { result } = renderHook(() =>
        useAsyncOperation({
          asyncFn: async () => { throw 'string error'; },
        })
      );

      await act(() => result.current.execute());
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe('string error');
    });

    it('passes arguments through to asyncFn', async () => {
      const fn = vi.fn(async (a: number, b: string) => `${a}-${b}`);
      const { result } = renderHook(() =>
        useAsyncOperation({ asyncFn: fn })
      );

      await act(() => result.current.execute(5, 'x'));
      expect(fn).toHaveBeenCalledWith(5, 'x');
      expect(result.current.data).toBe('5-x');
    });
  });

  describe('callbacks', () => {
    it('calls onSuccess with result', async () => {
      const onSuccess = vi.fn();
      const { result } = renderHook(() =>
        useAsyncOperation({ asyncFn: async () => 'ok', onSuccess })
      );

      await act(() => result.current.execute());
      expect(onSuccess).toHaveBeenCalledWith('ok');
    });

    it('calls onError with error', async () => {
      const onError = vi.fn();
      const { result } = renderHook(() =>
        useAsyncOperation({
          asyncFn: async () => { throw new Error('fail'); },
          onError,
        })
      );

      await act(() => result.current.execute());
      expect(onError).toHaveBeenCalledWith(expect.any(Error));
      expect(onError.mock.calls[0][0].message).toBe('fail');
    });

    it('calls onFinally after success', async () => {
      const onFinally = vi.fn();
      const { result } = renderHook(() =>
        useAsyncOperation({ asyncFn: async () => 'ok', onFinally })
      );

      await act(() => result.current.execute());
      expect(onFinally).toHaveBeenCalledOnce();
    });

    it('calls onFinally after error', async () => {
      const onFinally = vi.fn();
      const { result } = renderHook(() =>
        useAsyncOperation({
          asyncFn: async () => { throw new Error('fail'); },
          onFinally,
        })
      );

      await act(() => result.current.execute());
      expect(onFinally).toHaveBeenCalledOnce();
    });
  });

  describe('race condition prevention', () => {
    it('ignores stale request results', async () => {
      let resolveFirst: (v: string) => void;
      let resolveSecond: (v: string) => void;
      let callCount = 0;

      const asyncFn = vi.fn(() => {
        callCount++;
        if (callCount === 1) {
          return new Promise<string>((r) => { resolveFirst = r; });
        }
        return new Promise<string>((r) => { resolveSecond = r; });
      });

      const { result } = renderHook(() =>
        useAsyncOperation({ asyncFn })
      );

      // Start first request
      let firstPromise: Promise<string | undefined>;
      act(() => { firstPromise = result.current.execute(); });

      // Start second request (should supersede first)
      let secondPromise: Promise<string | undefined>;
      act(() => { secondPromise = result.current.execute(); });

      // Resolve second first, then first
      await act(async () => {
        resolveSecond!('second');
        await secondPromise!;
      });
      expect(result.current.data).toBe('second');

      // Resolve first — should be ignored (stale)
      await act(async () => {
        resolveFirst!('first');
        await firstPromise!;
      });
      expect(result.current.data).toBe('second');
    });
  });

  describe('delay option', () => {
    it('delays execution', async () => {
      vi.useFakeTimers();
      const fn = vi.fn(async () => 'delayed');
      const { result } = renderHook(() =>
        useAsyncOperation({ asyncFn: fn, delay: 500 })
      );

      let promise: Promise<string | undefined>;
      act(() => { promise = result.current.execute(); });
      expect(result.current.isLoading).toBe(true);

      // fn should not have been called yet
      expect(fn).not.toHaveBeenCalled();

      // Advance timers past the delay
      await act(async () => {
        vi.advanceTimersByTime(500);
        await promise!;
      });
      expect(fn).toHaveBeenCalled();
      expect(result.current.data).toBe('delayed');
    });
  });

  describe('reset', () => {
    it('clears loading, error, and data', async () => {
      const { result } = renderHook(() =>
        useAsyncOperation({ asyncFn: async () => 'data' })
      );

      await act(() => result.current.execute());
      expect(result.current.data).toBe('data');

      act(() => result.current.reset());
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.data).toBeNull();
    });

    it('increments requestId to ignore in-flight requests', async () => {
      let resolveFn: (v: string) => void;
      const asyncFn = vi.fn(
        () => new Promise<string>((r) => { resolveFn = r; })
      );

      const { result } = renderHook(() =>
        useAsyncOperation({ asyncFn })
      );

      let promise: Promise<string | undefined>;
      act(() => { promise = result.current.execute(); });

      // Reset while request is in flight
      act(() => result.current.reset());

      await act(async () => {
        resolveFn!('late result');
        await promise!;
      });
      // Data should remain null since reset incremented requestId
      expect(result.current.data).toBeNull();
    });
  });
});

describe('useAsyncAction', () => {
  it('provides execute, isLoading, and error', async () => {
    const fn = vi.fn(async () => {});
    const { result } = renderHook(() => useAsyncAction(fn));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();

    await act(() => result.current.execute());
    expect(fn).toHaveBeenCalled();
  });

  it('passes delay option through', async () => {
    vi.useFakeTimers();
    const fn = vi.fn(async () => {});
    const { result } = renderHook(() =>
      useAsyncAction(fn, { delay: 200 })
    );

    let promise: Promise<void | undefined>;
    act(() => { promise = result.current.execute(); });
    expect(fn).not.toHaveBeenCalled();

    await act(async () => {
      vi.advanceTimersByTime(200);
      await promise!;
    });
    expect(fn).toHaveBeenCalled();
  });
});
