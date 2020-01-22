/*
 * Copyright (c) 2020. Prototype
 */
import './style.scss';
import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

export default class Label extends Component {
  render() {
    const { id, className, text } = this.props;
    return (
      <div id={id} className={cn(className, 'label')}>
        {text}
      </div>
    );
  }
}

Label.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};
