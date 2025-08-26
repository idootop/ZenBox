import { deepEqual, shallowEqual } from '@del-wang/equals';
import { useCallback, useRef } from 'react';

import { ZenBox } from '../core.js';
import { NULL, type ResolveZenBox, resolveValue } from '../utils.js';
import { useCleanup } from './useCleanup.js';

interface WatchOptions {
  deep?: boolean;
  once?: boolean;
  immediate?: boolean;
}

/**
 * Watch a value and call a callback when it changes.
 *
 * @link https://zenbox.del.wang/en/docs/hooks/useWatch
 *
 * @example
 *
 * ```tsx
 * const counterStore = createStore({ count: 0 });
 *
 * function App() {
 *   useWatch(counterStore, (state) => {
 *     console.log(state.count); // 0, 1, 2, ...
 *   });
 *   return <div>count: {counterStore.value.count}</div>;
 * }
 * ```
 */
export function useWatch<T>(
  _watch: T | (() => T),
  onChange: (
    current: ResolveZenBox<T>,
    prev: ResolveZenBox<T>,
  ) => void | VoidFunction,
  options?: WatchOptions,
): ResolveZenBox<T> {
  const watch = (
    typeof _watch === 'function' ? _watch : () => _watch
  ) as () => ResolveZenBox<T>;

  const refs = useRef({
    initialized: false,
    triggered: false,
    prev: NULL as any,
    cleanupDeps: null as null | VoidFunction,
    cleanupWatchEffect: null as null | void | VoidFunction,
    watch,
    onChange,
    ...options,
  });

  refs.current = { ...refs.current, watch, onChange, ...options };

  const check = useCallback(() => {
    const { initialized, watch, deep, once, immediate } = refs.current;

    if (once && refs.current.triggered) {
      return;
    }

    // cleanup previous deps
    refs.current.cleanupDeps?.();

    // track deps
    const [deps, current] = ZenBox.track(() => resolveValue(watch()));
    const unsubscribes = Array.from(deps).map((dep) => {
      return dep.subscribe({ onChange: () => check() });
    });
    refs.current.cleanupDeps = () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };

    const equal = deep ? deepEqual : shallowEqual;
    const prev = refs.current.prev === NULL ? current : refs.current.prev;
    if (
      (!initialized && immediate) ||
      (initialized && !equal(prev, current)) // onChange
    ) {
      refs.current.triggered = true;
      refs.current.cleanupWatchEffect?.();
      refs.current.cleanupWatchEffect = refs.current.onChange(current, prev);
      if (once) {
        refs.current.cleanupDeps?.();
        refs.current.cleanupDeps = null;
        refs.current.cleanupWatchEffect?.();
        refs.current.cleanupWatchEffect = null;
      }
    }
    refs.current.prev = current;
    refs.current.initialized = true;
  }, []);

  check();

  useCleanup(() => {
    refs.current.cleanupDeps?.();
    refs.current.cleanupWatchEffect?.();
    refs.current = null as any;
  });

  return refs.current.prev;
}
