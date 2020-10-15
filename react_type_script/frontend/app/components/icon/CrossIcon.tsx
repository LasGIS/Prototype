/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';
import React from 'react';
import cn from 'classnames';

type Props = {
  id: string;
  className?: string;
  red?: boolean;
  onClick?: () => void;
};

const CrossIcon = ({ id, className, red, onClick }: Props) =>
  <div id={id} className={cn((red ? styles.iconCrossRed : styles.iconCross), className)}
       onClick={() => onClick && onClick()}/>;

CrossIcon.defaultProps = {
  id: 'crossIcon',
};

export default CrossIcon;
