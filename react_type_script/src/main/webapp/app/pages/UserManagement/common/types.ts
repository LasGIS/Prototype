/*
 * Copyright (c) 2020. Prototype
 */

import { UserRoleEnum } from '../../../common/types/server-api-dtos';

export type AutocompleteData = {
  names: string[];
  logins: string[],
  roles: UserRoleEnum[]
};

export type PasswordData = {
  userId: string;
};
