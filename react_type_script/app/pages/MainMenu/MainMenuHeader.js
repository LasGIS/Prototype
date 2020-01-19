/*
 * Copyright 2018 Russian Post
 *
 * This source code is Russian Post Confidential Proprietary.
 * This software is protected by copyright. All rights and titles are reserved.
 * You shall not use, copy, distribute, modify, decompile, disassemble or reverse engineer the software.
 * Otherwise this violation would be treated by law and would be subject to legal prosecution.
 * Legal use of the software provides receipt of a license from the right holder only.
 */

import './style.scss';

import React, { Component } from 'react';
import Button from '../../components/button/Button';
import Header from '../Header/Header';
import { connect } from 'react-redux';
import { logoutAction } from '../../common/actions';
import withRedirectProp from '../../hoc/withRedirectProp';
import { FRONT_AUTH_TOKEN } from '../../constants/constants';

export class MainMenuHeader extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    localStorage.setItem(FRONT_AUTH_TOKEN, '');
    this.props.redirect('login');
  }

  render() {
    const { logout } = this.props;
    return (
      <Header blueStyle hasAccount>
        <Button id="logoutButton" className="button-header right" onClick={this.logout} white>
          Выйти
        </Button>
      </Header>
    );
  }
}

export default connect(state => ({}), {
  logout: logoutAction,
})(withRedirectProp(MainMenuHeader));
