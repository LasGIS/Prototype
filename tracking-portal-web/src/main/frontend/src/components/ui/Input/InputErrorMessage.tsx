/*
 * Copyright (c) 2021. Prototype
 */

import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const InputErrorMessage = ({ children }: Props) => {
  return <div className="input__error-message">{children}</div>;
}
