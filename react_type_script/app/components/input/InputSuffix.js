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
