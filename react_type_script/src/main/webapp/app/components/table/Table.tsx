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

const Table = ({ className, children }: Props) =>
  <section className={cn(styles.table, className)}>{children}</section>;

export default Table;
