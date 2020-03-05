/*
 * Copyright (c) 2020. Prototype
 */

import {
  CLEAR_ALL_STATES,
  GLOBAL_CLEAR_ERROR,
  GLOBAL_GET_SYSTEM_SETTINGS,
  GLOBAL_HIDE_LOADER,
  GLOBAL_PUSH_ERROR,
  GLOBAL_SET_USER_INFO,
  GLOBAL_SHOW_LOADER,
} from './action-constants';
import { ResponseJSON, UserDto } from '../../../common/types/server-api-dtos';

export const setUserInfo = (user: UserDto) => ({ type: GLOBAL_SET_USER_INFO, user } as const);

export const clearErrors = () => ({ type: GLOBAL_CLEAR_ERROR } as const);

export const globalShowLoader = () => ({ type: GLOBAL_SHOW_LOADER } as const);
export const globalHideLoader = () => ({ type: GLOBAL_HIDE_LOADER } as const);

export const getSystemSettings = (settings: object) => ({
  type: GLOBAL_GET_SYSTEM_SETTINGS, settings
} as const);

export const errorHandler = (error: ResponseJSON) => ({
  type: GLOBAL_PUSH_ERROR,
  error: error.responseJSON || {
    code: -1,
    text: 'Системная ошибка. Обратитесь к разработчикам.',
  },
} as const);

export const clearAllStates = () => ({ type: CLEAR_ALL_STATES } as const);

