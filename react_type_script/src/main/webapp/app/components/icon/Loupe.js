/*
 * Copyright (c) 2020. Prototype
 */

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Loupe = ({ id, className }) => <div id={id} className={cn('icon icon__loupe', className)}/>;

Loupe.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Loupe.defaultProps = {
  id: '',
};

export default Loupe;
