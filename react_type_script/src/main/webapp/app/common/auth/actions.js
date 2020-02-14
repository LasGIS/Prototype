/*
 * Copyright (c) 2020. Prototype
 */

import { checkUser } from './service';
import { FRONT_AUTH_USER } from '../../constants/constants';
import { setUserInfo } from '../actions';

export const login = (login, password) => dispatch => {
  if (login === '' || password === '') {
    return Promise.reject('wrong login data');
  }
  return checkUser(login, password)(dispatch)
    .then(user => {
      localStorage.setItem(FRONT_AUTH_USER, JSON.stringify(user));
      setUserInfo(user)(dispatch);
    })
    .catch(err => {
      localStorage.setItem(FRONT_AUTH_USER, '');
      throw err;
    });
};
