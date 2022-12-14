/*
 * Copyright (c) 2021. Prototype
 */

import { useTranslation } from 'react-i18next';
import React from 'react';

type Props = {
  login: string;
  isBatchAccessAllowed: boolean;
  onSendSettings: () => void;
  onResetPassword: () => void;
};

const Info = ({ login, isBatchAccessAllowed, onSendSettings, onResetPassword }: Props) => {
  const { t } = useTranslation<string>();
  return (
    <div>
      <div className="my-tracking-content-item__header">{t('settings.tracking.info.title')}</div>
      <div className="my-tracking-content-item__content">
        <div className="my-tracking-setting__label">{t('settings.tracking.info.single.address')}</div>
        <div className="my-tracking-setting__value">https://tracking.russianpost.ru/rtm34?wsdl</div>

        {isBatchAccessAllowed ? (
          <div>
            <div className="my-tracking-setting__label">{t('settings.tracking.info.packet.address')}</div>
            <div className="my-tracking-setting__value">https://tracking.russianpost.ru/fc?wsdl</div>
          </div>
        ) : null}
        <div className="my-tracking-setting__label">{t('settings.tracking.info.login.label')}</div>
        <div className="my-tracking-setting__value">{login}</div>

        <div className="button my-tracking-setting__send" role="button" tabIndex={-1} onClick={onSendSettings}>
          <span>{t('settings.tracking.send-options')}</span>
        </div>

        <span className="my-tracking-setting__reset-password" role="button" tabIndex={-1} onClick={onResetPassword}>
          {t('settings.tracking.reset-password')}
        </span>
      </div>
    </div>
  );
};
export default Info;
