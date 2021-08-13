/*
 * Copyright (c) 2021. Prototype
 */

import './dictionaries.scss';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../../../service/services';
import { ErrorDto, EventTypeDto } from '../../../service/api-dtos';
import { WithTranslation, withTranslation } from 'react-i18next';
import { Language } from '../../../common/types';
import { CommonContextProps } from '../../../hoc/CommonContext';
import { withCommonContext } from '../../../hoc/withCommonContext';

type Props = WithTranslation & CommonContextProps;

type State = {
  language: Language;
  eventTypes: EventTypeDto[];
};

class EventType extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      language: props.i18n.language as Language,
      eventTypes: []
    };
  }

  componentDidMount() {
    this.getAttributes(this.state.language);
  }

  componentDidUpdate(prevProps: Props, prevState: State, snapshot: any) {
    const language: Language = prevProps.i18n.language as Language;
    if (this.state.language !== language) {
      this.setState({ language });
      this.getAttributes(language);
    }
  }

  private getAttributes(language: Language) {
    const { showErrorNotification } = this.props;
    services.apiControl.getEventTypes(language)
      .then((result: EventTypeDto[]) => {
        this.setState({ eventTypes: result })
      })
      .catch((error: ErrorDto) => {
        showErrorNotification(error, "getEventTypes");
      });
  }

  render() {
    const { t } = this.props;
    const { eventTypes } = this.state;
    return <div className="help-page">
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
            {eventTypes.map((eventType: EventTypeDto, index: number) =>
              <tr key={index}>
                <td>{eventType.code}</td>
                <td>{eventType.name}</td>
                <td>{eventType.description}</td>
              </tr>
            )}
            </tbody>
          </table>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
        </article>
      </div>
    </div>;
  }
}

export default withTranslation()(withCommonContext(EventType));
