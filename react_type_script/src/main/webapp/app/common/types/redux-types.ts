/*
 * Copyright (c) 2020. Prototype
 */

import { GlobalStoreData } from '../../pages/Global/global-redux-types';

export type GetAllActionTypes<ActionsMap> = ActionsMap extends { [key: string]: infer Action } ? Action : never;

export type RootStoreData = {
  global: GlobalStoreData;
};
