/** biome-ignore-all lint/correctness/useHookAtTopLevel: just do it */
import type { ZenBox } from '../core.js';
import type { Prettify } from '../utils.js';
import { useComputed } from './useComputed.js';

/**
 * Use a store's state with a selector.
 *
 * @link https://zenbox.del.wang/en/docs/hooks/useStore
 *
 * @example
 *
 * ```tsx
 * const counterStore = createStore({ count: 0 });
 *
 * function App() {
 *   const { count } = useStore(
 *     counterStore, // store
 *     (state) => state.count, // selector
 *   );
 *   return <div>count: {count}</div>;
 * }
 * ```
 */
export function useStore<S extends ZenBox<any>, D>(
  store: S,
  selector: (state: S['value']) => D,
  options?: { deep?: boolean },
): D;

/**
 * Use a store's state with `pick`.
 *
 * @link https://zenbox.del.wang/en/docs/hooks/useStore
 *
 * @example
 *
 * ```tsx
 * const userStore = createStore({ name: 'Alice', age: 20 });
 *
 * function App() {
 *   const { name } = useStore(userStore, { pick: ['name'] }); // Only re-renders when the name changes
 *   return <div>name: {name}</div>;
 * }
 * ```
 */
export function useStore<
  S extends ZenBox<any>,
  const K extends (keyof S['value'])[] | undefined = undefined,
>(
  store: S,
  options?: { pick?: K; deep?: boolean },
): K extends (keyof S['value'])[]
  ? Prettify<Pick<S['value'], K[number]>>
  : S['value'];

export function useStore<
  S extends ZenBox<any>,
  D = any,
  K extends readonly (keyof S['value'])[] = any,
>(
  store: S,
  arg2?: ((state: S['value']) => D) | { pick?: K; deep?: boolean },
  arg3?: { deep?: boolean },
): any {
  if (typeof arg2 === 'function') {
    const selector = arg2 as (state: S['value']) => D;
    return useComputed(() => selector(store.value), arg3) as D;
  }
  const { pick, deep } = (arg2 as { pick?: K; deep?: boolean }) || {};
  return useComputed(
    () =>
      pick?.reduce((acc, key) => ({ ...acc, [key]: store.value[key] }), {}) ??
      store.value,
    { deep },
  );
}

/**
 * @deprecated Please use useStore instead, will be removed in v2.0
 */
export const useStoreValue = useStore;
