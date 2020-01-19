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

export default class CancelIcon extends Component {
  render() {
    const { id, className, white, ...otherProps } = this.props;
    const currentClassName = cn('icon', className, { 'icon__cancel--white': white }, { icon__cancel: !white });
    return <div id={id} className={currentClassName} {...otherProps} />;
  }
}

CancelIcon.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  white: PropTypes.bool,
};

CancelIcon.defaultProps = {
  id: '',
};
