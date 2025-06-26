import { act, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { createStore } from '../core.js';
import { useStore } from './useStore.js';

function TestComponent({ store, options }: { store: any; options?: any }) {
  const state = useStore(store, options);
  return <div data-testid="state">{JSON.stringify(state)}</div>;
}

describe('useStore', () => {
  it('should return current store state', () => {
    const store = createStore({ count: 42, name: 'Alice' });

    render(<TestComponent store={store} />);

    expect(screen.getByTestId('state').textContent).toBe(
      '{"count":42,"name":"Alice"}',
    );
  });

  it('should update when store state changes', () => {
    const store = createStore({ count: 0 });

    render(<TestComponent store={store} />);

    expect(screen.getByTestId('state').textContent).toBe('{"count":0}');

    act(() => {
      store.setState({ count: 1 });
    });

    expect(screen.getByTestId('state').textContent).toBe('{"count":1}');
  });

  it('should pick specific fields when pick option is provided', () => {
    const store = createStore({ count: 42, name: 'Alice', age: 25 });

    render(
      <TestComponent options={{ pick: ['count', 'name'] }} store={store} />,
    );

    expect(screen.getByTestId('state').textContent).toBe(
      '{"count":42,"name":"Alice"}',
    );
  });

  it('should react to changes in picked fields only', () => {
    const store = createStore({ count: 0, name: 'Alice', age: 25 });

    render(<TestComponent options={{ pick: ['count'] }} store={store} />);

    expect(screen.getByTestId('state').textContent).toBe('{"count":0}');

    act(() => {
      store.setState((state) => {
        state.age = 26; // should not trigger update
      });
    });

    expect(screen.getByTestId('state').textContent).toBe('{"count":0}');

    act(() => {
      store.setState((state) => {
        state.count = 1; // should trigger update
      });
    });

    expect(screen.getByTestId('state').textContent).toBe('{"count":1}');
  });

  it('should support deep watching', () => {
    const store = createStore({
      user: { profile: { name: 'Alice' } },
      count: 0,
    });

    render(<TestComponent options={{ deep: true }} store={store} />);

    act(() => {
      store.setState((state) => {
        state.user.profile.name = 'Bob';
      });
    });

    expect(screen.getByTestId('state').textContent).toBe(
      JSON.stringify({ user: { profile: { name: 'Bob' } }, count: 0 }),
    );
  });

  it('should work with empty pick array', () => {
    const store = createStore({ count: 42, name: 'Alice' });

    render(<TestComponent options={{ pick: [] }} store={store} />);

    expect(screen.getByTestId('state').textContent).toBe(
      '{}',
    );
  });
});
