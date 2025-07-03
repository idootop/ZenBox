// @ts-nocheck
/** biome-ignore-all lint/correctness/useHookAtTopLevel: just do it */
/** biome-ignore-all lint/correctness/useExhaustiveDependencies: just do it */
import { useEffect, useRef } from 'react';

export const kIsReactDev =
  typeof window !== 'undefined' &&
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
  (__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers?.get(1)?.bundleType === 1 || // Chrome, Firefox
    __REACT_DEVTOOLS_GLOBAL_HOOK__.renderers?.get(1) == null); // Safari

export function useCleanup(cleanup: () => void) {
  if (kIsReactDev) {
    return _useCleanup(cleanup);
  }
  return useEffect(() => cleanup, []);
}

function _useCleanup(cleanup: () => void) {
  const refs = useRef({
    step1: 0,
    step2: 0,
  });

  useEffect(() => {
    refs.current.step1++;
    return () => {
      refs.current.step2++;
      setTimeout(() => {
        if (refs.current.step1 === refs.current.step2) {
          cleanup();
          refs.current.step2++;
        }
      });
    };
  }, []);
}
