/*
 * Copyright (c) 2020. Prototype
 */

import { UserRoleEnum } from '../common/types/server-api-dtos';

export const ROLES: { [key: string]: { name: string, text: string } } = {
  [UserRoleEnum.OPERATOR]: { name: UserRoleEnum.OPERATOR, text: 'Оператор' },
  [UserRoleEnum.SUPERVISOR]: { name: UserRoleEnum.SUPERVISOR, text: 'Старший смены' },
  [UserRoleEnum.CHIEF]: { name: UserRoleEnum.CHIEF, text: 'Начальник' },
  [UserRoleEnum.ADMIN]: { name: UserRoleEnum.ADMIN, text: 'Администратор' },
};

export const FEATURE_EDIT_ROLES = {
  ALL_ROLES: [UserRoleEnum.OPERATOR, UserRoleEnum.SUPERVISOR, UserRoleEnum.CHIEF, UserRoleEnum.ADMIN],
  USER_MANAGEMENT: [UserRoleEnum.CHIEF, UserRoleEnum.ADMIN],
  PERSON_MANAGEMENT: [UserRoleEnum.OPERATOR, UserRoleEnum.SUPERVISOR, UserRoleEnum.CHIEF],
};

/** Утилитарные функции */
export const isGrantedRoles = (userRoles: UserRoleEnum[], grantedRoles: UserRoleEnum[]) => {
  if (!userRoles) return true;
  return Boolean(grantedRoles && userRoles.find(role => grantedRoles.includes(role)));
};
