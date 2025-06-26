/** biome-ignore-all lint/a11y/useButtonType: just do it */
/** biome-ignore-all lint/a11y/useButtonType: just do it */
import { act, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useStoreValue } from '../hooks/useStoreValue.js';
import { createProvider } from './Provider.js';

describe('createProvider', () => {
  it('should create provider components and hooks', () => {
    const [StoreProvider, useFindStore, { getStore, getState, setState }] =
      createProvider({ count: 0, name: 'test' });

    expect(StoreProvider).toBeInstanceOf(Function);
    expect(useFindStore).toBeInstanceOf(Function);
    expect(getStore).toBeInstanceOf(Function);
    expect(getState).toBeInstanceOf(Function);
    expect(setState).toBeInstanceOf(Function);
  });

  it('should provide store context to children', () => {
    const [StoreProvider, useFindStore] = createProvider({ count: 42 });

    function TestChild() {
      const store = useFindStore();
      return <div data-testid="count">{store.value.count}</div>;
    }

    render(
      <StoreProvider>
        <TestChild />
      </StoreProvider>,
    );

    expect(screen.getByTestId('count').textContent).toBe('42');
  });

  it('should merge initial state with provided partial state', () => {
    const [StoreProvider, useFindStore] = createProvider({
      count: 0,
      name: 'default',
      enabled: true,
    });

    function TestChild() {
      const store = useFindStore();
      return (
        <div>
          <div data-testid="count">{store.value.count}</div>
          <div data-testid="name">{store.value.name}</div>
          <div data-testid="enabled">{String(store.value.enabled)}</div>
        </div>
      );
    }

    render(
      <StoreProvider initialState={{ count: 10, name: 'custom' }}>
        <TestChild />
      </StoreProvider>,
    );

    expect(screen.getByTestId('count').textContent).toBe('10');
    expect(screen.getByTestId('name').textContent).toBe('custom');
    expect(screen.getByTestId('enabled').textContent).toBe('true');
  });

  it('should update children when store state changes', () => {
    const [StoreProvider, useFindStore] = createProvider({ count: 0 });

    function TestChild() {
      const store = useFindStore();
      const state = useStoreValue(store);
      return (
        <div>
          <div data-testid="count">{state.count}</div>
          <button
            data-testid="increment"
            onClick={() =>
              store.setState((state) => {
                state.count++;
              })
            }
          >
            +1
          </button>
        </div>
      );
    }

    render(
      <StoreProvider>
        <TestChild />
      </StoreProvider>,
    );

    expect(screen.getByTestId('count').textContent).toBe('0');

    act(() => {
      screen.getByTestId('increment').click();
    });

    expect(screen.getByTestId('count').textContent).toBe('1');
  });

  it('should throw error when useFindStore is used outside provider', () => {
    const [, useFindStore] = createProvider({ count: 0 });

    function TestChild() {
      useFindStore(); // This should throw
      return <div>test</div>;
    }

    // Suppress console.error for this test
    const originalError = console.error;
    console.error = () => {};

    expect(() => {
      render(<TestChild />);
    }).toThrow('useFindStore must be used within StoreProvider');

    console.error = originalError;
  });

  it('should support multiple independent providers', () => {
    const [CounterProvider, useCounter] = createProvider({ count: 0 });
    const [MessageProvider, useMessage] = createProvider({ text: 'hello' });

    function TestChild() {
      const counter = useCounter();
      const message = useMessage();
      return (
        <div>
          <div data-testid="count">{counter.value.count}</div>
          <div data-testid="text">{message.value.text}</div>
        </div>
      );
    }

    render(
      <CounterProvider>
        <MessageProvider initialState={{ text: 'world' }}>
          <TestChild />
        </MessageProvider>
      </CounterProvider>,
    );

    expect(screen.getByTestId('count').textContent).toBe('0');
    expect(screen.getByTestId('text').textContent).toBe('world');
  });

  it('should handle complex state updates', () => {
    const [StoreProvider, useFindStore] = createProvider({
      user: { name: 'Alice', age: 25 },
      todos: [] as Array<{ id: number; text: string; done: boolean }>,
      settings: { theme: 'light' },
    });

    function TestChild() {
      const store = useFindStore();
      const state = useStoreValue(store);
      return (
        <div>
          <div data-testid="user">{JSON.stringify(state.user)}</div>
          <div data-testid="todos-count">{state.todos.length}</div>
          <button
            data-testid="add-todo"
            onClick={() => {
              store.setState((state) => {
                state.todos.push({ id: 1, text: 'Test todo', done: false });
              });
            }}
          >
            Add Todo
          </button>
        </div>
      );
    }

    render(
      <StoreProvider>
        <TestChild />
      </StoreProvider>,
    );

    expect(screen.getByTestId('user').textContent).toBe(
      '{"name":"Alice","age":25}',
    );
    expect(screen.getByTestId('todos-count').textContent).toBe('0');

    act(() => {
      screen.getByTestId('add-todo').click();
    });

    expect(screen.getByTestId('todos-count').textContent).toBe('1');
  });
});
