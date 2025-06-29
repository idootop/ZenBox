# Watch

Render prop component that reactively renders content based on watched data sources.

## Syntax

```tsx
<Watch watch={watchSource} deep={boolean?}>
  {(value) => ReactNode}
</Watch>
```

## Props

- `watch`: Data source to watch (store, function, or any value)
- `deep` (optional): Enable deep equality checking for nested objects
- `children`: Render function that receives the watched value

## Quick Start

### Watch Store Changes

```tsx
import { createStore, Watch } from "zenbox";

const counterStore = createStore({ count: 0 });

function CounterDisplay() {
  return (
    <div>
      <Watch watch={counterStore}>
        {(state) => (
          <div>
            <h1>Count: {state.count}</h1>
            <p>Even: {state.count % 2 === 0 ? "Yes" : "No"}</p>
          </div>
        )}
      </Watch>

      <button onClick={() => counterStore.setState((s) => s.count++)}>
        Increment
      </button>
    </div>
  );
}
```

### Watch Computed Values

```tsx
const userStore = createStore({
  firstName: "John",
  lastName: "Doe",
  age: 30,
});

function UserInfo() {
  return (
    <div>
      <Watch
        watch={() => `${userStore.value.firstName} ${userStore.value.lastName}`}
      >
        {(fullName) => <h1>Welcome, {fullName}!</h1>}
      </Watch>

      <Watch watch={() => userStore.value.age >= 18}>
        {(isAdult) => <p>{isAdult ? "Adult" : "Minor"}</p>}
      </Watch>
    </div>
  );
}
```

### Multi-Store Watching

```tsx
const cartStore = createStore({
  items: [
    { id: 1, name: "Laptop", price: 999, quantity: 1 },
    { id: 2, name: "Mouse", price: 25, quantity: 2 },
  ],
});

const settingsStore = createStore({
  currency: "USD",
  taxRate: 0.08,
});

function CartSummary() {
  return (
    <Watch
      watch={() => ({
        items: cartStore.value.items,
        currency: settingsStore.value.currency,
        taxRate: settingsStore.value.taxRate,
      })}
    >
      {({ items, currency, taxRate }) => {
        const subtotal = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        const tax = subtotal * taxRate;
        const total = subtotal + tax;

        return (
          <div>
            <h3>Cart Summary</h3>
            <p>Items: {items.length}</p>
            <p>
              Subtotal: {subtotal.toFixed(2)} {currency}
            </p>
            <p>
              Tax: {tax.toFixed(2)} {currency}
            </p>
            <p>
              Total: {total.toFixed(2)} {currency}
            </p>
          </div>
        );
      }}
    </Watch>
  );
}
```

### Conditional Rendering

```tsx
const appStore = createStore({
  user: null,
  isLoading: false,
  error: null,
});

function UserProfile() {
  return (
    <Watch watch={() => appStore.value}>
      {({ user, isLoading, error }) => {
        if (isLoading) return <div>Loading user profile...</div>;
        if (error) return <div>Error: {error.message}</div>;
        if (!user) return <div>Please log in</div>;

        return (
          <div>
            <h1>Welcome, {user.name}!</h1>
            <p>Email: {user.email}</p>
          </div>
        );
      }}
    </Watch>
  );
}
```

## Best Practices

1. **Use for complex rendering logic** - Perfect for conditional rendering based on multiple conditions
2. **Keep watch functions pure** - Don't perform side effects in watch functions
3. **Be specific with dependencies** - Only access the data you actually need

## Related

- [`<Memo>`](./Memo.md) - Memoized rendering component
- [`useComputed`](../hooks/useComputed.md) - Computed reactive values
- [`useStoreValue`](../hooks/useStoreValue.md) - Direct store subscription
