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
import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Inline from '../Inline';
import CellInput from '../CellInput';

export default class TimeInput extends Component {
  render() {
    const { className, label } = this.props;
    return (
      <Inline id="" className={cn('time-input', className)} beforeLabel={label} bottomBorder>
        <CellInput id="" value="" size={2} readOnly className="time-input__cell" />
        <CellInput id="" value="" size={2} readOnly className="time-input__cell" />
      </Inline>
    );
  }
}

TimeInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
};

TimeInput.defaultProps = {
  id: '',
};
