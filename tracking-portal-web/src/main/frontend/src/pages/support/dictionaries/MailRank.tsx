/*
 * Copyright (c) 2021. Prototype
 */

import './dictionaries.scss';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import services from '../../../service/services';
import { DictionaryDto, ErrorDto } from '../../../service/api-dtos';
import { Language } from '../../../common/types';
import useCommonContext from '../../../hoc/useCommonContext';

const MailRank = () => {
  const { t, i18n } = useTranslation<string>();
  const { showErrorNotification } = useCommonContext();
  const [mailRanks, setMailRanks] = useState<DictionaryDto[]>([]);

  useEffect(() => {
    services.apiControl
      .getMailRanks(i18n.language as Language)
      .then((result: DictionaryDto[]) => {
        setMailRanks(result);
      })
      .catch((error: ErrorDto) => {
        showErrorNotification(error, 'getMailRanks');
      });
  }, [i18n.language, showErrorNotification]);

  return (
    <div className="help-page">
      <div className="help-article">
        <Link to="/support#dictionaries">{t('dictionary.title')}</Link>
        <h3>{t('dictionary.mailRanks.title')}</h3>
        <article className="page-help-article__content">
          <p>
            {t('dictionary.identification')}: <strong>MailRank</strong>
          </p>
          <p>&nbsp;</p>
          <table>
            <thead>
              <tr>
                <th style={{ width: '20.26%' }}>{t('dictionary.mailRanks.column1.title')}</th>
                <th style={{ width: '79.74%' }}>{t('dictionary.mailRanks.column2.title')}</th>
              </tr>
            </thead>
            <tbody>
              {mailRanks.map((eventType: DictionaryDto) => (
                <tr key={eventType.code}>
                  <td style={{ width: '20.26%' }}>{eventType.code}</td>
                  <td style={{ width: '79.74%' }}>{eventType.name}</td>
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

export default MailRank;
