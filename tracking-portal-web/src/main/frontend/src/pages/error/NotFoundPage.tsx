/*
 * Copyright (c) 2021. Prototype
 */

import './error.scss';

import React from 'react';
import { useTranslation } from 'react-i18next';

export const NotFoundPage = () => {
  const { t } = useTranslation<string>();

  return (
    <div className="portlet-boundary portlet-borderless portlet-journal-content">
      <span> </span>
      <div className="portlet-borderless-container">
        <div className="portlet-body">
          <div className="journal-content-article">
            <div className="error-page-container">
              <div className="error-page error-404-page">
                <div className="error-page__title">
                  {t('error.page_not_found.title')}
                </div>
                <div className="error-page__description">
                  {t('error.page_not_found.description')}
                </div>
              </div>
            </div>
          </div>
          <div className="entry-links"> </div>
        </div>
      </div>
    </div>
  );
}
