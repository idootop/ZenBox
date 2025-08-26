import { useCleanup } from './useCleanup.js';

const kGlobalVars = new Map<string, any>();

export function useProvide(key: string, value: any) {
  kGlobalVars.set(key, value);
  useCleanup(() => kGlobalVars.delete(key));
}

export function useInject<T = any>(key: string) {
  if (!kGlobalVars.has(key)) {
    throw Error(`useInject: ${key} is not provided`);
  }
  return kGlobalVars.get(key) as T;
}
