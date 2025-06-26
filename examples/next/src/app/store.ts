import { createProvider, createStore } from 'zenbox';

export const counterStore = createStore({
  count: 0,
  increment: () => {
    counterStore.setState((state) => {
      state.count++;
    });
  },
});

export const [CounterProvider, useGetCounterStore, { setState }] =
  createProvider({
    count: 0,
    increment: () => {
      setState((state) => {
        state.count++;
      });
    },
  });
