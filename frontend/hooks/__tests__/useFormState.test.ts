import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFormState } from '../useFormState';

interface TestForm {
  [key: string]: unknown;
  name: string;
  email: string;
  age: string;
}

const initialValues: TestForm = { name: '', email: '', age: '' };

describe('useFormState', () => {
  describe('initial state', () => {
    it('returns initial values', () => {
      const { result } = renderHook(() =>
        useFormState({ initialValues })
      );
      expect(result.current.values).toEqual(initialValues);
    });

    it('starts with no errors', () => {
      const { result } = renderHook(() =>
        useFormState({ initialValues })
      );
      expect(result.current.errors).toEqual({});
    });

    it('starts with no touched fields', () => {
      const { result } = renderHook(() =>
        useFormState({ initialValues })
      );
      expect(result.current.touched).toEqual({});
    });

    it('starts not submitting', () => {
      const { result } = renderHook(() =>
        useFormState({ initialValues })
      );
      expect(result.current.isSubmitting).toBe(false);
    });

    it('starts valid when no validator', () => {
      const { result } = renderHook(() =>
        useFormState({ initialValues })
      );
      expect(result.current.isValid).toBe(true);
      expect(result.current.hasErrors).toBe(false);
    });
  });

  describe('setField', () => {
    it('updates a single field', () => {
      const { result } = renderHook(() =>
        useFormState({ initialValues })
      );
      act(() => result.current.setField('name', 'Alice'));
      expect(result.current.values.name).toBe('Alice');
      expect(result.current.values.email).toBe('');
    });

    it('clears existing error on that field', () => {
      const { result } = renderHook(() =>
        useFormState({ initialValues })
      );
      act(() => result.current.setError('name', 'Required'));
      expect(result.current.errors.name).toBe('Required');

      act(() => result.current.setField('name', 'Alice'));
      expect(result.current.errors.name).toBeUndefined();
    });
  });

  describe('setFields', () => {
    it('updates multiple fields at once', () => {
      const { result } = renderHook(() =>
        useFormState({ initialValues })
      );
      act(() => result.current.setFields({ name: 'Bob', email: 'bob@test.com' }));
      expect(result.current.values.name).toBe('Bob');
      expect(result.current.values.email).toBe('bob@test.com');
      expect(result.current.values.age).toBe('');
    });
  });

  describe('touchField', () => {
    it('marks a field as touched', () => {
      const { result } = renderHook(() =>
        useFormState({ initialValues })
      );
      act(() => result.current.touchField('email'));
      expect(result.current.touched.email).toBe(true);
      expect(result.current.touched.name).toBeUndefined();
    });
  });

  describe('getFieldProps', () => {
    it('returns value, onChange, onBlur, and name', () => {
      const { result } = renderHook(() =>
        useFormState({ initialValues: { name: 'Test', email: '', age: '' } })
      );
      const props = result.current.getFieldProps('name');
      expect(props.value).toBe('Test');
      expect(props.name).toBe('name');
      expect(typeof props.onChange).toBe('function');
      expect(typeof props.onBlur).toBe('function');
    });

    it('onChange updates the field value', () => {
      const { result } = renderHook(() =>
        useFormState({ initialValues })
      );
      act(() => {
        const props = result.current.getFieldProps('name');
        props.onChange({
          target: { value: 'Changed', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
      });
      expect(result.current.values.name).toBe('Changed');
    });

    it('onBlur marks the field as touched', () => {
      const { result } = renderHook(() =>
        useFormState({ initialValues })
      );
      act(() => {
        const props = result.current.getFieldProps('email');
        props.onBlur();
      });
      expect(result.current.touched.email).toBe(true);
    });
  });

  describe('validation', () => {
    const validate = (values: TestForm) => {
      const errors: Partial<Record<keyof TestForm, string>> = {};
      if (!values.name) errors.name = 'Name is required';
      if (!values.email.includes('@')) errors.email = 'Invalid email';
      return errors;
    };

    it('computes validation errors reactively', () => {
      const { result } = renderHook(() =>
        useFormState({ initialValues, validate })
      );
      expect(result.current.errors.name).toBe('Name is required');
      expect(result.current.hasErrors).toBe(true);
      expect(result.current.isValid).toBe(false);
    });

    it('clears errors when values become valid', () => {
      const { result } = renderHook(() =>
        useFormState({ initialValues, validate })
      );
      act(() => {
        result.current.setField('name', 'Alice');
        result.current.setField('email', 'alice@test.com');
      });
      expect(result.current.errors.name).toBeUndefined();
      expect(result.current.errors.email).toBeUndefined();
      expect(result.current.isValid).toBe(true);
    });
  });

  describe('handleSubmit', () => {
    it('touches all fields on submit', async () => {
      const { result } = renderHook(() =>
        useFormState({ initialValues })
      );
      await act(() => result.current.handleSubmit());
      expect(result.current.touched.name).toBe(true);
      expect(result.current.touched.email).toBe(true);
      expect(result.current.touched.age).toBe(true);
    });

    it('blocks submit when validation fails', async () => {
      const onSubmit = vi.fn();
      const validate = (values: TestForm) => {
        const errors: Partial<Record<keyof TestForm, string>> = {};
        if (!values.name) errors.name = 'Required';
        return errors;
      };

      const { result } = renderHook(() =>
        useFormState({ initialValues, validate, onSubmit })
      );
      await act(() => result.current.handleSubmit());
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('calls onSubmit when valid', async () => {
      const onSubmit = vi.fn();
      const { result } = renderHook(() =>
        useFormState({
          initialValues: { name: 'Alice', email: 'a@b.com', age: '25' },
          onSubmit,
        })
      );
      await act(() => result.current.handleSubmit());
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'Alice',
        email: 'a@b.com',
        age: '25',
      });
    });

    it('sets isSubmitting during submission', async () => {
      let resolveSubmit: () => void;
      const onSubmit = vi.fn(
        () => new Promise<void>((r) => { resolveSubmit = r; })
      );

      const { result } = renderHook(() =>
        useFormState({
          initialValues: { name: 'A', email: '', age: '' },
          onSubmit,
        })
      );

      let submitPromise: Promise<void>;
      act(() => {
        submitPromise = result.current.handleSubmit();
      });
      // isSubmitting is true while the promise is pending
      expect(result.current.isSubmitting).toBe(true);

      await act(async () => {
        resolveSubmit!();
        await submitPromise!;
      });
      expect(result.current.isSubmitting).toBe(false);
    });

    it('prevents default form event', async () => {
      const preventDefault = vi.fn();
      const { result } = renderHook(() =>
        useFormState({ initialValues })
      );
      await act(() =>
        result.current.handleSubmit({
          preventDefault,
        } as unknown as React.FormEvent)
      );
      expect(preventDefault).toHaveBeenCalled();
    });
  });

  describe('reset', () => {
    it('restores initial values and clears errors/touched', () => {
      const { result } = renderHook(() =>
        useFormState({ initialValues })
      );
      act(() => {
        result.current.setField('name', 'Modified');
        result.current.touchField('name');
        result.current.setError('email', 'Error');
      });

      act(() => result.current.reset());
      expect(result.current.values).toEqual(initialValues);
      expect(result.current.touched).toEqual({});
      expect(result.current.isSubmitting).toBe(false);
    });
  });

  describe('setError / clearErrors', () => {
    it('sets a manual error on a field', () => {
      const { result } = renderHook(() =>
        useFormState({ initialValues })
      );
      act(() => result.current.setError('email', 'Already taken'));
      expect(result.current.errors.email).toBe('Already taken');
    });

    it('clearErrors removes all manual errors', () => {
      const { result } = renderHook(() =>
        useFormState({ initialValues })
      );
      act(() => {
        result.current.setError('name', 'Error 1');
        result.current.setError('email', 'Error 2');
      });
      act(() => result.current.clearErrors());
      // Manual errors cleared — validation errors may still appear
      expect(result.current.errors.name).toBeUndefined();
    });
  });
});
