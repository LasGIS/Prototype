/*
 * Copyright (c) 2020. Prototype
 */

import './style.scss';
import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

export default class FilterIcon extends Component {
  render() {
    const { id, className, onClick, type } = this.props;

    return (
      <div
        id={id}
        onClick={onClick}
        className={cn(
          className,
          'icon',
          { 'icon__filter--active': type === 'active' },
          { 'icon__filter--grey-with-border': type === 'greyWithBorder' },
          { 'icon__filter--grey': type === 'grey' },
        )}
      />
    );
  }
}

FilterIcon.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  active: PropTypes.bool,
  greyWithBorder: PropTypes.bool,
  grey: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

FilterIcon.defaultProps = {
  id: '',
};
