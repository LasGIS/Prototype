/*
 * Copyright (c) 2021. Prototype
 */

import './dictionaries.scss';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DictionaryDto, ErrorDto } from '../../../service/api-dtos';
import { services } from '../../../service/services';
import { WithTranslation, withTranslation } from 'react-i18next';
import { Language } from '../../../common/types';
import { withCommonContext } from '../../../hoc/withCommonContext';
import { CommonContextProps } from '../../../hoc/CommonContext';

type Props = WithTranslation & CommonContextProps;

type State = {
  language: Language;
  mailTypes: DictionaryDto[];
};

class MailType extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      language: props.i18n.language as Language,
      mailTypes: []
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
    services.apiControl.getMailTypes(language)
      .then((result: DictionaryDto[]) => {
        this.setState({ mailTypes: result })
      })
      .catch((error: ErrorDto) => {
        showErrorNotification(error, "getMailTypes");
      });
  }

  render() {
    const { t } = this.props;
    const { mailTypes } = this.state;
    return <div className="help-page">
      <div className="help-article">
        <Link to="/support#dictionaries">{t('dictionary.title')}</Link>
        <h3>{t('dictionary.mailTypes.title')}</h3>
        <article className="page-help-article__content">
          <p>{t('dictionary.identification')}: <strong>MailType</strong></p>
          <p>&nbsp;</p>
          <table>
            <thead>
            <tr>
              <th style={{ width: "20.26%" }}>{t('dictionary.mailTypes.column1.title')}</th>
              <th style={{ width: "79.74%" }}>{t('dictionary.mailTypes.column2.title')}</th>
            </tr>
            </thead>
            <tbody>
            {mailTypes.map((type: DictionaryDto, index: number) =>
              <tr key={index}>
                <td style={{ width: "20.26%" }}>{type.code}</td>
                <td style={{ width: "79.74%" }}>{type.name}</td>
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

export default withTranslation()(withCommonContext(MailType));
