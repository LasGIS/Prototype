/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';
import React, { Component } from 'react';
import cn from 'classnames';

type Props = {
  id?: string,
  text: string,
  className?: string,
};

export default class Label extends Component<Props> {
  render() {
    const { id, className, text } = this.props;
    return (
      <div id={id} className={cn(className, styles.label)}>
        {text}
      </div>
    );
  }
}