/*
 * Copyright (c) 2020. Prototype
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
