[![Actions Status](https://github.com/CyriacBr/easy-peasy-packages/workflows/build%20%26%20test/badge.svg)](https://github.com/CyriacBr/easy-peasy-packages/actions)

# easy-peasy Decorators

This version wraps `@easy-peasy/core` to provide decorators for creating your store models. Inspired from [issue/359](https://github.com/ctrlplusb/easy-peasy/issues/359)
```
npm install @easy-peasy/decorators
yarn add @easy-peasy/decorators
```   

## Basic Usage

**Step 1 - create your model**  
*counter.model.ts*
```ts
import { Model, Thunk, Listener } from '@easy-peasy/decorators';
import { TargetPayload } from '@easy-peasy/core';

@Model('counter')
class CounterModel {
  val = 0;

  // Computed
  get nextCount() {
    return this.val + 1;
  }

  // Action
  setValue(newVal: number) {
    this.val = newVal;
  }

  // Thunk
  @Thunk
  changeValue(newVal: number) {
    this.setValue(newVal + 5);
    return 'works!';
  }

  // ActionOn
  @Listener<CounterModel>(actions => actions.setValue)
  onSetValue(target: TargetPayload<number>) {
    console.log('val changed to: ', target.payload);
  }
}
```

**Step 2 - Create your store**  
*index.ts*
```ts
import { CounterModel } from './counter.model.ts';

interface StoreModel {
  counter: CounterModel;
}
const store = createStore<StoreModel>();
```