# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-07-14

### 🎉 Initial Release

We're thrilled to announce the first stable release of ZenBox! 

This marks a major milestone in bringing Vue-like reactivity to React with Zustand's simplicity.

### ✨ Features

#### Core API

- **`createStore(initialState)`** - Create reactive stores with full TypeScript inference
- **`createProvider(initialState)`** - Context provider for local store scoping
- **`useStoreValue(store, options?)`** - Subscribe to store values with optional selectors

#### Vue-like Reactivity

- **`useComputed(computeFn)`** - Reactive computed values with automatic dependency tracking
- **`useWatch(source, callback, options?)`** - Watch for changes with cleanup support
- **`useWatchEffect(effectFn, options?)`** - Effect that automatically tracks reactive dependencies

#### State Management

- **Direct mutations with Immer** - Write `state.count++` instead of spread operators
- **Selective subscriptions** - Only re-render components that use changed data
- **Cross-store computations** - Computed values can depend on multiple stores
- **TypeScript auto-inference** - Zero configuration type safety

### 📦 Package

- **ES modules** - Modern module format with tree-shaking support
- **CommonJS** - Backward compatibility for older build systems
- **TypeScript declarations** - Full type definitions included
- **React 18+ support** - Built for modern React with concurrent features

### 🎯 Compatibility

- **React** - 18.0.0 or higher
- **TypeScript** - 4.5.0 or higher (optional)
- **Node.js** - 16.0.0 or higher