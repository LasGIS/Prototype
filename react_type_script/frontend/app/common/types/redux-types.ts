/*
 * Copyright (c) 2020. Prototype
 */

import { GlobalStoreData } from '../global/global-redux-types';
import { RouterState } from 'connected-react-router';
import { UserManagementState } from '../../pages/UserManagement/common/types';

export type GetAllActionTypes<ActionsMap> = ActionsMap extends { [key: string]: infer Action } ? Action : never;

export type RootStoreData = {
  router: RouterState;
  global: GlobalStoreData;
  userManagement: UserManagementState;
};
