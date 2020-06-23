/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';
import React from 'react';
import Oval from './Oval';
import cn from 'classnames';

type Props = {
  id: string,
  label?: string,
  className?: string,
  green?: boolean,
};
const OvalLabel = ({ id, className, label, green }:Props) => (
  <div id={id} className={cn(styles.ovalLabel, className)}>
    <Oval className={cn(styles.ovalLabelOval, {[styles.ovalLabelGreen]: green })}/>
    <div>{label}</div>
  </div>
);

OvalLabel.defaultProps = {
  id: '',
};

export default OvalLabel;
