import { type ReactNode, useState } from 'react';

import { useWatch } from '../hooks/useWatch.js';
import { NULL, type ResolveZenBox } from '../utils.js';

/**
 * Memoize a component.
 *
 * Only re-renders when watched dependencies change.
 *
 * @link https://zenbox.del.wang/en/docs/components/Memo
 *
 * @example
 *
 * ```tsx
 * const counterStore = createStore({ count: 0 });
 *
 * function App() {
 *   return (
 *     <Memo watch={() => counterStore.value.count}>
 *       {(count) => <div>count: {count}</div>}
 *     </Memo>
 *   );
 * }
 * ```
 */
export function Memo<T>(props: {
  children: (state: ResolveZenBox<T>) => ReactNode;
  watch: T | (() => T);
  deep?: boolean;
}) {
  const { children, watch, deep } = props;
  const [value, setValue] = useState<ReactNode | typeof NULL>(NULL);
  const state = useWatch(
    watch,
    (current) => {
      setValue(children(current));
    },
    { deep },
  );
  return value === NULL ? children(state) : value;
}
