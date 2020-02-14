/*
 * Copyright (c) 2020. Prototype
 */

import './style.scss';
import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

export default class BigWarningIcon extends Component {
  render() {
    const { id, className } = this.props;
    return <div id={id} className={cn('icon icon__big-warning', className)}/>;
  }
}

BigWarningIcon.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
};

BigWarningIcon.defaultProps = {
  id: '',
};
