/*
 * Copyright (c) 2020. Prototype
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
