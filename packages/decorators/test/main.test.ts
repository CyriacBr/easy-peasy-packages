import { Model, createStore } from '../src';
import { Thunk } from '../src/decorators/Thunk';
import { Listener } from '../src/decorators/Listener';
import { TargetPayload } from '@easy-peasy/core';

describe('decorators', () => {
  it('property works', () => {
    @Model('counter')
    class CounterModel {
      a = 0;
      b = 15;
      c = 'hello';
    }
    const store = createStore<{
      counter: CounterModel;
    }>();

    expect(store.getState().counter.a).toBe(0);
    expect(store.getState().counter.b).toBe(15);
    expect(store.getState().counter.c).toBe('hello');
  });

  it('computed works', () => {
    @Model('counter')
    class CounterModel {
      val = 0;

      get nextCount() {
        return this.val + 1;
      }
    }
    const store = createStore<{
      counter: CounterModel;
    }>();

    expect(store.getState().counter.nextCount).toBe(1);
  });

  it('action works', () => {
    @Model('counter')
    class CounterModel {
      val = 0;
      setValue(newVal: number) {
        this.val = newVal;
      }
    }
    const store = createStore<{
      counter: CounterModel;
    }>();

    store.getActions().counter.setValue(5);
    expect(store.getState().counter.val).toBe(5);
  });

  it('thunk works', async () => {
    @Model('counter')
    class CounterModel {
      val = 0;
      setValue(newVal: number) {
        this.val = newVal;
      }
      @Thunk
      changeValue(newVal: number) {
        this.setValue(newVal + 5);
        return 'works!';
      }
      @Thunk
      async changeValueAsync(newVal: number) {
        this.setValue(newVal * 2);
        return 'works!';
      }
    }
    const store = createStore<{
      counter: CounterModel;
    }>();

    let returnValue = store.getActions().counter.changeValue(5);
    expect(returnValue).toBe('works!');
    expect(store.getState().counter.val).toBe(10);

    returnValue = await store.getActions().counter.changeValueAsync(10);
    expect(store.getState().counter.val).toBe(20);
  });

  it('listener works', () => {
    @Model('counter')
    class CounterModel {
      val = 0;
      changed = false;
      setValue(newVal: number) {
        this.val = newVal;
      }
      @Listener<CounterModel>(actions => actions.setValue)
      onSetValue(target: TargetPayload<number>) {
        console.log('val changed to: ', target.payload);
        this.changed = true;
      }
    }
    const store = createStore<{
      counter: CounterModel;
    }>();

    store.getActions().counter.setValue(5);
    expect(store.getState().counter.changed).toBe(true);
  });
});
