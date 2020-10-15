/*
 * Copyright (c) 2020. Prototype
 */

import React from 'react';
import styles from './style.scss';
import cn from 'classnames';

const PrinterIconGray = ({ className }: { className?: string }) =>
  <div className={cn(styles.iconPrinterGray, className)}/>;

export default PrinterIconGray;
