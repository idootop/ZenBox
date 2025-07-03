import {
  createContext,
  type PropsWithChildren,
  useContext,
  useRef,
} from 'react';

import { createStore, type State, type StateSetter, ZenBox } from '../core.js';
import { useCleanup } from '../hooks/useCleanup.js';
import { mergeState } from '../utils.js';

export function createProvider<T extends State>(initialState: T) {
  let currentStore: ZenBox<T> | null = null;

  const getStore = () => currentStore!;
  const getState = () => currentStore?.value!;
  const setState: StateSetter<T> = (newState, options) => {
    currentStore?.setState(newState, options);
  };

  const StoreContext = createContext<ZenBox<T> | null>(null);

  function StoreProvider(
    props: PropsWithChildren<{
      initialState?: Partial<T>;
    }>,
  ) {
    const refs = useRef({
      unsubscribe: null as (() => void) | null,
      store: createStore(mergeState(initialState, props.initialState)),
    });

    refs.current.unsubscribe?.();
    refs.current.unsubscribe = ZenBox.subscribeRead((store) => {
      if (store === refs.current.store) {
        currentStore = store;
      }
    });

    useCleanup(() => {
      refs.current.unsubscribe?.();
    });

    return (
      <StoreContext.Provider value={refs.current.store}>
        {props.children}
      </StoreContext.Provider>
    );
  }

  function useFindStore() {
    const storeContext = useContext(StoreContext);
    if (!storeContext) {
      throw new Error(`useFindStore must be used within StoreProvider`);
    }
    return storeContext;
  }

  return [
    StoreProvider,
    useFindStore,
    { getStore, getState, setState },
  ] as const;
}
