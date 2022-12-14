/*
 * Copyright (c) 2021. Prototype
 */

import './dictionaries.scss';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import services from '../../../service/services';
import { CountryInfo, ErrorDto } from '../../../service/api-dtos';
import { Language } from '../../../common/types';
import useCommonContext from '../../../hoc/useCommonContext';

const Countries = () => {
  const { t, i18n } = useTranslation<string>();
  const { showErrorNotification } = useCommonContext();
  const [countries, setCountries] = useState<CountryInfo[]>([]);

  useEffect(() => {
    services.apiControl
      .getCountries(i18n.language as Language)
      .then((result: CountryInfo[]) => {
        setCountries(result);
      })
      .catch((error: ErrorDto) => {
        showErrorNotification(error, 'getCountries');
      });
  }, [i18n.language, showErrorNotification]);

  return (
    <div className="help-page">
      <div className="help-article">
        <Link to="/support#dictionaries">{t('dictionary.title')}</Link>
        <h3>{t('dictionary.countries.title')}</h3>
        <article className="page-help-article__content">
          <table>
            <thead>
              <tr>
                <th>{t('dictionary.countries.column1.title')}</th>
                <th>{t('dictionary.countries.column2.title')}</th>
                <th>{t('dictionary.countries.column3.title')}</th>
                <th>{t('dictionary.countries.column4.title')}</th>
                <th>{t('dictionary.countries.column5.title')}</th>
                <th>{t('dictionary.countries.column6.title')}</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((country: CountryInfo) => (
                <tr key={country.id}>
                  <td>{country.id}</td>
                  <td>{country.codeA2}</td>
                  <td>{country.codeA3}</td>
                  <td>{country.nameRu}</td>
                  <td>{country.nameEn}</td>
                  <td>{country.nameFr}</td>
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

export default Countries;
