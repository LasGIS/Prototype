/*
 * Copyright (c) 2020. Prototype
 */

import './style.scss';
import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

const WarningIcon = ({ className, white, tooltip }) => (
  <div
    data-tip={tooltip}
    className={cn('icon', { 'icon__warning--white': white, 'icon__warning--red': !white }, className)}
  />
);

export default WarningIcon;

WarningIcon.propTypes = {
  className: PropTypes.string,
  white: PropTypes.bool,
};
