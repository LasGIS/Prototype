/*
 * Copyright (c) 2021. Prototype
 */

import './error.scss';

import React from 'react';
import { useTranslation } from 'react-i18next';

const ErrorPage = () => {
  const { t } = useTranslation<string>();
  const status: string = '500';

  return (
    <div className="error-page-container">
      <div className="error-page">
        <div className="service-error">
          <div className="service-error__status">{status}</div>
          <div className="service-error__message">{t('error.message.internal-server-error')}</div>
          <div className="service-error__description">
            <p>
              <span>{t('error.description.1')}</span>
            </p>
            <p>
              <span>{t('error.description.2')}</span>
            </p>
            <p>
              <span>{t('error.description.3')}</span>
              <br />
              <a className="service-error__link" href="mailto:support.tracking@russianpost.ru">
                {' '}
                support.tracking@russianpost.ru
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
