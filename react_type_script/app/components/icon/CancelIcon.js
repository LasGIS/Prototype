/*
 * Copyright (c) 2020. Prototype
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
