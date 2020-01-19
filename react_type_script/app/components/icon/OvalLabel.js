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
import Oval from './Oval';
import cn from 'classnames';

const OvalLabel = ({ id, className, label, green }) => (
  <div id={id} className={cn('oval-label', className)}>
    <Oval className={cn('oval-label__oval', { 'oval-label--green': green })} />
    <div>{label}</div>
  </div>
);

OvalLabel.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  green: PropTypes.bool,
};

OvalLabel.defaultProps = {
  id: '',
};

export default OvalLabel;
