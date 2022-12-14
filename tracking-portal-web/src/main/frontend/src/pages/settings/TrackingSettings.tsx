/*
 * Copyright (c) 2021. Prototype
 */

import React, { Component } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { RouteComponentProps, withRouter } from 'react-router';
import services from '../../service/services';
import Info from './Info';
import { AccessSettingsDto, ErrorDto } from '../../service/api-dtos';
import withCommonContext from '../../hoc/withCommonContext';
import { CommonContextProps } from '../../hoc/CommonContext';
import { getUrlParams } from '../../common/utils';

type Props = WithTranslation & RouteComponentProps & CommonContextProps;

type State = {
  accessSettings: AccessSettingsDto;
};

class TrackingSettings extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      accessSettings: {
        userEmail: '',
        backendUserLogin: '',
        isBatchAccessAllowed: false,
      },
    };
    this.showPasswordSentNotification = this.showPasswordSentNotification.bind(this);
    this.showSentSettingsNotification = this.showSentSettingsNotification.bind(this);
    this.sendSettings = this.sendSettings.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  componentDidMount() {
    const { history, showErrorNotification, location } = this.props;
    services.apiControl
      .getAccessSettings()
      .then((result: AccessSettingsDto) => {
        console.log('getAccessSettings = ', result);
        this.setState({ accessSettings: result });
      })
      .catch((error: ErrorDto) => {
        showErrorNotification(error, 'getAccessSettings', (errorType) => {
          switch (errorType) {
            case 'USER_UNAUTHORIZED':
            case 'PORTAL_BACKEND_USER_NOT_FOUND':
              history.push('/');
              break;
            default:
              break;
          }
        });
      });

    const urlParams = getUrlParams(location.search);
    if (urlParams.showNotification === 'true') {
      this.showSentSettingsNotification();
    }
  }

  showPasswordSentNotification() {
    const { t, showNotification, hideNotification } = this.props;
    const { accessSettings } = this.state;
    showNotification(t('settings.tracking.new-password-sent', { email: accessSettings.userEmail }));
    setTimeout(() => {
      hideNotification();
    }, 10000);
  }

  showSentSettingsNotification() {
    const { t, showNotification, hideNotification } = this.props;
    const { accessSettings } = this.state;
    showNotification(t('settings.tracking.access-data-sent', { email: accessSettings.userEmail }));
    setTimeout(() => {
      hideNotification();
    }, 10000);
  }

  sendSettings() {
    const { showErrorNotification } = this.props;
    services.apiControl
      .sendSettings()
      .then(() => {
        this.showSentSettingsNotification();
      })
      .catch((error: ErrorDto) => {
        showErrorNotification(error, 'sendSettings');
      });
  }

  resetPassword() {
    const { showErrorNotification } = this.props;
    services.apiControl
      .resetPassword()
      .then(() => {
        this.showPasswordSentNotification();
      })
      .catch((error: ErrorDto) => {
        showErrorNotification(error, 'resetPassword');
      });
  }

  render() {
    const { accessSettings } = this.state;
    return (
      <div className="my-tracking-page__main row-fluid">
        <div className="span1" />
        <div className="span10">
          <div className="my-tracking-content-item my-tracking-setting">
            <Info
              login={accessSettings.backendUserLogin}
              isBatchAccessAllowed={accessSettings.isBatchAccessAllowed}
              onSendSettings={this.sendSettings}
              onResetPassword={this.resetPassword}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(withCommonContext(withRouter(TrackingSettings)));
