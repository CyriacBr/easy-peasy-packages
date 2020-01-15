import { setAutoFreeze } from 'immer-peasy';
import {
  createTypedHooks,
  useStoreActions,
  useStoreDispatch,
  useStoreState,
  useStoreRehydrated,
  useStore,
} from './hooks';
import createContextStore from './create-context-store';
import createComponentStore from './create-component-store';
import StoreProvider from './provider';

/**
 * The auto freeze feature of immer doesn't seem to work in our testing. We have
 * explicitly disabled it to avoid perf issues.
 */
setAutoFreeze(false);

export {
  createComponentStore,
  createContextStore,
  createTypedHooks,
  StoreProvider,
  useStoreActions,
  useStoreDispatch,
  useStoreState,
  useStoreRehydrated,
  useStore,
};
