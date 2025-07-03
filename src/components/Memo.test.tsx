import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { createStore } from '../core.js';
import { Memo } from './Memo.js';

describe('Memo', () => {
  it('should render children with watched value', () => {
    const store = createStore({ count: 42 });

    render(
      <Memo watch={() => store.value.count}>
        {(count) => <div data-testid="count">{count}</div>}
      </Memo>,
    );

    expect(screen.getByTestId('count').textContent).toBe('42');
  });

  it('should update when watched value changes', () => {
    const store = createStore({ count: 0 });

    render(
      <Memo watch={() => store.value.count}>
        {(count) => <div data-testid="count">{count}</div>}
      </Memo>,
    );

    expect(screen.getByTestId('count').textContent).toBe('0');

    act(() => {
      store.setState({ count: 10 });
    });

    expect(screen.getByTestId('count').textContent).toBe('10');
  });

  it('should memoize render result between changes', () => {
    const store = createStore({ count: 0, name: 'Alice' });
    const renderFn = vi.fn((count: number) => (
      <div data-testid="count">{count}</div>
    ));

    render(<Memo watch={() => store.value.count}>{renderFn}</Memo>);

    expect(renderFn).toHaveBeenCalledTimes(1);
    expect(renderFn).toHaveBeenCalledWith(0);

    // Change name (not watched), should not re-render
    act(() => {
      store.setState((state) => {
        state.name = 'Bob';
      });
    });

    expect(renderFn).toHaveBeenCalledTimes(1);

    // Change count (watched), should re-render
    act(() => {
      store.setState((state) => {
        state.count = 1;
      });
    });

    expect(renderFn).toHaveBeenCalledTimes(2);
    expect(renderFn).toHaveBeenCalledWith(1);
  });

  it('should support deep watching', () => {
    const store = createStore({
      user: { profile: { settings: { theme: 'dark' } } },
    });

    render(
      <Memo deep={true} watch={() => store.value.user.profile.settings.theme}>
        {(theme) => <div data-testid="theme">{theme}</div>}
      </Memo>,
    );

    expect(screen.getByTestId('theme').textContent).toBe('dark');

    act(() => {
      store.setState((state) => {
        state.user.profile.settings.theme = 'light';
      });
    });

    expect(screen.getByTestId('theme').textContent).toBe('light');
  });

  it('should work with complex watched values', () => {
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
      <Memo watch={watch}>
        {(filtered) => (
          <div data-testid="filtered">{JSON.stringify(filtered)}</div>
        )}
      </Memo>,
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
      <Memo watch={() => store1.value.value + store2.value.value}>
        {(sum) => <div data-testid="sum">{sum}</div>}
      </Memo>,
    );

    expect(screen.getByTestId('sum').textContent).toBe('5');

    act(() => {
      store1.setState({ value: 10 });
    });

    expect(screen.getByTestId('sum').textContent).toBe('13');

    act(() => {
      store2.setState({ value: 7 });
    });

    expect(screen.getByTestId('sum').textContent).toBe('17');
  });

  it('should render JSX elements correctly', () => {
    const store = createStore({ message: 'Hello World' });

    render(
      <Memo watch={() => store.value.message}>
        {(message) => (
          <div data-testid="message">
            <h1>{message}</h1>
            <p>This is a test</p>
          </div>
        )}
      </Memo>,
    );

    expect(screen.getByTestId('message').textContent).toContain('Hello World');
    expect(screen.getByRole('heading').textContent).toBe('Hello World');

    act(() => {
      store.setState({ message: 'Updated Message' });
    });

    expect(screen.getByRole('heading').textContent).toBe('Updated Message');
  });

  it('should handle null and undefined values', () => {
    const store = createStore({ value: null as string | null | undefined });

    render(
      <Memo watch={() => store.value.value}>
        {(value) => (
          <div data-testid="value">
            {value === null
              ? 'null'
              : value === undefined
                ? 'undefined'
                : value}
          </div>
        )}
      </Memo>,
    );

    expect(screen.getByTestId('value').textContent).toBe('null');

    act(() => {
      store.setState({ value: 'not null' });
    });

    expect(screen.getByTestId('value').textContent).toBe('not null');

    act(() => {
      store.setState({ value: null });
    });

    expect(screen.getByTestId('value').textContent).toBe('null');

    act(() => {
      store.setState({ value: undefined });
    });

    expect(screen.getByTestId('value').textContent).toBe('undefined');
  });
});
