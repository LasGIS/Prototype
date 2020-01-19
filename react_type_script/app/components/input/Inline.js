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

export default class Inline extends Component {
  render() {
    const {
      id,
      beforeLabel,
      afterLabel,
      className,
      children,
      labelClass,
      onBlur,
      onFocus,
      onClick,
      style,
    } = this.props;
    return (
      <div
        id={id}
        className={cn('inline', className)}
        onBlur={onBlur}
        onFocus={onFocus}
        onClick={onClick}
        style={style}
      >
        {beforeLabel && <label className={labelClass}>{beforeLabel}</label>}
        {children}
        {afterLabel && <label className={labelClass}>{afterLabel}</label>}
      </div>
    );
  }
}

Inline.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  labelClass: PropTypes.string,
  beforeLabel: PropTypes.string,
  afterLabel: PropTypes.string,
};
