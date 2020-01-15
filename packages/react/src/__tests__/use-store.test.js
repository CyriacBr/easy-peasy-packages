import React from 'react';
import { render } from '@testing-library/react';

import { createStore } from '@easy-peasy/core';
import { StoreProvider, useStore } from '../index';

test('returns the store instance', () => {
  // arrange
  const store = createStore({
    foo: 'bar',
  });

  const Consumer = () => {
    const actual = useStore();
    expect(actual).toBe(store);
    return null;
  };

  // act
  render(
    <StoreProvider store={store}>
      <Consumer />
    </StoreProvider>,
  );
});
