import type { ZenBox } from '../core.js';
import type { Prettify } from '../utils.js';
import { useStore } from './useStore.js';

/**
 * Pick a subset of the state with shallowEqual.
 *
 * @link https://zenbox.del.wang/en/docs/hooks/usePick
 *
 * @example
 *
 * ```tsx
 * const userStore = createStore({ name: 'Alice', age: 20 });
 *
 * function App() {
 *   const { name } = usePick(userStore, 'name'); // Only re-renders when the name changes
 *   return <div>name: {name}</div>;
 * }
 * ```
 */
export function usePick<
  S extends ZenBox<any>,
  const K extends (keyof S['value'])[],
>(store: S, ...picks: K) {
  return useStore(store, {
    deep: false,
    pick: picks.length === 0 ? undefined : picks,
  }) as unknown as K extends []
    ? S['value']
    : Prettify<Pick<S['value'], K[number]>>;
}

/**
 * Pick a subset of the state with deepEqual.
 *
 * @link https://zenbox.del.wang/en/docs/hooks/usePick
 *
 * @example
 *
 * ```tsx
 * const userStore = createStore({ name: 'Alice', age: 20 });
 *
 * function App() {
 *   const { name } = usePick(userStore, 'name'); // Only re-renders when the name changes
 *   return <div>name: {name}</div>;
 * }
 * ```
 */
export function usePickDeeply<
  S extends ZenBox<any>,
  const K extends (keyof S['value'])[],
>(store: S, ...picks: K) {
  return useStore(store, {
    deep: true,
    pick: picks.length === 0 ? undefined : picks,
  }) as unknown as K extends []
    ? S['value']
    : Prettify<Pick<S['value'], K[number]>>;
}
