/*
 * Copyright (c) 2020. Prototype
 */

export const ROLES = {
  OPERATOR: { name: 'OPERATOR', text: 'Оператор' },
  SUPERVISOR: { name: 'SUPERVISOR', text: 'Старший смены' },
  CHIEF: { name: 'CHIEF', text: 'Начальник' },
  ADMIN: { name: 'ADMIN', text: 'Администратор' },
};

export const FEATURE_EDIT_ROLES = {
  USER_MANAGEMENT: [ROLES.CHIEF, ROLES.ADMIN],
  PERSON_MANAGEMENT: [ROLES.OPERATOR, ROLES.SUPERVISOR, ROLES.CHIEF],
};

/** Утилитарные функции */
export const isGrantedRoles = (userRoles, grantedRoles) => {
  if (!userRoles) return true;
  return Boolean(grantedRoles && userRoles.find(role => grantedRoles.map(r => r.name).includes(role.name)));
};
