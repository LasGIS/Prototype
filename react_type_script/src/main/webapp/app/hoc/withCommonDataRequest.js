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
      const { getUserInfo, getAppSettings } = this.props;
      const frontAuthUser = localStorage.getItem(FRONT_AUTH_USER);
      if (frontAuthUser) {
        getUserInfo();
        getAppSettings();
      }
    }

    render() {
      const { ...rest } = this.props;
      return <OriginalComponent {...rest} />;
    }
  }

  return connect(() => ({}), {
    getUserInfo: getCurrentUserInfo,
    getAppSettings,
  })(WithCommonDataRequest);
};
