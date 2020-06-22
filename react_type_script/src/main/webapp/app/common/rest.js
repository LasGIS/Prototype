/*
 * Copyright (c) 2020. Prototype
 */

import $ from 'jquery/dist/jquery';
import { globalHideLoader, globalShowLoader } from './services/action-creators';

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

const requestDecorator = (
  url, method, data,
  requestSettings = { requestSettingsDataParam: 'json' },
) => dispatch => {
  dispatch(globalShowLoader());
  return request(url, method, data, requestSettings)
    .then(response => {
      dispatch(globalHideLoader());
      return response;
    })
    .catch(error => {
      dispatch(globalHideLoader());
      return error;
    });
};

const requestDecoratorWithHeaders = (url, method, data, requestSettings = {}) => dispatch => {
  dispatch(globalShowLoader());
  return requestWithHeaders(url, method, data, requestSettings)
    .then(header => {
      dispatch(globalHideLoader());
      return header;
    })
    .catch(error => {
      dispatch(globalHideLoader());
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
      data: getDataParam(),
      // headers: {
      //   'auth-Token': localStorage.getItem(FRONT_AUTH_TOKEN) || undefined,
      // },
    })
      .done(response => resolve(response))
      .fail(error => reject(error));
  });

  function getDataParam() {
    const defaultValue = method === HTTP_METHODS.GET ? data : JSON.stringify(data);
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
      data: getDataParam(),
      resolveWithFullResponse: true,
      simple: false,
    })
      .done((response) => {
        return resolve(response);
      })
      .fail(error => reject(error));
  });

  function getDataParam() {
    const defaultValue = method === HTTP_METHODS.GET ? data : JSON.stringify(data);
    return requestSettingsDataParam === 'json' ? defaultValue : data;
  }
}
