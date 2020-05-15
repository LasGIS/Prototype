/*
 * Copyright (c) 2020. Prototype
 */

import { push as routerPush, replace as routerReplace } from 'connected-react-router';
import { Path } from 'typescript';
import {
  CLEAR_ALL_STATES,
  GLOBAL_CLEAR_ERROR,
  GLOBAL_GET_SYSTEM_SETTINGS,
  GLOBAL_HIDE_LOADER,
  GLOBAL_PUSH_ERROR,
  GLOBAL_SET_COLOR_STYLE,
  GLOBAL_SET_USER_INFO,
  GLOBAL_SHOW_LOADER,
} from './action-constants';
import { ColorStyle, GlobalActions, GlobalStoreData } from '../global/global-redux-types';

const initialState: GlobalStoreData = {
  loading: false,
  error: undefined,
  authorized: false,
  user: undefined,
  settings: undefined,
  colorStyle: ColorStyle.white
};

export function redirect(routePath: Path) {
  // @ts-ignore
  return dispatch => {
    dispatch(routerPush(routePath));
  };
}

export function replaceUrl(routePath: Path) {
  // @ts-ignore
  return dispatch => {
    dispatch(routerReplace(routePath));
  };
}

export function logoutAction() {
  // @ts-ignore
  window.location = '/logout';
}

export function globalReducer(state: GlobalStoreData = initialState, action: GlobalActions): GlobalStoreData {
  switch (action.type) {
    case GLOBAL_SET_USER_INFO:
      return { ...state, user: action.user };
    case GLOBAL_GET_SYSTEM_SETTINGS:
      return { ...state, settings: action.settings };
    case GLOBAL_SET_COLOR_STYLE:
      return { ...state, colorStyle: action.colorStyle };
    case GLOBAL_SHOW_LOADER:
      return { ...state, loading: true };
    case GLOBAL_HIDE_LOADER:
      return { ...state, loading: false };
    case GLOBAL_PUSH_ERROR:
      return { ...state, error: action.error };
    case GLOBAL_CLEAR_ERROR:
    case CLEAR_ALL_STATES:
      return { ...state, error: undefined };
    default:
      return state;
  }
}
