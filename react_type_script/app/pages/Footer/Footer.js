/*
 * Copyright 2019 Russian Post
 *
 * This source code is Russian Post Confidential Proprietary.
 * This software is protected by copyright. All rights and titles are reserved.
 * You shall not use, copy, distribute, modify, decompile, disassemble or reverse engineer the software.
 * Otherwise this violation would be treated by law and would be subject to legal prosecution.
 * Legal use of the software provides receipt of a license from the right holder only.
 */

import './style.scss';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { globalVersionSelector } from '../../common/services/selectors';
import cn from 'classnames';

class Footer extends Component {
  render() {
    const { typeClass, version } = this.props;

    return (
      <div className={cn('footer', typeClass)}>
        <div className="footer-container label">{version}</div>
      </div>
    );
  }
}

export default connect(
  state => ({
    version: globalVersionSelector(state),
  }),
  {},
)(Footer);
