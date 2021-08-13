/*
 * Copyright (c) 2021. Prototype
 */

import React, { useEffect, useState } from 'react';
import cn from 'classnames';

type Props = {
  show: boolean;
  message: string;
  messageOk?: string;
  onClose?: () => any;
};

export const Notification = ({ show, messageOk, message, onClose }: Props) => {

  const [ stateShow, setStateShow ] = useState<boolean>(show);

  useEffect(() => {
    setStateShow(show);
  }, [ show ]);

  const close = () => {
    if (stateShow) {
      setStateShow(false);
      if (onClose) {
        onClose();
      }
    }
  }

  return (
    <div className={cn("notification", { "notification--visible": stateShow })} onClick={close}>
      <div className={cn("notification__box", "notification__box--small", { "notification__box--visible": show })}>
        <div className="notification__paper notification__paper--center">
          {messageOk &&
          <div className="notification__ok">{messageOk}</div>
          }
          <div className="notification__info">{message}</div>
        </div>
      </div>
    </div>
  );
}
