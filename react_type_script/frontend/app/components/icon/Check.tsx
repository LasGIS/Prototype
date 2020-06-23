/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';
import React, { Component } from 'react';
import cn from 'classnames';

type Props = {
  id?: string;
  className?: string;
};

export default class Check extends Component<Props> {
  render() {
    const { id, className } = this.props;
    return <div id={id} className={cn(styles.iconGreenCheck, className)}/>;
  }
}
