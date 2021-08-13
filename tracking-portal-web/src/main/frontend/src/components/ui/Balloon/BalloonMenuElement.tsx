/*
 * Copyright (c) 2021. Prototype
 */

import React, { ReactNode } from 'react';

type Props = {
  onClick: () => void;
  children: ReactNode;
};

export const BalloonMenuElement = ({ onClick, children }: Props) => {
  return (
    <div className="balloon--menu__element" onClick={onClick}>
      {children}
    </div>
  );
}
