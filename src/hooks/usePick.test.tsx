import { act, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { createStore } from '../core.js';
import { usePick, usePickDeeply } from './usePick.js';

function TestComponent({ store, picks }: { store: any; picks: string[] }) {
  const state = usePick(store, ...(picks as any));
  return <div data-testid="state">{JSON.stringify(state)}</div>;
}

function TestDeepComponent({ store, picks }: { store: any; picks: string[] }) {
  const state = usePickDeeply(store, ...(picks as any));
  return <div data-testid="state">{JSON.stringify(state)}</div>;
}

describe('usePick', () => {
  it('should pick specific fields from store', () => {
    const store = createStore({ count: 42, name: 'Alice', age: 25 });

    render(<TestComponent picks={['count', 'name']} store={store} />);

    expect(screen.getByTestId('state').textContent).toBe(
      '{"count":42,"name":"Alice"}',
    );
  });

  it('should update when picked fields change', () => {
    const store = createStore({ count: 0, name: 'Alice', age: 25 });

    render(<TestComponent picks={['count']} store={store} />);

    expect(screen.getByTestId('state').textContent).toBe('{"count":0}');

    act(() => {
      store.setState((state) => {
        state.count = 1;
      });
    });

    expect(screen.getByTestId('state').textContent).toBe('{"count":1}');
  });

  it('should not update when non-picked fields change', () => {
    const store = createStore({ count: 0, name: 'Alice', age: 25 });

    render(<TestComponent picks={['count']} store={store} />);

    const initialContent = screen.getByTestId('state').textContent;

    act(() => {
      store.setState((state) => {
        state.age = 26; // should not cause re-render
      });
    });

    expect(screen.getByTestId('state').textContent).toBe(initialContent);
  });

  it('should return full state when no picks provided', () => {
    const store = createStore({ count: 42, name: 'Alice' });

    render(<TestComponent picks={[]} store={store} />);

    expect(screen.getByTestId('state').textContent).toBe(
      '{"count":42,"name":"Alice"}',
    );
  });

  it('should pick single field', () => {
    const store = createStore({ count: 42, name: 'Alice', age: 25 });

    render(<TestComponent picks={['name']} store={store} />);

    expect(screen.getByTestId('state').textContent).toBe('{"name":"Alice"}');
  });
});

describe('usePickDeeply', () => {
  it('should perform deep watching of nested objects', () => {
    const store = createStore({
      user: { profile: { name: 'Alice', settings: { theme: 'dark' } } },
      count: 0,
    });

    render(<TestDeepComponent picks={['user']} store={store} />);

    act(() => {
      store.setState((state) => {
        state.user.profile.settings.theme = 'light';
      });
    });

    expect(screen.getByTestId('state').textContent).toBe(
      JSON.stringify({
        user: { profile: { name: 'Alice', settings: { theme: 'light' } } },
      }),
    );
  });

  it('should work with shallow changes too', () => {
    const store = createStore({
      user: { name: 'Alice' },
      count: 0,
    });

    render(<TestDeepComponent picks={['user']} store={store} />);

    act(() => {
      store.setState((state) => {
        state.user.name = 'Bob';
      });
    });

    expect(screen.getByTestId('state').textContent).toBe(
      JSON.stringify({ user: { name: 'Bob' } }),
    );
  });
});
