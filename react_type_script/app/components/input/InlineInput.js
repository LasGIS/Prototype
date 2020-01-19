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
import Inline from './Inline';
import Input from './Input';

export default class InlineInput extends Component {
  render() {
    const { id, className, beforeLabel, afterLabel } = this.props;
    return (
      <Inline id={id} beforeLabel={beforeLabel} afterLabel={afterLabel} className={cn('inline', className)}>
        <Input {...this.props} />
      </Inline>
    );
  }
}

InlineInput.propTypes = {
  id: PropTypes.string.isRequired,
  beforeLabel: PropTypes.string,
  afterLabel: PropTypes.string,
  tabIndex: PropTypes.number,
};

InlineInput.defaultProps = {
  id: '',
};
