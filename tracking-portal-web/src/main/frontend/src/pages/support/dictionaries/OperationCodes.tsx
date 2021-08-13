/*
 * Copyright (c) 2021. Prototype
 */

import './dictionaries.scss';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../../../service/services';
import { ErrorDto, OperationAttributeDto, OperationTypeWithAttributeDto } from '../../../service/api-dtos';
import { WithTranslation, withTranslation } from 'react-i18next';
import { Language } from '../../../common/types';
import { withCommonContext } from '../../../hoc/withCommonContext';
import { CommonContextProps } from '../../../hoc/CommonContext';

type Props = WithTranslation & CommonContextProps;

type State = {
  language: Language;
  operationCodes: OperationTypeWithAttributeDto[];
};

class OperationCodes extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      language: props.i18n.language as Language,
      operationCodes: []
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
    services.apiControl.getOperationTypeWithAttributes(language)
      .then((result: OperationTypeWithAttributeDto[]) => {
        this.setState({ operationCodes: result })
      })
      .catch((error: ErrorDto) => {
        showErrorNotification(error, "Operation codes and attributes Error");
      });
  }

  render() {
    const { t } = this.props;
    const { operationCodes } = this.state;
    return <div className="help-page">
      <div className="help-article">
        <Link to="/support#dictionaries">{t("dictionary.title")}</Link>
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
            {operationCodes.map((eventType: OperationTypeWithAttributeDto, indType: number) => {
              const attributes: OperationAttributeDto[] = eventType.attributes;
              const rowSpan: number = attributes.length;
              if (rowSpan === 0) {
                return <tr key={`type-${indType}`}>
                  <td className='vertical-align-top'>{eventType.code}</td>
                  <td className='vertical-align-top'>{eventType.name}</td>
                  <td>-</td>
                  <td>{t('dictionary.operationCodes.noAttribute')}</td>
                  <td>{eventType.isTerminal ? t('dictionary.operationCodes.yes') : ``}</td>
                </tr>
              } else {
                return (
                  attributes.map((attrib: OperationAttributeDto, indAtr: number) => {
                    return (
                      <tr key={`type-${indType}-atr-${indAtr}`}>
                        {(indAtr === 0) && <>
                          <td rowSpan={rowSpan} className='vertical-align-top'>{eventType.code}</td>
                          <td rowSpan={rowSpan} className='vertical-align-top'>{eventType.name}</td>
                        </>}
                        <td>{attrib.code}</td>
                        <td>{attrib.name}</td>
                        <td>{attrib.isTerminal ? t('dictionary.operationCodes.yes') : ''}</td>
                      </tr>
                    );
                  })
                );
              }
            })}
            </tbody>
          </table>
        </article>
      </div>
    </div>;
  }
}

export default withTranslation()(withCommonContext(OperationCodes));
