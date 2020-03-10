/*
 * Copyright (c) 2020. Prototype
 */

/*
export const ROLES = {
  OPERATOR: { name: 'OPERATOR', text: 'Оператор' },
  SUPERVISOR: { name: 'SUPERVISOR', text: 'Старший смены' },
  CHIEF: { name: 'CHIEF', text: 'Начальник' },
  ADMIN: { name: 'ADMIN', text: 'Администратор' },
};
*/

import { UserRoleEnum } from '../common/types/server-api-dtos';

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
