/** biome-ignore-all lint/a11y/useButtonType: just do it */
'use client';

import { useRef } from 'react';
import { useComputed, usePick, useWatch, useWatchEffect } from 'zenbox';

import styles from './page.module.css';
import { counterStore, useGetCounterStore } from './store';

export default function Home() {
  console.log('>>> build home page');

  useWatch(
    () => counterStore.value,
    (v) => {
      console.log('>>> watch counter store', v.count);
      return () => {
        console.log('>>> unwatch counter store');
      };
    },
  );

  const n = useRef(0);
  const store = useGetCounterStore();
  useWatch(
    () => store.value,
    (v) => {
      console.log('>>> watch counter store2', v.count);
      n.current += 666;
      console.log('>>> n.current', n.current);
      return () => {
        console.log('>>> unwatch counter store2');
      };
    },
    { immediate: true },
  );

  useWatchEffect(() => {
    console.log(
      '>>> watch effect',
      counterStore.value.count,
      store.value.count,
    );
    return () => {
      console.log('>>> unwatch effect');
    };
  });

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>n: {n.current}</h1>
        <Counter />
        <Display />
        <Counter2 />
        <Display2 />
        <Display3 />
      </main>
    </div>
  );
}

function Display() {
  console.log('>>> build display');
  const { count } = usePick(counterStore, 'count');
  return <div>Count: {count}</div>;
}

function Counter() {
  console.log('>>> build counter');
  return (
    <div>
      <button
        onClick={() => {
          counterStore.value.increment();
        }}
        style={{
          backgroundColor: 'black',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
        }}
      >
        +1
      </button>
    </div>
  );
}

function Display2() {
  console.log('>>> build display2');
  const store = useGetCounterStore();
  const { count } = usePick(store, 'count');
  return <div>Count: {count}</div>;
}

function Counter2() {
  console.log('>>> build counter2');
  const store = useGetCounterStore();
  return (
    <div>
      <button
        onClick={() => {
          store.value.increment();
        }}
        style={{
          backgroundColor: 'black',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
        }}
      >
        +1
      </button>
    </div>
  );
}

function Display3() {
  console.log('>>> build display3');
  const store = useGetCounterStore();
  const count = useComputed(() => {
    console.log(
      '>>> compute count',
      store.value.count,
      counterStore.value.count,
    );
    return store.value.count + counterStore.value.count;
  });
  return <div>Count: {count}</div>;
}
