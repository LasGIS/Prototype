/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';

import React, { ReactNode } from 'react';
import cn from 'classnames';
import SortIcon from '../icon/SortIcon';

type Props = {
  className: string;
  children?: ReactNode;
};

const TableHeadCell = ({ children, className }: Props) => {
  return <div className={cn(styles.headCell, className)}>
    {children}
    <SortIcon />
  </div>;
};

TableHeadCell.defaultProps = {
  className: 'TableHeadCell',
};

export default TableHeadCell;
