import { useCleanup } from './useCleanup.js';

const kGlobalVars = new Map<string, any>();

/**
 * Provide a value to the global scope.
 *
 * @link https://zenbox.del.wang/en/docs/hooks/useProvide
 *
 * @example
 *
 * ```tsx
 * function Parent() {
 *   useProvide("count", 0); // Provide state to child components
 *   return <Child />;
 * }
 *
 * function Child() {
 *   const count = useInject<number>("count"); // Inject state
 *   return <div>Count: {count}</div>;
 * }
 * ```
 */
export function useProvide(key: string, value: any) {
  kGlobalVars.set(key, value);
  useCleanup(() => kGlobalVars.delete(key));
}

/**
 * Inject a value from the global scope.
 *
 * @link https://zenbox.del.wang/en/docs/hooks/useInject
 *
 * @example
 *
 * ```tsx
 * function Parent() {
 *   useProvide("count", 0); // Provide state to child components
 *   return <Child />;
 * }
 *
 * function Child() {
 *   const count = useInject<number>("count"); // Inject state
 *   return <div>Count: {count}</div>;
 * }
 * ```
 */
export function useInject<T = any>(key: string) {
  if (!kGlobalVars.has(key)) {
    throw Error(`useInject: ${key} is not provided`);
  }
  return kGlobalVars.get(key) as T;
}
