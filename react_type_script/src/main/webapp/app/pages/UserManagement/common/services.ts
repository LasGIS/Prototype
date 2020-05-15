/*
 * Copyright (c) 2020. Prototype
 */

import { del, get, post, put } from '../../../common/rest';
import { PasswordData } from './types';
import { UserDto } from '../../../common/types/server-api-dtos';

/** Получение списка пользователей */
export const usersListRequestUrl = `/v1.0/user`;

export function requestUsersList(params: any) {
  return get(usersListRequestUrl, params);
}

/** Получение одного пользователя */
export function requestUser(userId: string) {
  return get(`${usersListRequestUrl}/${userId}`);
}

/** Добавление пользователя */
export function requestCreateUser(user: UserDto) {
  return post(usersListRequestUrl, user);
}

/** Изменение пароля */
export function requestChangeUserPassword(passwordData: PasswordData) {
  return put(`${usersListRequestUrl}/${passwordData.userId}/password`, passwordData);
}

/** Изменение пользователя */
export function requestChangeUser(user: UserDto) {
  return put(`${usersListRequestUrl}/${user.userId}`, user);
}

/** Удаление пользователя */
export function requestDeleteUser(userId: number) {
  return del(`${usersListRequestUrl}/${userId}`);
}

/** Получение данных для автокомплита */
export function requestAutocompleteDataSource() {
  return get(`/v1.0/prefilleduserinfo`);
}
