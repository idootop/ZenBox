import { type State, ZenBox } from './core.js';

export { deepEqual, shallowEqual } from '@del-wang/equals';

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type ResolveZenBox<T> = T extends ZenBox<infer U>
  ? U
  : T extends readonly [infer A, ...infer Rest]
    ? readonly [ResolveZenBox<A>, ...ResolveZenBox<Rest>]
    : T extends readonly (infer U)[]
      ? readonly ResolveZenBox<U>[]
      : T extends [infer A, ...infer Rest]
        ? [ResolveZenBox<A>, ...ResolveZenBox<Rest>]
        : T extends (infer U)[]
          ? ResolveZenBox<U>[]
          : T;

export const NULL = Symbol('NULL');

export function mergeState<T extends State>(
  initialState: T,
  partialState: Partial<T> = {},
) {
  const result = { ...initialState };
  for (const key in partialState) {
    if (Object.hasOwn(initialState, key)) {
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
