/* eslint-disable */

// index.tsx
import * as React from 'react';
import { render } from 'react-dom';
import { Action, action, createStore } from '@easy-peasy/core';

interface CartModel {
  products?: string[] | null;
  setProducts: Action<CartModel, string[] | null>;
}

interface Model {
  cart: CartModel;
}

const model: Model = {
  cart: {
    products: null,
    setProducts: action((state, payload) => {
      state.products = payload;
    }),
  },
};

const store = createStore<Model>(model);

const App = () => {
  return <h1>test</h1>;
};

render(<App />, document.getElementById('app'));
