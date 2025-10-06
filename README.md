<div align="center">

![ZenBox](https://cdn.jsdelivr.net/gh/idootop/ZenBox@main/website/public/banners/top.png)

<div align="center"><strong>React state management that feels like Vue </strong></div>
<div align="center">Bring Vue's beloved developer experience to the React ecosystem</div>
<br/>

[![中文文档](https://img.shields.io/badge/-中文文档-111111?logo=readdotcv)](https://zenbox.del.wang/cn) [![NPM Version](https://badgen.net/npm/v/zenbox)](https://www.npmjs.com/package/zenbox) [![License](https://img.shields.io/github/license/idootop/zenbox)](https://github.com/idootop/ZenBox/blob/main/LICENSE) [![Built with ZenBox](https://img.shields.io/badge/Built%20with-ZenBox-80d05b?style=social&logo=hackthebox)](https://zenbox.del.wang)

</div>

## The Pain We All Know

- 😢 Missing Vue's beautiful `computed` values in React
- 😤 Writing TypeScript interfaces for every Zustand store
- 🤯 Complex state management that fights against you
- ……

## The Joy of ZenBox

**ZenBox = Code React like Vue 💚 + manage state like Zustand 🐻**

- 💪 **Powerful** - All of Zustand's benefits + more
- 🔥 **Easy to Use** - Where Vue's simplicity meets React's power
- 📦 **Lightweight** - [100 lines of core code](https://zenbox.del.wang/en/blog/react-state-management-in-100-lines), under 3KB gzipped (without Immer)

```ts
// The Store (Auto-type inference!)
const store = createStore({
  count: 0,
  increment: () => {
    store.setState((s) => {
      s.count++;
    });
  },
});

// The Computed (Just like Vue!)
const doubled = useComputed(() => 2 * store.value.count);

// The Watcher (Vue vibes!)
useWatch(
  () => store.value.count,
  (current, prev) => console.log("Count changed from", prev, "to", current)
);
```

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

| Feature            | ZenBox                            | Zustand                       |
| ------------------ | --------------------------------- | ----------------------------- |
| **Learning Curve** | ✅ Vue-familiar                   | ✅ Low                        |
| **Vue-like DX**    | ✅ `useComputed` / `useWatch`     | ❌ None                       |
| **TypeScript**     | ✅ Auto-inference                 | ⚠️ Manual interfaces          |
| **Cross-Store**    | ✅ Auto tracking                  | ❌ Not supported              |
| **State Access**   | ✅ Unified `store.value`          | ⚠️ Explicit `get()` / `set()` |
| **Scoping**        | ✅ Built-in Provider              | ❌ Global by default          |
| **Immer**          | ✅ Built-in                       | ⚠️ Middleware required        |
| **Bundle Size**    | **< 3KB** gzipped (without Immer) | **< 1KB** gzipped             |

## License

MIT License © 2025-PRESENT [Del Wang](https://del.wang)
