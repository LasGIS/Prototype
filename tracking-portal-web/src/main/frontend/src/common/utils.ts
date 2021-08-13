/*
 * Copyright (c) 2021. Prototype
 */

export type GetUrlParamsResponse = {
  [key: string]: string | string[]
};

let idCounter = 0;

export const uniqueId = (prefix: string) => {
  let id = ++idCounter + '';
  return prefix ? prefix + id : id;
}

export const isObject = (obj: any) => {
  const type = typeof obj;
  return Boolean(obj) && (type === 'function' || type === 'object');
}

export const getUrlParams = (search: string): GetUrlParamsResponse => {
  const params: GetUrlParamsResponse = {};

  search.replace(/[?&]+([^=&]+)=([^&]*)/gi,
    (str: string, key, value): string => {
      const decodedKey: string = decodeURIComponent(key);
      const decodedValue: string = decodeURIComponent(value.replace(/\+/g, " "));

      if (Boolean(params[decodedKey])) {
        if (Array.isArray(params[decodedKey])) {
          (params[decodedKey] as string[]).push(decodedValue);
        } else {
          params[decodedKey] = [ params[decodedKey] as string, decodedValue ];
        }
      } else {
        params[decodedKey] = decodeURIComponent(decodedValue);
      }
      return decodedKey;
    }
  );
  return params;
}
