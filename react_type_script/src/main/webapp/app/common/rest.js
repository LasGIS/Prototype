/*
 * Copyright (c) 2020. Prototype
 */

import $ from 'jquery/dist/jquery';
import { CLEAR_ERROR, HIDE_LOADER, SHOW_LOADER } from './actions';
import { BACK_AUTH_TOKEN, FRONT_AUTH_TOKEN } from '../constants/constants';

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const get = (url, data, requestSettings) => dispatch =>
  requestDecorator(url, HTTP_METHODS.GET, data, requestSettings)(dispatch);

export const post = (url, data) => dispatch => requestDecorator(url, HTTP_METHODS.POST, data)(dispatch);

export const postWithHeaders = (url, data, requestSettings) => dispatch =>
  requestDecoratorWithHeaders(url, HTTP_METHODS.POST, data, requestSettings)(dispatch);

export const put = (url, data) => dispatch => requestDecorator(url, HTTP_METHODS.PUT, data)(dispatch);

export const del = (url, data) => dispatch => requestDecorator(url, HTTP_METHODS.DELETE, data)(dispatch);

const requestDecorator = (url, method, data, requestSettings = {}) => dispatch => {
  dispatch({ type: SHOW_LOADER });
  return request(url, method, data, requestSettings)
    .then(response => {
      dispatch({ type: HIDE_LOADER });
      dispatch({ type: CLEAR_ERROR });
      return response;
    })
    .catch(error => {
      dispatch({ type: HIDE_LOADER });
      return error;
    });
};

const requestDecoratorWithHeaders = (url, method, data, requestSettings = {}) => dispatch => {
  dispatch({ type: SHOW_LOADER });
  return requestWithHeaders(url, method, data, requestSettings)
    .then(header => {
      dispatch({ type: HIDE_LOADER });
      dispatch({ type: CLEAR_ERROR });
      return header;
    })
    .catch(error => {
      dispatch({ type: HIDE_LOADER });
      return error;
    });
};

export function request(url, method, data = {}, requestSettings = {}) {
  const { contentType, dataType, requestSettingsDataParam } = requestSettings;

  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: method,
      contentType: contentType === 'false' ? false : contentType || 'application/json',
      dataType: dataType || 'json',
      data: getDataParam(method, data, requestSettingsDataParam),
      headers: {
        'auth-Token': localStorage.getItem(FRONT_AUTH_TOKEN) || undefined,
      },
    })
      .done(response => resolve(response))
      .fail(error => reject(error));
  });

  function getDataParam(method, data = {}, requestSettingsDataParam = 'json') {
    const defaultValue = method === 'GET' ? data : JSON.stringify(data);
    return requestSettingsDataParam === 'json' ? defaultValue : data;
  }
}

function requestWithHeaders(url, method, data, requestSettings) {
  const { contentType, dataType, requestSettingsDataParam } = requestSettings;

  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: method,
      contentType: contentType === 'false' ? false : contentType || 'application/json',
      dataType: dataType || 'json',
      data: getDataParam(method, data, requestSettingsDataParam),
      resolveWithFullResponse: true,
      simple: false,
    })
      .done((response, status, header) => {
//        const token = header.getResponseHeader(BACK_AUTH_TOKEN);
        return resolve(response);
      })
      .fail(error => reject(error));
  });

  function getDataParam(method, data = {}, requestSettingsDataParam = 'json') {
    const defaultValue = method === HTTP_METHODS.GET ? data : JSON.stringify(data);
    return requestSettingsDataParam === 'json' ? defaultValue : data;
  }
}
