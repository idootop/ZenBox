import { useComputed } from '../hooks/useComputed.js';
import type { ResolveZenBox } from '../utils.js';

/**
 * Component that watches a value and re-renders when it changes.
 *
 * @link https://zenbox.del.wang/en/docs/components/Watch
 *
 * @example
 *
 * ```tsx
 * const counterStore = createStore({ count: 0 });
 *
 * function App() {
 *   return (
 *     <Watch watch={() => counterStore.value.count}>
 *       {(count) => <div>count: {count}</div>}
 *     </Watch>
 *   );
 * }
 * ```
 */
export function Watch<T>(props: {
  children: (state: ResolveZenBox<T>) => React.ReactNode;
  watch: T | (() => T);
  deep?: boolean;
}) {
  const { children, watch, deep } = props;
  const state = useComputed(watch, { deep });
  return children(state);
}
