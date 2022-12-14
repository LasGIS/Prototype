/*
 * Copyright (c) 2021. Prototype
 */

import React, { ComponentType, FC } from 'react';
import { CommonContextProps } from './CommonContext';
import useCommonContext from './useCommonContext';

const withCommonContext =
  <P extends any>(OriginalComponent: ComponentType<P>): FC<Omit<P, keyof CommonContextProps>> =>
  (props) =>
    <OriginalComponent {...(props as P)} {...useCommonContext()} />;

export default withCommonContext;
