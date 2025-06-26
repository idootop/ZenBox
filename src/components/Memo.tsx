import { type ReactNode, useState } from 'react';

import { useWatch } from '../hooks/useWatch.js';
import { NULL } from '../utils.js';

export function Memo<T>(props: {
  children: (state: T) => ReactNode;
  watch: () => T;
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
