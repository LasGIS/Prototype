/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';
import React, { Component } from 'react';
import cn from 'classnames';

export enum SortType {asc, desc};

type Props = {
  id: string;
  className?: string;
  onClick?: () => any;
  type: SortType
};

export default class SortIcon extends Component<Props> {
  static defaultProps = {
    id: 'SortIcon',
    type: SortType.asc,
  };

  render() {
    const { id, className, onClick, type } = this.props;
    return (
      <div id={id} onClick={onClick} className={cn(className,
        { [styles.iconSortAsc]: type == SortType.asc },
        { [styles.iconSortDesc]: type == SortType.desc },
      )}/>
    );
  }
}
