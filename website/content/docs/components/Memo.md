---
title: Memo
description: Memoized rendering component that caches children and only re-renders when watched dependencies change
---

# Memo

Memoized rendering component that caches children and only re-renders when watched dependencies change. Perfect for optimizing expensive computations.

## Syntax

```tsx
<Memo watch={watchSource} deep={boolean?}>
  {(value) => ReactNode}
</Memo>
```

## Props

- `watch`: Data source to watch (store, function, or any value)
- `deep` (optional): Enable deep equality checking for nested objects
- `children`: Render function that receives the watched value

## Key Features

- **Memoization**: Caches rendered output and reuses it when dependencies haven't changed
- **Performance optimization**: Prevents unnecessary re-renders of expensive components
- **Automatic dependency tracking**: Tracks stores accessed in the watch function
- **Memory efficient**: Only stores the last rendered result

## Quick Start

### Expensive Component Optimization

```tsx
import { createStore, Memo } from "zenbox";

const dataStore = createStore({
  items: Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    value: Math.random(),
    name: `Item ${i}`,
  })),
  threshold: 0.5,
});

function ExpensiveVisualization() {
  return (
    <div>
      <h2>Data Visualization</h2>

      <Memo
        watch={() => ({
          items: dataStore.value.items,
          threshold: dataStore.value.threshold,
        })}
      >
        {({ items, threshold }) => {
          console.log("Rendering expensive visualization..."); // Only logs when dependencies change

          // Expensive computation
          const processedItems = items
            .filter((item) => item.value > threshold)
            .map((item) => ({
              ...item,
              processed: Math.pow(item.value, 2) * Math.sin(item.id),
            }))
            .sort((a, b) => b.processed - a.processed);

          return (
            <div className="expensive-chart">
              <h3>Processed Items ({processedItems.length})</h3>
              {processedItems.slice(0, 20).map((item) => (
                <div key={item.id} className="chart-item">
                  {item.name}: {item.processed.toFixed(4)}
                </div>
              ))}
            </div>
          );
        }}
      </Memo>
    </div>
  );
}
```

### Multi-Store Memoization

```tsx
const cartStore = createStore({
  items: [
    { id: 1, name: "Laptop", price: 999, quantity: 1, category: "Electronics" },
    { id: 2, name: "Mouse", price: 25, quantity: 2, category: "Electronics" },
  ],
});

const settingsStore = createStore({
  currency: "USD",
  taxRate: 0.08,
  discountPercent: 0.1,
});

function CartSummary() {
  return (
    <Memo
      watch={() => ({
        items: cartStore.value.items,
        settings: settingsStore.value,
      })}
    >
      {({ items, settings }) => {
        console.log("Rendering complex cart summary..."); // Only when dependencies change

        // Complex calculations
        const subtotal = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        const discount = subtotal * settings.discountPercent;
        const tax = (subtotal - discount) * settings.taxRate;
        const total = subtotal - discount + tax;

        return (
          <div className="cart-summary">
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <span>{item.name}</span>
                  <span>
                    {item.quantity} × {settings.currency} {item.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="cart-totals">
              <div>
                Subtotal: {settings.currency} {subtotal.toFixed(2)}
              </div>
              <div>
                Discount: -{settings.currency} {discount.toFixed(2)}
              </div>
              <div>
                Tax: {settings.currency} {tax.toFixed(2)}
              </div>
              <div>
                <strong>
                  Total: {settings.currency} {total.toFixed(2)}
                </strong>
              </div>
            </div>
          </div>
        );
      }}
    </Memo>
  );
}
```

## Performance Comparison

```tsx
// Without Memo - re-renders on every parent update
function ExpensiveComponentWithoutMemo() {
  const data = useStoreValue(dataStore);
  console.log("Expensive computation running..."); // Runs on every render

  const processedData = data.items
    .filter((item) => item.value > data.threshold)
    .map((item) => ({ ...item, processed: Math.pow(item.value, 2) }));

  return <div>{processedData.length} items processed</div>;
}

// With Memo - only re-renders when dependencies change
function ExpensiveComponentWithMemo() {
  return (
    <Memo watch={() => dataStore.value}>
      {(data) => {
        console.log("Expensive computation running..."); // Only runs when data changes

        const processedData = data.items
          .filter((item) => item.value > data.threshold)
          .map((item) => ({ ...item, processed: Math.pow(item.value, 2) }));

        return <div>{processedData.length} items processed</div>;
      }}
    </Memo>
  );
}
```

## Best Practices

✅ **Use for expensive computations** - Perfect for components with heavy calculations

```tsx
// Good - expensive computation that benefits from memoization
<Memo watch={() => dataStore.value}>
  {(data) => {
    const expensiveResult = heavyComputation(data);
    return <ComplexChart data={expensiveResult} />;
  }}
</Memo>
```

❌ **Don't use for frequently changing data**

```tsx
// Bad - counter changes frequently, memoization is useless
<Memo watch={() => counterStore.value.count}>
  {(count) => <div>{count}</div>}
</Memo>
```

✅ **Be specific with dependencies** - Only watch data that affects rendered output

```tsx
// Good - specific dependencies
<Memo
  watch={() => ({ items: store.value.items, threshold: store.value.threshold })}
>
  {({ items, threshold }) => (
    <ProcessedList items={items} threshold={threshold} />
  )}
</Memo>
```

## When to Use Memo vs Other Options

| Use Case               | Recommended Approach           | Why                                               |
| ---------------------- | ------------------------------ | ------------------------------------------------- |
| Expensive calculations | `<Memo>`                       | Caching prevents repeated computations            |
| Simple store access    | `usePick` or `useStoreValue`   | Less overhead for simple cases                    |
| Side effects           | `useWatch` or `useWatchEffect` | Memo is for rendering, not side effects           |
| Always changing data   | Regular components             | Memoization won't help if data changes frequently |

## Related

- [`<Watch>`](./Watch.md) - Render prop component without memoization
- [`useComputed`](../hooks/useComputed.md) - Computed reactive values
- [`useStoreValue`](../hooks/useStoreValue.md) - Direct store subscription
