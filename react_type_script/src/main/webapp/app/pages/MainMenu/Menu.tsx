/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';
import React, { Component } from 'react';

type Props = {
  id: string;
  className?: string;
  onClick: () => void;
  name?: string;
};

export default class Menu extends Component<Props> {
  render() {
    const { id, onClick, name } = this.props;
    return (
      <div id={id} className={styles.menuButton} onClick={onClick}>
        {name}
      </div>
    );
  }
}
