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
import { UserManagementActions, UserManagementState } from '../common/types';
import { UserDto } from '../../../common/types/server-api-dtos';

export const initialState: UserManagementState = {
  users: [],
  usersRequest: {
    start: 0,
    perPages: 10,
    page: 1,
    pages: 1
  },
  usersPageUrl: '',
  // editing user
  editingUser: {
    userId: undefined,
    login: '',
    name: '',
    password: undefined,
    roles: [],
    archived: false,
  },
  // create new user
  userCreationIsLoading: false,
  userCreated: false,
  createdUserData: undefined,
  // edit user
  userEditingIsLoading: false,
  userEdited: false,
  // delete user
  userDeletingIsLoading: false,
  userDeleted: false,
  // password
  passwordChangingIsLoading: false,
  passwordChanged: false,
};

export function userManagementReducer(state: UserManagementState = initialState, action: UserManagementActions) {
  switch (action.type) {
    case USER_MANAGEMENT_CLEAR_STATE:
      return initialState;
    case USER_MANAGEMENT_REQUEST_USERS_LIST_SUCCESS: {
      return {
        ...state,
        users: action.usersData.content.map((user: UserDto) => {
          return {
            ...user,
            roles: user.roles,
            fio: user.name,
          };
        }),
        usersRequest: action.usersData.request,
      };
    }
    case USER_MANAGEMENT_USERS_PAGE_URL_SAVE: {
      return {
        ...state,
        usersPageUrl: action.url || '',
      };
    }
    case USER_MANAGEMENT_USERS_PAGE_URL_RESET: {
      return {
        ...state,
        usersPageUrl: '',
      };
    }
    case USER_MANAGEMENT_REQUEST_USER_START: {
      return { ...state, editingUser: state.editingUser };
    }
    case USER_MANAGEMENT_REQUEST_USER_SUCCESS: {
      return { ...state, editingUser: action.editingUser };
    }
    case USER_MANAGEMENT_REQUEST_CREATE_USER_START: {
      return {
        ...state,
        userCreationIsLoading: true,
        createdUserData: {},
      };
    }
    case USER_MANAGEMENT_REQUEST_CREATE_USER_SUCCESS: {
      return {
        ...state,
        userCreationIsLoading: false,
        userCreated: true,
        createdUserData: action.createdUser,
      };
    }
    case USER_MANAGEMENT_REQUEST_CREATE_USER_FAIL: {
      return {
        ...state,
        userCreationIsLoading: false,
        userCreated: false,
        createdUserData: {},
      };
    }
    case USER_MANAGEMENT_REQUEST_CREATE_USER_RESET: {
      return {
        ...state,
        userCreationIsLoading: false,
        userCreated: false,
        createdUserData: {},
      };
    }
    case USER_MANAGEMENT_REQUEST_EDIT_USER_START: {
      return {
        ...state,
        userEditingIsLoading: true,
      };
    }
    case USER_MANAGEMENT_REQUEST_EDIT_USER_SUCCESS: {
      return {
        ...state,
        userEditingIsLoading: false,
        userEdited: true,
      };
    }
    case USER_MANAGEMENT_REQUEST_EDIT_USER_FAIL: {
      return {
        ...state,
        userEditingIsLoading: false,
        userEdited: false,
      };
    }
    case USER_MANAGEMENT_REQUEST_EDIT_USER_RESET: {
      return {
        ...state,
        userEditingIsLoading: false,
        userEdited: false,
      };
    }
    case USER_MANAGEMENT_REQUEST_DELETE_USER_START: {
      return {
        ...state,
        userDeletingIsLoading: true,
      };
    }
    case USER_MANAGEMENT_REQUEST_DELETE_USER_SUCCESS: {
      return {
        ...state,
        userDeletingIsLoading: false,
        userDeleted: true,
      };
    }
    case USER_MANAGEMENT_REQUEST_DELETE_USER_FAIL: {
      return {
        ...state,
        userDeletingIsLoading: false,
        userDeleted: false,
      };
    }
    case USER_MANAGEMENT_REQUEST_DELETE_USER_RESET: {
      return {
        ...state,
        userDeletingIsLoading: false,
        userDeleted: false,
      };
    }
    case USER_MANAGEMENT_REQUEST_CHANGE_PASSWORD_START: {
      return {
        ...state,
        passwordChangingIsLoading: true,
        passwordChanged: false,
      };
    }
    case USER_MANAGEMENT_REQUEST_CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        passwordChangingIsLoading: false,
        passwordChanged: true,
      };
    }
    case USER_MANAGEMENT_REQUEST_CHANGE_PASSWORD_FAIL: {
      return {
        ...state,
        passwordChangingIsLoading: false,
        passwordChanged: false,
      };
    }
    case USER_MANAGEMENT_REQUEST_CHANGE_PASSWORD_RESET: {
      return {
        ...state,
        passwordChangingIsLoading: false,
        passwordChanged: false,
      };
    }
    default:
      return state;
  }
}
