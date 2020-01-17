export * from './decorators';
import { createStore as EPcreateStore, Store } from '@easy-peasy/core';
import { model } from './decorators/metadata';
import { ToStoreType } from './decorators';

let store: Store;
export function createStore<T extends object>() {
  store = EPcreateStore<any>(model);

  return store as Store<ToStoreType<T>>;
}
