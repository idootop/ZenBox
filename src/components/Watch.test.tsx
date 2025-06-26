import { act, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { createStore } from '../core.js';
import { Watch } from './Watch.js';

describe('Watch', () => {
  it('should render children with watched value', () => {
    const store = createStore({ count: 42 });

    render(
      <Watch watch={() => store.value.count}>
        {(count) => <div data-testid="count">{count}</div>}
      </Watch>,
    );

    expect(screen.getByTestId('count').textContent).toBe('42');
  });

  it('should update when watched value changes', () => {
    const store = createStore({ count: 0 });

    render(
      <Watch watch={() => store.value.count}>
        {(count) => <div data-testid="count">{count}</div>}
      </Watch>,
    );

    expect(screen.getByTestId('count').textContent).toBe('0');

    act(() => {
      store.setState((state) => {
        state.count = 10;
      });
    });

    expect(screen.getByTestId('count').textContent).toBe('10');
  });

  it('should support deep watching', () => {
    const store = createStore({
      user: { profile: { settings: { theme: 'dark' } } },
    });

    render(
      <Watch deep={true} watch={() => store.value.user.profile.settings.theme}>
        {(theme) => <div data-testid="theme">{theme}</div>}
      </Watch>,
    );

    expect(screen.getByTestId('theme').textContent).toBe('dark');

    act(() => {
      store.setState((state) => {
        state.user.profile.settings.theme = 'light';
      });
    });

    expect(screen.getByTestId('theme').textContent).toBe('light');
  });

  it('should work with complex computed values', () => {
    const store = createStore({
      items: [1, 2, 3, 4, 5],
      filter: 'even',
    });

    const watch = () => {
      const { items, filter } = store.value;
      return filter === 'even'
        ? items.filter((n) => n % 2 === 0)
        : items.filter((n) => n % 2 === 1);
    };

    render(
      <Watch watch={watch}>
        {(filtered) => (
          <div data-testid="filtered">{JSON.stringify(filtered)}</div>
        )}
      </Watch>,
    );

    expect(screen.getByTestId('filtered').textContent).toBe('[2,4]');

    act(() => {
      store.setState((state) => {
        state.filter = 'odd';
      });
    });

    expect(screen.getByTestId('filtered').textContent).toBe('[1,3,5]');
  });

  it('should handle multiple dependencies', () => {
    const store1 = createStore({ value: 2 });
    const store2 = createStore({ value: 3 });

    render(
      <Watch watch={() => store1.value.value + store2.value.value}>
        {(sum) => <div data-testid="sum">{sum}</div>}
      </Watch>,
    );

    expect(screen.getByTestId('sum').textContent).toBe('5');

    act(() => {
      store1.setState((state) => {
        state.value = 10;
      });
    });

    expect(screen.getByTestId('sum').textContent).toBe('13');

    act(() => {
      store2.setState((state) => {
        state.value = 7;
      });
    });

    expect(screen.getByTestId('sum').textContent).toBe('17');
  });

  it('should handle object and array values', () => {
    const store = createStore({
      user: { name: 'Alice', age: 25 },
      tags: ['react', 'javascript'],
    });

    render(
      <Watch watch={() => ({ user: store.value.user, tags: store.value.tags })}>
        {(data) => (
          <div>
            <div data-testid="user">{JSON.stringify(data.user)}</div>
            <div data-testid="tags">{JSON.stringify(data.tags)}</div>
          </div>
        )}
      </Watch>,
    );

    expect(screen.getByTestId('user').textContent).toBe(
      '{"name":"Alice","age":25}',
    );
    expect(screen.getByTestId('tags').textContent).toBe(
      '["react","javascript"]',
    );

    act(() => {
      store.setState((state) => {
        state.user.name = 'Bob';
        state.tags.push('typescript');
      });
    });

    expect(screen.getByTestId('user').textContent).toBe(
      '{"name":"Bob","age":25}',
    );
    expect(screen.getByTestId('tags').textContent).toBe(
      '["react","javascript","typescript"]',
    );
  });

  it('should work with primitive values', () => {
    const store = createStore({
      flag: true,
      count: 42,
      message: 'hello',
    });

    render(
      <Watch watch={() => store.value.flag}>
        {(flag) => (
          <div data-testid="flag">{flag ? 'enabled' : 'disabled'}</div>
        )}
      </Watch>,
    );

    expect(screen.getByTestId('flag').textContent).toBe('enabled');

    act(() => {
      store.setState((state) => {
        state.flag = false;
      });
    });

    expect(screen.getByTestId('flag').textContent).toBe('disabled');
  });

  it('should handle null and undefined values', () => {
    const store = createStore({ value: null as string | null });

    render(
      <Watch watch={() => store.value.value}>
        {(value) => (
          <div data-testid="value">{value === null ? 'null' : value}</div>
        )}
      </Watch>,
    );

    expect(screen.getByTestId('value').textContent).toBe('null');

    act(() => {
      store.setState((state) => {
        state.value = 'not null';
      });
    });

    expect(screen.getByTestId('value').textContent).toBe('not null');

    act(() => {
      store.setState((state) => {
        state.value = null;
      });
    });

    expect(screen.getByTestId('value').textContent).toBe('null');
  });
});
