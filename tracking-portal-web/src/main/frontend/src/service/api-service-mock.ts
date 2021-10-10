/*
 * Copyright (c) 2021. Prototype
 */

import assert from 'assert';
import { ApiServices } from './api-services';
import {
  AccessSettingsDto,
  CountryInfo,
  DictionaryDto,
  EventTypeDto,
  OperationTypeWithAttributeDto,
  PostMarkDto,
  StatisticsBatchSettings,
  StatisticsDto,
  StatisticsSettings,
  TechnicalTerm,
  UserInfo,
} from './api-dtos';
import { Language } from '../common/types';

class ApiServiceMock implements ApiServices {
  getAccess = (): Promise<any> => {
    return new Promise((resolve) => {
      console.log('getAccess');

      global.setTimeout(() => {
        resolve({ isAccessAdded: true });
        // error = "INTERNAL_SERVER_ERROR";
        // error = "SERVICE_UNAVAILABLE";
        // defer.reject(error);
      }, 500);
    });
  };

  /** @deprecated */
  sendRequest = (url: string, params: any) => {
    return new Promise((resolve) => {
      console.log('sendRequest', url, params);

      assert(url);
      assert(params);
      assert(params.contractNumber);
      assert(params.contractDate);
      assert(params.organizationName);
      assert(params.organizationINN);
      assert(params.contactName);
      assert(params.contactSurname);
      // assert(params.contactSecond);
      // assert(params.contactRegion);
      // assert(params.contactEmail);
      // assert(params.contactPhone);

      global.setTimeout(() => {
        resolve('');
        // error = "ALREADY_SENT";
        // // error = "INVALID_TIN";
        // // error = "ALREADY_APPROVED";
        // const error = "SERVICE_UNAVAILABLE";
        // // error = "INTERNAL_SERVER_ERROR";
        /*
        reject({
          type: 'INTERNAL_SERVER_ERROR',
          messageKey: "error.message.internal-server-error",
          status: 500
        });
        */
      }, 1200);
    });
  };

  // ----- statistics -----
  getStatistics = (): Promise<StatisticsDto> => {
    return new Promise((resolve) => {
      global.setTimeout(() => {
        resolve({
          userEmail: 'vpupkin@gmail.com',
          unlimited: true,
          data: [
            { x: 1617667200000, y: 1, limit: 100 },
            { x: 1617753600000, y: 22, limit: 100 },
            { x: 1618185600000, y: 39, limit: 100 },
            { x: 1618876800000, y: 47, limit: 100 },
            { x: 1620518400000, y: 90, limit: 100 },
            { x: 1620604800000, y: 110, limit: 100 },
            { x: 1620691200000, y: 105, limit: 100 },
            { x: 1620777600000, y: 1, limit: 2147483647 },
            { x: 1621814400000, y: 12, limit: 2147483647 },
          ],
          settings: {
            sendStatistics: true,
            notifyEvery: 7,
            notifyOverLimits: true,
          },
          dataBatch: [
            { x: 1620777600000, y: 5, r: 26 },
            { x: 1621814400000, y: 4, r: 13 },
          ],
          batchSettings: {
            sendStatistics: true,
            notifyEvery: 7,
          },
        });
      }, 1000);
    });
  };

  saveSettings = (params: StatisticsSettings): Promise<any> => {
    return new Promise((resolve) => {
      console.log('saveSettings', params);

      assert(params);
      assert(params.notifyEvery);

      global.setTimeout(() => {
        resolve('');
      }, 500);
    });
  };

  saveSettingsBatch = (params: StatisticsBatchSettings): Promise<any> => {
    return new Promise((resolve) => {
      console.log('saveSettingsBatch', params);

      assert(params);
      assert(params.notifyEvery);

      global.setTimeout(() => {
        resolve('');
      }, 500);
    });
  };

  // ----- access settings -----
  getAccessSettings = (): Promise<AccessSettingsDto> => {
    return new Promise((resolve) => {
      global.setTimeout(() => {
        resolve({
          backendUserLogin: 'login',
          userEmail: 'VPupkin@it-one.ru',
          isBatchAccessAllowed: true,
        });
      }, 1000);
    });
  };

  resetPassword = () => {
    return new Promise((resolve) => {
      global.setTimeout(() => {
        resolve(null);
      }, 1000);
    });
  };

  sendSettings = () => {
    return new Promise((resolve) => {
      global.setTimeout(() => {
        resolve(null);
      }, 1000);
    });
  };

  getUserInfo = (): Promise<UserInfo> => {
    return new Promise((resolve) => {
      global.setTimeout(() => {
        resolve({
          isAuthorized: true,
          hid: '1789abcd-9876-4567-abcd-456789abcdef',
          name: 'Пупкин Василий Петрович',
          isServiceTrackingUser: true,
        });
      }, 1000);
    });
  };

  /** /public-api/v1.0/dictionary/operation-codes */
  getOperationTypeWithAttributes = (language: Language): Promise<OperationTypeWithAttributeDto[]> => {
    console.log('language = ', language);
    return new Promise((resolve) => {
      global.setTimeout(() => {
        resolve([]);
      }, 1000);
    });
  };

  /** /public-api/v1.0/dictionary/category-codes */
  getCategoryCodes = (language: Language): Promise<DictionaryDto[]> => {
    console.log('language = ', language);
    return new Promise((resolve) => {
      global.setTimeout(() => {
        resolve([
          {
            code: 1,
            name: 'Ласкин',
          },
          {
            code: 2,
            name: 'Владимир',
          },
          {
            code: 3,
            name: 'Вадимович',
          },
        ]);
      }, 1000);
    });
  };

  /** /public-api/v1.0/dictionary/mailrank */
  getMailRanks = (language: Language): Promise<DictionaryDto[]> => {
    console.log('language = ', language);
    return new Promise((resolve) => {
      global.setTimeout(() => {
        resolve([]);
      }, 1000);
    });
  };

  /** /public-api/v1.0/dictionary/mailtype */
  getMailTypes = (language: Language): Promise<DictionaryDto[]> => {
    console.log('language = ', language);
    return new Promise((resolve) => {
      global.setTimeout(() => {
        resolve([]);
      }, 1000);
    });
  };

  /** /public-api/v1.0/dictionary/postmark */
  getPostmarks = (language: Language): Promise<PostMarkDto[]> => {
    console.log('language = ', language);
    return new Promise((resolve) => {
      global.setTimeout(() => {
        resolve([]);
      }, 1000);
    });
  };

  /** /public-api/v1.0/dictionary/countries */
  getCountries = (language: Language): Promise<CountryInfo[]> => {
    console.log('language = ', language);
    return new Promise((resolve) => {
      global.setTimeout(() => {
        resolve([]);
      }, 1000);
    });
  };

  /** /public-api/v1.0/dictionary/send-ctg */
  getSendCategories = (language: Language): Promise<DictionaryDto[]> => {
    console.log('language = ', language);
    return new Promise((resolve) => {
      global.setTimeout(() => {
        resolve([]);
      }, 1000);
    });
  };

  /** /public-api/v1.0/dictionary/event-type */
  getEventTypes = (language: Language): Promise<EventTypeDto[]> => {
    console.log('language = ', language);
    return new Promise((resolve) => {
      global.setTimeout(() => {
        resolve([]);
      }, 1000);
    });
  };

  /** /public-api/v1.0/dictionary/special-terms */
  getTechnicalTerms = (language: Language): Promise<TechnicalTerm[]> => {
    console.log('language = ', language);
    return new Promise((resolve) => {
      global.setTimeout(() => {
        resolve([]);
      }, 1000);
    });
  };
}

export default ApiServiceMock;
