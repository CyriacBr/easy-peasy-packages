import * as React from 'react';
import { Provider } from 'react-redux';
import { StoreProvider } from 'easy-peasy';
import { createStore } from '@easy-peasy/core';

interface StoreModel {
  foo: string;
}

const store = createStore<StoreModel>({
  foo: 'bar',
});

const app = (
  <StoreProvider store={store}>
    <Provider store={store}>
      <div />
    </Provider>
  </StoreProvider>
);
