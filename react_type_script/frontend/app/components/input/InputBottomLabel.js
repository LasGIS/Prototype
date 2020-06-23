/*
 * Copyright (c) 2020. Prototype
 */

import './style.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input2/Input';
import cn from 'classnames';

const InputBottomLabel = props => (
  <div className={cn('input-bottom-label', props.className)}>
    <Input {...props} />
    <div className="input-bottom-label__text">{props.label}</div>
  </div>
);

InputBottomLabel.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string.isRequired,
};

InputBottomLabel.defaultProps = {
  id: '',
};

export default InputBottomLabel;
