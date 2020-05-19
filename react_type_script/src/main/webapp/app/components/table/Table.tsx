/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';

import React, { ReactNode } from 'react';

type Props = {
  className: string;
  children?: ReactNode;
};

const Table = ({ children }: Props) =>
  <section className={styles.root}>{children}</section>;

export default Table;
