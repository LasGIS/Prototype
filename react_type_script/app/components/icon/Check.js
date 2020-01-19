/*
 * Copyright 2018 Russian Post
 *
 * This source code is Russian Post Confidential Proprietary.
 * This software is protected by copyright. All rights and titles are reserved.
 * You shall not use, copy, distribute, modify, decompile, disassemble or reverse engineer the software.
 * Otherwise this violation would be treated by law and would be subject to legal prosecution.
 * Legal use of the software provides receipt of a license from the right holder only.
 */

import './style.scss';
import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

export default class Check extends Component {
  render() {
    const { id, className } = this.props;
    return <div id={id} className={cn('icon icon__green-check', className)} />;
  }
}

Check.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Check.defaultProps = {
  id: '',
};
