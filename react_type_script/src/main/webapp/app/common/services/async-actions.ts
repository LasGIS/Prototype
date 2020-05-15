/*
 * Copyright (c) 2020. Prototype
 */

import { GlobalActions } from '../global/global-redux-types';
import { fetchAppSettings, fetchCurrentUser } from './service';
import { errorHandler, getSystemSettings, setUserInfo } from './action-creators';
import { ResponseJSON, UserDto } from '../types/server-api-dtos';

export type GlobalDispatch = (arg: GlobalActions) => GlobalActions;

export const getUserInfo = () => (dispatch: GlobalDispatch) => {
  return fetchCurrentUser()(dispatch)
    .then((user: UserDto) => {
      dispatch(setUserInfo(user));
    })
    .catch((error: ResponseJSON) => dispatch(errorHandler(error)));
};

export const getAppSettings = () => (dispatch: GlobalDispatch) => {
  return fetchAppSettings()(dispatch)
    .then((data: any) => {
      dispatch(getSystemSettings(data));
    })
    .catch((error: ResponseJSON) => dispatch(errorHandler(error)));
};

