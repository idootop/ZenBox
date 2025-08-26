/** biome-ignore-all lint/a11y/useButtonType: just do it */
import { act, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useBox } from './useBox.js';

function TestComponent() {
  const box = useBox({ count: 0, name: 'Alice', nested: { value: 42 } });

  return (
    <div>
      <div data-testid="value">{JSON.stringify(box.value)}</div>
      <button
        data-testid="increment"
        onClick={() => {
          box.setState((state) => {
            state.count++;
          });
        }}
      >
        Increment
      </button>
      <button
        data-testid="set-name"
        onClick={() => {
          box.setState({ name: 'Bob' });
        }}
      >
        Set Name
      </button>
      <button
        data-testid="set-nested"
        onClick={() => {
          box.value = { nested: { value: 100 } };
        }}
      >
        Set Nested
      </button>
    </div>
  );
}

describe('useBox', () => {
  it('should get initial value from .value', () => {
    render(<TestComponent />);

    expect(screen.getByTestId('value').textContent).toBe(
      '{"count":0,"name":"Alice","nested":{"value":42}}',
    );
  });

  it('should support partial state updates via .value setter', () => {
    render(<TestComponent />);

    act(() => {
      screen.getByTestId('increment').click();
    });

    expect(screen.getByTestId('value').textContent).toBe(
      '{"count":1,"name":"Alice","nested":{"value":42}}',
    );
  });

  it('should support partial state updates for different fields', () => {
    render(<TestComponent />);

    act(() => {
      screen.getByTestId('set-name').click();
    });

    expect(screen.getByTestId('value').textContent).toBe(
      '{"count":0,"name":"Bob","nested":{"value":42}}',
    );
  });

  it('should support partial state updates for nested objects', () => {
    render(<TestComponent />);

    act(() => {
      screen.getByTestId('set-nested').click();
    });

    expect(screen.getByTestId('value').textContent).toBe(
      '{"count":0,"name":"Alice","nested":{"value":100}}',
    );
  });

  it('should preserve other fields when doing partial updates', () => {
    render(<TestComponent />);

    act(() => {
      screen.getByTestId('increment').click();
    });

    act(() => {
      screen.getByTestId('set-name').click();
    });

    expect(screen.getByTestId('value').textContent).toBe(
      '{"count":1,"name":"Bob","nested":{"value":42}}',
    );
  });
});
