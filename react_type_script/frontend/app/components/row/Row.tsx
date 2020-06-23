/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';
import React, { ReactNode } from 'react';
import cn from 'classnames';

export enum RowType {white, grey, blue}

const CLASS_COLOR = {
  [RowType.white]: styles.white,
  [RowType.grey]: styles.grey,
  [RowType.blue]: styles.blue,
};

type Props = {
  id?: string;
  className?: string;
  children?: ReactNode;
  type: RowType;
  disabled?: boolean;
};

const Row = (props: Props) => {
  const { id, className, disabled, children, type } = props;
  return (
    <div id={id} className={cn(styles.row, CLASS_COLOR[type], className, { [styles.disabled]: disabled })}>
      {children}
    </div>
  );
};

Row.defaultProps = {
  type: RowType.white,
};

export default Row;
