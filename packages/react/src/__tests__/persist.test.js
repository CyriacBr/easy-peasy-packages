/* eslint-disable consistent-return */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import { action, createStore, persist } from '@easy-peasy/core';
import {
  StoreProvider,
  useStoreRehydrated,
  createContextStore,
} from '../index';

jest.mock('debounce', () => fn => fn);

const createMemoryStorage = (initial = {}, config = { async: false }) => {
  const store = initial;
  const { async } = config;
  return {
    setItem: (key, data) => {
      store[key] = data;
      if (async) {
        return Promise.resolve({});
      }
    },
    getItem: key => {
      const data = store[key];
      return async ? Promise.resolve(data) : data;
    },
    removeItem: key => {
      delete store[key];
      return Promise.resolve();
    },
    store,
  };
};

const makeStore = (config = {}, model, storeConfig) =>
  createStore(
    persist(
      model || {
        counter: 0,
        msg: 'hello world',
        change: action((_, payload) => {
          return payload;
        }),
      },
      config,
    ),
    storeConfig,
  );

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});

afterEach(() => {
  process.env.NODE_ENV = 'test';
});

test('useStoreRehydrated', async () => {
  // ARRANGE
  const memoryStorage = createMemoryStorage(undefined, { async: true });
  const store = makeStore({
    storage: memoryStorage,
  });
  const App = () => {
    const rehydrated = useStoreRehydrated();
    return (
      <div>
        <h1>App Title</h1>
        {rehydrated ? <div>Loaded</div> : <p>Loading...</p>}
      </div>
    );
  };
  const wrapper = render(
    <StoreProvider store={store}>
      <App />
    </StoreProvider>,
  );

  // ASSERT
  expect(wrapper.queryByText('Loading...')).not.toBeNull();
  expect(wrapper.queryByText('Loaded')).toBeNull();

  // ACT
  await act(async () => {
    await store.persist.resolveRehydration();
  });

  // ASSERT
  expect(wrapper.queryByText('Loading...')).toBeNull();
  expect(wrapper.queryByText('Loaded')).not.toBeNull();
});

test('useStoreRehydrated + createContextStore', async () => {
  // ARRANGE
  const memoryStorage = createMemoryStorage(undefined, { async: true });
  const store = makeStore({
    storage: memoryStorage,
  });

  const MyContextStore = createContextStore({
    foo: 'bar',
  });

  const App = () => {
    const rehydrated = MyContextStore.useStoreRehydrated();
    return (
      <div>
        <h1>App Title</h1>
        {rehydrated ? <div>Loaded</div> : <p>Loading...</p>}
      </div>
    );
  };

  const wrapper = render(
    <MyContextStore.Provider>
      <App />
    </MyContextStore.Provider>,
  );

  // ASSERT
  expect(wrapper.queryByText('Loading...')).not.toBeNull();
  expect(wrapper.queryByText('Loaded')).toBeNull();

  // ACT
  await act(async () => {
    await store.persist.resolveRehydration();
  });

  // ASSERT
  expect(wrapper.queryByText('Loading...')).toBeNull();
  expect(wrapper.queryByText('Loaded')).not.toBeNull();
});
