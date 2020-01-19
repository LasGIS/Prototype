/*
 * Copyright 2019 Russian Post
 *
 * This source code is Russian Post Confidential Proprietary.
 * This software is protected by copyright. All rights and titles are reserved.
 * You shall not use, copy, distribute, modify, decompile, disassemble or reverse engineer the software.
 * Otherwise this violation would be treated by law and would be subject to legal prosecution.
 * Legal use of the software provides receipt of a license from the right holder only.
 */

import './style.scss';
import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

type Props = {
  id: string;
  className?: string;
  onClick?: () => void;
};

const CrossIcon = ({ id, className, onClick }: Props) => (
  <div id={id} className={cn('icon__cross', className)} onClick={() => onClick && onClick()} />
);

CrossIcon.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
};

CrossIcon.defaultProps = {
  id: 'crossIcon',
};

export default CrossIcon;
