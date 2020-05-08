/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';
import React, { Component } from 'react';
import cn from 'classnames';

type Props = {
  className?: string;
}

export default class MainContainer extends Component<Props> {
  render() {
    const { className, children } = this.props;
    return (
      <div className={cn(styles.protoBody, className)}>
        <div className={styles.mainContainer}>{children}</div>
      </div>
    );
  }
}
