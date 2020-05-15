/*
 * Copyright (c) 2020. Prototype
 */

import { CAN_EDIT_ROLES, isGrantedRoles } from '../../../constants/users-roles';

/** проверка: может ли текущий сотрудник редактировать данного сотрудника */
export const isCurrentUserCanEditUser = (currentUser, user) => {
  // todo доработать логику функции так, чтобы сделать её чистой функцией
  const roles = currentUser.roles;
  if (!roles) return false;
  const keyRoles = roles.map(r => r.name);
  for (const key in CAN_EDIT_ROLES) {
    if (keyRoles.includes(key)) {
      const isGranted = isGrantedRoles(CAN_EDIT_ROLES[key], user.roles);
      //const isForbidden = isGrantedRoles(CAN_NOT_EDIT_ROLES[key], user.roles);
      /* есть разрешенные и нет запрещенных ролей */
      if (isGranted /* && !isForbidden*/) {
        return true;
      }
    }
  }
  return false;
};
