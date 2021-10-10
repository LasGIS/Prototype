/*
 * Copyright (c) 2021. Prototype
 */

import './statistics.scss';
import React, { Component } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import Checkbox from '../../components/ui/Checkbox';
import Dropdown from '../../components/ui/Dropdown/Dropdown';
import { ModeType, StatisticsBatchSettings, StatisticsSettings } from '../../service/api-dtos';

type Props = WithTranslation & {
  mode: ModeType;
  unlimitedAccessAvailable: boolean;
  email: string;
  settings: StatisticsSettings;
  batchSettings: StatisticsBatchSettings;

  onSelect: (data: number) => void;
  onSelectBatch: (data: number) => void;
  onCheckSend: (checked: boolean) => void;
  onCheckNotifyOverLimits: (checked: boolean) => void;
  onCheckSendBatch: (checked: boolean) => void;
};

class NotificationSettings extends Component<Props> {
  static defaultProps: Partial<Props> = {
    mode: 'single',
    unlimitedAccessAvailable: false,
    email: 'email not set',
    settings: {
      sendStatistics: false,
      notifyEvery: 1,
      notifyOverLimits: false,
    },
    batchSettings: {
      sendStatistics: false,
      notifyEvery: 1,
    },
  };

  onSelect(data: number) {
    const { onSelect } = this.props;
    onSelect(data);
  }

  onCheckSend(checked: boolean) {
    const { onCheckSend } = this.props;
    onCheckSend(checked);
  }

  onCheckNotifyOverLimits(checked: boolean) {
    const { onCheckNotifyOverLimits } = this.props;
    onCheckNotifyOverLimits(checked);
  }

  onSelectBatch(data: number) {
    const { onSelectBatch } = this.props;
    onSelectBatch(data);
  }

  onCheckSendBatch(checked: boolean) {
    const { onCheckSendBatch } = this.props;
    onCheckSendBatch(checked);
  }

  render() {
    const { t, mode, unlimitedAccessAvailable, email, settings, batchSettings } = this.props;
    const options = [
      { text: t('stat.every-day'), data: 1 },
      { text: t('stat.every-week'), data: 7 },
    ];
    if (mode === 'single') {
      const limitExcessNotificationCheckBox = unlimitedAccessAvailable ? null : (
        <Checkbox
          id="notifyAboutLimitExcess"
          className="statistics-form__setting"
          label={t('stat.notify-overlimit')}
          checked={settings.notifyOverLimits}
          onChange={this.onCheckNotifyOverLimits}
        />
      );
      return (
        <div>
          <Checkbox
            id="send2Email"
            className="statistics-form__setting statistics-form__setting--long"
            label={t('stat.send.label', { email })}
            checked={settings.sendStatistics}
            onChange={this.onCheckSend}
          />
          <Dropdown
            id="notifyEvery"
            className="statistics-form__setting statistics-form__setting--dropdown"
            elements={options}
            dataValue={settings.notifyEvery}
            onChange={this.onSelect.bind}
          />
          {limitExcessNotificationCheckBox}
        </div>
      );
    }
    return (
      <div>
        <Checkbox
          id="send2Email"
          className="statistics-form__setting"
          label={t('stat.send.label', { email })}
          checked={batchSettings.sendStatistics}
          onChange={this.onCheckSendBatch}
        />
        <Dropdown
          id="notifyEvery"
          className="statistics-form__setting statistics-form__setting--dropdown"
          elements={options}
          dataValue={batchSettings.notifyEvery}
          onChange={this.onSelectBatch}
        />
      </div>
    );
  }
}

export default withTranslation()(NotificationSettings);
