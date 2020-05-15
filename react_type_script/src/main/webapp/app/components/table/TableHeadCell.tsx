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

const TableHeadCell = ({ children, className }: Props) =>
  <div className={cn(styles.headCell, className)}>{children}</div>;

TableHeadCell.defaultProps = {
  className: '',
};

export default TableHeadCell;
