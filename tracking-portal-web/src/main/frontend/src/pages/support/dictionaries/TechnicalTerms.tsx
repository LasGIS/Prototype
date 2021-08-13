/*
 * Copyright (c) 2021. Prototype
 */

import './dictionaries.scss';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ErrorDto, TechnicalTerm } from '../../../service/api-dtos';
import { services } from '../../../service/services';
import { WithTranslation, withTranslation } from 'react-i18next';
import { Language } from '../../../common/types';
import { withCommonContext } from '../../../hoc/withCommonContext';
import { CommonContextProps } from '../../../hoc/CommonContext';

type Props = WithTranslation & CommonContextProps;

type State = {
  language: Language;
  technicalTerms: TechnicalTerm[];
};

class TechnicalTerms extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      language: props.i18n.language as Language,
      technicalTerms: []
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
    services.apiControl.getTechnicalTerms(language)
      .then((result: TechnicalTerm[]) => {
        this.setState({ technicalTerms: result })
      })
      .catch((error: ErrorDto) => {
        showErrorNotification(error, "getTechnicalTerms");
      });
  }

  render() {
    const { t } = this.props;
    const { technicalTerms } = this.state;
    return <div className="help-page">
      <div className="help-article">
        <Link to="/support#dictionaries">{t("dictionary.title")}</Link>
        <h3>{t('dictionary.technicalTerms.title')}</h3>
        <article className="page-help-article__content">
          <table className="no-border">
            <thead>
            <tr>
              <th className='vertical-align-top'>{t('dictionary.technicalTerms.column1.title')}</th>
              <th className='vertical-align-top'>{t('dictionary.technicalTerms.column2.title')}</th>
            </tr>
            </thead>
            <tbody>
            {technicalTerms.map((term: TechnicalTerm, index: number) =>
              <tr key={index}>
                <td className='vertical-align-top'><p>{term.name}</p></td>
                <td className='vertical-align-top' dangerouslySetInnerHTML={{ __html: term.description }}/>
              </tr>
            )}
            </tbody>
          </table>
        </article>
      </div>
    </div>;
  }
}

export default withTranslation()(withCommonContext(TechnicalTerms));
