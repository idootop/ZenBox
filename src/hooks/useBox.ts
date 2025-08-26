import { useRef } from 'react';

import { createStore, type State } from '../core.js';
import { useStore } from './useStore.js';

/**
 * Create a local store for unified state management.
 *
 * @link https://zenbox.del.wang/en/docs/hooks/useBox
 *
 * @example
 *
 * ```tsx
 * function App() {
 *   const store = useBox({ count: 0 });
 *   return <div>count: {store.value.count}</div>;
 * }
 * ```
 */
export function useBox<S extends State>(
  initialState: S,
  options?: { deep?: boolean },
) {
  const ref = useRef(createStore(initialState));
  useStore(ref.current, options);
  return ref.current;
}
