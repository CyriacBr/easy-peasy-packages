[![Actions Status](https://github.com/CyriacBr/easy-peasy-packages/workflows/build%20%26%20test/badge.svg)](https://github.com/CyriacBr/easy-peasy-packages/actions)

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