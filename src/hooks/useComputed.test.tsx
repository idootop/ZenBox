import { act, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { createStore } from '../core.js';
import { useComputed } from './useComputed.js';

function TestComponent({
  compute,
  deep,
}: {
  compute: () => any;
  deep?: boolean;
}) {
  const value = useComputed(compute, { deep });
  return <div data-testid="computed">{JSON.stringify(value)}</div>;
}

describe('useComputed', () => {
  it('should compute initial value', () => {
    const store = createStore({ count: 5 });
    const compute = () => store.value.count * 2;

    render(<TestComponent compute={compute} />);

    expect(screen.getByTestId('computed').textContent).toBe('10');
  });

  it('should recompute when dependencies change', () => {
    const store = createStore({ count: 5 });
    const compute = () => store.value.count * 2;

    render(<TestComponent compute={compute} />);

    expect(screen.getByTestId('computed').textContent).toBe('10');

    act(() => {
      store.setState({ count: 10 });
    });

    expect(screen.getByTestId('computed').textContent).toBe('20');
  });

  it('should work with multiple dependencies', () => {
    const store1 = createStore({ value: 2 });
    const store2 = createStore({ value: 3 });
    const compute = () => store1.value.value + store2.value.value;

    render(<TestComponent compute={compute} />);

    expect(screen.getByTestId('computed').textContent).toBe('5');

    act(() => {
      store1.setState({ value: 4 });
    });

    expect(screen.getByTestId('computed').textContent).toBe('7');

    act(() => {
      store2.setState({ value: 6 });
    });

    expect(screen.getByTestId('computed').textContent).toBe('10');
  });

  it('should handle complex computations', () => {
    const store = createStore({
      items: [1, 2, 3, 4, 5],
      filter: 'even',
    });

    const compute = () => {
      const { items, filter } = store.value;
      return filter === 'even'
        ? items.filter((n) => n % 2 === 0)
        : items.filter((n) => n % 2 === 1);
    };

    render(<TestComponent compute={compute} />);

    expect(screen.getByTestId('computed').textContent).toBe('[2,4]');

    act(() => {
      store.setState((state) => {
        state.filter = 'odd';
      });
    });

    expect(screen.getByTestId('computed').textContent).toBe('[1,3,5]');
  });

  it('should support deep watching', () => {
    const store = createStore({
      user: { profile: { settings: { theme: 'dark', language: 'en' } } },
    });

    const compute = () => store.value.user.profile.settings.theme.toUpperCase();

    render(<TestComponent compute={compute} deep={true} />);

    expect(screen.getByTestId('computed').textContent).toBe('"DARK"');

    act(() => {
      store.setState((state) => {
        state.user.profile.settings.theme = 'light';
      });
    });

    expect(screen.getByTestId('computed').textContent).toBe('"LIGHT"');

    act(() => {
      store.setState((state) => {
        state.user.profile.settings.language = 'zh';
      });
    });

    expect(screen.getByTestId('computed').textContent).toBe('"LIGHT"');
  });

  it('should return primitive values correctly', () => {
    const store = createStore({ flag: true });
    const compute = () => !store.value.flag;

    render(<TestComponent compute={compute} />);

    expect(screen.getByTestId('computed').textContent).toBe('false');

    act(() => {
      store.setState({ flag: false });
    });

    expect(screen.getByTestId('computed').textContent).toBe('true');
  });
});
