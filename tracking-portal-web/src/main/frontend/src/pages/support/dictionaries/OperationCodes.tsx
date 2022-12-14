/*
 * Copyright (c) 2021. Prototype
 */

import './dictionaries.scss';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import services from '../../../service/services';
import { ErrorDto, OperationAttributeDto, OperationTypeWithAttributeDto } from '../../../service/api-dtos';
import { Language } from '../../../common/types';
import useCommonContext from '../../../hoc/useCommonContext';

const OperationCodes = () => {
  const { t, i18n } = useTranslation<string>();
  const { showErrorNotification } = useCommonContext();
  const [operationCodes, setOperationCodes] = useState<OperationTypeWithAttributeDto[]>([]);

  useEffect(() => {
    services.apiControl
      .getOperationTypeWithAttributes(i18n.language as Language)
      .then((result: OperationTypeWithAttributeDto[]) => {
        setOperationCodes(result);
      })
      .catch((error: ErrorDto) => {
        showErrorNotification(error, 'Operation codes and attributes Error');
      });
  }, [i18n.language, showErrorNotification]);

  return (
    <div className="help-page">
      <div className="help-article">
        <Link to="/support#dictionaries">{t('dictionary.title')}</Link>
        <h3>{t('dictionary.operationCodes.title')}</h3>
        <article className="page-help-article__content">
          <p>{t('dictionary.operationCodes.note')}</p>
          <p>&nbsp;</p>
          <table>
            <thead>
              <tr>
                <th>{t('dictionary.operationCodes.column1.title')}</th>
                <th>{t('dictionary.operationCodes.column2.title')}</th>
                <th>{t('dictionary.operationCodes.column3.title')}</th>
                <th>{t('dictionary.operationCodes.column4.title')}</th>
                <th>{t('dictionary.operationCodes.column5.title')}</th>
              </tr>
            </thead>
            <tbody>
              {operationCodes.map((eventType: OperationTypeWithAttributeDto) => {
                const { attributes } = eventType;
                const rowSpan: number = attributes.length;
                if (rowSpan === 0) {
                  return (
                    <tr key={`type-${eventType.code}`}>
                      <td className="vertical-align-top">{eventType.code}</td>
                      <td className="vertical-align-top">{eventType.name}</td>
                      <td>-</td>
                      <td>{t('dictionary.operationCodes.noAttribute')}</td>
                      <td>{eventType.isTerminal ? t('dictionary.operationCodes.yes') : ``}</td>
                    </tr>
                  );
                }
                return attributes.map((attrib: OperationAttributeDto, indAtr: number) => {
                  return (
                    <tr key={`type-${eventType.code}-atr-${attrib.code}`}>
                      {indAtr === 0 && (
                        <>
                          <td rowSpan={rowSpan} className="vertical-align-top">
                            {eventType.code}
                          </td>
                          <td rowSpan={rowSpan} className="vertical-align-top">
                            {eventType.name}
                          </td>
                        </>
                      )}
                      <td>{attrib.code}</td>
                      <td>{attrib.name}</td>
                      <td>{attrib.isTerminal ? t('dictionary.operationCodes.yes') : ''}</td>
                    </tr>
                  );
                });
              })}
            </tbody>
          </table>
        </article>
      </div>
    </div>
  );
};

export default OperationCodes;
