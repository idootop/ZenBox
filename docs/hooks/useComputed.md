# useComputed

Create computed reactive values that automatically update when dependencies change.

## Syntax

```tsx
const computedValue = useComputed(compute, options?)
```

## Parameters

- `compute`: Function or value to compute
- `options` (optional):
  - `deep`: Enable deep equality checking for nested objects/arrays

## Key Features

- **Automatic dependency tracking**: Tracks which stores are accessed
- **Triggers re-renders**: Causes component re-renders when dependencies change
- **Multi-store support**: Can combine data from multiple stores

## Quick Start

### Simple Computed Value

```tsx
import { createStore, useComputed } from "zenbox";

const userStore = createStore({
  firstName: "John",
  lastName: "Doe",
  age: 30,
});

function UserProfile() {
  const fullName = useComputed(() => {
    return `${userStore.value.firstName} ${userStore.value.lastName}`;
  });

  const ageGroup = useComputed(() => {
    const age = userStore.value.age;
    return age < 18 ? "Minor" : age < 65 ? "Adult" : "Senior";
  });

  return (
    <div>
      <h1>{fullName}</h1>
      <p>Age Group: {ageGroup}</p>
    </div>
  );
}
```

### Multi-Store Computation

```tsx
const cartStore = createStore({
  items: [
    { id: 1, price: 999, quantity: 1 },
    { id: 2, price: 25, quantity: 2 },
  ],
});

const settingsStore = createStore({
  taxRate: 0.08,
  discountPercent: 0.1,
});

function CartSummary() {
  const subtotal = useComputed(() => {
    return cartStore.value.items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
  });

  const total = useComputed(() => {
    const discount = subtotal * settingsStore.value.discountPercent;
    const tax = (subtotal - discount) * settingsStore.value.taxRate;
    return subtotal - discount + tax;
  });

  return (
    <div>
      <p>Subtotal: ${subtotal.toFixed(2)}</p>
      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
}
```

## Best Practices

✅ **Keep computations pure** - No side effects

```tsx
const good = useComputed(() => store.value.count * 2);
```

❌ **Don't perform side effects**

```tsx
const bad = useComputed(() => {
  localStorage.setItem("count", store.value.count); // Side effect!
  return store.value.count;
});
```

✅ **Be specific with dependencies**

```tsx
const specific = useComputed(() => userStore.value.name.toUpperCase());
```

❌ **Avoid broad dependencies**

```tsx
const broad = useComputed(() => {
  const user = userStore.value; // Depends on entire user object
  return user.name.toUpperCase(); // Only needs name
});
```

## Comparison with Other Hooks

| Hook            | Purpose                   | Re-renders |
| --------------- | ------------------------- | ---------- |
| `useComputed`   | Computed reactive values  | ✅ Yes     |
| `useStoreValue` | Direct store subscription | ✅ Yes     |
| `useWatch`      | Side effects on changes   | ❌ No      |

## Related

- [`useStoreValue`](./useStoreValue.md) - Direct store subscription
- [`useWatch`](./useWatch.md) - Watch changes with callbacks
- [`useWatchEffect`](./useWatchEffect.md) - Reactive side effects
