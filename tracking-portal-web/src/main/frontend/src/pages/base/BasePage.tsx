/*
 * Copyright (c) 2021. Prototype
 */

import React, { Component } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import cn from 'classnames';
import { RouteComponentProps, withRouter } from 'react-router';
import { TabNavigation, Tabs } from '../TabNavigation';
import services from '../../service/services';
import Footer from './footer/Footer';
import Header from './header/Header';
import { defaultUserInfo, ErrorDto, ErrorDtoType, UserInfo } from '../../service/api-dtos';
import { Theme } from '../../common/types';
import { CommonContextProvider } from '../../hoc/CommonContext';
import { Notification } from '../../components/Notification';
import urls from '../../service/constants';

type Props = WithTranslation &
  RouteComponentProps & {
    showTabNavigation?: boolean;
    selected?: Tabs;
    theme: Theme;
  };

type State = {
  userInfo?: UserInfo;
  showNotification: boolean;
  message: string;
  messageOk?: string;
  onCloseNotification?: (errorType?: ErrorDtoType) => any;
  errorType?: ErrorDtoType;
};

class BasePage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      userInfo: undefined,
      showNotification: false,
      message: '',
    };
    this.onCloseNotification = this.onCloseNotification.bind(this);
  }

  componentDidMount = () => {
    const { theme } = this.props;
    document.body.className = cn(`${theme}-footer`);
    this.findUserInfo();
  };

  showErrorNotification = (error: ErrorDto, service: string, onCloseNotification?: (errorType?: ErrorDtoType) => any) => {
    const { t, history } = this.props;
    console.log(`${service} Error = `, error);
    this.setState({
      showNotification: navigator.userAgent !== 'ReactSnap',
      onCloseNotification,
      message: t(error.messageKey),
      errorType: error.type,
    });
    switch (error.type) {
      case 'INCOMPLETE_POST_ID_USER_PROFILE':
        history.push('/incomplete-profile');
        break;
      case 'SERVICE_UNAVAILABLE':
        history.push('/503');
        break;
      case 'USER_UNAUTHORIZED':
        sessionStorage.removeItem('userInfo');
        window.location.href = urls.LOGIN_URL;
        break;
      default:
        this.setState({ message: t(error.messageKey) });
        break;
    }
  };

  showNotification = (message: string, messageOk?: string, onCloseNotification?: () => any) => {
    this.setState({
      showNotification: true,
      message,
      messageOk,
      onCloseNotification,
    });
  };

  hideNotification = () => {
    this.setState({
      showNotification: false,
    });
  };

  onCloseNotification = () => {
    const { onCloseNotification, errorType } = this.state;
    this.setState({ showNotification: false });
    if (onCloseNotification) {
      onCloseNotification(errorType);
    }
  };

  private findUserInfo() {
    const sessionUserInfo: string | null = sessionStorage.getItem('userInfo');
    if (sessionUserInfo) {
      const userInfo: UserInfo = JSON.parse(sessionUserInfo);
      this.setState({ userInfo });
    } else {
      services.apiControl
        .getUserInfo()
        .then((result: UserInfo) => {
          this.setState({ userInfo: result });
          sessionStorage.setItem('userInfo', JSON.stringify(result));
        })
        .catch((error: ErrorDto) => {
          console.log('getUserInfo Error = ', error);
          sessionStorage.removeItem('userInfo');
        });
    }
  }

  render() {
    const { t, showTabNavigation, children, theme } = this.props;
    const { userInfo, showNotification, message, messageOk } = this.state;
    return (
      <CommonContextProvider
        value={{
          userInfo: userInfo || defaultUserInfo,
          showErrorNotification: this.showErrorNotification,
          showNotification: this.showNotification,
          hideNotification: this.hideNotification,
        }}
      >
        <div className={cn(`${theme}-footer`, 'controls-visible', 'guest-site', 'signed-in', 'public-page', 'site')}>
          <Header userInfo={userInfo} />
          <div className="my-tracking-page">
            {showTabNavigation && <TabNavigation {...this.props} />}
            <div className="columns-1" id="main-content" role="main">
              <div className="portlet-layout row-fluid">
                <div className="portlet-column portlet-column-only span12" id="column-1">
                  <div className="portlet-dropzone portlet-column-content portlet-column-content-only" id="layout-column_column-1">
                    {children || t('Welcome to BasePage')}
                  </div>
                </div>
              </div>
            </div>
            <Notification show={showNotification} messageOk={messageOk} message={message} onClose={this.onCloseNotification} />
            <form action="#" id="hrefFm" method="post" name="hrefFm">
              <span />
            </form>
          </div>
          <Footer theme={theme} />
        </div>
      </CommonContextProvider>
    );
  }
}

export default withTranslation()(withRouter(BasePage));
