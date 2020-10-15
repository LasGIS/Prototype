/*
 * Copyright (c) 2020. Prototype
 */

import { GetAllActionTypes } from '../types/redux-types';
import * as actions from '../services/action-creators';
import { ErrorDto, SystemErrorDto, UserDto } from '../types/server-api-dtos';
import { AppSettingsConfig } from './global-types';

export enum ColorStyle {
  blue, white, red
}

export type GlobalStoreData = {
  loading?: boolean;
  error?: ErrorDto & SystemErrorDto;
  user?: UserDto;
  isUserDataLoaded: boolean;
  settings?: AppSettingsConfig;
  colorStyle: ColorStyle;
};

export type GlobalActions = ReturnType<GetAllActionTypes<typeof actions>>;
