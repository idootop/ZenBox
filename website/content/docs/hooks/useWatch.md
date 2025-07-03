---
title: useWatch
description: Watch reactive data sources and execute callbacks when changes occur
---

# useWatch

Watch reactive data sources and execute callbacks when changes occur. Does **not** trigger component re-renders.

## Syntax

```tsx
const currentValue = useWatch(watchSource, callback, options?)
```

## Parameters

- `watchSource`: Store instance, computed function, or array of sources to watch
- `callback`: Function to execute when watched data changes. Can return a cleanup function
- `options` (optional):
  - `immediate`: Execute callback immediately with current value
  - `once`: Execute callback only once, then stop watching
  - `deep`: Use deep equality checking for nested objects

## Quick Start

### Watch Store Changes

```tsx
import { createStore, useWatch } from "zenbox";

const counterStore = createStore({ count: 0 });

function Counter() {
  // Watch store changes without re-rendering
  useWatch(counterStore, (current, prev) => {
    console.log("Counter changed:", current.count, "was:", prev.count);
  });

  return (
    <button
      onClick={() => {
        counterStore.setState((s) => s.count++);
      }}
    >
      Increment
    </button>
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

function UserWatcher() {
  // Watch a computed value
  useWatch(
    () => `${userStore.value.firstName} ${userStore.value.lastName}`,
    (fullName, prevFullName) => {
      console.log(`Name changed from "${prevFullName}" to "${fullName}"`);
    }
  );

  // Watch age changes for specific logic
  useWatch(
    () => userStore.value.age,
    (age, prevAge) => {
      if (age >= 18 && prevAge < 18) {
        console.log("User became an adult!");
      }
    }
  );

  return <div>Watching user changes...</div>;
}
```

### Watch Multiple Sources

```tsx
const userStore = createStore({ name: "John", role: "user" });
const settingsStore = createStore({ theme: "light", language: "en" });

function MultiSourceWatcher() {
  useWatch(
    () => [userStore, settingsStore],
    ([user, settings], [prevUser, prevSettings]) => {
      if (user.role !== prevUser.role) {
        console.log(`Role changed: ${prevUser.role} → ${user.role}`);
      }

      if (settings.theme !== prevSettings.theme) {
        console.log(`Theme changed: ${prevSettings.theme} → ${settings.theme}`);
        document.body.className = settings.theme;
      }
    }
  );

  return <div>Watching multiple stores...</div>;
}
```

### With Cleanup

The callback function can optionally return a cleanup function that will be executed before the next callback run or when the component unmounts:

```tsx
useWatch(
  () => store.value.userId,
  (userId, prevUserId) => {
    // Setup side effect
    const subscription = subscribeToUser(userId);

    // Return cleanup function
    return () => {
      subscription.unsubscribe();
    };
  }
);
```

## Options

### Immediate Execution

```tsx
useWatch(
  () => userStore.value.name,
  (name) => console.log("Current name:", name),
  { immediate: true } // Executes immediately with current value
);
```

### One-time Watcher

```tsx
useWatch(
  () => userStore.value.isLoggedIn,
  (isLoggedIn) => {
    if (isLoggedIn) {
      console.log("User logged in for the first time!");
    }
  },
  { once: true } // Only executes once
);
```

### Deep Equality Checking

The `deep` option uses deep equality comparison to determine if the watched value has actually changed. This prevents unnecessary callback executions when nested objects are recreated but contain the same values.

```tsx
const appStore = createStore({
  user: {
    profile: { name: "John", avatar: "avatar.jpg" },
  },
});

useWatch(
  () => appStore.value.user,
  (user, prevUser) => {
    console.log("User object reference changed with different content");
  },
  { deep: true }
);

// Example: This will NOT trigger the callback because deep content is the same
appStore.setState((state) => {
  // Creating new object with same content
  state.user = {
    profile: { name: "John", avatar: "avatar.jpg" },
  };
});

// Example: This WILL trigger the callback because deep content is different
appStore.setState((state) => {
  state.user.profile.name = "Alice";
});
```

**Without `deep: true`** (default behavior):

```tsx
useWatch(
  () => appStore.value.user,
  (user, prevUser) => {
    console.log("User object reference changed (regardless of content)");
  }
  // No deep option - uses reference equality
);

// This WILL trigger the callback even though content is identical
appStore.setState((state) => {
  state.user = { ...state.user }; // New reference, same content
});
```

## Best Practices

✅ **Use for side effects only** - Not for component state that affects rendering

```tsx
// Good - side effect
useWatch(
  () => store.value.theme,
  (theme) => {
    document.body.className = theme;
  }
);
```

❌ **Don't use for rendering state**

```tsx
// Bad - use useStoreValue instead
const [displayValue, setDisplayValue] = useState("");
useWatch(
  () => store.value.data,
  (data) => setDisplayValue(data)
);
```

✅ **Be specific with watchers**

```tsx
// Good - specific field
useWatch(
  () => userStore.value.name,
  (name) => updateTitle(name)
);
```

❌ **Avoid watching large objects**

```tsx
// Bad - triggers on any change
useWatch(
  () => largeStore.value,
  (store) => console.log("Changed")
);
```

✅ **Always cleanup side effects**

```tsx
// Good - proper cleanup
useWatch(
  () => store.value.connectionId,
  (id) => {
    const connection = createConnection(id);
    return () => connection.close();
  }
);
```

## Comparison with Other Hooks

| Hook             | Purpose                      | Re-renders | Use Case                         |
| ---------------- | ---------------------------- | ---------- | -------------------------------- |
| `useWatch`       | Execute callbacks on changes | ❌ No      | Side effects, logging, API calls |
| `useWatchEffect` | Reactive side effects        | ❌ No      | Auto-tracking dependencies       |
| `useStoreValue`  | Subscribe to store changes   | ✅ Yes     | Component state synchronization  |
| `useComputed`    | Computed reactive values     | ✅ Yes     | Derived state for rendering      |

## Related

- [`useStoreValue`](./useStoreValue.md) - Subscribe to changes with re-rendering
- [`useWatchEffect`](./useWatchEffect.md) - Reactive side effects with auto-tracking
- [`useComputed`](./useComputed.md) - Create computed reactive values
