/*
 * Copyright (c) 2020. Prototype
 */

import { GetAllActionTypes } from '../../common/types/redux-types';
import * as actions from './services/action-creators';
import { ErrorDto, UserDto } from '../../common/types/server-api-dtos';
import { AppSettingsConfig } from './global-types';

export enum ColorStyle {
  blue, white, red
}

export type GlobalStoreData = {
  loading?: boolean;
  error: ErrorDto | null;
  authorized: boolean;
  user: UserDto | {};
  settings?: AppSettingsConfig;
  colorStyle: ColorStyle;
};

export type GlobalActions = ReturnType<GetAllActionTypes<typeof actions>>;
