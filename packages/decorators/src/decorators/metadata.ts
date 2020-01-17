import { TargetResolver } from '@easy-peasy/core';

export const model: {
  [modelName: string]: {
    [property: string]: any;
  };
} = {};
export const instances: Record<string, any> = {};
export const listeners: Record<
  string,
  Record<string, TargetResolver<any, any>>
> = {};
export const thunks: Record<string, string[]> = {};
