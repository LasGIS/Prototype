/*
 * Copyright (c) 2020. Prototype
 */

import { createSelector } from 'reselect';

export const globalRootKey = 'global';
export const userRootKey = 'user';
export const globalDataRootSelector = state => state[globalRootKey];

/** Текущий пользователь приложения */
export const globalUserSelector = createSelector(globalDataRootSelector, state => state && state[userRootKey]);

export const globalUserRolesSelector = createSelector(globalUserSelector, state => (state && state.roles) || []);

export const globalVersionSelector = createSelector(globalDataRootSelector, state => (state && state.version) || '');

/** 'connected-react-router' */
export const globalDataConnectedRouterSelector = state => (state && state.router) || null;

export const globalRouterLocationSelector = createSelector(
  globalDataConnectedRouterSelector,
  state => (state && state.location) || null,
);

