![ZenBox](/website/public/banners/top.png)

## What is ZenBox?

ZenBox is a modern React state management library that combines the simplicity of Zustand with the reactive patterns of Vue.

Love Zustand & Vue? Meet ZenBox ❤️

### 🐻 Zustand's Simplicity

```ts
const counter = createStore({ count: 0 }); // Auto-type inference
```

### 💚 Vue-like Developer Experience

```ts
const doubled = useComputed(() => counter.value.count * 2);

useWatch(
  () => counter.value.count,
  (current, prev) => console.log("Count changed from", prev, "to", current)
);
```

## Why Choose ZenBox?

- 🚀 **Easy to Use** - Intuitive API for immediate productivity
- ⚡ **High Performance** - Only re-renders what actually changed
- 💪 **TypeScript First** - Full type inference out of the box, zero boilerplate
- 🎯 **Flexible Architecture** - Works for both global and component-level state
- 📦 **Lightweight** - [100 lines of core code](https://zenbox.del.wang/en/blog/react-state-management-in-100-lines), under 3KB gzipped (without Immer)

## Getting Started

👉 Visit [https://zenbox.del.wang](https://zenbox.del.wang) to view the full documentation.

```shell
npm install zenbox
```

## Community & Support

- 🐙 **GitHub**: [idootop/ZenBox](https://github.com/idootop/ZenBox)
- 🐛 **Issues**: [GitHub Issues](https://github.com/idootop/ZenBox/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/idootop/ZenBox/discussions)

## ZenBox vs Zustand

| Feature                  | ZenBox                             | Zustand                        |
| ------------------------ | ---------------------------------- | ------------------------------ |
| **Learning Curve**       | ✅ Minimal (Vue-friendly)          | ✅ Low                         |
| **Vue-like Reactivity**  | ✅ `useComputed`/`useWatch`        | ❌ Manual handling             |
| **TypeScript Support**   | ✅ Complete auto-inference         | ⚠️ Manual interface definition |
| **State Access**         | ✅ Unified `store.value` interface | ❌ Manual `get()`/`set()`      |
| **Cross-Store Computed** | ✅ Automatic dependency tracking   | ⚠️ Requires pre-combination    |
| **Store Scoping**        | ✅ Built-in Provider for isolation | ❌ Global by default           |
| **Immer Integration**    | ✅ Built-in support                | ⚠️ Middleware required         |
| **Bundle Size**          | **< 3KB** gzipped (without Immer)  | **< 1KB** gzipped              |

## License

MIT License © 2025-PRESENT [Del Wang](https://del.wang)
