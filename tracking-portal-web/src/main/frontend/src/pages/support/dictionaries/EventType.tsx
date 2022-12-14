/*
 * Copyright (c) 2021. Prototype
 */

import './dictionaries.scss';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import services from '../../../service/services';
import { ErrorDto, EventTypeDto } from '../../../service/api-dtos';
import { Language } from '../../../common/types';
import useCommonContext from '../../../hoc/useCommonContext';

const EventType = () => {
  const { t, i18n } = useTranslation<string>();
  const { showErrorNotification } = useCommonContext();
  const [eventTypes, setEventTypes] = useState<EventTypeDto[]>([]);

  useEffect(() => {
    services.apiControl
      .getEventTypes(i18n.language as Language)
      .then((result: EventTypeDto[]) => {
        setEventTypes(result);
      })
      .catch((error: ErrorDto) => {
        showErrorNotification(error, 'getEventTypes');
      });
  }, [i18n.language, showErrorNotification]);

  return (
    <div className="help-page">
      <div className="help-article">
        <Link to="/support#dictionaries">{t('dictionary.title')}</Link>
        <h3>{t('dictionary.eventType.title')}</h3>
        <article className="page-help-article__content">
          {t('dictionary.identification')}: <strong>EventType</strong>
          <p>&nbsp;</p>
          <table>
            <thead>
              <tr>
                <th>{t('dictionary.eventType.column1.title')}</th>
                <th>{t('dictionary.eventType.column2.title')}</th>
                <th>{t('dictionary.eventType.column3.title')}</th>
              </tr>
            </thead>
            <tbody>
              {eventTypes.map((eventType: EventTypeDto) => (
                <tr key={eventType.code}>
                  <td>{eventType.code}</td>
                  <td>{eventType.name}</td>
                  <td>{eventType.description}</td>
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

export default EventType;
