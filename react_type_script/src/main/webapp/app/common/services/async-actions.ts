/*
 * Copyright (c) 2020. Prototype
 */

import { GlobalActions } from '../global/global-redux-types';
import { fetchAppSettings, fetchCurrentUser } from './service';
import {
  errorHandler,
  getSystemSettings,
  getUserInfo,
  getUserInfoFail,
  getUserInfoStart,
  getUserInfoSuccess,
} from './action-creators';
import { ResponseJSON, UserDto } from '../types/server-api-dtos';

export type GlobalDispatch = (arg: GlobalActions) => GlobalActions;

export const getCurrentUserInfo = (login:string) => (dispatch: GlobalDispatch) => {
  dispatch(getUserInfoStart());
  return fetchCurrentUser(login)(dispatch)
    .then((user: UserDto) => {
      dispatch(getUserInfo(user));
      dispatch(getUserInfoSuccess());
    })
    .catch((error: ResponseJSON) => {
      dispatch(getUserInfoFail());
      dispatch(errorHandler(error))
    });
};

export const getAppSettings = () => (dispatch: GlobalDispatch) => {
  return fetchAppSettings()(dispatch)
    .then((data: any) => {
      dispatch(getSystemSettings(data));
    })
    .catch((error: ResponseJSON) => dispatch(errorHandler(error)));
};

