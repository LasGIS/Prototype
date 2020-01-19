/*
 * Copyright 2018 Russian Post
 *
 * This source code is Russian Post Confidential Proprietary.
 * This software is protected by copyright. All rights and titles are reserved.
 * You shall not use, copy, distribute, modify, decompile, disassemble or reverse engineer the software.
 * Otherwise this violation would be treated by law and would be subject to legal prosecution.
 * Legal use of the software provides receipt of a license from the right holder only.
 */
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Input from '../input/Input';
import '../letter/universal/style.scss';
import InputMask from './InputMask';

export default class CellInputMask extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      id,
      maskType,
      className,
      value,
      size,
      isValid,
      required,
      validation,
      readOnly,
      onChange,
      tooltip,
      rightDirection,
      onBlur,
      onFocus,
      widthCell,
      tabIndex,
    } = this.props;

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

    let letterSpacing;
    let paddingLeft;
    if (size === 2 && value.length === 2) {
      letterSpacing = 12.8;
      paddingLeft = 8;
    } else if (size === 5 && value.length === 5) {
      letterSpacing = 14.09;
      paddingLeft = 8;
    }

    const style = {
      width: (widthCell || 24.2) * size + 15 + 'px',
      marginRight: '-15px',
      letterSpacing: letterSpacing,
      paddingLeft: paddingLeft,
    };

    return (
      <div id={id} className={cn('cell-input', className)} onBlur={this.onBlur} onFocus={this.onFocus}>
        <InputMask
          id={id + 'Input'}
          maskType={maskType}
          placeholderChar=" "
          showMask={false}
          className="cell-input__text"
          style={style}
          value={value}
          onChange={onChange}
          cellInput
          digitNum={size}
          isValid={!!isValid}
          required={required}
          validation={validation}
          readOnly={readOnly}
          tooltip={tooltip}
          onBlur={onBlur}
          onFocus={onFocus}
          tabIndex={tabIndex}
          rightDirection={rightDirection}
          ref={component => (this.cellInputMask = component)}
        />
        {cells}
      </div>
    );
  }
}

CellInputMask.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  size: PropTypes.number.isRequired,
  className: PropTypes.string,
  isValid: PropTypes.any,
  required: PropTypes.bool,
  validation: PropTypes.bool,
  maskType: PropTypes.oneOf([...Object.values(InputMask.MASK_TYPES)]),
  readOnly: PropTypes.bool,
  rightDirection: PropTypes.bool,
  tooltip: PropTypes.string,
  onBlur: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onFocus: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  widthCell: PropTypes.string,
  tabIndex: PropTypes.number,
};

CellInputMask.defaultProps = {
  id: '',
  value: '',
};
