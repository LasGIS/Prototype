/*
 * Copyright (c) 2021. Prototype
 */

import Cookies from 'js-cookie';
import { LanguageDetectorModule } from 'i18next';

const cookieName = 'LANGUAGE';

const languageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  init: () => {
  },
  detect: () => {
    return Cookies.get(cookieName) || getLocaleFromNavigator();
  },
  cacheUserLanguage: (lng: string) => {
    Cookies.set(cookieName, lng);
  }
}

const getLocaleFromNavigator = () => {
  const languages = navigator?.languages || [];
  return isRuLocaleAccepted(languages) ? 'ru' : 'en';
}

const isRuLocaleAccepted = (languages: ReadonlyArray<string>) => {
  return languages.some(lang => lang.startsWith('ru') || lang.startsWith('uk') || lang.startsWith('be'));
}

export default languageDetector;
