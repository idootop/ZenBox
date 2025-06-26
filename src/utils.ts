import { type State, ZenBox } from './core.js';

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export const NULL = Symbol('NULL');

export function mergeState<T extends State>(
  initialState: T,
  partialState: Partial<T> = {},
) {
  const result = { ...initialState };
  for (const key in partialState) {
    if (key in initialState && partialState[key] !== undefined) {
      result[key] = partialState[key] as any;
    }
  }
  return result;
}

export function resolveValue<T>(value: T): T {
  if (value instanceof ZenBox) {
    return value.value;
  }
  if (Array.isArray(value) && value.length > 0) {
    return value.map((item) => {
      if (item instanceof ZenBox) {
        return item.value;
      }
      return item;
    }) as T;
  }
  return value;
}
