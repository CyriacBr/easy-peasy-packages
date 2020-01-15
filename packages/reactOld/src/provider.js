import React from 'react';
import StoreContext from './context';

// eslint-disable-next-line react/prop-types
export default function StoreProvider({ children, store }) {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
