/*
 * Copyright (c) 2021. Prototype
 */

import './statistics.scss';
import React, { Component } from 'react';
import NotificationSettings from './NotificationSettings';
import StatisticsChart from './StatisticsChart';
import ContractState from './ContractState';
import { services } from '../../service/services';
import { WithTranslation, withTranslation } from 'react-i18next';
import { ErrorDto, ModeType, StatisticsDto } from '../../service/api-dtos';
import { CommonContextProps } from '../../hoc/CommonContext';
import { withCommonContext } from '../../hoc/withCommonContext';
import { RouteComponentProps, withRouter } from 'react-router';

type Props = WithTranslation & RouteComponentProps & CommonContextProps & {
  mode: ModeType;
};

type State = {
  mode: ModeType;
  statistics: StatisticsDto;
};

class StatisticsForm extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      mode: props.mode || "single",
      statistics: {
        userEmail: '',
        unlimited: false,
        data: [],
        dataBatch: [],
        settings: {
          sendStatistics: false,
          notifyEvery: 1,
          notifyOverLimits: false,
        },
        batchSettings: {
          sendStatistics: false,
          notifyEvery: 1,
        },
      }
    };
    this.settingsChanged = this.settingsChanged.bind(this);
    this.settingsBatchChanged = this.settingsBatchChanged.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onCheckSend = this.onCheckSend.bind(this);
    this.onCheckNotifyOverLimits = this.onCheckNotifyOverLimits.bind(this);
    this.onSelectBatch = this.onSelectBatch.bind(this);
    this.onCheckSendBatch = this.onCheckSendBatch.bind(this);
  }

  componentDidMount() {
    const { showErrorNotification, history } = this.props;
    services.apiControl.getStatistics()
      .then((result: StatisticsDto) => {
        console.log("getStatistics = ", result);
        this.setState({
          statistics: {
            ...{
              dataBatch: [],
              batchSettings: { sendStatistics: false, notifyEvery: 1 }
            },
            ...result
          }
        }, () => {
          console.log("normal statistics = ", this.state);
        });
      })
      .catch((error: ErrorDto) => {
        showErrorNotification(error, "getStatistics", (errorType) => {
          switch (errorType) {
            case "USER_UNAUTHORIZED":
            case "PORTAL_BACKEND_USER_NOT_FOUND":
              history.push("/");
              break;
          }
        });
      });
  }

  setMode(mode: ModeType) {
    this.setState({ mode: mode });
  }

  settingsChanged() {
    const { statistics } = this.state;
    const { showErrorNotification } = this.props;
    services.apiControl.saveSettings(statistics.settings)
      .then((result) => {
        console.log("saveSettings = OK", result);
      })
      .catch((error: ErrorDto) => {
        showErrorNotification(error, "saveSettings");
      });
  }

  settingsBatchChanged() {
    const { statistics } = this.state;
    const { showErrorNotification } = this.props;
    services.apiControl.saveSettingsBatch(statistics.batchSettings)
      .then((result) => {
        console.log("saveSettingsBatch = OK", result);
      })
      .catch((error: ErrorDto) => {
        showErrorNotification(error, "saveSettingsBatch");
      });
  }

  onSelect(data: number) {
    this.setState((prevState: State) => ({
      statistics: {
        ...prevState.statistics,
        settings: {
          ...prevState.statistics.settings,
          notifyEvery: data
        }
      }
    }), () => this.settingsChanged());
  }

  onCheckSend(checked: boolean) {
    this.setState((prevState: State) => ({
      statistics: {
        ...prevState.statistics,
        settings: {
          ...prevState.statistics.settings,
          sendStatistics: checked
        }
      }
    }), () => this.settingsChanged());
  }

  onCheckNotifyOverLimits(checked: boolean) {
    this.setState((prevState: State) => ({
      statistics: {
        ...prevState.statistics,
        settings: {
          ...prevState.statistics.settings,
          notifyOverLimits: checked
        }
      }
    }), () => this.settingsChanged());
  }

  onSelectBatch(data: number) {
    this.setState((prevState: State) => ({
      statistics: {
        ...prevState.statistics,
        batchSettings: {
          ...prevState.statistics.batchSettings,
          notifyEvery: data
        }
      }
    }), () => this.settingsBatchChanged());
  }

  onCheckSendBatch(checked: boolean) {
    this.setState((prevState: State) => ({
      statistics: {
        ...prevState.statistics,
        batchSettings: {
          ...prevState.statistics.batchSettings,
          sendStatistics: checked
        }
      }
    }), () => this.settingsBatchChanged());
  }

  render() {
    const self = this;
    const { userEmail, unlimited, data, settings, dataBatch, batchSettings } = this.state.statistics;
    const { t } = this.props;
    const modeClass = (mode: ModeType) => {
      return "tracking-left-menu__item" + (self.state.mode === mode ? " tracking-left-menu__item--selected" : "");
    };
    const leftMenu = (
      <ul className="nav nav-list my-tracking-page__left-menu tracking-left-menu">
        <li className={modeClass("single")} onClick={this.setMode.bind(this, "single")}>
          <span>{t('stat.left-menu.text-single-link')}</span>
        </li>
        <li className={modeClass("batch")} onClick={this.setMode.bind(this, "batch")}>
          <span>{t('stat.left-menu.text-batch-link')}</span>
        </li>
      </ul>
    );

    return (
      <div>
        <div className="my-tracking-page__main row-fluid">
          <div className={unlimited ? "span25" : "span1"}>
            {unlimited ? leftMenu : null}
          </div>

          <div className="span9 statistics-form">
            <div className="statistics-form__paper">
              <StatisticsChart
                mode={this.state.mode}
                unlimitedAccessAvailable={unlimited}
                data={data}
                dataBatch={dataBatch}
              />
              <hr className="statistics-form__delimiter"/>
              <NotificationSettings
                mode={this.state.mode}
                unlimitedAccessAvailable={unlimited}
                onSelect={this.onSelect}
                onCheckSend={this.onCheckSend}
                onCheckNotifyOverLimits={this.onCheckNotifyOverLimits}
                onSelectBatch={this.onSelectBatch}
                onCheckSendBatch={this.onCheckSendBatch}
                settings={settings}
                batchSettings={batchSettings}
                email={userEmail}
              />
            </div>
            <ContractState
              unlimited={this.state.statistics.unlimited}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(withCommonContext(withRouter(StatisticsForm)));
