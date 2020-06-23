/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';
import React from 'react';
import cn from 'classnames';

const Oval = ({ className }: { className?: string }) => <div className={cn(styles.iconOval, className)}/>;

export default Oval;
