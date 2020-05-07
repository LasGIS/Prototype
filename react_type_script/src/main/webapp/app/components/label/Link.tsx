/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';
import React, { MouseEventHandler } from 'react';
import cn from 'classnames';

type Props = {
  id?: string,
  className?: string,
  text: string,
  onClick: MouseEventHandler,
  dotted?: boolean,
  filled?: boolean,
  white?: boolean,
};

const Link = ({ id, text, onClick, className, dotted, filled, white }: Props) => (
  <div
    id={id}
    onClick={onClick}
    className={cn(styles.link, {
      [styles.linkDotted]: dotted,
      [styles.linkFilled]: filled,
      [styles.linkWhite]: white,
    }, className)}
  >
    {text}
  </div>
);

Link.defaultProps = {
  id: '',
  text: '',
  onClick: () => undefined,
};

export default Link;
