import { useCallback, useState } from 'react';

import { useWatch } from './useWatch.js';

export function useComputed<T>(
  compute: () => T,
  options: {
    deep?: boolean;
  } = {},
): T {
  const [_, setState] = useState({});
  const rebuild = useCallback(() => setState({}), []);
  return useWatch(compute, () => rebuild(), options);
}
