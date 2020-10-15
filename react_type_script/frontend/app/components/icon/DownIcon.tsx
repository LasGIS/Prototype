/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';
import React, { Component } from 'react';
import cn from 'classnames';

export default class DownIcon extends Component<{ id: string; className?: string; }> {
  static defaultProps = {
    id: 'DownIcon',
  };

  render() {
    const { id, className } = this.props;
    return <div id={id} className={cn(styles.iconDown, className)}/>;
  }
}
