import { setAutoFreeze } from 'immer-peasy';
import createStore from './create-store';
import createTransform from './create-transform';
import {
  action,
  actionOn,
  computed,
  debug,
  memo,
  persist,
  reducer,
  thunk,
  thunkOn,
} from './helpers';

/**
 * The auto freeze feature of immer doesn't seem to work in our testing. We have
 * explicitly disabled it to avoid perf issues.
 */
setAutoFreeze(false);

export {
  action,
  actionOn,
  computed,
  createStore,
  createTransform,
  debug,
  memo,
  persist,
  reducer,
  thunk,
  thunkOn,
};
