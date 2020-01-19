/*
 * Copyright 2019 Russian Post
 *
 * This source code is Russian Post Confidential Proprietary.
 * This software is protected by copyright. All rights and titles are reserved.
 * You shall not use, copy, distribute, modify, decompile, disassemble or reverse engineer the software.
 * Otherwise this violation would be treated by law and would be subject to legal prosecution.
 * Legal use of the software provides receipt of a license from the right holder only.
 */

import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

const AttentionSvgIcon = ({ className, width, height, color }) => (
  <svg
    className={cn(className)}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 18 17"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 7.5V10.5C8 10.776 8.224 11 8.5 11H9.5C9.776 11 10 10.776 10 10.5V7.5C10 7.224 9.776 7 9.5 7H8.5C8.224 7 8 7.224 8 7.5Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.5 12H8.5C8.224 12 8 12.224 8 12.5V13.5C8 13.776 8.224 14 8.5 14H9.5C9.776 14 10 13.776 10 13.5V12.5C10 12.224 9.776 12 9.5 12Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.8831 15.529L9.8831 0.529039C9.5351 -0.122961 8.4651 -0.122961 8.1171 0.529039L0.117101 15.529C-0.0478989 15.839 -0.0378989 16.213 0.143101 16.515C0.323101 16.815 0.648101 17 1.0001 17H17.0001C17.3521 17 17.6771 16.815 17.8571 16.515C18.0381 16.213 18.0481 15.839 17.8831 15.529ZM2.6671 15L9.0001 3.12504L15.3331 15H2.6671Z"
      fill={color}
    />
  </svg>
);

export default AttentionSvgIcon;

AttentionSvgIcon.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
};

AttentionSvgIcon.defaultProps = {
  className: '',
  width: 18,
  height: 17,
  color: '#F88901',
};
