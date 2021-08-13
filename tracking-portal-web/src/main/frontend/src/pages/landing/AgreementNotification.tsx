/*
 * Copyright (c) 2021. Prototype
 */

import React, { Component } from 'react';
import _ from 'underscore';
import { withTranslation, WithTranslation } from 'react-i18next';
import ArticleContentRu from './ArticleContentRu';
import ArticleContentEn from './ArticleContentEn';

type Props = WithTranslation & {
  active: boolean;
  key: string;
  onDone: () => any;
  onClose: () => any;
};

class AgreementNotification extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.getAccess = this.getAccess.bind(this);
    this.close = this.close.bind(this);
  }

  getAccess() {
    const { onDone } = this.props;
    if (onDone) {
      onDone();
    }
  }

  close(event: React.MouseEvent<HTMLInputElement>) {
    const { onClose } = this.props;
    event.stopPropagation();
    const target = event.target as Element;
    const classes = target.classList || (target.className && target.className.split(' '));
    if (!_.intersection(['notification', 'notification__close'], classes).length) {
      return;
    }
    if (onClose) {
      onClose();
    }
  }

  render() {
    const { t, i18n, active } = this.props;
    return (
      <div className={`notification${active ? ' notification--visible' : ''}`} role="link" tabIndex={-1} onClick={this.close}>
        <div className={`notification__box${active ? ' notification__box--visible' : ''}`}>
          <div className="notification__paper">
            <div className="notification__header">{t('landing.agreement.title')}</div>

            <div className="notification__description">
              {i18n.language === 'ru' && <ArticleContentRu />}
              {i18n.language === 'en' && <ArticleContentEn />}
            </div>

            <div className="notification__explanation">{t('landing.agreement.explanation')}</div>
            <input className="notification__submit" type="button" value={t<string>('landing.agreement.button')} onClick={this.getAccess} />
            <input className="notification__close" type="button" onClick={this.close} />
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(AgreementNotification);
