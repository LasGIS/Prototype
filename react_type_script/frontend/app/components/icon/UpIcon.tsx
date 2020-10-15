/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';
import React, { Component } from 'react';
import cn from 'classnames';

type Props = {
  id: string,
  className?: string,
  blue?: boolean,
};

export default class UpIcon extends Component<Props> {
  static defaultProps = {
    id: 'UpIcon',
  };

  render() {
    const { id, className, blue } = this.props;
    const currentClassName = cn(className, { [styles.iconUpBlue]: blue }, { [styles.iconUp]: !blue });
    return <div id={id} className={cn(currentClassName)}/>;
  }
}
