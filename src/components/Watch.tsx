import { useComputed } from '../hooks/useComputed.js';

export function Watch<T>(props: {
  children: (state: T) => React.ReactNode;
  watch: () => T;
  deep?: boolean;
}) {
  const { children, watch, deep } = props;
  const state = useComputed(watch, { deep });
  return children(state);
}
