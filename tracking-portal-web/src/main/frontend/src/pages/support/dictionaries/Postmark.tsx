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

const Postmark = () => {
  const { t, i18n } = useTranslation<string>();
  const { showErrorNotification } = useCommonContext();
  const [postmarks, setPostmarks] = useState<DictionaryDto[]>([]);

  useEffect(() => {
    services.apiControl
      .getPostmarks(i18n.language as Language)
      .then((result: DictionaryDto[]) => {
        setPostmarks(result);
      })
      .catch((error: ErrorDto) => {
        showErrorNotification(error, 'getPostmarks');
      });
  }, [i18n.language, showErrorNotification]);

  return (
    <div className="help-page">
      <div className="help-article">
        <Link to="/support#dictionaries">{t('dictionary.title')}</Link>
        <h3>{t('dictionary.postmark.title')}</h3>
        <article className="page-help-article__content">
          <p>
            {t('dictionary.identification')}: <strong>PostMark</strong>
          </p>
          <p>&nbsp;</p>
          <p>{t('dictionary.postmark.note')}</p>
          <p>&nbsp;</p>
          <table>
            <thead>
              <tr>
                <th style={{ width: '20.26%' }}>{t('dictionary.postmark.column1.title')}</th>
                <th style={{ width: '79.74%' }}>{t('dictionary.postmark.column2.title')}</th>
              </tr>
            </thead>
            <tbody>
              {postmarks.map((postmark: DictionaryDto) => (
                <tr key={postmark.code}>
                  <td style={{ width: '20.26%' }}>{postmark.code}</td>
                  <td style={{ width: '79.74%' }}>{postmark.name}</td>
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

export default Postmark;
