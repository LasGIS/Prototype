/*
 * Copyright (c) 2020. Prototype
 */

/** Текущий пользователь приложения */
const currentUser = {
  userId: '777',
  login: 'frontend-app-user',
  name: 'Тестовый Юзер Юзерович',
  roles: ['CHIEF', 'ADMIN', 'OPERATOR', 'SUPERVISOR'],
  archived: false,
};

module.exports = {
  currentUserData: {
    currentUser,
  },
};
