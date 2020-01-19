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

const InputBottomLabel = props => (
  <div className={cn('input-bottom-label', props.className)}>
    <Input {...props} />
    <div className="input-bottom-label__text">{props.label}</div>
  </div>
);

InputBottomLabel.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string.isRequired,
};

InputBottomLabel.defaultProps = {
  id: '',
};

export default InputBottomLabel;
