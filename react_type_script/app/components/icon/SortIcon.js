/*
 * Copyright (c) 2020. Prototype
 */

import './style.scss';
import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

export default class SortIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: props.type === 'desc',
    };
  }

  render() {
    const { id, className, onClick, type } = this.props;

    return (
      <div id={id} onClick={onClick} className={cn(className, 'icon', 'icon__sort--'.concat(!!type ? type : 'asc'))} />
    );
  }
}

SortIcon.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

SortIcon.defaultProps = {
  id: '',
};
