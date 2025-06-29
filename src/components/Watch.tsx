import { useComputed } from '../hooks/useComputed.js';
import type { ResolveZenBox } from '../utils.js';

export function Watch<T>(props: {
  children: (state: ResolveZenBox<T>) => React.ReactNode;
  watch: T | (() => T);
  deep?: boolean;
}) {
  const { children, watch, deep } = props;
  const state = useComputed(watch, { deep });
  return children(state);
}
