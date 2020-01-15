/// <reference types="symbol-observable" />

/* eslint-disable */

import { Component } from 'react';
import {
  compose,
  AnyAction,
  Action as ReduxAction,
  Dispatch as ReduxDispatch,
  Reducer as ReduxReducer,
  Store as ReduxStore,
  StoreEnhancer,
  Middleware,
  Observable,
} from 'redux';
import { O } from 'ts-toolbelt';
import {
  Actions,
  EasyPeasyConfig,
  Dispatch,
  State,
  Store,
} from '@easy-peasy/core';

// #region Hooks

/**
 * A React Hook allowing you to use state within your component.
 *
 * https://github.com/ctrlplusb/easy-peasy#usestoremapstate-externals
 *
 * @example
 *
 * import { useStoreState, State } from 'easy-peasy';
 *
 * function MyComponent() {
 *   const todos = useStoreState((state: State<StoreModel>) => state.todos.items);
 *   return todos.map(todo => <Todo todo={todo} />);
 * }
 */
export function useStoreState<StoreState extends State<any>, Result>(
  mapState: (state: StoreState) => Result,
): Result;

/**
 * A React Hook allowing you to use actions within your component.
 *
 * https://github.com/ctrlplusb/easy-peasy#useactionsmapactions
 *
 * @example
 *
 * import { useStoreActions, Actions } from 'easy-peasy';
 *
 * function MyComponent() {
 *   const addTodo = useStoreActions((actions: Actions<StoreModel>) => actions.todos.add);
 *   return <AddTodoForm save={addTodo} />;
 * }
 */
export function useStoreActions<StoreActions extends Actions<any>, Result>(
  mapActions: (actions: StoreActions) => Result,
): Result;

/**
 * A react hook that returns the store instance.
 *
 * @example
 *
 * import { useStore } from 'easy-peasy';
 *
 * function MyComponent() {
 *   const store = useStore();
 *   return <div>{store.getState().foo}</div>;
 * }
 */
export function useStore<
  StoreModel extends object = {},
  StoreConfig extends EasyPeasyConfig<any, any> = any
>(): Store<StoreModel, StoreConfig>;

/**
 * A React Hook allowing you to use the store's dispatch within your component.
 *
 * https://github.com/ctrlplusb/easy-peasy#usedispatch
 *
 * @example
 *
 * import { useStoreDispatch } from 'easy-peasy';
 *
 * function MyComponent() {
 *   const dispatch = useStoreDispatch();
 *   return <AddTodoForm save={(todo) => dispatch({ type: 'ADD_TODO', payload: todo })} />;
 * }
 */
export function useStoreDispatch<StoreModel extends object = {}>(): Dispatch<
  StoreModel
>;

/**
 * A utility function used to create pre-typed hooks.
 *
 * @example
 * const { useStoreActions, useStoreState, useStoreDispatch, useStore } = createTypedHooks<StoreModel>();
 *
 * useStoreActions(actions => actions.todo.add); // fully typed
 */
export function createTypedHooks<StoreModel extends Object = {}>(): {
  useStoreActions: <Result>(
    mapActions: (actions: Actions<StoreModel>) => Result,
  ) => Result;
  useStoreDispatch: () => Dispatch<StoreModel>;
  useStoreState: <Result>(
    mapState: (state: State<StoreModel>) => Result,
    dependencies?: Array<any>,
  ) => Result;
  useStore: () => Store<StoreModel>;
};

// #endregion

// #region StoreProvider

/**
 * Exposes the store to your app (and hooks).
 *
 * https://github.com/ctrlplusb/easy-peasy#storeprovider
 *
 * @example
 *
 * import { StoreProvider } from 'easy-peasy';
 *
 * ReactDOM.render(
 *   <StoreProvider store={store}>
 *     <App />
 *   </StoreProvider>
 * );
 */
export class StoreProvider<StoreModel extends object = {}> extends Component<{
  store: Store<StoreModel>;
}> {}

// #endregion

// #region Context + Local Stores

interface StoreModelInitializer<
  StoreModel extends object = {},
  InitialData = any
> {
  (initialData?: InitialData): StoreModel;
}

export function createContextStore<
  StoreModel extends object = {},
  InitialData = any,
  StoreConfig extends EasyPeasyConfig<any, any> = any
>(
  model: StoreModel | StoreModelInitializer<StoreModel, InitialData>,
  config?: StoreConfig,
): {
  Provider: React.SFC<{ initialData?: InitialData }>;
  useStore: () => Store<StoreModel, StoreConfig>;
  useStoreState: <Result = any>(
    mapState: (state: State<StoreModel>) => Result,
    dependencies?: Array<any>,
  ) => Result;
  useStoreActions: <Result = any>(
    mapActions: (actions: Actions<StoreModel>) => Result,
  ) => Result;
  useStoreDispatch: () => Dispatch<StoreModel>;
  useStoreRehydrated: () => boolean;
};

interface UseLocalStore<StoreModel extends object, InitialData> {
  (initialData?: InitialData): [State<StoreModel>, Actions<StoreModel>];
}

export function createComponentStore<
  StoreModel extends object = {},
  InitialData = any,
  StoreConfig extends EasyPeasyConfig<any, any> = any
>(
  model: StoreModel | StoreModelInitializer<StoreModel, InitialData>,
  config?: StoreConfig,
): UseLocalStore<StoreModel, InitialData>;

// #endregion

// #region Persist
export function useStoreRehydrated(): boolean;

// #endregion
