import { registerThunk } from '.';

export function Thunk(ctor: any, methodName: string) {
  registerThunk(methodName, ctor);
}
