/** biome-ignore-all lint/a11y/useButtonType: just do it */
/** biome-ignore-all lint/correctness/useHookAtTopLevel: just do it */
import { act, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { beforeEach, describe, expect, it } from 'vitest';

import { useInject, useProvide } from './useProvide.js';

let ctx: { injectedValue?: string; error?: Error } = {};

function ConsumerComponent({ injectKey }: { injectKey: string }) {
  let injectedValue: string | undefined;
  let error: Error | undefined;

  try {
    injectedValue = useInject(injectKey);
  } catch (e) {
    error = e as Error;
  }

  ctx.injectedValue = injectedValue;
  ctx.error = error;

  return <div data-testid="consumer">{JSON.stringify(injectedValue)}</div>;
}

function TestApp({
  value,
  provideKey,
  injectKey,
}: {
  value: any;
  provideKey: string;
  injectKey: string;
}) {
  useProvide(provideKey, value);
  return <ConsumerComponent injectKey={injectKey} />;
}

describe('useProvide and useInject', () => {
  beforeEach(() => {
    ctx = {};
  });

  describe('basic functionality', () => {
    it('should be able to provide and inject simple values', () => {
      render(
        <TestApp
          injectKey="test-key"
          provideKey="test-key"
          value="test-value"
        />,
      );
      expect(ctx.error).toBeUndefined();
      expect(ctx.injectedValue).toBe('test-value');
      expect(screen.getByTestId('consumer').textContent).toBe('"test-value"');
    });

    it('should be able to provide and inject complex objects', () => {
      const testObject = {
        name: 'test',
        count: 42,
        nested: { value: 'nested' },
      };

      render(
        <TestApp
          injectKey="test-key"
          provideKey="test-key"
          value={testObject}
        />,
      );

      expect(ctx.injectedValue).toEqual(testObject);
      expect(screen.getByTestId('consumer').textContent).toBe(
        JSON.stringify(testObject),
      );
    });

    it('should be able to inject the latest value', () => {
      function MyApp() {
        const [value, setValue] = useState('test-value');
        return (
          <div>
            <button onClick={() => setValue('new-value')}>Change Value</button>
            <TestApp injectKey="test-key" provideKey="test-key" value={value} />
          </div>
        );
      }

      render(<MyApp />);

      expect(ctx.injectedValue).toBe('test-value');

      act(() => {
        screen.getByText('Change Value').click();
      });

      expect(ctx.injectedValue).toBe('new-value');
    });
  });

  describe('error handling', () => {
    it('should throw error when value is not provided', () => {
      const results: { error?: Error } = {};

      function ConsumerComponent() {
        let error: Error | undefined;

        try {
          useInject('non-existent-key');
        } catch (e) {
          error = e as Error;
        }

        results.error = error;
        return <div>Consumer</div>;
      }

      render(<ConsumerComponent />);

      expect(results.error).toBeDefined();
      expect(results.error?.message).toBe(
        'useInject: non-existent-key is not provided',
      );
    });
  });

  describe('multiple key handling', () => {
    it('should be able to provide and inject multiple different values simultaneously', () => {
      const values: Record<string, any> = {};

      function ConsumerComponent() {
        values.string = useInject<string>('string-key');
        values.number = useInject<number>('number-key');
        values.object = useInject<{ test: boolean }>('object-key');
        return <div data-testid="consumer">Multiple values injected</div>;
      }

      function TestApp() {
        useProvide('string-key', 'string-value');
        useProvide('number-key', 123);
        useProvide('object-key', { test: true });
        return <ConsumerComponent />;
      }

      render(<TestApp />);

      expect(values.string).toBe('string-value');
      expect(values.number).toBe(123);
      expect(values.object).toEqual({ test: true });
    });

    it('should be able to override values for the same key', () => {
      let injectedValue: string | undefined;

      function FirstProviderComponent() {
        useProvide('same-key', 'first-value');
        return <div>First Provider</div>;
      }

      function SecondProviderComponent() {
        useProvide('same-key', 'second-value');
        return <div>Second Provider</div>;
      }

      function ConsumerComponent() {
        injectedValue = useInject<string>('same-key');
        return <div data-testid="consumer">{injectedValue}</div>;
      }

      function TestApp() {
        return (
          <div>
            <FirstProviderComponent />
            <SecondProviderComponent />
            <ConsumerComponent />
          </div>
        );
      }

      render(<TestApp />);

      // Second provider should override the first
      expect(injectedValue).toBe('second-value');
    });
  });
});
