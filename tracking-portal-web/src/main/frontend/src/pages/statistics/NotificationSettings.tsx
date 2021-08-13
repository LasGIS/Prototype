/*
 * Copyright (c) 2021. Prototype
 */

import './statistics.scss';
import React, { Component } from 'react';
import Checkbox from '../../components/ui/Checkbox';
import Dropdown from '../../components/ui/Dropdown/Dropdown';
import { WithTranslation, withTranslation } from 'react-i18next';
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
    mode: "single",
    unlimitedAccessAvailable: false,
    email: "email not set",
    settings: {
      sendStatistics: false,
      notifyEvery: 1,
      notifyOverLimits: false,
    },
    batchSettings: {
      sendStatistics: false,
      notifyEvery: 1
    }
  }

  onSelect(data: number) {
    this.props.onSelect(data);
  }

  onCheckSend(checked: boolean) {
    this.props.onCheckSend(checked);
  }

  onCheckNotifyOverLimits(checked: boolean) {
    this.props.onCheckNotifyOverLimits(checked);
  }

  onSelectBatch(data: number) {
    this.props.onSelectBatch(data);
  }

  onCheckSendBatch(checked: boolean) {
    this.props.onCheckSendBatch(checked);
  }

  render() {
    const { t, unlimitedAccessAvailable, email, settings, batchSettings } = this.props;
    const options = [ { text: t("stat.every-day"), data: 1 }, { text: t("stat.every-week"), data: 7 } ];
    if (this.props.mode === "single") {
      const limitExcessNotificationCheckBox = unlimitedAccessAvailable ? null : (
        <Checkbox
          id="notifyAboutLimitExcess" className="statistics-form__setting"
          label={t("stat.notify-overlimit")}
          checked={settings.notifyOverLimits}
          onChange={this.onCheckNotifyOverLimits.bind(this)}/>
      );
      return (
        <div>
          <Checkbox id="send2Email" className="statistics-form__setting statistics-form__setting--long"
                    label={t("stat.send.label", { email: email })}
                    checked={settings.sendStatistics}
                    onChange={this.onCheckSend.bind(this)}/>
          <Dropdown id="notifyEvery" className="statistics-form__setting statistics-form__setting--dropdown"
                    elements={options} dataValue={settings.notifyEvery}
                    onChange={this.onSelect.bind(this)}/>
          {limitExcessNotificationCheckBox}
        </div>
      );
    } else {
      return (
        <div>
          <Checkbox id="send2Email" className="statistics-form__setting"
                    label={t("stat.send.label", { email: email })}
                    checked={batchSettings.sendStatistics}
                    onChange={this.onCheckSendBatch.bind(this)}/>
          <Dropdown id="notifyEvery" className="statistics-form__setting statistics-form__setting--dropdown"
                    elements={options} dataValue={batchSettings.notifyEvery}
                    onChange={this.onSelectBatch.bind(this)}/>
        </div>
      );
    }
  }
}

export default withTranslation()(NotificationSettings);
