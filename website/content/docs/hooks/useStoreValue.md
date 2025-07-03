---
title: useStoreValue
description: Subscribe to store changes and automatically trigger component re-renders
---

# useStoreValue

Subscribe to store changes and automatically trigger component re-renders.

## Syntax

```tsx
const state = useStoreValue(store, options?)
```

## Parameters

- `store`: ZenBox store instance
- `options` (optional):
  - `pick`: Array of keys to watch selectively
  - `deep`: Enable deep equality checking for nested objects

## Returns

Current store state or selected fields based on the `pick` option.

## Quick Start

### Subscribe to Entire Store

```tsx
import { createStore, useStoreValue } from "zenbox";

const userStore = createStore({
  name: "John",
  age: 30,
  email: "john@example.com",
});

function UserProfile() {
  const user = useStoreValue(userStore);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Age: {user.age}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

### Selective Subscription

```tsx
function UserName() {
  // Only re-render when 'name' changes
  const { name } = useStoreValue(userStore, {
    pick: ["name"],
  });

  return <h1>{name}</h1>;
}

function UserContact() {
  // Only re-render when 'name' or 'email' changes
  const { name, email } = useStoreValue(userStore, {
    pick: ["name", "email"],
  });

  return (
    <div>
      <p>{name}</p>
      <p>{email}</p>
    </div>
  );
}
```

## Best Practices

1. **Use `pick` for performance** - only subscribe to fields you use
2. **Prefer `usePick`** for simple field selection - more concise
3. **Group related fields** together rather than separate hooks
4. **Avoid deep watching unless necessary** - more expensive than shallow

## Comparison with Other Hooks

| Hook            | Purpose                              | Re-renders |
| --------------- | ------------------------------------ | ---------- |
| `useStoreValue` | Subscribe to store changes           | ✅ Yes     |
| `useWatch`      | Watch changes with callbacks         | ❌ No      |
| `usePick`       | Shorthand for selective subscription | ✅ Yes     |
| `useComputed`   | Create computed reactive values      | ✅ Yes     |

## Related

- [`usePick`](./usePick.md) - Convenient shorthand for field selection
- [`useWatch`](./useWatch.md) - Watch changes without re-rendering
- [`useComputed`](./useComputed.md) - Create computed reactive values
