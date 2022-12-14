/*
 * Copyright (c) 2021. Prototype
 */

import './error.scss';

import React from 'react';
import { useTranslation } from 'react-i18next';

const ServiceUnavailablePage = () => {
  const { t } = useTranslation<string>();

  return (
    <div className="error-page-container">
      <div className="error-page error-500-page">
        <div className="error-page__title">{t('error.page_service_unavailable.title')}</div>
        <div className="error-page__description">{t('error.page_service_unavailable.description')}</div>
      </div>
    </div>
  );
};

export default ServiceUnavailablePage;
