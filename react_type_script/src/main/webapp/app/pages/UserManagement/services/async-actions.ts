/*
 * Copyright (c) 2020. Prototype
 */

import {
  requestChangeUser,
  requestChangeUserPassword,
  requestCreateUser,
  requestDeleteUser,
  requestUser,
  requestUsersList,
} from './services';
import { errorHandler } from '../../../common/services/action-creators';
import { ResponseJSON, TableUsersRequest, TableUsersResponse, UserDto } from '../../../common/types/server-api-dtos';
import { PasswordData, UserManagementActions } from '../common/types';
import {
  createUserFail,
  createUserStart,
  createUserSuccess,
  deleteUserFail,
  deleteUserStart,
  deleteUserSuccess,
  editUserFail,
  editUserStart,
  editUserSuccess,
  getUsersList,
  getUserStart,
  getUserSuccess,
  userChangePasswordFail,
  userChangePasswordStart,
  userChangePasswordSuccess,
} from './action-creators';

type UserManagementServiceDispatch = (arg: UserManagementActions) => UserManagementActions;

export const getUsers = (params: TableUsersRequest) => (dispatch: UserManagementServiceDispatch) => {
  return requestUsersList(params)(dispatch)
    .then((usersData: TableUsersResponse) => {
      dispatch(getUsersList(usersData));
    })
    .catch((error: ResponseJSON) => dispatch(errorHandler(error)));
};

export const getUserById = (userId: string) => (dispatch: UserManagementServiceDispatch) => {
  dispatch(getUserStart());
  return requestUser(userId)(dispatch)
    .then((user: UserDto) => {
      dispatch(getUserSuccess(user));
    })
    .catch((error: ResponseJSON) => dispatch(errorHandler(error)));
};

export const createNewUser = (user: UserDto) => (dispatch: UserManagementServiceDispatch) => {
  dispatch(createUserStart());
  return requestCreateUser(user)(dispatch)
    .then((createdUser: UserDto) => {
      dispatch(createUserSuccess(createdUser));
    })
    .catch((error: ResponseJSON) => {
      dispatch(createUserFail());
      dispatch(errorHandler(error));
    });
};

export const editUser = (user: UserDto) => (dispatch: UserManagementServiceDispatch) => {
  dispatch(editUserStart());
  return requestChangeUser(user)(dispatch)
    .then(() => {
      dispatch(editUserSuccess());
    })
    .catch((error: ResponseJSON) => {
      dispatch(editUserFail());
      dispatch(errorHandler(error));
    });
};

export const deleteUser = (userId: number) => (dispatch: UserManagementServiceDispatch) => {
  dispatch(deleteUserStart());
  return requestDeleteUser(userId)(dispatch)
    .then(() => {
      dispatch(deleteUserSuccess());
    })
    .catch((error: ResponseJSON) => {
      dispatch(deleteUserFail());
      dispatch(errorHandler(error));
    });
};

export const changePassword = (passwords: PasswordData) => (dispatch: UserManagementServiceDispatch) => {
  dispatch(userChangePasswordStart());
  return requestChangeUserPassword(passwords)(dispatch)
    .then(() => {
      dispatch(userChangePasswordSuccess());
    })
    .catch((error: ResponseJSON) => {
      dispatch(userChangePasswordFail());
      dispatch(errorHandler(error));
    });
};
