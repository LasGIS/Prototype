/*
 * Copyright (c) 2020. Prototype
 */

import { createSelector } from 'reselect';
import { RootStoreData } from '../types/redux-types';
import { UserDto } from '../types/server-api-dtos';
import { GlobalStoreData } from '../global/global-redux-types';

export const globalDataRootSelector = (root: RootStoreData) => root.global;

/** Текущий пользователь приложения */
export const globalErrorTextSelector = createSelector(globalDataRootSelector, (global: GlobalStoreData) => {
  if (global.error) {
    const { text, status, error, message } = global.error || {
      text: 'Системная ошибка. Обратитесь к разработчикам.',
    };
    return text ? text : `Ошибка(${status}) ${error}: ${message}`;
  } else {
    return undefined;
  }
});

/** Текущий пользователь приложения */
export const globalUserSelector = createSelector(globalDataRootSelector,
  (global: GlobalStoreData) => global && global.user);

export const globalUserRolesSelector = createSelector(globalUserSelector,
  (user?: UserDto) => (user && user.roles) || []);

/** 'connected-react-router' */
export const globalDataConnectedRouterSelector = (root: RootStoreData) => (root && root.router) || null;

export const globalRouterLocationSelector = createSelector(
  globalDataConnectedRouterSelector,
  router => (router && router.location) || null,
);

export const globalUserDataIdLoadedSelector = createSelector(
  globalDataRootSelector,
  global => Boolean(global && global.isUserDataLoaded),
);
