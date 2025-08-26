import { useRef } from 'react';

import { createStore, type State } from '../core.js';
import { useStore } from './useStore.js';

export function useBox<S extends State>(
  initialState: S,
  options?: { deep?: boolean },
) {
  const ref = useRef(createStore(initialState));
  useStore(ref.current, options);
  return ref.current;
}
