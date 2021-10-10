/*
 * Copyright (c) 2021. Prototype
 */

import React from 'react';
import { defaultUserInfo, ErrorDto, ErrorDtoType, UserInfo } from '../service/api-dtos';

export interface CommonContextProps {
  userInfo: UserInfo;
  showErrorNotification: (error: ErrorDto, service: string, onCloseNotification?: (errorType?: ErrorDtoType) => any) => void;
  showNotification: (message: string, messageOk?: string, onCloseNotification?: () => any) => void;
  hideNotification: () => void;
}

export const commonContext = React.createContext<CommonContextProps>({
  userInfo: defaultUserInfo,
  showErrorNotification: () => {},
  showNotification: () => {},
  hideNotification: () => {},
});

export const CommonContextProvider = commonContext.Provider;

export const CommonContextConsumer = commonContext.Consumer;
