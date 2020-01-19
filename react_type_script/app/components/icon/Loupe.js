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
import cn from 'classnames';

const Loupe = ({ id, className }) => <div id={id} className={cn('icon icon__loupe', className)} />;

Loupe.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Loupe.defaultProps = {
  id: '',
};

export default Loupe;
