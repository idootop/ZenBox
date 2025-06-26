'use client';

import type { PropsWithChildren } from 'react';

import { CounterProvider } from './store';

export default function AppProvider({ children }: PropsWithChildren) {
  return (
    <CounterProvider
      initialState={{
        count: 666,
      }}
    >
      {children}
    </CounterProvider>
  );
}
