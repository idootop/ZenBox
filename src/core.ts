import { shallowEqual } from '@del-wang/equals';
import { enableMapSet, produce } from 'immer';

import { identity, mergeState } from './utils.js';

export type State = Record<any, {}>; // Plain Object

export type StateSetter<S extends State> = (
  newState: Partial<S> | ((prev: S) => S | void),
  options?: { silent?: boolean },
) => void;

export type ReadListener = (store: ZenBox<any>) => void;

interface WriteListener<S extends State, V = S> {
  prev: V;
  select: (state: S) => V;
  equal: (a: V, b: V) => boolean;
  onChange: (current: V, prev: V) => void;
}

export class ZenBox<S extends State> {
  constructor(private _state: S) {
    enableMapSet(); // for immer
  }

  private static _readListeners: Set<ReadListener> = new Set();
  private _writeListeners: Set<WriteListener<S, any>> = new Set();

  get value(): Readonly<S> {
    ZenBox._readListeners.forEach((cb) => cb(this));
    return this._state;
  }

  set value(newState: Partial<S>) {
    this.setState(newState);
  }

  setState: StateSetter<S> = (newState, options) => {
    this._state =
      typeof newState === 'function'
        ? produce(this._state, newState)
        : mergeState(this._state, newState);
    if (options?.silent) return; // skip notify
    for (const listener of this._writeListeners) {
      const { select, equal, onChange, prev } = listener;
      const current = select(this._state);
      if (equal(prev, current)) continue; // no changes
      onChange(current, prev);
      listener.prev = current;
    }
  };

  subscribe = <V = S>(options: {
    onChange: (current: V, prev: V) => void;
    select?: (state: S) => V;
    equal?: (a: V, b: V) => boolean;
  }) => {
    const { onChange, select = identity, equal = shallowEqual } = options;
    const listener = { onChange, select, equal, prev: select(this._state) };
    this._writeListeners.add(listener);
    return () => this._writeListeners.delete(listener);
  };

  static subscribeRead(listener: ReadListener) {
    ZenBox._readListeners.add(listener);
    return () => ZenBox._readListeners.delete(listener);
  }

  static track<T>(scope: () => T) {
    const deps = new Set<ZenBox<any>>();
    const unsubscribe = ZenBox.subscribeRead((dep) => deps.add(dep));
    const result = scope(); // run scope
    unsubscribe();
    return [deps, result] as const;
  }
}

/**
 * Create a new ZenBox store.
 *
 * @link https://zenbox.del.wang/en/docs/core/createStore
 *
 * @example
 *
 * ```tsx
 * const counterStore = createStore({
 *   count: 0,
 *   increment: () => {
 *     counterStore.setState((state) => {
 *       state.count++;
 *     });
 *   },
 * });
 *
 * function App() {
 *   const { count, increment } = useStore(counterStore);
 *   return (
 *     <div>
 *       <div>count: {count}</div>
 *       <button onClick={increment}>Increment</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function createStore<S extends State>(initialState: S) {
  return new ZenBox(initialState);
}
