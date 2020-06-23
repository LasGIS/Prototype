/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';

import React, { ReactNode } from 'react';
import TableRow from './TableRow';
import TableCell from './TableCell';

type Props = {
  children?: ReactNode,
};

const TableEmptyRow = ({ children }: Props) => (
  <TableRow>
    <TableCell className={styles.emptyRow}>{children}</TableCell>
  </TableRow>
);

TableEmptyRow.defaultProps = {};

export default TableEmptyRow;
