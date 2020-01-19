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

export default class FilterIcon extends Component {
  render() {
    const { id, className, onClick, type } = this.props;

    return (
      <div
        id={id}
        onClick={onClick}
        className={cn(
          className,
          'icon',
          { 'icon__filter--active': type === 'active' },
          { 'icon__filter--grey-with-border': type === 'greyWithBorder' },
          { 'icon__filter--grey': type === 'grey' },
        )}
      />
    );
  }
}

FilterIcon.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  active: PropTypes.bool,
  greyWithBorder: PropTypes.bool,
  grey: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

FilterIcon.defaultProps = {
  id: '',
};
