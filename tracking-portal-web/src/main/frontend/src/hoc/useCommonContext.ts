/*
 * Copyright (c) 2021. Prototype
 */

import { useContext } from 'react';
import { commonContext, CommonContextProps } from './CommonContext';

const useCommonContext = (): CommonContextProps => {
  return useContext(commonContext);
};

export default useCommonContext;
