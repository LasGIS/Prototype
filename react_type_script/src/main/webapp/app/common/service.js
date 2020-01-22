
/*
 * Copyright (c) 2020. Prototype
 */

import { get } from './rest';

export function fetchCurrentUser() {
  return get(`/v1.0/user/currentuser`);
}

export function fetchAppSettings() {
  return get(`/v1.0/settings`);
}

export function logout() {
  return get('/logout');
}

export function fetchAppVersion() {
  return get(`/monitoring/version`, '', { contentType: 'text/plain', dataType: 'text' });
}
