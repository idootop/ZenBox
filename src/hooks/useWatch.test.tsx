import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { createStore } from '../core.js';
import { useWatch } from './useWatch.js';

function TestWatchStore({
  store,
  options,
  onChange,
}: {
  store: any;
  options?: any;
  onChange: (value: any) => void;
}) {
  const value = useWatch(store, onChange, options);
  return (
    <div>
      <div data-testid="value">{JSON.stringify(value)}</div>
    </div>
  );
}

function TestWatchFunction({
  watch,
  options,
  onChange,
}: {
  watch: () => any;
  options?: any;
  onChange: (value: any) => void;
}) {
  const value = useWatch(watch, onChange, options);
  return (
    <div>
      <div data-testid="value">{JSON.stringify(value)}</div>
    </div>
  );
}

describe('useWatch', () => {
  describe('watching store', () => {
    it('should watch store changes', () => {
      const onChange = vi.fn();
      const store = createStore({ count: 0 });

      render(<TestWatchStore onChange={onChange} store={store} />);

      expect(onChange).toHaveBeenCalledTimes(0);

      act(() => {
        store.setState({ count: 1 });
      });

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should call onChange immediately when immediate option is true', () => {
      const onChange = vi.fn();
      const store = createStore({ count: 0 });

      render(
        <TestWatchStore
          onChange={onChange}
          options={{ immediate: true }}
          store={store}
        />,
      );

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should trigger once when once option is true', () => {
      const onChange = vi.fn();
      const store = createStore({ count: 0 });

      render(
        <TestWatchStore
          onChange={onChange}
          options={{ once: true, immediate: true }}
          store={store}
        />,
      );

      expect(onChange).toHaveBeenCalledTimes(1);

      act(() => {
        store.setState({ count: 1 });
      });

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should support deep watching', () => {
      const onChange = vi.fn();
      const store = createStore({
        user: { profile: { name: 'Alice' } },
      });

      render(
        <TestWatchStore
          onChange={onChange}
          options={{ deep: true }}
          store={store}
        />,
      );

      expect(onChange).toHaveBeenCalledTimes(0);

      act(() => {
        store.setState((state) => {
          state.user.profile.name = 'Bob';
        });
      });

      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('watching function', () => {
    it('should watch function return value changes', () => {
      const onChange = vi.fn();
      const store = createStore({ count: 0, name: 'del' });
      const watch = () => store.value.count * 2;

      render(<TestWatchFunction onChange={onChange} watch={watch} />);

      expect(screen.getByTestId('value').textContent).toBe('0');
      expect(onChange).toHaveBeenCalledTimes(0);

      act(() => {
        store.setState({ count: 1, name: 'del' });
      });

      expect(screen.getByTestId('value').textContent).toBe('0');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(2, 0);

      act(() => {
        store.setState({ count: 1, name: 'wang' });
      });

      expect(screen.getByTestId('value').textContent).toBe('0');
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should work with immediate option for functions', () => {
      const onChange = vi.fn();
      const store = createStore({ count: 5 });
      const watch = () => store.value.count * 2;

      render(
        <TestWatchFunction
          onChange={onChange}
          options={{ immediate: true }}
          watch={watch}
        />,
      );

      expect(screen.getByTestId('value').textContent).toBe('10');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(10, 10);
    });

    it('should track multiple dependencies in function', () => {
      const onChange = vi.fn();
      const store1 = createStore({ value: 1 });
      const store2 = createStore({ value: 2 });
      const watch = () => store1.value.value + store2.value.value;

      render(<TestWatchFunction onChange={onChange} watch={watch} />);

      expect(onChange).toHaveBeenCalledTimes(0);

      act(() => {
        store1.setState({ value: 10 });
      });

      expect(onChange).toHaveBeenCalledTimes(1);

      act(() => {
        store2.setState({ value: 20 });
      });

      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('should handle complex computed values', () => {
      const onChange = vi.fn();
      const store = createStore({
        items: [1, 2, 3],
        multiplier: 2,
      });

      const watch = () => {
        return store.value.items.map((item) => item * store.value.multiplier);
      };

      render(<TestWatchFunction onChange={onChange} watch={watch} />);

      expect(onChange).toHaveBeenCalledTimes(0);

      act(() => {
        store.setState((state) => {
          state.multiplier = 3;
        });
      });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith([3, 6, 9], [2, 4, 6]);
    });
  });

  describe('cleanup', () => {
    it('should support cleanup function from onChange', () => {
      const store = createStore({ count: 0 });
      const cleanup = vi.fn();

      function TestCleanup() {
        useWatch(
          () => store.value.count,
          () => cleanup,
          { immediate: true },
        );
        return <div data-testid="test">test</div>;
      }

      const { unmount } = render(<TestCleanup />);

      expect(cleanup).toHaveBeenCalledTimes(0);

      act(() => {
        store.setState({ count: 1 });
      });

      expect(cleanup).toHaveBeenCalledTimes(1);

      unmount();

      expect(cleanup).toHaveBeenCalledTimes(2);
    });
  });
});
