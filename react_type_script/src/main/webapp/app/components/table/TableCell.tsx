/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';

import React, { ReactNode } from 'react';
import cn from 'classnames';

type Props = {
  className: string;
  children?: ReactNode;
};

const TableCell = ({ children, className, ...otherProps }: Props) => (
  <div className={cn(styles.cell, className)} {...otherProps}>
    {children}
  </div>
);

TableCell.defaultProps = {
  className: '',
};

export default TableCell;
