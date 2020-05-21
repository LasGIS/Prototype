/*
 * Copyright (c) 2020. Prototype
 */

import React, { Component } from 'react';
import cn from 'classnames';

type Props = {
  id: string;
  className: string;
  active: boolean;
  greyWithBorder: boolean;
  grey: boolean;
  onClick: () => any;
  type: string;
};

export default class FilterIcon extends Component<Props> {
  static defaultProps = {
    id: 'FilterIcon',
  };
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

