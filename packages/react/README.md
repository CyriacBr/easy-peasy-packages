# React Connector

```
npm install @easy-peasy/react
yarn add @easy-peasy/react
```  

## Basic Usage

**Step 1 - Export an existing `easy-peasy` store**

```js
import store from 'some-pkg';
```

**Step 2 - Wrap your application**

```js
import { StoreProvider } from '@easy-peasy/react';

function App() {
  return (
    <StoreProvider store={store}>
      <TodoList />
    </StoreProvider>
  );
}
```

**Step 3 - Use the store**

```js
function TodoList() {
  const todos = useStoreState(state => state.todos.items)
  const add = useStoreActions(actions => actions.todos.add)
  return (
    <div>
      {todos.map((todo, idx) => <div key={idx}>{todo}</div>)}
      <AddTodo onAdd={add} />
    </div>
  )
}
```