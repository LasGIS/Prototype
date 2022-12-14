/*
 * Copyright (c) 2021. Prototype
 */

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

export interface ApiServices {
  getAccess(): Promise<any>;

  /** @deprecated */
  sendRequest(url: string, params: any): Promise<any>;

  // ----- statistics -----
  getStatistics(): Promise<StatisticsDto>;

  saveSettings(params: StatisticsSettings): Promise<any>;

  saveSettingsBatch(params: StatisticsBatchSettings): Promise<any>;

  // ----- access settings -----
  getAccessSettings(): Promise<AccessSettingsDto>;

  resetPassword(): Promise<any>;

  sendSettings(): Promise<any>;

  getUserInfo(): Promise<UserInfo>;

  // ----- dictionaries -----------
  /** GET "/public-api/v1.0/dictionary/operation-codes" */
  getOperationTypeWithAttributes(language: Language): Promise<OperationTypeWithAttributeDto[]>;

  /** GET "/public-api/v1.0/dictionary/category-codes" */
  getCategoryCodes(language: Language): Promise<DictionaryDto[]>;

  /** GET "/public-api/v1.0/dictionary/mailrank" */
  getMailRanks(language: Language): Promise<DictionaryDto[]>;

  /** GET "/public-api/v1.0/dictionary/mailtype" */
  getMailTypes(language: Language): Promise<DictionaryDto[]>;

  /** GET "/public-api/v1.0/dictionary/postmark" */
  getPostmarks(language: Language): Promise<PostMarkDto[]>;

  /** GET "/public-api/v1.0/dictionary/countries" */
  getCountries(language: Language): Promise<CountryInfo[]>;

  /** GET "/public-api/v1.0/dictionary/send-ctg" */
  getSendCategories(language: Language): Promise<DictionaryDto[]>;

  /** GET "/public-api/v1.0/dictionary/event-type" */
  getEventTypes(language: Language): Promise<EventTypeDto[]>;

  /** GET "/public-api/v1.0/dictionary/special-terms" */
  getTechnicalTerms(language: Language): Promise<TechnicalTerm[]>;
}
