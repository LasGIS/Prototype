/*
 * Copyright (c) 2020. Prototype
 */

import { post } from '../rest';

export function checkUser(username, password) {
  if (username && password) {
    const data = `j_username=${username}&j_password=${password}`;

    return post(`/login`, data, {
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      requestSettingsDataParam: 'formData',
    });
  }
}
