/*
 * Copyright (c) 2021. Prototype
 */

import React, { Component } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';

type Props = WithTranslation;

class LandingMessages extends Component<Props> {

  render() {
    const {t} = this.props;
    return (
      <div className="landing-page__content">
        <div className="landing-content" dangerouslySetInnerHTML={{__html: t('LandingMessages.leftColumn')}}/>
        <div className="landing-content" dangerouslySetInnerHTML={{__html: t('LandingMessages.middleColumn')}}/>
        <div className="landing-content" dangerouslySetInnerHTML={{__html: t('LandingMessages.rightColumn')}}/>
      </div>
    );
  }
}

export default withTranslation()(LandingMessages);
