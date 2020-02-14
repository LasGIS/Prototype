/*
 * Copyright (c) 2020. Prototype
 */

import './style.scss';
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
      className={cn('col', className, { 'col--disabled': disabled })}
    >
      {children}
    </div>
  );
};

export default Col;
