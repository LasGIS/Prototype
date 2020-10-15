/*
 * Copyright (c) 2020. Prototype
 */

import React from 'react';
import { connect } from 'react-redux';
import { FRONT_AUTH_USER } from '../constants/constants';
import { getAppSettings, getCurrentUserInfo } from '../common/services/async-actions';

export const withCommonDataRequest = OriginalComponent => {

  class WithCommonDataRequest extends React.Component {
    componentDidMount() {
      const { getCurrentUserInfo, getAppSettings } = this.props;
      const authUserStr = localStorage.getItem(FRONT_AUTH_USER);
      if (authUserStr) {
        const authUser = JSON.parse(authUserStr);
        getCurrentUserInfo(authUser.login);
        getAppSettings();
      }
    }

    render() {
      const { ...rest } = this.props;
      return <OriginalComponent {...rest} />;
    }
  }

  return connect(() => ({}), {
    getCurrentUserInfo,
    getAppSettings,
  })(WithCommonDataRequest);
};
