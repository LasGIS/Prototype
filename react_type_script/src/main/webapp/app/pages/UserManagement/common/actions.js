/*
 * Copyright (c) 2020. Prototype
 */

import { CLEAR, FAIL, RESET, SAVE, START, SUCCESS } from '../../../common/constants/action-constants';
import {
  requestAutocompleteDataSource,
  requestChangeUser,
  requestChangeUserPassword,
  requestCreateUser,
  requestDeleteUser,
  requestUser,
  requestUsersList,
} from './services';
import { errorHandler } from '../../../common/services/action-creators';
import { API_ERROR } from '../../../common/errors/error-map';
import { convertRolesListForFrontend } from '../../../common/utils/ParseServerApiData.js';
import { prepareAutocompleteData } from '../table/utils';

export const USER_MANAGEMENT = 'USER_MANAGEMENT_';
export const STATE = 'STATE';
export const REQUEST_USERS_LIST = 'REQUEST_USERS_LIST';
export const REQUEST_AUTO_COMPLETE_DATA = 'REQUEST_AUTO_COMPLETE_DATA';
export const USERS_PAGE_URL = 'USERS_PAGE_URL';
export const REQUEST_USER = 'REQUEST_USER';
export const REQUEST_CREATE_USER = 'REQUEST_CREATE_USER';
export const REQUEST_EDIT_USER = 'REQUEST_EDIT_USER';
export const REQUEST_DELETE_USER = 'REQUEST_DELETE_USER';
export const REQUEST_CHANGE_PASSWORD = 'REQUEST_CHANGE_PASSWORD';
export const SHOW_LOGIN_EXISTS_ERROR = 'SHOW_LOGIN_EXISTS_ERROR';
export const HIDE_LOGIN_EXISTS_ERROR = 'HIDE_LOGIN_EXISTS_ERROR';

export const initialState = {
  users: [],
  usersPagination: {
    pageCurrent: 0,
    pagesCount: 0,
  },
  usersPageUrl: '',
  // users autocomplete
  usersAutocompleteData: {
    items: [],
    itemsMap: {},
  },
  // editing user
  editingUser: {
    id: '',
    ukdsMain: [],
    ukdsAdditional: [],
    macroregions: [],
    login: '',
    fio: '',
    roles: [],
    archived: false,
    hasPassword: false,
  },
  // create new user
  userCreationIsLoading: false,
  userCreated: false,
  createdUserData: {},
  // login error
  showLoginExistsError: false,
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

export const saveUsersPageUrl = url => ({
  type: USER_MANAGEMENT + SAVE + USERS_PAGE_URL,
  url,
});

export const resetUsersPageUrl = () => ({
  type: USER_MANAGEMENT + USERS_PAGE_URL + RESET,
});

export const hideLoginError = () => dispatch => {
  dispatch({ type: USER_MANAGEMENT + HIDE_LOGIN_EXISTS_ERROR });
};

export const getAutocompleteDataSource = () => dispatch => {
  return requestAutocompleteDataSource()(dispatch)
    .then(data => {
      dispatch({
        type: USER_MANAGEMENT + REQUEST_AUTO_COMPLETE_DATA + SUCCESS,
        data,
      });
    })
    .catch(error => errorHandler(error)(dispatch));
};

export const resetAutocompleteDataSource = () => ({
  type: USER_MANAGEMENT + REQUEST_AUTO_COMPLETE_DATA + RESET,
});

export const getUsers = params => dispatch => {
  return requestUsersList(params)(dispatch)
    .then(usersData => {
      dispatch({
        type: USER_MANAGEMENT + REQUEST_USERS_LIST + SUCCESS,
        usersData,
      });
    })
    .catch(error => errorHandler(error)(dispatch));
};

export const getUserById = request => dispatch => {
  dispatch({ type: USER_MANAGEMENT + REQUEST_USER + START });
  return requestUser(request)(dispatch)
    .then(user => {
      dispatch({ type: USER_MANAGEMENT + REQUEST_USER + SUCCESS, user });
    })
    .catch(error => errorHandler(error)(dispatch));
};

export const createNewUser = request => dispatch => {
  dispatch({ type: USER_MANAGEMENT + REQUEST_CREATE_USER + START });
  return requestCreateUser(request)(dispatch)
    .then(createdUser => {
      dispatch({
        type: USER_MANAGEMENT + REQUEST_CREATE_USER + SUCCESS,
        createdUser,
      });
      dispatch({ type: USER_MANAGEMENT + HIDE_LOGIN_EXISTS_ERROR });
    })
    .catch(error => {
      dispatch({ type: USER_MANAGEMENT + REQUEST_CREATE_USER + FAIL });
      dispatch({ type: USER_MANAGEMENT + HIDE_LOGIN_EXISTS_ERROR });
      if (error.responseJSON && error.responseJSON.code === API_ERROR.RUNTIME_USER_DUPLICATE) {
        dispatch({ type: USER_MANAGEMENT + SHOW_LOGIN_EXISTS_ERROR });
      } else {
        errorHandler(error)(dispatch);
      }
    });
};

export const resetUserCreationCheck = () => dispatch => {
  dispatch({ type: USER_MANAGEMENT + REQUEST_CREATE_USER + RESET });
};

export const editUser = user => dispatch => {
  dispatch({ type: USER_MANAGEMENT + REQUEST_EDIT_USER + START });
  return requestChangeUser(user)(dispatch)
    .then(() => {
      dispatch({ type: USER_MANAGEMENT + REQUEST_EDIT_USER + SUCCESS });
    })
    .catch(error => {
      dispatch({ type: USER_MANAGEMENT + REQUEST_EDIT_USER + FAIL });
      errorHandler(error)(dispatch);
    });
};

export const resetUserEditionCheck = () => dispatch => {
  dispatch({ type: USER_MANAGEMENT + REQUEST_EDIT_USER + RESET });
};

export const deleteUser = userId => dispatch => {
  dispatch({ type: USER_MANAGEMENT + REQUEST_DELETE_USER + START });
  return requestDeleteUser(userId)(dispatch)
    .then(() => {
      dispatch({ type: USER_MANAGEMENT + REQUEST_DELETE_USER + SUCCESS });
    })
    .catch(error => {
      dispatch({ type: USER_MANAGEMENT + REQUEST_DELETE_USER + FAIL });
      errorHandler(error)(dispatch);
    });
};

export const resetUserDeletingCheck = () => dispatch => {
  dispatch({ type: USER_MANAGEMENT + REQUEST_DELETE_USER + RESET });
};

export const changePassword = passwords => dispatch => {
  dispatch({ type: USER_MANAGEMENT + REQUEST_CHANGE_PASSWORD + START });
  return requestChangeUserPassword(passwords)(dispatch)
    .then(() => {
      dispatch({ type: USER_MANAGEMENT + REQUEST_CHANGE_PASSWORD + SUCCESS });
    })
    .catch(error => {
      dispatch({ type: USER_MANAGEMENT + REQUEST_CHANGE_PASSWORD + FAIL });
      errorHandler(error)(dispatch);
    });
};

export const resetPasswordChangingData = () => dispatch => {
  dispatch({ type: USER_MANAGEMENT + REQUEST_CHANGE_PASSWORD + RESET });
};

export function userManagementReducer(state = initialState, action) {
  switch (action.type) {
    case USER_MANAGEMENT + CLEAR + STATE:
      return initialState;
    case USER_MANAGEMENT + REQUEST_AUTO_COMPLETE_DATA + SUCCESS: {
      const { data } = action;
      const usersAutocompleteData = prepareAutocompleteData(data);
      return {
        ...state,
        usersAutocompleteData,
      };
    }
    case USER_MANAGEMENT + REQUEST_AUTO_COMPLETE_DATA + RESET: {
      return {
        ...state,
        usersAutocompleteData: initialState.usersAutocompleteData,
      };
    }
    case USER_MANAGEMENT + REQUEST_USERS_LIST + SUCCESS: {
      return {
        ...state,
        users: action.usersData.content.map(user => {
          return {
            ...user,
            // todo конвертирование ролей и поле "fio" - это временное решение для обратной совместимости
            roles: convertRolesListForFrontend(user.roles),
            fio: user.name,
          };
        }),
        usersPagination: {
          pageCurrent: action.usersData.number,
          pagesCount: action.usersData.totalPages,
        },
      };
    }
    case USER_MANAGEMENT + SAVE + USERS_PAGE_URL: {
      return {
        ...state,
        usersPageUrl: action.url || '',
      };
    }
    case USER_MANAGEMENT + USERS_PAGE_URL + RESET: {
      return {
        ...state,
        usersPageUrl: '',
      };
    }
    case USER_MANAGEMENT + REQUEST_USER + START: {
      return {
        ...state,
        editingUser: state.editingUser,
      };
    }
    case USER_MANAGEMENT + REQUEST_USER + SUCCESS: {
      const hasMacroregions = typeof action.user.macroregions !== 'undefined';
      const editingUser = {
        ...action.user,
        // todo конвертирование ролей и поле "fio" - это временное решение для обратной совместимости
        roles: convertRolesListForFrontend(action.user.roles),
        fio: action.user.name,
        ukdsMain: [],
        ukdsAdditional: [],
        hasPassword: typeof action.user.lastPasswordChangeTime !== 'undefined',
      };

      if (!hasMacroregions) {
        editingUser.macroregions = [];
        editingUser.ukdsMain = editingUser.ukds.filter(ukd => ukd.main);
        editingUser.ukdsAdditional = editingUser.ukds.filter(ukd => !ukd.main);
      }

      return {
        ...state,
        editingUser,
      };
    }
    case USER_MANAGEMENT + REQUEST_CREATE_USER + START: {
      return {
        ...state,
        userCreationIsLoading: true,
        createdUserData: {},
      };
    }
    case USER_MANAGEMENT + REQUEST_CREATE_USER + SUCCESS: {
      return {
        ...state,
        userCreationIsLoading: false,
        userCreated: true,
        createdUserData: action.createdUser,
      };
    }
    case USER_MANAGEMENT + REQUEST_CREATE_USER + FAIL: {
      return {
        ...state,
        userCreationIsLoading: false,
        userCreated: false,
        createdUserData: {},
      };
    }
    case USER_MANAGEMENT + REQUEST_CREATE_USER + RESET: {
      return {
        ...state,
        userCreationIsLoading: false,
        userCreated: false,
        createdUserData: {},
      };
    }
    case USER_MANAGEMENT + SHOW_LOGIN_EXISTS_ERROR: {
      return {
        ...state,
        showLoginExistsError: true,
      };
    }
    case USER_MANAGEMENT + HIDE_LOGIN_EXISTS_ERROR: {
      return {
        ...state,
        showLoginExistsError: false,
      };
    }
    case USER_MANAGEMENT + REQUEST_EDIT_USER + START: {
      return {
        ...state,
        userEditingIsLoading: true,
      };
    }
    case USER_MANAGEMENT + REQUEST_EDIT_USER + SUCCESS: {
      return {
        ...state,
        userEditingIsLoading: false,
        userEdited: true,
      };
    }
    case USER_MANAGEMENT + REQUEST_EDIT_USER + FAIL: {
      return {
        ...state,
        userEditingIsLoading: false,
        userEdited: false,
      };
    }
    case USER_MANAGEMENT + REQUEST_EDIT_USER + RESET: {
      return {
        ...state,
        userEditingIsLoading: false,
        userEdited: false,
      };
    }
    case USER_MANAGEMENT + REQUEST_DELETE_USER + START: {
      return {
        ...state,
        userDeletingIsLoading: true,
      };
    }
    case USER_MANAGEMENT + REQUEST_DELETE_USER + SUCCESS: {
      return {
        ...state,
        userDeletingIsLoading: false,
        userDeleted: true,
      };
    }
    case USER_MANAGEMENT + REQUEST_DELETE_USER + FAIL: {
      return {
        ...state,
        userDeletingIsLoading: false,
        userDeleted: false,
      };
    }
    case USER_MANAGEMENT + REQUEST_DELETE_USER + RESET: {
      return {
        ...state,
        userDeletingIsLoading: false,
        userDeleted: false,
      };
    }
    case USER_MANAGEMENT + REQUEST_CHANGE_PASSWORD + START: {
      return {
        ...state,
        passwordChangingIsLoading: true,
        passwordChanged: false,
      };
    }
    case USER_MANAGEMENT + REQUEST_CHANGE_PASSWORD + SUCCESS: {
      return {
        ...state,
        passwordChangingIsLoading: false,
        passwordChanged: true,
      };
    }
    case USER_MANAGEMENT + REQUEST_CHANGE_PASSWORD + FAIL: {
      return {
        ...state,
        passwordChangingIsLoading: false,
        passwordChanged: false,
      };
    }
    case USER_MANAGEMENT + REQUEST_CHANGE_PASSWORD + RESET: {
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
