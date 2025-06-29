import { useCallback, useState } from 'react';

import type { ResolveZenBox } from '../utils.js';
import { useWatch } from './useWatch.js';

export function useComputed<T>(
  compute: T | (() => T),
  options: {
    deep?: boolean;
  } = {},
): ResolveZenBox<T> {
  const [_, setState] = useState({});
  const rebuild = useCallback(() => setState({}), []);
  return useWatch(compute, () => rebuild(), options);
}
