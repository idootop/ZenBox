import { type ReactNode, useState } from 'react';

import { useWatch } from '../hooks/useWatch.js';
import { NULL, type ResolveZenBox } from '../utils.js';

export function Memo<T>(props: {
  children: (state: ResolveZenBox<T>) => ReactNode;
  watch: T | (() => T);
  deep?: boolean;
}) {
  const { children, watch, deep } = props;
  const [value, setValue] = useState<ReactNode | typeof NULL>(NULL);
  const state = useWatch(
    watch,
    (current) => {
      setValue(children(current));
    },
    { deep },
  );
  return value === NULL ? children(state) : value;
}
