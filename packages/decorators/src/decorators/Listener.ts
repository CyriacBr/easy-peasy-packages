import { TargetResolver } from '@easy-peasy/core';
import { ToStoreType, registerListener } from '.';

export function Listener<Model extends object, StoreModel extends object = {}>(
  actionFn: TargetResolver<ToStoreType<Model>, ToStoreType<StoreModel>>
) {
  return (ctor: any, methodName: string) => {
    registerListener(actionFn, methodName, ctor);
  };
}
