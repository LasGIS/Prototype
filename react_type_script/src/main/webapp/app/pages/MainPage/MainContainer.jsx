/*
 * Copyright (c) 2020. Prototype
 */

import './style.scss';
import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

export default class MainContainer extends Component {
  render() {
    const { className, children } = this.props;
    return (
      <div className={cn('proto-body', className)}>
        <div className="main-container">{children}</div>
      </div>
    );
  }
}

MainContainer.propTypes = {
  className: PropTypes.string,
};
