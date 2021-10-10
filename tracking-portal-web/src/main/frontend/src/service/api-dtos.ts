/*
 * Copyright (c) 2021. Prototype
 */

export type ModeType = 'batch' | 'single';

export type ErrorDtoType =
  | 'USER_UNAUTHORIZED'
  | 'SERVICE_UNAVAILABLE'
  | 'PORTAL_BACKEND_USER_NOT_FOUND'
  | 'PORTAL_BACKEND_USER_ALREADY_EXISTS'
  | 'INCOMPLETE_POST_ID_USER_PROFILE'
  | 'INTERNAL_SERVER_ERROR';

export type ErrorDtoMessageKey =
  | 'error.message.user-unauthorized'
  | 'error.message.external-service-unavailable'
  | 'error.message.portal-backend-user-not-found'
  | 'error.message.portal-backend-user-already-exists'
  | 'error.message.incomplete-post-id-user-profile'
  | 'error.message.internal-server-error';

export type ErrorDto = {
  type: ErrorDtoType;
  status: number;
  messageKey: ErrorDtoMessageKey;
  //  args: string[]
};

export interface UserInfo {
  isAuthorized: boolean;
  hid: string;
  name: string;
  isServiceTrackingUser: boolean;
}

export const defaultUserInfo: UserInfo = {
  isAuthorized: false,
  hid: '-1',
  name: '',
  isServiceTrackingUser: false,
};

export type AccessSettingsDto = {
  userEmail: string;
  backendUserLogin: string;
  isBatchAccessAllowed: boolean;
};

// ----- Dictionary -----
export type DictionaryDto = {
  code: number;
  name: string;
};

export type OperationAttributeDto = {
  code: number;
  name: string;
  isTerminal: boolean;
};

export type OperationTypeWithAttributeDto = {
  code: number;
  name: string;
  isTerminal: boolean;
  attributes: OperationAttributeDto[];
};

export type PostMarkDto = DictionaryDto;

export type CountryInfo = {
  id: number;
  codeA2: string;
  codeA3: string;
  nameRu: string;
  nameEn: string;
  nameFr: string;
};

export type EventTypeDto = DictionaryDto & {
  description: string;
};

export type TechnicalTerm = {
  name: string;
  description: string;
};

// ----- statistics -----
export type StatisticsSettings = {
  sendStatistics: boolean;
  notifyEvery: number;
  notifyOverLimits: boolean;
};

export type StatisticsBatchSettings = {
  sendStatistics: boolean;
  notifyEvery: number;
};

export type StatisticsDataItem = {
  x: number;
  y: number;
  r?: number;
  limit?: number;
};

export type StatisticsDto = {
  userEmail: string;
  unlimited: boolean;
  data: StatisticsDataItem[];
  settings: StatisticsSettings;
  dataBatch: StatisticsDataItem[];
  batchSettings: StatisticsBatchSettings;
};
