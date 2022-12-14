/*
 * Copyright (c) 2021. Prototype
 */

import './dictionaries.scss';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DictionaryDto, ErrorDto } from '../../../service/api-dtos';
import services from '../../../service/services';
import { Language } from '../../../common/types';
import useCommonContext from '../../../hoc/useCommonContext';

const SendCtg = () => {
  const { t, i18n } = useTranslation<string>();
  const { showErrorNotification } = useCommonContext();
  const [sendCategories, setSendCategories] = useState<DictionaryDto[]>([]);

  useEffect(() => {
    services.apiControl
      .getSendCategories(i18n.language as Language)
      .then((result: DictionaryDto[]) => {
        setSendCategories(result);
      })
      .catch((error: ErrorDto) => {
        showErrorNotification(error, 'getSendCategories');
      });
  }, [i18n.language, showErrorNotification]);

  return (
    <div className="help-page">
      <div className="help-article">
        <Link to="/support#dictionaries">{t('dictionary.title')}</Link>
        <h3>{t('dictionary.sendCtg.title')}</h3>
        <article className="page-help-article__content">
          <p>
            {t('dictionary.identification')}: <strong>SendCtg</strong>
          </p>
          <p>&nbsp;</p>
          <p>
            {t('dictionary.sendCtg.note1')}
            <br />
            {t('dictionary.sendCtg.note2')}
          </p>
          <p>&nbsp;</p>
          <table>
            <thead>
              <tr>
                <th style={{ width: '20.26%' }}>{t('dictionary.sendCtg.column1.title')}</th>
                <th style={{ width: '79.74%' }}>{t('dictionary.sendCtg.column2.title')}</th>
              </tr>
            </thead>
            <tbody>
              {sendCategories.map((category: DictionaryDto) => (
                <tr key={category.code}>
                  <td style={{ width: '20.26%' }}>{category.code}</td>
                  <td style={{ width: '79.74%' }}>{category.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>&nbsp;</p>
        </article>
      </div>
    </div>
  );
};

export default SendCtg;
