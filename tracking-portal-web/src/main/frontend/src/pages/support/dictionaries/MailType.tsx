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

const MailType = () => {
  const { t, i18n } = useTranslation<string>();
  const { showErrorNotification } = useCommonContext();
  const [mailTypes, setMailTypes] = useState<DictionaryDto[]>([]);

  useEffect(() => {
    services.apiControl
      .getMailTypes(i18n.language as Language)
      .then((result: DictionaryDto[]) => {
        setMailTypes(result);
      })
      .catch((error: ErrorDto) => {
        showErrorNotification(error, 'getMailTypes');
      });
  }, [i18n.language, showErrorNotification]);

  return (
    <div className="help-page">
      <div className="help-article">
        <Link to="/support#dictionaries">{t('dictionary.title')}</Link>
        <h3>{t('dictionary.mailTypes.title')}</h3>
        <article className="page-help-article__content">
          <p>
            {t('dictionary.identification')}: <strong>MailType</strong>
          </p>
          <p>&nbsp;</p>
          <table>
            <thead>
              <tr>
                <th style={{ width: '20.26%' }}>{t('dictionary.mailTypes.column1.title')}</th>
                <th style={{ width: '79.74%' }}>{t('dictionary.mailTypes.column2.title')}</th>
              </tr>
            </thead>
            <tbody>
              {mailTypes.map((type: DictionaryDto) => (
                <tr key={type.code}>
                  <td style={{ width: '20.26%' }}>{type.code}</td>
                  <td style={{ width: '79.74%' }}>{type.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
        </article>
      </div>
    </div>
  );
};

export default MailType;
