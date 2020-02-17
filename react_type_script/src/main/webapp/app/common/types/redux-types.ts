/*
 * Copyright (c) 2020. Prototype
 */

export type GlobalReducer = {
  loading?: boolean;
  error?: string;
  authorized: boolean;
  user: object;
  settings: object;
  version: string;
};

export type GetAllActionTypes<ActionsMap> = ActionsMap extends { [key: string]: infer Action } ? Action : never;

export type RootStoreData = {
  global: GlobalReducer;
};
