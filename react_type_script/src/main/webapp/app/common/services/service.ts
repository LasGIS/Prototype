/*
 * Copyright (c) 2020. Prototype
 */

import { get } from '../rest';

export function fetchCurrentUser(login: string) {
  return get(`/v1.0/user/current`, { login: login });
}

export function fetchAppSettings() {
  return get(`/v1.0/settings`);
}

export function logout() {
  return get('/logout');
}
