/*
 * Copyright (c) 2021. Prototype
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { WithTranslation, withTranslation } from 'react-i18next';
import { Language, Theme } from '../../../common/types';

type Props = WithTranslation & {
  theme: Theme;
  isMainPage: boolean;
};

class Footer extends Component<Props> {
  private readonly dateYear: number;

  static defaultProps: Partial<Props> = {
    theme: 'white',
    isMainPage: true,
  };

  constructor(props: Props) {
    super(props);
    this.dateYear = new Date().getFullYear();
    this.setLanguage = this.setLanguage.bind(this);
  }

  setLanguage(lang: Language) {
    const { i18n } = this.props;
    i18n.changeLanguage(lang).then();
  }

  render() {
    const { t, i18n } = this.props;
    const { theme, isMainPage } = this.props;
    const { language } = i18n;
    const containerClasses = cn('footer-container', {
      'footer-container--gray': theme === 'gray',
      'footer-container--white': theme === 'white',
    });
    return (
      <div className={containerClasses}>
        <div className={cn('footer', { 'footer--hidden': isMainPage })}>
          <div className="footer__copyright">
            {this.dateYear}
            {t('russianpost.theme.footer')}
          </div>
          <div className="footer__menu">
            <div className="footer__language">
              {language === 'en' && (
                <span className="taglib-language-list-text" role="button" tabIndex={-1} onClick={() => this.setLanguage('ru')}>
                  Русский
                </span>
              )}
              {language === 'ru' && (
                <span className="taglib-language-list-text" role="button" tabIndex={-1} onClick={() => this.setLanguage('en')}>
                  English
                </span>
              )}
            </div>
            <Link to="/support" className="footer__menu-button">
              {t('russianpost.theme.support')}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(Footer);
