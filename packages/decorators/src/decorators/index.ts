export * from './Model';
import { actionOn, thunk, action, computed, Action } from '@easy-peasy/core';
import { instances, model, listeners, thunks } from './metadata';

export type Computed<T> = T & { computed?: undefined };
export type ToStoreType<T extends object> = {
  [P in keyof T]: 'computed' extends keyof T[P]
    ? T[P] extends Computed<infer U>
      ? U
      : T[P]
    : T[P] extends (...args: any[]) => any
    ? Action<T, Parameters<T[P]>[0]>
    : T[P] extends object
    ? ToStoreType<T[P]>
    : T[P];
};

export function registerModel(modelName: string, ctor: any) {
  instances[modelName] = new ctor();
  model[modelName] = {};
  listeners[modelName] = {};
  thunks[modelName] = [];
  addState(modelName);
  addActionsAndComputeds(ctor.name, modelName);
}

export function registerListener(actionFn: any, methodName: string, ctor: any) {
  listeners[ctor.constructor.name] = listeners[ctor.constructor.name] || {};
  listeners[ctor.constructor.name][methodName] = actionFn;
}

export function registerThunk(methodName: string, ctor: any) {
  thunks[ctor.constructor.name] = thunks[ctor.constructor.name] || [];
  thunks[ctor.constructor.name].push(methodName);
}

function addState(modelName: string) {
  const properties = Object.keys(instances[modelName]);

  properties.forEach(property => {
    const initialVal = instances[modelName][property];

    model[modelName][property] = initialVal;
  });
}

function addActionsAndComputeds(ctorName: string, modelName: string) {
  const prototype = instances[modelName].constructor.prototype;
  const descriptors = Object.getOwnPropertyDescriptors(prototype as object);

  Object.entries(descriptors)
    .filter(([methodName, _]) => methodName !== 'constructor')
    .forEach(([methodName, desc]) => {
      const { value, get } = desc;

      if (listeners[ctorName]?.[methodName]) {
        model[modelName][methodName] = actionOn(
          listeners[ctorName][methodName],
          (state, target) => {
            value.call(state, target);
          }
        );
      } else if (thunks[ctorName] && thunks[ctorName].includes(methodName)) {
        model[modelName][methodName] = thunk(
          (actions, payload, { getState }) => {
            value.call({ ...getState(), ...actions }, payload);
          }
        );
      } else if (value) {
        model[modelName][methodName] = action((state, payload) => {
          value.call(state, payload);
        });
      } else if (get) {
        model[modelName][methodName] = computed(state => {
          return get.call(state);
        });
      }
    });
}
