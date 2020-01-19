/*
 * Copyright (c) 2020. Prototype
 */

import './style.scss';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { globalVersionSelector } from '../../common/services/selectors';
import cn from 'classnames';

class Footer extends Component {
  render() {
    const { typeClass, version } = this.props;

    return (
      <div className={cn('footer', typeClass)}>
        <div className="footer-container label">{version}</div>
      </div>
    );
  }
}

export default connect(
  state => ({
    version: globalVersionSelector(state),
  }),
  {},
)(Footer);
