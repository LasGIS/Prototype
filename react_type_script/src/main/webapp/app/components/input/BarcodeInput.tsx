/*
 * Copyright (c) 2020. Prototype
 */

import PropTypes from 'prop-types';
import React from 'react';
import _ from 'underscore';
import InputMask from './InputMask';
import './style.scss';

type Props = {
  className?: string;
  id: string;
  type: string;
  onChange: (param: string) => void;
  onChangeDelay: (param: string) => void;
  onEnter: (param: string) => void;
  size: number;
  value: string;
  placeholder: string;
  disabled?: boolean;
  autoFocus?: boolean;
  blue?: boolean;
  showMask?: boolean;
  readOnly?: boolean;
};

const BarcodeInput = (props: Props) => {
  const { className, size, onChange, onEnter } = props;

  return (
    <div className={className}>
      <InputMask
        {..._.omit(props, ['className'])}
        digitNum={size}
        maskType={InputMask.MASK_TYPES.barcode}
        placeholderChar=" "
        onChange={(val: string) => onChange && onChange(val.toUpperCase())}
        onEnter={(val: string) => onEnter && onEnter(val.toUpperCase())}
      />
      <div className="input2__barcode_icon"/>
    </div>
  );
};

BarcodeInput.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func,
  onChangeDelay: PropTypes.func,
  onEnter: PropTypes.func,
  size: PropTypes.number,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  blue: PropTypes.bool,
  showMask: PropTypes.bool,
  readOnly: PropTypes.bool,
};

BarcodeInput.defaultProps = {
  type: 'text',
  onChange: () => {
  },
  onChangeDelay: () => {
  },
  onEnter: () => {
  },
  size: 14,
  value: '',
  placeholder: '',
  disabled: false,
  autoFocus: false,
  blue: false,
  showMask: false,
  readOnly: false,
};

export default BarcodeInput;
