/*
 * Copyright (c) 2021. Prototype
 */

import './dictionaries.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { services } from '../../../service/services';
import { CountryInfo, ErrorDto } from '../../../service/api-dtos';
import { WithTranslation, withTranslation } from 'react-i18next';
import { Language } from '../../../common/types';
import { withCommonContext } from '../../../hoc/withCommonContext';
import { CommonContextProps } from '../../../hoc/CommonContext';

type Props = WithTranslation & CommonContextProps;

type State = {
  language: Language;
  countries: CountryInfo[];
};

class Countries extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      language: props.i18n.language as Language,
      countries: []
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
    services.apiControl.getCountries(language)
      .then((result: CountryInfo[]) => {
        this.setState({ countries: result })
      })
      .catch((error: ErrorDto) => {
        showErrorNotification(error, "getCountries");
      });
  }

  render() {
    const { t } = this.props;
    const { countries } = this.state;
    return <div className="help-page">
      <div className="help-article">
        <Link to="/support#dictionaries">{t("dictionary.title")}</Link>
        <h3>{t("dictionary.countries.title")}</h3>
        <article className="page-help-article__content">
          <table>
            <thead>
            <tr>
              <th>{t("dictionary.countries.column1.title")}</th>
              <th>{t("dictionary.countries.column2.title")}</th>
              <th>{t("dictionary.countries.column3.title")}</th>
              <th>{t("dictionary.countries.column4.title")}</th>
              <th>{t("dictionary.countries.column5.title")}</th>
              <th>{t("dictionary.countries.column6.title")}</th>
            </tr>
            </thead>
            <tbody>
            {countries.map((country: CountryInfo, index: number) =>
              <tr key={index}>
                <td>{country.id}</td>
                <td>{country.codeA2}</td>
                <td>{country.codeA3}</td>
                <td>{country.nameRu}</td>
                <td>{country.nameEn}</td>
                <td>{country.nameFr}</td>
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

export default withTranslation()(withCommonContext(Countries));
