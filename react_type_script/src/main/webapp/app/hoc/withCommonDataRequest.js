/*
 * Copyright (c) 2020. Prototype
 */

import React from 'react';
import { connect } from 'react-redux';
import { getAppSettings, getVersion } from '../common/actions';
import { FRONT_AUTH_USER } from '../constants/constants';

export const withCommonDataRequest = OriginalComponent => {
  class WithCommonDataRequest extends React.Component {
    componentDidMount() {
      const { getAppSettings, getVersion } = this.props;
      const frontAuthUser = localStorage.getItem(FRONT_AUTH_USER);
      if (frontAuthUser) {
        console.log(FRONT_AUTH_USER, ' :=', JSON.parse(frontAuthUser));
        getAppSettings();
        getVersion();
      }
    }

    render() {
      const { ...rest } = this.props;
      return <OriginalComponent {...rest} />;
    }
  }

  return connect(() => ({}), {
    getAppSettings,
    getVersion,
  })(
    WithCommonDataRequest,
  );
};
