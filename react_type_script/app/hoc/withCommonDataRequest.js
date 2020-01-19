/*
 * Copyright (c) 2020. Prototype
 */

import React from 'react';
import {connect} from 'react-redux';
import {getAppSettings, getUserInfo, getVersion} from '../common/actions';
import {FRONT_AUTH_TOKEN} from '../constants/constants';

export const withCommonDataRequest = OriginalComponent => {
    class WithCommonDataRequest extends React.Component {
        componentDidMount() {
            const {getUserInfo, getAppSettings, getVersion} = this.props;

            if (localStorage.getItem(FRONT_AUTH_TOKEN)) {
                getUserInfo();
                getAppSettings();
                getVersion();
            }
        }

        render() {
            const {...rest} = this.props;
            return <OriginalComponent {...rest} />;
        }
    }

    return connect(() => ({}), {
      getUserInfo,
      getAppSettings,
      getVersion
    })(
        WithCommonDataRequest,
    );
};
