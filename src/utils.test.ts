import { describe, expect, it } from 'vitest';

import { ZenBox } from './core.js';
import { mergeState, NULL, resolveValue } from './utils.js';

describe('mergeState', () => {
  it('should merge partial state with initial state', () => {
    const initialState = { count: 0, name: 'Alice', age: 25 };
    const partialState = { count: 1, age: 26 };

    const result = mergeState(initialState, partialState);

    expect(result).toEqual({ count: 1, name: 'Alice', age: 26 });
  });

  it('should ignore undefined values', () => {
    const initialState = { count: 0, name: 'Alice' };
    const partialState = { count: 1, name: undefined };

    const result = mergeState(initialState, partialState);

    expect(result).toEqual({ count: 1, name: 'Alice' });
  });

  it('should ignore keys not in initial state', () => {
    const initialState = { count: 0, name: 'Alice' };
    const partialState = { count: 1, extra: 'ignored' };

    const result = mergeState(initialState, partialState);

    expect(result).toEqual({ count: 1, name: 'Alice' });
  });

  it('should handle empty partial state', () => {
    const initialState = { count: 0, name: 'Alice' };

    const result = mergeState(initialState);

    expect(result).toEqual({ count: 0, name: 'Alice' });
  });

  it('should not mutate original state', () => {
    const initialState = { count: 0, name: 'Alice' };
    const partialState = { count: 1 };

    const result = mergeState(initialState, partialState);

    expect(initialState.count).toBe(0);
    expect(result).not.toBe(initialState);
  });
});

describe('resolveValue', () => {
  it('should resolve ZenBox value', () => {
    const store = new ZenBox({ count: 42 });

    const result = resolveValue(store);

    expect(result).toEqual({ count: 42 });
  });

  it('should resolve array of ZenBox values', () => {
    const store1 = new ZenBox({ count: 1 });
    const store2 = new ZenBox({ count: 2 });
    const store3 = new ZenBox({ count: 3 });

    const result = resolveValue([store1, store2, store3]);

    expect(result).toEqual([{ count: 1 }, { count: 2 }, { count: 3 }]);
  });

  it('should resolve mixed array with ZenBox and regular values', () => {
    const store = new ZenBox({ count: 1 });

    const result = resolveValue([store, 'string', 42, { regular: 'object' }]);

    expect(result).toEqual([{ count: 1 }, 'string', 42, { regular: 'object' }]);
  });

  it('should return primitive values as-is', () => {
    expect(resolveValue(42)).toBe(42);
    expect(resolveValue('hello')).toBe('hello');
    expect(resolveValue(true)).toBe(true);
    expect(resolveValue(null)).toBe(null);
    expect(resolveValue(undefined)).toBe(undefined);
  });

  it('should return regular objects as-is', () => {
    const obj = { count: 42 };

    const result = resolveValue(obj);

    expect(result).toBe(obj);
  });

  it('should handle empty arrays', () => {
    const result = resolveValue([]);

    expect(result).toEqual([]);
  });
});

describe('NULL symbol', () => {
  it('should be a unique symbol', () => {
    expect(typeof NULL).toBe('symbol');
    expect(NULL.toString()).toBe('Symbol(NULL)');
  });

  it('should be different from other values', () => {
    expect(NULL).not.toBe(null);
    expect(NULL).not.toBe(undefined);
    expect(NULL).not.toBe('');
    expect(NULL).not.toBe(0);
    expect(NULL).not.toBe(false);
  });
});
