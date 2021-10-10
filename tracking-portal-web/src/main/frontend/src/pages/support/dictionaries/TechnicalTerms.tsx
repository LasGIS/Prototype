/*
 * Copyright (c) 2021. Prototype
 */

import './dictionaries.scss';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ErrorDto, TechnicalTerm } from '../../../service/api-dtos';
import services from '../../../service/services';
import { Language } from '../../../common/types';
import useCommonContext from '../../../hoc/useCommonContext';

const TechnicalTerms = () => {
  const { t, i18n } = useTranslation<string>();
  const { showErrorNotification } = useCommonContext();
  const [technicalTerms, setTechnicalTerms] = useState<TechnicalTerm[]>([]);

  useEffect(() => {
    services.apiControl
      .getTechnicalTerms(i18n.language as Language)
      .then((result: TechnicalTerm[]) => {
        setTechnicalTerms(result);
      })
      .catch((error: ErrorDto) => {
        showErrorNotification(error, 'getTechnicalTerms');
      });
  }, [i18n.language, showErrorNotification]);

  return (
    <div className="help-page">
      <div className="help-article">
        <Link to="/support#dictionaries">{t('dictionary.title')}</Link>
        <h3>{t('dictionary.technicalTerms.title')}</h3>
        <article className="page-help-article__content">
          <table className="no-border">
            <thead>
              <tr>
                <th className="vertical-align-top">{t('dictionary.technicalTerms.column1.title')}</th>
                <th className="vertical-align-top">{t('dictionary.technicalTerms.column2.title')}</th>
              </tr>
            </thead>
            <tbody>
              {technicalTerms.map((term: TechnicalTerm) => (
                <tr key={term.name}>
                  <td className="vertical-align-top">
                    <p dangerouslySetInnerHTML={{ __html: term.name }} />
                  </td>
                  <td className="vertical-align-top" dangerouslySetInnerHTML={{ __html: term.description }} />
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </div>
    </div>
  );
};

export default TechnicalTerms;
