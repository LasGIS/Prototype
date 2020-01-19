/*
 * Copyright 2018 Russian Post
 *
 * This source code is Russian Post Confidential Proprietary.
 * This software is protected by copyright. All rights and titles are reserved.
 * You shall not use, copy, distribute, modify, decompile, disassemble or reverse engineer the software.
 * Otherwise this violation would be treated by law and would be subject to legal prosecution.
 * Legal use of the software provides receipt of a license from the right holder only.
 */
import '../letter/universal/style.scss';
import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Input from '../input/Input';

export default class CellInput extends Component {
  render() {
    const { id, className, value, size, isValid, required, validation, readOnly, onChange } = this.props;
    const cells = new Array(size);
    for (let i = 0; i < size; i++) {
      cells[i] = (
        <div
          key={i}
          className={cn('cell-input__cell', {
            'cell-input__cell--no-left-border': i !== 0,
            'cell-input__empty': !value,
          })}
        >
          &nbsp;
        </div>
      );
    }
    return (
      <div id={id} className={cn('cell-input', className)}>
        <Input
          id={id + 'Input'}
          className="cell-input__text"
          value={value}
          isValid={isValid}
          required={required}
          validation={validation}
          readOnly={readOnly}
          onChange={onChange}
        />
        {cells}
      </div>
    );
  }
}

CellInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.number.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func,
  isValid: PropTypes.any,
  required: PropTypes.bool,
  validation: PropTypes.bool,
  readOnly: PropTypes.bool,
};

CellInput.defaultProps = {
  id: '',
  value: '',
};
