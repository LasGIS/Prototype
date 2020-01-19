/*
 * Copyright (c) 2020. Prototype
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
