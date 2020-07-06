/*
 * Copyright (c) 2020. Prototype
 */

import $ from 'jquery';
import { globalHideLoader, globalShowLoader } from './services/action-creators';

export enum HTTP_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

type RequestSettings = {
  contentType?: string;
  dataType?: string;
  requestSettingsDataParam?: string;
};

export const get = (url: string, data?: any, requestSettings?: RequestSettings) => (dispatch: any) =>
  requestDecorator(url, HTTP_METHODS.GET, data, requestSettings)(dispatch);

export const post = (url: string, data: any, requestSettings?: RequestSettings) => (dispatch: any) =>
  requestDecorator(url, HTTP_METHODS.POST, data, requestSettings)(dispatch);

export const put = (url: string, data?: any, requestSettings?: RequestSettings) => (dispatch: any) =>
  requestDecorator(url, HTTP_METHODS.PUT, data, requestSettings)(dispatch);

export const del = (url: string, data?: any, requestSettings?: RequestSettings) => (dispatch: any) =>
  requestDecorator(url, HTTP_METHODS.DELETE, data, requestSettings)(dispatch);

const requestDecorator = (
  url: string, method: HTTP_METHODS, data?: any,
  requestSettings: any = { requestSettingsDataParam: 'json' },
) => (dispatch: any) => {
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

export function request(url: string, method: HTTP_METHODS, data: any = {}, requestSettings: RequestSettings = {}) {
  const { contentType, dataType, requestSettingsDataParam } = requestSettings;

  return new Promise<any>((resolve, reject) => {
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
      .done((response: any) => resolve(response))
      .fail((error: any) => reject(error));
  });

  function getDataParam() {
    const defaultValue = method === HTTP_METHODS.GET ? data : JSON.stringify(data);
    return requestSettingsDataParam === 'json' ? defaultValue : data;
  }
}

function requestWithHeaders(url: string, method: HTTP_METHODS, data: any, requestSettings: RequestSettings = {}) {
  const { contentType, dataType, requestSettingsDataParam } = requestSettings;

  return new Promise<any>((resolve, reject) => {
    $.ajax({
      url: url,
      type: method,
      contentType: contentType === 'false' ? false : contentType || 'application/json',
      dataType: dataType || 'json',
      data: getDataParam(),
//      resolveWithFullResponse: true,
//      simple: false,
    })
      .done((response: any) => {
        return resolve(response);
      })
      .fail((error: any) => reject(error));
  });

  function getDataParam() {
    const defaultValue = method === HTTP_METHODS.GET ? data : JSON.stringify(data);
    return requestSettingsDataParam === 'json' ? defaultValue : data;
  }
}
