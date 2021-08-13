/*
 * Copyright (c) 2021. Prototype
 */

import React from "react";
import { WithTranslation, withTranslation } from "react-i18next";

type Props = WithTranslation;

const LandingMessages = (props: Props) => {
  const { t } = props;
  return (
    <div className="landing-page__content">
      <div className="landing-content" dangerouslySetInnerHTML={{ __html: t('LandingMessages.leftColumn') }} />
      <div className="landing-content" dangerouslySetInnerHTML={{ __html: t('LandingMessages.middleColumn') }} />
      <div className="landing-content" dangerouslySetInnerHTML={{ __html: t('LandingMessages.rightColumn') }} />
    </div>
  );
};

export default withTranslation()(LandingMessages);
