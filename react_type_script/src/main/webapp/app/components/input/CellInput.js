/*
 * Copyright (c) 2020. Prototype
 */
import '../letter/universal/style.scss';
import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Input from '../input2/Input';

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
