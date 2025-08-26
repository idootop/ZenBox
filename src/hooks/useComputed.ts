import { useCallback, useState } from 'react';

import type { ResolveZenBox } from '../utils.js';
import { useWatch } from './useWatch.js';

/**
 * Create a computed value that automatically updates when the dependencies change.
 *
 * @link https://zenbox.del.wang/en/docs/hooks/useComputed
 *
 * @example
 *
 * ```tsx
 * const counterStore = createStore({ count: 0 });
 *
 * function App() {
 *   const doubleCount = useComputed(() => {
 *     return counterStore.state.count * 2;
 *   });
 *   return <div>doubleCount: {doubleCount}</div>;
 * }
 * ```
 */
export function useComputed<T>(
  compute: T | (() => T),
  options: {
    deep?: boolean;
  } = {},
): ResolveZenBox<T> {
  const [_, setState] = useState({});
  const rebuild = useCallback(() => setState({}), []);
  return useWatch(compute, () => rebuild(), options);
}
