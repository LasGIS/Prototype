/*
 * Copyright (c) 2021. Prototype
 */

import React from 'react';
import cn from 'classnames';

type Props = {
  clickable: boolean;
  open: boolean;
  onClick: () => any;
  title: string;
  note: string;
};

export const BlockListElement = ({ clickable, open, onClick, title, note }: Props) => {

  const classes = cn("block-list__element", {
    "block-list__element--clickable": clickable && !open
  });

  return (
    <div className={classes} onClick={onClick}>
      <div className="block-list__element-title">{title}</div>
      {note ?
        <div className="block-list__element-note">{note}</div>
        : false}
    </div>
  );
}
