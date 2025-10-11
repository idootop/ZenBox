<div align="center">

![ZenBox](https://cdn.jsdelivr.net/gh/idootop/ZenBox@main/website/public/banners/top.png)

<div align="center"><strong>React state management that feels like Vue + Zustand</strong></div>
<div align="center">Bringing Zustand's simplicity and Vue's joyful developer experience to React</div>
<br/>

[![中文文档](https://img.shields.io/badge/-中文文档-111111?logo=readdotcv)](https://zenbox.del.wang/cn) [![NPM Version](https://badgen.net/npm/v/zenbox)](https://www.npmjs.com/package/zenbox) [![License](https://img.shields.io/github/license/idootop/zenbox)](https://github.com/idootop/ZenBox/blob/main/LICENSE) [![Built with ZenBox](https://img.shields.io/badge/Built%20with-ZenBox-80d05b?style=social&logo=hackthebox)](https://zenbox.del.wang)

</div>

## What if React felt as natural as Vue?

You know that feeling when you write Vue code? Everything just clicks. `computed` values update automatically, `watch` lets you react to changes elegantly, and `ref.value` gives you a consistent way to access everything.

Then you switch to React and... where did all that magic go?

## Vue vibes in React

**ZenBox = Code in React like Vue 💚 + Manage state like Zustand 🐻**

- 💪 **Powerful** - All of Zustand's benefits + more
- ⚡️ **Easy to Use** - Where Vue's simplicity meets React's power
- 📦 **Lightweight** - [100 lines of core code](https://zenbox.del.wang/en/blog/react-state-management-in-100-lines), no bloat, just the good stuff

```ts
// Types are automatically inferred from initial state
const userStore = createStore({
  name: "Del Wang",
  posts: ["Hello World!"],
});

// Computed values that just work
const greeting = useComputed(() => `Hey ${userStore.value.name}!`);

// Watch changes like Vue
useWatch(
  () => userStore.value.posts.length,
  (count) => console.log(`${count} posts now`)
);
```

If you squint, this could be Vue code. But it's React, and it works exactly like you'd expect.

This is ZenBox - where Zustand's simplicity meets Vue's joyful developer experience.

## Getting started

👉 Visit [https://zenbox.del.wang](https://zenbox.del.wang) to view the full documentation.

```shell
npm install zenbox
```

## Community & Support

- 📚 **Documentation**: [zenbox.del.wang](https://zenbox.del.wang)
- 🐛 **Issues**: [GitHub Issues](https://github.com/idootop/ZenBox/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/idootop/ZenBox/discussions)

## ZenBox vs Zustand

| Feature            | ZenBox                            | Zustand                       |
| ------------------ | --------------------------------- | ----------------------------- |
| **Learning Curve** | ✅ As easy as Vue                 | ✅ Low                        |
| **Vue-like Hooks** | ✅ `useComputed` / `useWatch`     | ❌ Not supported              |
| **TypeScript**     | ✅ Auto-inference                 | ⚠️ Manual interfaces          |
| **Cross-Store**    | ✅ Auto tracking                  | ❌ Not supported              |
| **State Access**   | ✅ Unified `store.value`          | ⚠️ Explicit `get()` / `set()` |
| **Scoping**        | ✅ Built-in Provider              | ❌ Global by default          |
| **Immer**          | ✅ Built-in                       | ⚠️ Middleware required        |
| **Bundle Size**    | **< 3KB** gzipped (without Immer) | **< 1KB** gzipped             |

## License

MIT License © 2025-PRESENT [Del Wang](https://github.com/idootop)
