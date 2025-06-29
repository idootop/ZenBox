# usePick

Convenient shorthand for `useStoreValue` with selective field subscription. Only re-render when specific fields change.

## Syntax

```tsx
const selectedFields = usePick(store, ...keys);
const selectedFields = usePickDeeply(store, ...keys); // Deep equality checking
```

## Parameters

- `store`: ZenBox store instance
- `...keys`: Field names to pick from the store

## Returns

Object containing only the selected fields from the store.

## Quick Start

### Single Field Selection

```tsx
import { createStore, usePick } from "zenbox";

const userStore = createStore({
  name: "John",
  age: 30,
  email: "john@example.com",
  avatar: "avatar.jpg",
  isOnline: true,
});

function UserName() {
  const { name } = usePick(userStore, "name");
  return <h1>{name}</h1>; // Only re-renders when 'name' changes
}
```

### Multiple Field Selection

```tsx
function UserContact() {
  const { name, email } = usePick(userStore, "name", "email");

  return (
    <div>
      <h2>{name}</h2>
      <p>Email: {email}</p>
    </div>
  ); // Only re-renders when 'name' or 'email' changes
}
```

## Best Practices

1. **Keep field lists minimal** - only pick what you actually use
2. **Use `usePick` over `useStoreValue`** for field selection - more concise
3. **Group related fields** together rather than separate hooks

## Related

- [`useStoreValue`](./useStoreValue.md) - Full store subscription with options
- [`useWatch`](./useWatch.md) - Watch changes without re-rendering
- [`useComputed`](./useComputed.md) - Create computed reactive values
