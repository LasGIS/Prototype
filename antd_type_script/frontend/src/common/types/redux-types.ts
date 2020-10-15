/*
 * Copyright (c) 2020. Prototype
 */

import { CommonStoreData } from '../services/types';
import { RouterState } from 'connected-react-router';

export type GetAllActionTypes<ActionsMap> = ActionsMap extends { [key: string]: infer Action } ? Action : never;

export type RootStoreData = {
  router: RouterState;
  common: CommonStoreData;
};
