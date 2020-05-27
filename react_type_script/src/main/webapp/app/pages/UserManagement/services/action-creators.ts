/*
 * Copyright (c) 2020. Prototype
 */

import {
  USER_MANAGEMENT_CLEAR_STATE,
  USER_MANAGEMENT_REQUEST_CHANGE_PASSWORD_FAIL,
  USER_MANAGEMENT_REQUEST_CHANGE_PASSWORD_RESET,
  USER_MANAGEMENT_REQUEST_CHANGE_PASSWORD_START,
  USER_MANAGEMENT_REQUEST_CHANGE_PASSWORD_SUCCESS,
  USER_MANAGEMENT_REQUEST_CREATE_USER_FAIL,
  USER_MANAGEMENT_REQUEST_CREATE_USER_RESET,
  USER_MANAGEMENT_REQUEST_CREATE_USER_START,
  USER_MANAGEMENT_REQUEST_CREATE_USER_SUCCESS,
  USER_MANAGEMENT_REQUEST_DELETE_USER_FAIL,
  USER_MANAGEMENT_REQUEST_DELETE_USER_RESET,
  USER_MANAGEMENT_REQUEST_DELETE_USER_START,
  USER_MANAGEMENT_REQUEST_DELETE_USER_SUCCESS,
  USER_MANAGEMENT_REQUEST_EDIT_USER_FAIL,
  USER_MANAGEMENT_REQUEST_EDIT_USER_RESET,
  USER_MANAGEMENT_REQUEST_EDIT_USER_START,
  USER_MANAGEMENT_REQUEST_EDIT_USER_SUCCESS,
  USER_MANAGEMENT_REQUEST_USER_START,
  USER_MANAGEMENT_REQUEST_USER_SUCCESS,
  USER_MANAGEMENT_REQUEST_USERS_LIST_SUCCESS,
  USER_MANAGEMENT_USERS_PAGE_URL_RESET,
  USER_MANAGEMENT_USERS_PAGE_URL_SAVE,
} from './action-constants';
import { UserDto, UsersData } from '../../../common/types/server-api-dtos';

export const userClearState = () => ({ type: USER_MANAGEMENT_CLEAR_STATE } as const);

export const userChangePasswordFail = () => ({ type: USER_MANAGEMENT_REQUEST_CHANGE_PASSWORD_FAIL } as const);
export const userChangePasswordReset = () => ({ type: USER_MANAGEMENT_REQUEST_CHANGE_PASSWORD_RESET } as const);
export const userChangePasswordStart = () => ({ type: USER_MANAGEMENT_REQUEST_CHANGE_PASSWORD_START } as const);
export const userChangePasswordSuccess = () => ({ type: USER_MANAGEMENT_REQUEST_CHANGE_PASSWORD_SUCCESS } as const);

export const createUserFail = () => ({ type: USER_MANAGEMENT_REQUEST_CREATE_USER_FAIL } as const);
export const createUserReset = () => ({ type: USER_MANAGEMENT_REQUEST_CREATE_USER_RESET } as const);
export const createUserStart = () => ({ type: USER_MANAGEMENT_REQUEST_CREATE_USER_START } as const);
export const createUserSuccess = (createdUser: UserDto) => ({
  type: USER_MANAGEMENT_REQUEST_CREATE_USER_SUCCESS,
  createdUser,
} as const);

export const deleteUserFail = () => ({ type: USER_MANAGEMENT_REQUEST_DELETE_USER_FAIL } as const);
export const deleteUserReset = () => ({ type: USER_MANAGEMENT_REQUEST_DELETE_USER_RESET } as const);
export const deleteUserStart = () => ({ type: USER_MANAGEMENT_REQUEST_DELETE_USER_START } as const);
export const deleteUserSuccess = () => ({ type: USER_MANAGEMENT_REQUEST_DELETE_USER_SUCCESS } as const);

export const editUserFail = () => ({ type: USER_MANAGEMENT_REQUEST_EDIT_USER_FAIL } as const);
export const editUserReset = () => ({ type: USER_MANAGEMENT_REQUEST_EDIT_USER_RESET } as const);
export const editUserStart = () => ({ type: USER_MANAGEMENT_REQUEST_EDIT_USER_START } as const);
export const editUserSuccess = () => ({ type: USER_MANAGEMENT_REQUEST_EDIT_USER_SUCCESS } as const);

export const getUserStart = () => ({ type: USER_MANAGEMENT_REQUEST_USER_START } as const);
export const getUserSuccess = (editingUser: UserDto) => ({ type: USER_MANAGEMENT_REQUEST_USER_SUCCESS, editingUser } as const);

export const getUsersList = (usersData: UsersData) => ({
  type: USER_MANAGEMENT_REQUEST_USERS_LIST_SUCCESS,
  usersData,
} as const);

export const resetUsersPageUrl = () => ({ type: USER_MANAGEMENT_USERS_PAGE_URL_RESET } as const);
export const saveUsersPageUrl = (url: string) => ({ type: USER_MANAGEMENT_USERS_PAGE_URL_SAVE, url } as const);
