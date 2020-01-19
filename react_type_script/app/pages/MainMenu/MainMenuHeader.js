/*
 * Copyright (c) 2020. Prototype
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
