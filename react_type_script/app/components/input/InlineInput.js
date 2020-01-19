/*
 * Copyright (c) 2020. Prototype
 */

import './style.scss';
import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Inline from './Inline';
import Input from './Input';

export default class InlineInput extends Component {
  render() {
    const { id, className, beforeLabel, afterLabel } = this.props;
    return (
      <Inline id={id} beforeLabel={beforeLabel} afterLabel={afterLabel} className={cn('inline', className)}>
        <Input {...this.props} />
      </Inline>
    );
  }
}

InlineInput.propTypes = {
  id: PropTypes.string.isRequired,
  beforeLabel: PropTypes.string,
  afterLabel: PropTypes.string,
  tabIndex: PropTypes.number,
};

InlineInput.defaultProps = {
  id: '',
};
