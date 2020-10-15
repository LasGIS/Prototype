/*
 * Copyright (c) 2020. Prototype
 */

import React from 'react';
import styles from './style.scss';
import cn from 'classnames';

type Props = {
  className?: string;
};

const AcceptIcon = ({ className }: Props) => <div className={cn(styles.iconAccept, className)}/>;

export default AcceptIcon;
