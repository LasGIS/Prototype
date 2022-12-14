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

const CategoryCodes = () => {
  const { t, i18n } = useTranslation<string>();
  const { showErrorNotification } = useCommonContext();
  const [categories, setCategories] = useState<DictionaryDto[]>([]);

  useEffect(() => {
    services.apiControl
      .getCategoryCodes(i18n.language as Language)
      .then((result: DictionaryDto[]) => {
        setCategories(result);
      })
      .catch((error: ErrorDto) => {
        showErrorNotification(error, 'getCategoryCodes');
      });
  }, [i18n.language, showErrorNotification]);

  return (
    <div className="help-page">
      <div className="help-article">
        <Link to="/support#dictionaries">{t('dictionary.title')}</Link>
        <h3>{t('dictionary.categoryCodes.title')}</h3>
        <article className="page-help-article__content">
          <p>
            {t('dictionary.identification')}: <strong>MailCtg</strong>
          </p>
          <p>&nbsp;</p>
          <table>
            <thead>
              <tr>
                <th style={{ width: '20.26%' }}>{t('dictionary.categoryCodes.column1.title')}</th>
                <th style={{ width: '79.74%' }}>{t('dictionary.categoryCodes.column2.title')}</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category: DictionaryDto) => (
                <tr key={category.code}>
                  <td style={{ width: '20.26%' }}>
                    <p>{category.code}</p>
                  </td>
                  <td style={{ width: '79.74%' }}>
                    <p>{category.name}</p>
                  </td>
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

export default CategoryCodes;
