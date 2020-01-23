/*
 * Copyright (c) 2020. Prototype
 */

import './style.scss';
import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Inline from '../Inline';
import CellInput from '../CellInput';

export default class DateInput extends Component {
  render() {
    const { className, label } = this.props;
    return (
      <Inline id="" className={cn('date-input', className)} beforeLabel={label} bottomBorder>
        <CellInput id="" size={2} value="" readOnly className="date-input__cell"/>
        <CellInput id="" size={2} value="" readOnly className="date-input__cell"/>
        <CellInput id="" size={2} value="" readOnly className="date-input__cell"/>
      </Inline>
    );
  }
}

DateInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
};

DateInput.defaultProps = {
  id: '',
};
