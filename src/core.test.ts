import { describe, expect, it, vi } from 'vitest';

import { createStore, ZenBox } from './core.js';

describe('ZenBox', () => {
  it('should create store with initial state', () => {
    const store = new ZenBox({ count: 0 });
    expect(store.value).toEqual({ count: 0 });
  });

  it('should update state with object', () => {
    const store = new ZenBox({ count: 0 });
    store.value = { count: 1 };
    expect(store.value.count).toBe(1);
  });

  it('should update state with function', () => {
    const store = new ZenBox({ count: 0 });
    store.setState((state) => {
      state.count = 1;
    });
    expect(store.value.count).toBe(1);
  });

  it('should notify subscribers on state change', () => {
    const store = new ZenBox({ count: 0 });
    const onChange = vi.fn();

    store.subscribe({ onChange });
    store.setState({ count: 1 });

    expect(onChange).toHaveBeenCalledWith({ count: 1 }, { count: 0 });
  });

  it('should not notify when state is unchanged', () => {
    const store = new ZenBox({ count: 0 });
    const onChange = vi.fn();

    store.subscribe({ onChange });
    store.setState({ count: 0 });

    expect(onChange).not.toHaveBeenCalled();
  });

  it('should skip notification with silent option', () => {
    const store = new ZenBox({ count: 0 });
    const onChange = vi.fn();

    store.subscribe({ onChange });
    store.setState({ count: 1 }, { silent: true });

    expect(onChange).not.toHaveBeenCalled();
  });

  it('should unsubscribe correctly', () => {
    const store = new ZenBox({ count: 0 });
    const onChange = vi.fn();

    const unsubscribe = store.subscribe({ onChange });
    unsubscribe();
    store.setState({ count: 1 });

    expect(onChange).not.toHaveBeenCalled();
  });

  it('should support custom selector and equality check', () => {
    const store = new ZenBox({ user: { name: 'Alice', age: 25 } });
    const onChange = vi.fn();

    store.subscribe({
      onChange,
      select: (state) => state.user.name,
      equal: (a, b) => a === b,
    });

    store.setState((state) => {
      state.user.age = 26;
    });
    expect(onChange).not.toHaveBeenCalled();

    store.setState((state) => {
      state.user.name = 'Bob';
    });
    expect(onChange).toHaveBeenCalledWith('Bob', 'Alice');
  });

  it('should track dependencies', () => {
    const store1 = new ZenBox({ count: 1 });
    const store2 = new ZenBox({ count: 2 });

    const [deps, result] = ZenBox.track(() => {
      return store1.value.count + store2.value.count;
    });

    expect(deps.size).toBe(2);
    expect(deps.has(store1)).toBe(true);
    expect(deps.has(store2)).toBe(true);
    expect(result).toBe(3);
  });

  it('should register read listeners', () => {
    const store = new ZenBox({ count: 0 });
    const listener = vi.fn();

    const unsubscribe = ZenBox.subscribeRead(listener);
    store.value; // trigger read

    expect(listener).toHaveBeenCalledWith(store);

    unsubscribe();
    store.value; // should not trigger after unsubscribe

    expect(listener).toHaveBeenCalledTimes(1);
  });
});

describe('createStore', () => {
  it('should create ZenBox instance', () => {
    const store = createStore({ count: 0 });
    expect(store).toBeInstanceOf(ZenBox);
    expect(store.value).toEqual({ count: 0 });
  });

  it('should work with complex state', () => {
    const initialState = {
      user: { name: 'Alice', age: 25 },
      todos: [{ id: 1, text: 'Learn ZenBox', done: false }],
      settings: { theme: 'dark' },
    };

    const store = createStore(initialState);
    expect(store.value).toEqual(initialState);

    store.setState((state) => {
      state.user.age = 26;
      state.todos.push({ id: 2, text: 'Write tests', done: true });
    });

    expect(store.value.user.age).toBe(26);
    expect(store.value.todos).toHaveLength(2);
  });
});
