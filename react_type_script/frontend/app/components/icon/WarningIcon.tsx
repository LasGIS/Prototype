/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';
import React from 'react';
import cn from 'classnames';

type Props = {
  className: string;
  white: boolean;
  tooltip: string;
};

const WarningIcon = ({ className, white, tooltip }: Props) => (
  <div
    title={tooltip}
    className={cn('icon', { [styles.iconWarningWhite]: white, [styles.iconWarningRed]: !white }, className)}
  />
);

export default WarningIcon;

