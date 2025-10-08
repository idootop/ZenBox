import { act, configure, render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createStore } from '../core.js';
import { useWatchEffect } from './useWatchEffect.js';

function TestWatchEffect({ watch }: { watch: () => void | VoidFunction }) {
  useWatchEffect(watch);
  return <div data-testid="component">rendered</div>;
}

const reactStrictMode = true;

describe('useWatchEffect', () => {
  beforeEach(() => {
    configure({ reactStrictMode });
  });

  it('should run effect immediately', () => {
    const effect = vi.fn();

    render(<TestWatchEffect watch={effect} />);

    expect(effect).toHaveBeenCalledTimes(reactStrictMode ? 2 : 1);
  });

  it('should rerun effect when dependencies change', () => {
    const store = createStore({ count: 0 });
    const effect = vi.fn(() => {
      store.value.count; // read to create dependency
    });

    render(<TestWatchEffect watch={effect} />);

    expect(effect).toHaveBeenCalledTimes(reactStrictMode ? 2 : 1);

    act(() => {
      store.setState({ count: 1 });
    });

    expect(effect).toHaveBeenCalledTimes(reactStrictMode ? 2 + 1 : 2);
  });

  it('should track multiple dependencies', () => {
    const store1 = createStore({ value: 1 });
    const store2 = createStore({ value: 2 });
    const effect = vi.fn(() => {
      store1.value.value + store2.value.value; // read both stores
    });

    render(<TestWatchEffect watch={effect} />);

    expect(effect).toHaveBeenCalledTimes(reactStrictMode ? 2 : 1);

    act(() => {
      store1.setState({ value: 10 });
    });

    expect(effect).toHaveBeenCalledTimes(reactStrictMode ? 2 + 1 : 2);

    act(() => {
      store2.setState({ value: 20 });
    });

    expect(effect).toHaveBeenCalledTimes(reactStrictMode ? 3 + 1 : 3);
  });

  it('should handle cleanup functions', () => {
    const store = createStore({ count: 0 });
    const cleanup = vi.fn();
    const effect = vi.fn(() => {
      store.value.count; // create dependency
      return cleanup;
    });

    render(<TestWatchEffect watch={effect} />);

    expect(effect).toHaveBeenCalledTimes(reactStrictMode ? 2 : 1);
    expect(cleanup).toHaveBeenCalledTimes(reactStrictMode ? 2 - 1 : 0);

    act(() => {
      store.setState({ count: 1 });
    });

    expect(effect).toHaveBeenCalledTimes(reactStrictMode ? 2 + 1 : 2);
    expect(cleanup).toHaveBeenCalledTimes(reactStrictMode ? 2 + 1 - 1 : 1); // cleanup from previous effect
  });

  it('should cleanup on unmount', () => {
    const store = createStore({ count: 0 });
    const cleanup = vi.fn();
    const effect = vi.fn(() => {
      store.value.count;
      return cleanup;
    });

    const { unmount } = render(<TestWatchEffect watch={effect} />);

    expect(cleanup).toHaveBeenCalledTimes(reactStrictMode ? 2 - 1 : 0);

    unmount();

    expect(cleanup).toHaveBeenCalledTimes(reactStrictMode ? 2 + 1 - 1 : 1);
  });

  it('should not trigger effect when no dependencies', () => {
    const effect = vi.fn(() => {
      // no store reads, no dependencies
      return;
    });

    render(<TestWatchEffect watch={effect} />);

    expect(effect).toHaveBeenCalledTimes(reactStrictMode ? 2 : 1);

    // Create and update a store that's not used in effect
    const store = createStore({ count: 0 });

    act(() => {
      store.setState({ count: 1 });
    });

    // Effect should not run again
    expect(effect).toHaveBeenCalledTimes(reactStrictMode ? 2 : 1);
  });

  it('should handle complex dependency tracking', () => {
    const store = createStore({
      user: { name: 'Alice', posts: [{ title: 'Hello' }] },
      count: 0,
    });

    const effect = vi.fn(() => {
      // Only read user.name, not user.posts or count
      store.value.user.name;
    });

    render(<TestWatchEffect watch={effect} />);

    expect(effect).toHaveBeenCalledTimes(reactStrictMode ? 2 : 1);

    // Change count - should trigger, because store is used in effect
    act(() => {
      store.setState((state) => {
        state.count = 1;
      });
    });

    expect(effect).toHaveBeenCalledTimes(reactStrictMode ? 2 + 1 : 2);

    // Change posts - should not trigger
    act(() => {
      store.setState((state) => {
        state.user.posts.push({ title: 'World' });
      });
    });

    expect(effect).toHaveBeenCalledTimes(reactStrictMode ? 3 + 1 : 3);

    // Change name - should trigger
    act(() => {
      store.setState((state) => {
        state.user.name = 'Bob';
      });
    });

    expect(effect).toHaveBeenCalledTimes(reactStrictMode ? 4 + 1 : 4);
  });

  it('should handle conditional dependency access', () => {
    const store1 = createStore({ enabled: true, value: 1 });
    const store2 = createStore({ value: 10 });

    const effect = vi.fn(() => {
      if (store1.value.enabled) {
        store2.value.value; // conditionally read store2
      }
    });

    render(<TestWatchEffect watch={effect} />);

    expect(effect).toHaveBeenCalledTimes(reactStrictMode ? 2 : 1);

    // Change store2 when enabled - should trigger
    act(() => {
      store2.setState({ value: 20 });
    });

    expect(effect).toHaveBeenCalledTimes(reactStrictMode ? 2 + 1 : 2);

    // Disable and change store2 - should still trigger once for the disable
    act(() => {
      store1.setState((state) => {
        state.enabled = false;
      });
    });

    expect(effect).toHaveBeenCalledTimes(reactStrictMode ? 3 + 1 : 3);

    // Now changing store2 should not trigger
    act(() => {
      store2.setState({ value: 30 });
    });

    expect(effect).toHaveBeenCalledTimes(reactStrictMode ? 3 + 1 : 3);
  });
});
