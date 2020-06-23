/*
 * Copyright (c) 2020. Prototype
 */

import { del, get, post, put } from '../../../common/rest';
import { PasswordData } from '../common/types';
import { TableUsersRequest, UserDto } from '../../../common/types/server-api-dtos';

/** Получение списка пользователей */
export function requestUsersList(params: TableUsersRequest) {
  return post(`/v1.0/users/`, params);
}

/** Получение одного пользователя */
export function requestUser(userId: string) {
  return get(`/v1.0/users/${userId}`);
}

/** Добавление пользователя */
export function requestCreateUser(user: UserDto) {
  return post(`/v1.0/users/`, user);
}

/** Изменение пароля */
export function requestChangeUserPassword(passwordData: PasswordData) {
  return put(`/v1.0/users/${passwordData.userId}/password`, passwordData);
}

/** Изменение пользователя */
export function requestChangeUser(user: UserDto) {
  return put(`/v1.0/users/${user.userId}`, user);
}

/** Удаление пользователя */
export function requestDeleteUser(userId: number) {
  return del(`/v1.0/users/${userId}`);
}
