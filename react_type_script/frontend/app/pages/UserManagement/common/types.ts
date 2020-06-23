/*
 * Copyright (c) 2020. Prototype
 */

import { TableUsersRequest, UserDto, UserRoleEnum } from '../../../common/types/server-api-dtos';
import { GetAllActionTypes } from '../../../common/types/redux-types';
import * as UserManagementActionMaps from '../services/action-creators';
import * as GlobalActionMaps from '../../../common/services/action-creators';

export type AutocompleteData = {
  names: string[];
  logins: string[],
  roles: UserRoleEnum[]
};

export type PasswordData = {
  userId: string;
};

export type UserManagementState = {
  users: UserDto[];
  usersRequest: TableUsersRequest;
  usersPageUrl: string;
  // editing user
  editingUser: UserDto,
  // create new user
  userCreationIsLoading: boolean,
  userCreated: boolean,
  createdUserData?: UserDto,
  // edit user
  userEditingIsLoading: boolean,
  userEdited: boolean,
  // delete user
  userDeletingIsLoading: boolean,
  userDeleted: boolean,
  // password
  passwordChangingIsLoading: boolean,
  passwordChanged: boolean,
};

const userManagementActions = {
  ...UserManagementActionMaps,
  ...GlobalActionMaps,
} as const;

export type UserManagementActions = ReturnType<GetAllActionTypes<typeof userManagementActions>>;

