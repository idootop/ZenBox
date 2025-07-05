---
title: createProvider
description: Create a context provider for component-scoped stores. Perfect for isolated state that's shared within a component tree.
---

## Syntax

```tsx
const [Provider, useStore, storeActions] = createProvider(initialState);
```

## Parameters

- `initialState`: Initial state object for the store

## Returns

A tuple containing:

- `Provider`: React component that provides the store to its children
- `useStore`: Hook to access the store instance within the provider tree
- `storeActions`: Object with utility functions (`getStore`, `getState`, `setState`)

## Key Features

- **Component-scoped state**: Each provider creates its own isolated store instance
- **State isolation**: Multiple instances don't interfere with each other
- **Flexible initialization**: Can override initial state per provider instance
- **Context-based**: Uses React Context for efficient updates

## Quick Start

### Simple Provider Setup

```tsx
import { createProvider, useStoreValue } from "zenbox";

// Create a provider for user session state
const [SessionProvider, useSessionStore] = createProvider({
  user: null,
  isAuthenticated: false,
  sessionId: null,
  preferences: {
    theme: "light",
    language: "en",
  },
});

function UserProfile() {
  // Get the store instance from the provider context
  const store = useSessionStore();

  // Subscribe to specific store values for reactive updates
  const { user, isAuthenticated } = useStoreValue(store);

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Session ID: {store.value.sessionId}</p>
    </div>
  );
}

function App() {
  return (
    <SessionProvider initialState={{ sessionId: "abc123" }}>
      <UserProfile />
    </SessionProvider>
  );
}
```

### Using Store Actions

```tsx
const [GameProvider, useGameStore, gameActions] = createProvider({
  // State
  score: 0,
  level: 1,
  lives: 3,
  gameState: "playing" as "playing" | "paused" | "gameOver",

  // Actions
  increaseScore: (points) => {
    gameActions.setState((state) => {
      state.score += points;
      // Level up every 1000 points
      if (state.score >= state.level * 1000) {
        state.level += 1;
      }
    });
  },
  loseLife: () => {
    gameActions.setState((state) => {
      state.lives -= 1;
      if (state.lives <= 0) {
        state.gameState = "gameOver";
      }
    });
  },
  resetGame: () => {
    gameActions.setState({
      ...gameActions.value,
      score: 0,
      level: 1,
      lives: 3,
      gameState: "playing",
    });
  },
});

function GameComponent() {
  const store = useGameStore();
  const { score, level, lives, gameState } = useStoreValue(store);

  return (
    <div className="game">
      <div className="game-hud">
        <span>Score: {score}</span>
        <span>Level: {level}</span>
        <span>Lives: {lives}</span>
      </div>

      {gameState === "gameOver" ? (
        <div className="game-over">
          <h2>Game Over!</h2>
          <button onClick={store.value.resetGame}>Play Again</button>
        </div>
      ) : (
        <div className="game-area">
          <button onClick={() => store.value.increaseScore(100)}>
            Score Points
          </button>
          <button onClick={store.value.loseLife}>Lose Life</button>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <GameComponent />
    </GameProvider>
  );
}
```

## Best Practices

1. **Use for isolated state** - Perfect for modals, tabs, forms that need their own state
2. **Initialize with meaningful defaults** - Provide sensible initial state
3. **Keep providers focused** - One provider per logical component or feature

## Related

- [`createStore`](./createStore.md) - Create global stores
- [`useStoreValue`](../hooks/useStoreValue.md) - Subscribe to store changes
- [`usePick`](../hooks/usePick.md) - Select specific fields from stores
