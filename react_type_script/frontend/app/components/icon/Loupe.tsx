/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';
import React from 'react';
import cn from 'classnames';

const Loupe = ({ id, className }: {
  id: string;
  className?: string;
}) => <div id={id} className={cn(styles.iconLoupe, className)}/>;

Loupe.defaultProps = {
  id: 'Loupe',
};

export default Loupe;
