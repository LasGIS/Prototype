/*
 * Copyright (c) 2021. Prototype
 */

import './error.scss';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { urls } from '../../service/constants';

export const IncompleteProfilePage = () => {
  const { t } = useTranslation<string>();

  return <div className="error-page-container">
    <div className="error-page error-500-page">
      <div className="error-page__title">
        {t('incomplete-profile.title')}
      </div>
      <div className="error-page__description">
        {t('incomplete-profile.explanation-prefix')}&nbsp;
        <a href={`${urls.USER_ACCOUNT_URL}`}>{t('incomplete-profile.explanation-profile-word')}</a>
      </div>
    </div>
  </div>
}
