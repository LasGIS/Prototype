/*
 * Copyright (c) 2020. Prototype
 */

import React from 'react';
import { connect } from 'react-redux';
import { FRONT_AUTH_USER } from '../constants/constants';
import { getAppSettings } from '../pages/Global/services/async-actions';

export const withCommonDataRequest = OriginalComponent => {

  class WithCommonDataRequest extends React.Component {
    componentDidMount() {
      const { getAppSettings } = this.props;
      const frontAuthUser = localStorage.getItem(FRONT_AUTH_USER);
      if (frontAuthUser) {
        console.log(FRONT_AUTH_USER, ' :=', JSON.parse(frontAuthUser));
        getAppSettings();
      }
    }

    render() {
      const { ...rest } = this.props;
      return <OriginalComponent {...rest} />;
    }
  }

  return connect(() => ({}), {
    getAppSettings,
  })(WithCommonDataRequest);
};
