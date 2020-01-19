/*
 * Copyright 2019 Russian Post
 *
 * This source code is Russian Post Confidential Proprietary.
 * This software is protected by copyright. All rights and titles are reserved.
 * You shall not use, copy, distribute, modify, decompile, disassemble or reverse engineer the software.
 * Otherwise this violation would be treated by law and would be subject to legal prosecution.
 * Legal use of the software provides receipt of a license from the right holder only.
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
