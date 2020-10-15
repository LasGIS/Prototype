/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';
import React, { Component } from 'react';
import cn from 'classnames';

export enum FilterIconType { active, greyWithBorder, grey}

type Props = {
  id: string;
  className?: string;
  type: FilterIconType;
  onClick?: () => any;
};

export default class FilterIcon extends Component<Props> {
  static defaultProps = {
    id: 'FilterIcon',
    type: FilterIconType.active,
  };

  render() {
    const { id, className, onClick, type } = this.props;

    return (
      <div
        id={id}
        onClick={onClick}
        className={cn(
          className,
          { [styles.iconFilterActive]: type === FilterIconType.active },
          { [styles.iconFilterGreyWithBorder]: type === FilterIconType.greyWithBorder },
          { [styles.iconFilterGrey]: type === FilterIconType.grey },
        )}
      />
    );
  }
}
