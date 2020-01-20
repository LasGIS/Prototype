/*
 * Copyright (c) 2020. Prototype
 */

/**
 * Created by eugene on 14/08/2019.
 */

import { createSelector } from 'reselect';

export const authRootSelector = state => state.auth;

export const isAuthenticated = createSelector(authRootSelector, state => state && state.authentication);
