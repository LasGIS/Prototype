/*
 * Copyright (c) 2020. Prototype
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import InputMask from '../input2/InputMask';
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
