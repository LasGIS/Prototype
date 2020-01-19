/*
 * Copyright 2018 Russian Post
 *
 * This source code is Russian Post Confidential Proprietary.
 * This software is protected by copyright. All rights and titles are reserved.
 * You shall not use, copy, distribute, modify, decompile, disassemble or reverse engineer the software.
 * Otherwise this violation would be treated by law and would be subject to legal prosecution.
 * Legal use of the software provides receipt of a license from the right holder only.
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import InputMask from './InputMask';
import './style.scss';

export default class WeightInput extends Component {
  componentDidUpdate() {
    if (this.props.value === '0.') {
      document.getElementById(this.props.id).setSelectionRange(2, 2);
    }
  }

  render() {
    const { id, className, value, onChange, onEnter, autoFocus } = this.props;
    return (
      <InputMask
        id={id}
        className={className}
        value={value}
        onChange={onChange}
        onEnter={onEnter}
        placeholderChar={`\u2000`}
        maskType={InputMask.MASK_TYPES.weightKg}
        blue
        showMask
        autoFocus={autoFocus}
      />
    );
  }
}

WeightInput.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onEnter: PropTypes.func,
  autoFocus: PropTypes.bool,
};

WeightInput.defaultProps = {
  id: '',
};
