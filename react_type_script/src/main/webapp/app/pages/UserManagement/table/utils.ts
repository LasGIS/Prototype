/*
 * Copyright (c) 2020. Prototype
 */

import { UserRoleEnum } from '../../../common/types/server-api-dtos';
import { ROLES } from '../../../constants/users-roles';
import { AutocompleteData } from '../common/types';

export const getRolesString = (roles: UserRoleEnum[]) => {
  if (!roles.length) return '';
  return roles
    .filter(rol => ROLES[rol])
    .map(rol => ROLES[rol].text)
    .join(', ');
};

/** Работа с автокомплитом */
export function prepareAutocompleteData(initData: AutocompleteData) {
  if (!initData || !Object.keys(initData).length) return {};

  const { names, logins, roles } = initData;

  if (!names || !logins || !roles) return {};

  const result = {
    items: [],
    itemsMap: {
      /** Итоговая структура, примеры */
      // "УКД 2": {
      //     type: "ukds",
      //     id: "4322e2e8-8ecc-471c-be15-aabac4545601"
      // },
      // "Иванов Иван Иванович": {
      //     type: "names",
      //     id: ""
      // },
      // "Ivanov-ivan": {
      //     type: "logins"
      //     id: ""
      // },
      // "Курьер": {
      //     type: "roles",
      //     id: "COURIER"
      // }
    },
  };
  const itemsMap = result.itemsMap;

  result.items = [...names, ...logins, ...Object.values(roles)];

  for (const name of names) {
    itemsMap[name] = {
      type: 'names',
      id: '',
    };
  }

  for (const login of logins) {
    itemsMap[login] = {
      type: 'logins',
      id: '',
    };
  }

  for (const roleEntry of Object.entries(roles)) {
    itemsMap[roleEntry[1]] = {
      type: 'roles',
      id: roleEntry[0],
    };
  }

  return result;
}
