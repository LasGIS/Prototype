/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';
import React, { Component } from 'react';
import cn from 'classnames';

type Props = {
  id?: string;
  className?: string;
  white?: boolean;
};

export default class CancelIcon extends Component<Props> {
  static defaultProps = {};

  render() {
    const { id, className, white, ...otherProps } = this.props;
    const currentClassName = cn(className,
      { [styles.iconCancelWhite]: white },
      { [styles.iconCancel]: !white },
    );
    return <div id={id} className={currentClassName} {...otherProps} />;
  }
}

CancelIcon.defaultProps = {
  id: '',
};
