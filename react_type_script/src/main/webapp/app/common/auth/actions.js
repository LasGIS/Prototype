/*
 * Copyright (c) 2020. Prototype
 */

import { checkUser } from './service';
import { FRONT_AUTH_TOKEN } from '../../constants/constants';

export const login = (login, password) => dispatch => {
  if (login === '' || password === '') {
    return Promise.reject('wrong login data');
  }
  return checkUser(login, password)(dispatch)
    .then(response => {
      localStorage.setItem(FRONT_AUTH_TOKEN, response);
    })
    .catch(err => {
      localStorage.setItem(FRONT_AUTH_TOKEN, '');
      throw err;
    });
};
