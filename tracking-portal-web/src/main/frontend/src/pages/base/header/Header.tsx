/*
 * Copyright (c) 2021. Prototype
 */

import './header.scss';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { WithTranslation, withTranslation } from 'react-i18next';
import Balloon from '../../../components/ui/Balloon/Balloon';
import { UserInfo } from '../../../service/api-dtos';
import { MenuElement } from '../../../components/ui/Balloon/types';
import urls from '../../../service/constants';

type Props = WithTranslation & {
  userInfo?: UserInfo;
};

type State = {
  authorized: boolean;
  trackingURL: string;
};

class Header extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      authorized: false,
      trackingURL: '/statistics',
    };
    this.onAuthorize = this.onAuthorize.bind(this);
    this.onUserMenuSelect = this.onUserMenuSelect.bind(this);
  }

  componentDidUpdate(prevProps: Props) {
    const { userInfo } = this.props;
    if (prevProps.userInfo !== userInfo) {
      this.setState({ authorized: Boolean(userInfo) });
    }
  }

  onUserMenuSelect(val: string) {
    const { trackingURL } = this.state;
    if (val === 'exit') {
      sessionStorage.removeItem('userInfo');
      window.location.href = urls.LOGOUT_URL;
    } else if (val === 'user-profile') {
      window.location.href = urls.USER_ACCOUNT_URL;
    } else if (val === 'tracking') {
      window.location.href = trackingURL;
    }
  }

  onAuthorize = () => {
    window.location.href = urls.LOGIN_URL;
  };

  serviceTrackingUserMenuElements(): MenuElement[] {
    const { t } = this.props;
    return [
      {
        text: t('header.my-tracking'),
        data: 'tracking',
      },
      {
        text: t('header.account-settings'),
        data: 'user-profile',
      },
      {
        text: t('header.logout'),
        data: 'exit',
      },
    ];
  }

  regularUserMenuElements(): MenuElement[] {
    const { t } = this.props;
    return [
      {
        text: t('header.account-settings'),
        data: 'user-profile',
      },
      {
        text: t('header.logout'),
        data: 'exit',
      },
    ];
  }

  filterMenuElements(): MenuElement[] | undefined {
    const { authorized } = this.state;
    const { userInfo } = this.props;
    if (authorized) {
      if (userInfo?.isServiceTrackingUser) {
        return this.serviceTrackingUserMenuElements();
      }
      return this.regularUserMenuElements();
    }
    return undefined;
  }

  render() {
    const { authorized } = this.state;
    const { t, userInfo } = this.props;
    return (
      <div className="header-container">
        <div className="header">
          <Link className="header__logo" to="/">
            <div className="header__logo__image" />
            <span className="header__logo__label">{t('header.logo-label')}</span>
          </Link>
          <div className="header__menu">
            <Link to="/support" className="header__btn-all-services">
              {t('header.help')}
            </Link>
            {authorized ? (
              <Balloon elements={this.filterMenuElements()} onSelect={this.onUserMenuSelect}>
                <div className="text-button header__btn-user-menu">
                  {userInfo?.name}
                  <div className="text-button header__btn-user-arrow" />
                </div>
              </Balloon>
            ) : (
              <div className="text-button header__btn-login" role="button" tabIndex={-1} onClick={this.onAuthorize}>
                {t('header.login')}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(Header);
