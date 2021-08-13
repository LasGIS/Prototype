/*
 * Copyright (c) 2021. Prototype
 */

import React, { ComponentType, FunctionComponent } from 'react';
import { CommonContextProps, useCommonContext } from './CommonContext';

const withCommonContext =
  <P extends any>(OriginalComponent: ComponentType<P>): FunctionComponent<Omit<P, keyof CommonContextProps>> =>
  (props) =>
    <OriginalComponent {...(props as P)} {...useCommonContext()} />;

export default withCommonContext;
