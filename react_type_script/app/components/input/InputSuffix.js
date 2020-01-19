/*
 * Copyright (c) 2020. Prototype
 */

import './style.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import cn from 'classnames';

const InputSuffix = props => (
  <div className={cn('input-suffix-container', props.className)}>
    <Input {...props} />
    <div className="input2__inner-suffix">{props.suffix}</div>
  </div>
);

InputSuffix.propTypes = {
  id: PropTypes.string.isRequired,
  suffix: PropTypes.string,
};

InputSuffix.defaultProps = {
  id: '',
};

export default InputSuffix;
