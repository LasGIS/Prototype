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

export default class UpIcon extends Component {
  render() {
    const { id, className, blue } = this.props;
    const currentClassName = cn('icon', className, { 'icon__up--blue': blue }, { icon__up: !blue });
    return <div id={id} className={cn('icon icon__up', currentClassName)} />;
  }
}

UpIcon.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  blue: PropTypes.bool,
};

UpIcon.defaultProps = {
  id: '',
};
