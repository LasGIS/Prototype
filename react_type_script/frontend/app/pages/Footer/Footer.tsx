/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import cn from 'classnames';
import { RootStoreData } from '../../common/types/redux-types';
import { ColorStyle } from '../../common/global/global-redux-types';

type Props = {
  colorStyle: ColorStyle;
  name?: string;
  version?: string;
};

class Footer extends Component<Props> {
  render() {
    const { colorStyle, name, version } = this.props;
    const typeClass = {
      [styles.blueFooter]: colorStyle === ColorStyle.blue ,
      [styles.whiteFooter]: colorStyle === ColorStyle.white,
      [styles.redFooter]: colorStyle === ColorStyle.red
    };
    return (
      <div
        className={cn(styles.footer, typeClass)}>
        <div className={styles.footerContainer}>
          <div className={cn(styles.label)}>{`Название \"${name}\"`}</div>
          <div className={cn(styles.label, styles.right)}>{version}</div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: RootStoreData) => ({
    colorStyle: state.global.colorStyle,
    name: state.global.settings?.name,
    version: state.global.settings?.version,
  }),
  {},
)(Footer);
