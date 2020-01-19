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

export default class DateInput extends Component {
  render() {
    const { className, label } = this.props;
    return (
      <Inline id="" className={cn('date-input', className)} beforeLabel={label} bottomBorder>
        <CellInput id="" size={2} value="" readOnly className="date-input__cell" />
        <CellInput id="" size={2} value="" readOnly className="date-input__cell" />
        <CellInput id="" size={2} value="" readOnly className="date-input__cell" />
      </Inline>
    );
  }
}

DateInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
};

DateInput.defaultProps = {
  id: '',
};
