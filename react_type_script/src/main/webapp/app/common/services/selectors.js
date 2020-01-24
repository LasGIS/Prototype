/*
 * Copyright (c) 2020. Prototype
 */

import { createSelector } from 'reselect';

export const globalDataRootSelector = state => state.global;

/** Текущий пользователь приложения */
export const globalUserSelector = createSelector(globalDataRootSelector, state => state && state.user);

export const globalUserRolesSelector = createSelector(globalUserSelector, state => (state && state.roles) || []);

export const globalVersionSelector = createSelector(globalDataRootSelector, state => (state && state.version) || '');

/** 'connected-react-router' */
export const globalDataConnectedRouterSelector = state => (state && state.router) || null;

export const globalRouterLocationSelector = createSelector(
  globalDataConnectedRouterSelector,
  state => (state && state.location) || null,
);

