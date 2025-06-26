import type { ZenBox } from '../core.js';
import type { Prettify } from '../utils.js';
import { useStore } from './useStore.js';

export function usePick<
  S extends ZenBox<any>,
  const K extends (keyof S['value'])[],
>(store: S, ...picks: K) {
  return useStore(store, {
    deep: false,
    pick: picks.length === 0 ? undefined : picks,
  }) as unknown as K extends []
    ? S['value']
    : Prettify<Pick<S['value'], K[number]>>;
}

export function usePickDeeply<
  S extends ZenBox<any>,
  const K extends (keyof S['value'])[],
>(store: S, ...picks: K) {
  return useStore(store, {
    deep: true,
    pick: picks.length === 0 ? undefined : picks,
  }) as unknown as K extends []
    ? S['value']
    : Prettify<Pick<S['value'], K[number]>>;
}
