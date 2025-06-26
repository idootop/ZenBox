import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import App from './page.tsx';
import { CounterProvider } from './store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CounterProvider>
      <App />
    </CounterProvider>
  </StrictMode>,
);
