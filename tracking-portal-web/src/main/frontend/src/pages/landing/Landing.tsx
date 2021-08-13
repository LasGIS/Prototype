/*
 * Copyright (c) 2021. Prototype
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../../service/services';
import { getUrlParams, GetUrlParamsResponse } from '../../common/utils';
import AgreementNotification from './AgreementNotification';
import cn from 'classnames';
import { WithTranslation, withTranslation } from 'react-i18next';
import { RouteComponentProps, withRouter } from 'react-router';
import LandingMessages from './LangingMessages';
import { ErrorDto } from '../../service/api-dtos';
import { withCommonContext } from '../../hoc/withCommonContext';
import { CommonContextProps } from '../../hoc/CommonContext';
import { urls } from '../../service/constants';

type Props = WithTranslation & RouteComponentProps & CommonContextProps;

type State = {
  showAgreement: boolean;
};

class Landing extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    const urlParams: GetUrlParamsResponse = getUrlParams(props.location.search);
    this.state = {
      showAgreement: urlParams["showAgreement"] === "true",
    };
    this.getAccess = this.getAccess.bind(this);
    this.agreementDone = this.agreementDone.bind(this);
    this.agreementClose = this.agreementClose.bind(this);
  }

  componentDidMount() {
    const { userInfo, history } = this.props;
    if (userInfo.isServiceTrackingUser) {
      history.push("/statistics");
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
    const { userInfo, history } = this.props;
    if (userInfo.isServiceTrackingUser) {
      history.push("/statistics");
    }
  }

  getAccess() {
    const { userInfo } = this.props;
    if (!userInfo.isAuthorized) {
      window.location.href = urls.LOGIN_URL;
    } else {
      this.setState({
        showAgreement: true
      });
    }
  }

  agreementDone() {
    const { history, showErrorNotification } = this.props;
    this.setState({ showAgreement: false });
    services.apiControl.getAccess()
      .then((data) => {
        sessionStorage.removeItem("userInfo");
        history.push({ pathname: "/access-settings", search: "showNotification=true" });
      })
      .catch((error: ErrorDto) => {
        showErrorNotification(error, "getAccess");
      })
  }

  agreementClose() {
    this.setState({ showAgreement: false });
  }

  render() {
    const { t, userInfo } = this.props;
    const { showAgreement } = this.state;
    return <>
      <div className={cn('portlet-boundary', 'portlet-static', 'portlet-static-end', 'portlet-borderless')}>
        <span> </span>
        <div className="portlet-borderless-container">
          <div className="portlet-body">
            <div className="landing-page">
              <div className={cn('white-footer', 'controls-visible', 'guest-site', 'signed-in', 'public-page', 'site')}>
                <div className="landing-page">
                  <div className="landing-page__header landing-header">
                    <div className="landing-header__title">
                      {t('landing.title1')}<br/>{t('landing.title2')}
                    </div>
                    <div className="landing-header__description landing-header__description--top">
                      {t('landing.destination')}
                    </div>
                    <div className="landing-header__description">
                      {!userInfo.isServiceTrackingUser &&
                      <span className="button landing-header__button" onClick={this.getAccess}>{t('landing.get-access')}</span>
                      }
                    </div>
                    <div className="landing-header__description landing-header__description--bottom">
                      <Link className="landing-header__link" to="/specification">
                        <span className="landing-header__underline">{t('landing.specification')}</span>
                      </Link>
                    </div>
                  </div>
                  <AgreementNotification
                    active={showAgreement}
                    onDone={this.agreementDone} onClose={this.agreementClose} key="notification"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cn('portlet-boundary', 'portlet-static', 'portlet-static-end', 'portlet-borderless', 'portlet-journal-content')}>
        <span> </span>
        <div className="portlet-borderless-container">
          <div className="portlet-body">
            <div className="journal-content-article">
              <div className="page_content1"><LandingMessages/></div>
            </div>
            <div className="entry-links"/>
          </div>
        </div>
      </div>
    </>;
  }
}

export default withTranslation()(withCommonContext(withRouter(Landing)));
