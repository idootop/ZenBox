/** biome-ignore-all lint/correctness/useHookAtTopLevel: just do it */
import type { ZenBox } from '../core.js';
import type { Prettify } from '../utils.js';
import { useComputed } from './useComputed.js';

export function useStore<S extends ZenBox<any>, D>(
  store: S,
  selector: (state: S['value']) => D,
  options?: { deep?: boolean },
): D;

export function useStore<
  S extends ZenBox<any>,
  const K extends (keyof S['value'])[] | undefined = undefined,
>(
  store: S,
  options?: { pick?: K; deep?: boolean },
): K extends (keyof S['value'])[]
  ? Prettify<Pick<S['value'], K[number]>>
  : S['value'];

export function useStore<
  S extends ZenBox<any>,
  D = any,
  K extends readonly (keyof S['value'])[] = any,
>(
  store: S,
  arg2?: ((state: S['value']) => D) | { pick?: K; deep?: boolean },
  arg3?: { deep?: boolean },
): any {
  if (typeof arg2 === 'function') {
    const selector = arg2 as (state: S['value']) => D;
    return useComputed(() => selector(store.value), arg3) as D;
  }
  const { pick, deep } = (arg2 as { pick?: K; deep?: boolean }) || {};
  return useComputed(
    () =>
      pick?.reduce((acc, key) => ({ ...acc, [key]: store.value[key] }), {}) ??
      store.value,
    { deep },
  );
}

/**
 * @deprecated Please use useStore instead, will be removed in v2.0
 */
export const useStoreValue = useStore;
