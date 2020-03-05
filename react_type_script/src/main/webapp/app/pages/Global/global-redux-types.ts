/*
 * Copyright (c) 2020. Prototype
 */

import { GetAllActionTypes } from '../../common/types/redux-types';
import * as actions from './services/action-creators';
import { ErrorDto, UserDto } from '../../common/types/server-api-dtos';

export type GlobalStoreData = {
  loading?: boolean;
  error: ErrorDto | null;
  authorized: boolean;
  user: UserDto | {};
  settings: object;
  version: string;
};

export type GlobalActions = ReturnType<GetAllActionTypes<typeof actions>>;
