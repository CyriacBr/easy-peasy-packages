# Standalone version

```
npm install @easy-peasy/core
yarn add @easy-peasy/core
```   

## Basic Usage

```js
import { createStore, action } from '@easy-peasy/core';

const store = createStore({
  todos: {
    items: ['JavaScript'],
    add: action((state, payload) => {
      state.items.push(payload)
    })
  }
});

store.getActions().add('TypeScript');
store.getState().items; // ['JavaScript', 'TypeScript']
```