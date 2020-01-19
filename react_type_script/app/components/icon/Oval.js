/*
 * Copyright (c) 2020. Prototype
 */

import './style.scss';
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Oval = ({ className }) => <div className={cn('icon icon__oval', className)} />;

export default Oval;

Oval.propTypes = {
  className: PropTypes.string,
};
