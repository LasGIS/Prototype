/*
 * Copyright (c) 2020. Prototype
 */

import './style.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Oval from './Oval';
import cn from 'classnames';

const OvalLabel = ({ id, className, label, green }) => (
  <div id={id} className={cn('oval-label', className)}>
    <Oval className={cn('oval-label__oval', { 'oval-label--green': green })}/>
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
