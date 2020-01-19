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
import PropTypes from 'prop-types';

export default class Menu extends Component {
  render() {
    const { id, onClick, disabled, name } = this.props;
    return (
      <div id={id} className="menu-button" onClick={onClick}>
        {name}
      </div>
    );
  }
}
Menu.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string.isRequired,
};
