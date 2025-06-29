

<img alt="ZenBox" src="./assets/zenbox.webp" height='256' />

## What's ZenBox?

A lightweight, intuitive state management library that combines the reactivity of Vue with the simplicity of Zustand for React applications.

### 🐻 Zustand's Simplicity

```ts
const counter = createStore({ count: 0 }); // Full TypeScript inference
```

### ⚡ Vue-like DX

```ts
const doubled = useComputed(() => 2 * counter.value.count);

useWatch(
  () => counter.value.count,
  (current, prev) => console.log("Changed!", current, prev)
);
```

## Getting Started

> [!TIP]
> ✨ Launching soon - stay tuned!

```shell
npm install zenbox
```

## Documentation

- [Core](./docs/core/) - Core API documentation
- [Hooks](./docs/hooks/) - Detailed hook documentation
- [Components](./docs/components/) - Component documentation

## Why Choose ZenBox?

**The state management library that feels like magic** ✨

- 🎯 **Simple API** - Love Zustand & Vue? You’ll ❤️ ZenBox! Combines the best of both worlds in an API that feels natural and intuitive
- ⚡ **Lightning Fast** - Smart selective subscriptions + efficient change detection = blazing performance with minimal re-renders
- 🔮 **Vue-like Magic in React** - Get `useComputed` and `useWatch` reactivity that just works, no manual dependency tracking needed
- 📦 **TypeScript Superpowers** - Full auto-inference out of the box. No interfaces, no generics, no headaches - just pure type safety
- 🏗️ **Mutate Like a Human** - Write `state.count++` instead of `setState(prev => ({...prev, count: prev.count + 1}))`. Immer built-in!
- 🪶 **Featherweight** - Under 100 lines of core code, < 10KB gzipped. Big power, tiny footprint

### ZenBox vs Zustand

| Feature                | ZenBox                               | Zustand                      |
| ---------------------- | ------------------------------------ | ---------------------------- |
| **Simple API**         | ✅ One-line store creation           | ✅ Simple                    |
| **Vue-like DX**        | ✅ `useComputed`/`useWatch`          | ❌ Manual handling           |
| **TypeScript Support** | ✅ Full auto-inference               | ⚠️ Manual interface required |
| **State Mutation**     | ✅ Direct mutation (Vue-like)        | ❌ Manual `.get()`/`.set()`  |
| **Computed Values**    | ✅ Cross-store, auto-tracked         | ⚠️ Pre-combined              |
| **Store Scoping**      | ✅ Built-in Provider for local store | ❌ Global default            |
| **Immer Support**      | ✅ Out of the box                    | ⚠️ Middleware required       |
| **Learning Curve**     | ✅ Minimal (Vue-friendly)            | ✅ Low                       |

## License

MIT License © 2025-PRESENT [Del Wang](https://del.wang)
