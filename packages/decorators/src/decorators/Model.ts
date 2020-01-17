import { registerModel } from '.';

export function Model(modelName: string) {
  return (ctor: any) => {
    registerModel(modelName, ctor);
  };
}
