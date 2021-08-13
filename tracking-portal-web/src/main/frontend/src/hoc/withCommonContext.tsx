/*
 * Copyright (c) 2021. Prototype
 */

import React, { ComponentType, FunctionComponent } from 'react';
import { CommonContextProps, useCommonContext } from './CommonContext';

export function withCommonContext<P>(OriginalComponent: ComponentType<P>): FunctionComponent<Omit<P, keyof CommonContextProps>> {
  return props => <OriginalComponent {...props as P} {...useCommonContext()}/>
}
