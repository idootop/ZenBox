# createStore

Create a store instance for state management.

## Syntax

```tsx
const store = createStore(initialState);
```

## Parameters

- `initialState`: Initial state object for the store

## Returns

A `ZenBox` store instance with the following properties and methods:

- `value`: Read-only access to the current state (triggers dependency tracking)
- `setState(updater, options?)`: Update the store state
- `subscribe(options)`: Subscribe to store changes with fine-grained control

## Key Features

- **TypeScript support**: Full type safety with IntelliSense
- **Immutable updates**: Uses Immer for safe state mutations
- **Flexible scope**: Use for global, module-level, or any shared state
- **Reactive tracking**: Automatic dependency tracking for efficient re-renders
- **Fine-grained subscriptions**: Subscribe to specific fields or computed values

## Quick Start

### Basic Usage

```tsx
import { createStore, useStoreValue } from "zenbox";

// Create a store instance with initial state
const counterStore = createStore({ count: 0 });

// Access state directly via store.value property
console.log("Current count:", counterStore.value.count);

function Counter() {
  // Subscribe to store using useStoreValue hook for reactive updates
  const { count } = useStoreValue(counterStore);

  const increment = () => {
    // Update state via store.setState method
    counterStore.setState((state) => {
      state.count++;
    });
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

### With Actions

```tsx
const userStore = createStore({
  // State properties
  name: "Del Wang",
  blog: "https://del.wang",
  follower: 0,

  // Action methods
  follow() {
    userStore.setState((state) => {
      state.follower++;
    });
  },
  async fetchData() {
    const response = await fetch("https://api.github.com/users/del-wang");
    const data = await response.json();
    userStore.setState(data);
  },
});

// Call action methods via store.value
userStore.value.follow();
console.log("Current followers:", userStore.value.follower);
```

### State Updates

#### Function Updates (Recommended)

```tsx
// Use Immer-powered draft mutations for complex updates
store.setState((state) => {
  state.count += 1;
  state.user.name = "Updated";
  state.todos.push({ id: 1, text: "New todo" });
});
```

#### Object Updates

```tsx
const store = createStore({
  name: "John",
  age: 25,
  email: "john@example.com",
  avatar: "avatar.jpg",
});

// Partial object updates - merge with existing state
store.setState({ name: "Jane", age: 30 });
// Result: { name: "Jane", age: 30, email: "john@example.com", avatar: "avatar.jpg" }

// Explicit null/undefined values override existing values
store.setState({ avatar: null });
// Result: { name: "Jane", age: 30, email: "john@example.com", avatar: null }

// Unknown properties are ignored during updates
store.setState({ unknownField: "ignored" }); // No effect
```

#### Silent Updates

```tsx
// Update state without triggering subscriber notifications
store.setState({ cache: data }, { silent: true });
```

## Best Practices

1. **Keep actions with state** - Define methods directly in the initial state object
2. **Use selective subscriptions** - Subscribe only to the data you need
3. **Use function updates** - Leverage Immer for safe mutations and better performance
4. **Batch related updates** - Group related state changes in a single `setState` call
5. **Use `silent: true`** for updates that shouldn't trigger re-renders

## Related

- [`createProvider`](./createProvider.md) - Create component-scoped stores
- [`useStoreValue`](../hooks/useStoreValue.md) - Subscribe to store changes
- [`usePick`](../hooks/usePick.md) - Select specific fields from stores
- [`useWatch`](../hooks/useWatch.md) - Watch computed values and functions
