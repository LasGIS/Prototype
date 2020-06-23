/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';
import React, { ReactNode } from 'react';
import cn from 'classnames';

type Props = {
  id?: string,
  className?: string,
  disabled?: boolean,
  children?: ReactNode;
};

const Col = (props: Props) => {
  const { id, className, disabled, children } = props;
  return (
    <div
      id={id}
      className={cn(styles.col, className, { [styles.disabled]: disabled })}
    >
      {children}
    </div>
  );
};

export default Col;
