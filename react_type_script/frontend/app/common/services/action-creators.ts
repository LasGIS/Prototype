/*
 * Copyright (c) 2020. Prototype
 */

import {
  CLEAR_ALL_STATES,
  GLOBAL_CLEAR_ERROR,
  GLOBAL_GET_SYSTEM_SETTINGS,
  GLOBAL_GET_USER_INFO,
  GLOBAL_GET_USER_INFO_FAIL,
  GLOBAL_GET_USER_INFO_START,
  GLOBAL_GET_USER_INFO_SUCCESS,
  GLOBAL_HIDE_LOADER,
  GLOBAL_PUSH_ERROR,
  GLOBAL_SET_COLOR_STYLE,
  GLOBAL_SHOW_LOADER,
} from './action-constants';
import { ResponseJSON, UserDto } from '../types/server-api-dtos';
import { AppSettingsConfig } from '../global/global-types';
import { ColorStyle } from '../global/global-redux-types';

export const getUserInfo = (user: UserDto) => ({ type: GLOBAL_GET_USER_INFO, user } as const);
export const getUserInfoStart = () => ({ type: GLOBAL_GET_USER_INFO_START } as const);
export const getUserInfoSuccess = () => ({ type: GLOBAL_GET_USER_INFO_SUCCESS } as const);
export const getUserInfoFail = () => ({ type: GLOBAL_GET_USER_INFO_FAIL } as const);

export const clearErrors = () => ({ type: GLOBAL_CLEAR_ERROR } as const);

export const globalShowLoader = () => ({ type: GLOBAL_SHOW_LOADER } as const);

export const globalHideLoader = () => ({ type: GLOBAL_HIDE_LOADER } as const);

export const getSystemSettings = (settings: AppSettingsConfig) => ({
  type: GLOBAL_GET_SYSTEM_SETTINGS, settings
} as const);

export const setColorStyle = (colorStyle: ColorStyle) => ({
  type: GLOBAL_SET_COLOR_STYLE, colorStyle
} as const);

export const errorHandler = (error: ResponseJSON) => ({
  type: GLOBAL_PUSH_ERROR,
  error: error.responseJSON
} as const);

export const clearAllStates = () => ({ type: CLEAR_ALL_STATES } as const);

