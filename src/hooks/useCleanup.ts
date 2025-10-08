/** biome-ignore-all lint/correctness/useHookAtTopLevel: just do it */
import { useEffect, useRef } from 'react';

/**
 * Setup a cleanup function that will be called the component unmounts.
 *
 * Also works in **React Strict Mode** to ensure the cleanup function is called only once.
 */
export function useCleanup(cleanup: () => void) {
  // @ts-ignore
  if (process.env.NODE_ENV === 'production') {
    return useEffect(() => cleanup, []); // react strict mode only enable in development
  }
  const refs = useRef({ render: 0, mount: 0, strictMode: false });
  if (refs.current.mount < 1) {
    refs.current.render++;
    if (refs.current.render > 1) refs.current.strictMode = true;
  }
  useEffect(() => {
    refs.current.mount++;
    return () => {
      if (refs.current.strictMode && refs.current.mount !== 2) {
        return; // in react strict mode, we need to cleanup after the second mount
      }
      cleanup();
    };
  }, []);
}
