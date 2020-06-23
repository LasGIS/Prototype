/*
 * Copyright (c) 2020. Prototype
 */

import './style.scss';
import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Inline from '../Inline';
import CellInput from '../CellInput';

export default class TimeInput extends Component {
  render() {
    const { className, label } = this.props;
    return (
      <Inline id="" className={cn('time-input', className)} beforeLabel={label} bottomBorder>
        <CellInput id="" value="" size={2} readOnly className="time-input__cell"/>
        <CellInput id="" value="" size={2} readOnly className="time-input__cell"/>
      </Inline>
    );
  }
}

TimeInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
};

TimeInput.defaultProps = {
  id: '',
};
