---
title: useWatchEffect
description: Reactive side effects with auto-tracking
---

## Syntax

```tsx
useWatchEffect(effect);
```

## Parameters

- `effect`: Function that contains the side effect logic. Can return a cleanup function.

## Key Features

- **Automatic dependency tracking**: No need to manually specify dependencies
- **Immediate execution**: Runs immediately when the component mounts
- **Cleanup support**: Return a cleanup function for proper resource management
- **No re-renders**: Only executes side effects, doesn't trigger component re-renders

## Quick Start

### Simple Side Effect

```tsx
import { createStore, useWatchEffect } from "zenbox";

const userStore = createStore({
  name: "John",
  isOnline: false,
});

function UserStatusTracker() {
  useWatchEffect(() => {
    // Automatically tracks userStore.value access
    document.title = `${userStore.value.name} - ${
      userStore.value.isOnline ? "Online" : "Offline"
    }`;
  });

  return <div>Status tracker active</div>;
}
```

### With Cleanup

```tsx
const settingsStore = createStore({
  autoSave: true,
  saveInterval: 30000,
});

function AutoSaveEffect() {
  useWatchEffect(() => {
    if (!settingsStore.value.autoSave) return;

    console.log(
      `Setting up auto-save every ${settingsStore.value.saveInterval}ms`
    );

    const interval = setInterval(() => {
      console.log("Auto-saving...");
      // Perform save operation
    }, settingsStore.value.saveInterval);

    // Cleanup function
    return () => {
      console.log("Cleaning up auto-save interval");
      clearInterval(interval);
    };
  });

  return <div>Auto-save effect active</div>;
}
```



## Best Practices

✅ **Keep effects focused** - Each effect should handle one specific concern

```tsx
// Good - focused effect
useWatchEffect(() => {
  document.title = `${userStore.value.name} - App`;
});
```

✅ **Return cleanup functions** - Always clean up resources

```tsx
// Good - with cleanup
useWatchEffect(() => {
  const interval = setInterval(() => {}, 1000);
  return () => clearInterval(interval);
});
```

✅ **Handle conditional logic** - Use early returns

```tsx
// Good - conditional logic
useWatchEffect(() => {
  if (!settingsStore.value.enabled) return;
  // ... rest of effect
});
```

❌ **Don't modify reactive state inside effects**

```tsx
// Bad - creates infinite loop
useWatchEffect(() => {
  const count = counterStore.value.count;
  counterStore.setState((state) => {
    state.count = count + 1; // This will trigger the effect again!
  });
});
```

❌ **Don't use for component rendering state**

```tsx
// Bad - use useStoreValue instead
const [displayValue, setDisplayValue] = useState("");
useWatchEffect(() => {
  setDisplayValue(store.value.data); // Unnecessary setState
});
```

## Comparison with Other Hooks

| Hook             | Dependency Tracking | Immediate Execution | Re-renders | Use Case                    |
| ---------------- | ------------------- | ------------------- | ---------- | --------------------------- |
| `useWatchEffect` | ✅ Automatic        | ✅ Yes              | ❌ No      | Auto-tracking side effects  |
| `useWatch`       | ❌ Manual           | ❌ No               | ❌ No      | Manual dependency watching  |
| `useEffect`      | ❌ Manual           | ✅ Yes              | ❌ No      | React-specific side effects |
| `useStoreValue`  | ❌ Manual           | ✅ Yes              | ✅ Yes     | Component state sync        |

## Related

- [`useWatch`](./useWatch.md) - Manual dependency watching with callbacks
- [`useStoreValue`](./useStoreValue.md) - Subscribe to changes with re-rendering
- [`useComputed`](./useComputed.md) - Create computed reactive values
