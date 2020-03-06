/*
 * Copyright (c) 2020. Prototype
 */

import './style.scss';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import cn from 'classnames';
import { RootStoreData } from '../../common/types/redux-types';
import { ColorStyle } from '../Global/global-redux-types';

type Props = {
  colorStyle: ColorStyle;
  name?: string;
  version?: string;
};

class Footer extends Component<Props> {
  render() {
    const { colorStyle, name, version } = this.props;
    const typeClass = {
      'blue-footer': colorStyle === ColorStyle.blue ,
      'white-footer': colorStyle === ColorStyle.white,
      'red-footer': colorStyle === ColorStyle.red
    };
    return (
      <div
        className={cn('footer', typeClass)}>
        <div className="footer-container ">
          <div className="label">{name}</div>
          <div className="label right">{version}</div>
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
