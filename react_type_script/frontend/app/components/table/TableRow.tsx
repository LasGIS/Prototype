/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';

import React, { ReactNode } from 'react';

type Props = {
  children?: ReactNode,
};

const TableRow = ({ children, ...otherProps }: Props) => (
  <div {...otherProps} className={styles.row}>
    {children}
  </div>
);

TableRow.defaultProps = {};

export default TableRow;
