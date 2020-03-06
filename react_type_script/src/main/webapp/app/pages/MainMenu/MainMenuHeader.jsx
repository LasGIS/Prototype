/*
 * Copyright (c) 2020. Prototype
 */

import './style.scss';

import React, { Component } from 'react';
import Button from '../../components/button/Button';
import Header from '../Header/Header';
import { connect } from 'react-redux';
import withRedirectProp from '../../hoc/withRedirectProp';
import { FRONT_AUTH_USER } from '../../constants/constants';

export class MainMenuHeader extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    const { redirect } = this.props;
    localStorage.setItem(FRONT_AUTH_USER, '');
    redirect('login');
  }

  render() {
    const { isMain, redirect } = this.props;
    return (
      <Header hasAccount>
        {!isMain &&
        <Button id="backButton" className="button-header left"
                onClick={() => redirect && redirect('/main-menu')}
                primary>
          Выход в меню
        </Button>
        }
        <Button id="logoutButton" className="button-header right" onClick={this.logout} primaryFilled>
          Выйти
        </Button>
      </Header>
    );
  }
}

export default connect(state => ({}), {})(withRedirectProp(MainMenuHeader));
