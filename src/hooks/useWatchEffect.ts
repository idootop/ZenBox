import { useCallback, useRef } from 'react';

import { ZenBox } from '../core.js';
import { useCleanup } from './useCleanup.js';

export function useWatchEffect(watch: () => void | VoidFunction): void {
  const refs = useRef({
    watch,
    cleanupDeps: null as null | VoidFunction,
    cleanupWatchEffect: null as null | void | VoidFunction,
  });

  refs.current = { ...refs.current, watch };

  const check = useCallback(() => {
    const { watch, cleanupDeps, cleanupWatchEffect } = refs.current;

    // cleanup previous deps and watch effect
    cleanupWatchEffect?.();
    cleanupDeps?.();

    // track deps
    const [deps, _] = ZenBox.track(() => {
      refs.current.cleanupWatchEffect = watch();
    });
    const unsubscribes = Array.from(deps).map((dep) => {
      return dep.subscribe({ onChange: () => check() });
    });
    refs.current.cleanupDeps = () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  check();

  useCleanup(() => {
    refs.current.cleanupDeps?.();
    refs.current.cleanupWatchEffect?.();
    refs.current = null as any;
  });
}
