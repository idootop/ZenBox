import type { ZenBox } from '../core.js';
import type { Prettify } from '../utils.js';
import { useComputed } from './useComputed.js';

export function useStoreValue<
  S extends ZenBox<any>,
  const K extends (keyof S['value'])[] | undefined = undefined,
>(
  store: S,
  options: {
    pick?: K;
    deep?: boolean;
  } = {},
) {
  const { pick, deep } = options;
  return useComputed(
    () =>
      // biome-ignore lint/performance/noAccumulatingSpread: just do it
      pick?.reduce((acc, key) => ({ ...acc, [key]: store.value[key] }), {}) ??
      store.value,
    { deep },
  ) as K extends (keyof S['value'])[]
    ? Prettify<Pick<S['value'], K[number]>>
    : S['value'];
}
