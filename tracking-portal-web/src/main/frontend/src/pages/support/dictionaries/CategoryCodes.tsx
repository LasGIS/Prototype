/*
 * Copyright (c) 2021. Prototype
 */

import './dictionaries.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { services } from '../../../service/services';
import { DictionaryDto, ErrorDto } from '../../../service/api-dtos';
import { Language } from '../../../common/types';
import { WithTranslation, withTranslation } from 'react-i18next';
import { withCommonContext } from '../../../hoc/withCommonContext';
import { CommonContextProps } from '../../../hoc/CommonContext';

type Props = WithTranslation & CommonContextProps;

type State = {
  language: Language;
  categories: DictionaryDto[];
};

class CategoryCodes extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      language: props.i18n.language as Language,
      categories: []
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
    services.apiControl.getCategoryCodes(language)
      .then((result: DictionaryDto[]) => {
        this.setState({ categories: result })
      })
      .catch((error: ErrorDto) => {
        showErrorNotification(error, "getCategoryCodes");
      });
  }

  render() {
    const { t } = this.props;
    const { categories } = this.state;
    return <div className="help-page">
      <div className="help-article">
        <Link to="/support#dictionaries">{t("dictionary.title")}</Link>
        <h3>{t("dictionary.categoryCodes.title")}</h3>
        <article className="page-help-article__content">
          <p>{t("dictionary.identification")}: <strong>MailCtg</strong></p>
          <p>&nbsp;</p>
          <table>
            <thead>
            <tr>
              <th style={{ width: "20.26%" }}>{t("dictionary.categoryCodes.column1.title")}</th>
              <th style={{ width: "79.74%" }}>{t("dictionary.categoryCodes.column2.title")}</th>
            </tr>
            </thead>
            <tbody>
            {categories.map((category: DictionaryDto, index: number) =>
              <tr key={index}>
                <td style={{ width: "20.26%" }}>
                  <p>{category.code}</p>
                </td>
                <td style={{ width: "79.74%" }}>
                  <p>{category.name}</p>
                </td>
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

export default withTranslation()(withCommonContext(CategoryCodes));
