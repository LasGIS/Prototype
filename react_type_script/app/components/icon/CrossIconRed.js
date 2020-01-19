/*
 * Copyright (c) 2020. Prototype
 */

import './style.scss';
import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

const CrossIcon = ({ id, className, ...otherProps }) => (
  <div id={id} className={cn('icon__cross-red', className)} {...otherProps} />
);

CrossIcon.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
};

CrossIcon.defaultProps = {
  id: 'CrossIcon',
};

export default CrossIcon;
