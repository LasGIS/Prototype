/*
 * Copyright (c) 2020. Prototype
 */

import styles from './login.scss';
import { login } from '../../common/auth/actions';
import React, { Component } from 'react';
import Button from '../../components/button/Button';
import { connect } from 'react-redux';
import Input from '../../components/input/Input';
import withRedirectProp from '../../hoc/withRedirectProp';
import { RootStoreData } from '../../common/types/redux-types';
import { globalRouterLocationSelector } from '../../common/services/selectors';
import { WithRedirectHocProps } from '../../common/types/hocs-injected-prop-types';
import { redirect } from '../Global/services/reducer';

type Props = {
  id?: string;
  className?: string;
  text: string;
  login: (login: string, password: string) => Promise<any>;
} & WithRedirectHocProps;

type State = {
  login: string;
  password: string;
  wrongPassword: boolean;
  errors: { [key: string]: string };
  isLoading: boolean;
};

export class LoginForm extends Component<Props, State> {

  constructor(props: Props) {
    console.log('styles = ', styles);
    super(props);
    this.state = {
      login: '',
      password: '',
      wrongPassword: false,
      errors: {},
      isLoading: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  onChangeLogin(login: string) {
    this.setState({ login });
  }

  onChangePassword(password: string) {
    this.setState({ password });
  }

  onSubmit() {
    this.props.login(this.state.login, this.state.password)
      .then(() => {
        this.props.redirect('/main-menu');
      })
      .catch(error => this.setState({ wrongPassword: true }));
  }

  componentWillUnmount() {
    document.body.classList.remove('error');
    document.body.classList.remove('login');
  }

  render() {
    if (this.state.wrongPassword) {
      document.body.classList.add('error');
    } else {
      document.body.classList.add('login');
    }
    return (
      <div>
        <h1 className="title">Вход по логину</h1>
        <div className="form-box">
          <h2 className="title">Войдите используя логин и пароль</h2>
          <div className="form-field">
            <Input
              id='usernameInput'
              name='j_username'
              value={this.state.login}
              onChange={this.onChangeLogin}
              placeholder={'Логин'}
              tooltip='tooltip'
              autoComplete='j_username'
            />
          </div>
          <div className="form-field">
            <Input
              id='passwordInput'
              name='j_password'
              type='password'
              value={this.state.password}
              onChange={this.onChangePassword}
              placeholder={'Пароль'}
              onEnter={this.onSubmit.bind(this)}
            />
          </div>
          {this.state.wrongPassword && (
            <div className="error-container">
              <div className="wrong-password-icon"/>
              <span className="wrong-password">Неверный логин / пароль</span>
            </div>
          )}
          <div className="button-field">
            <Button id="loginButton" name={'check-password'} key="loginButton" onClick={this.onSubmit}>
              Вход
            </Button>
            <a id="forgetPassword" className="reset_filter" href="#">
              Забыли пароль?
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state: RootStoreData) => ({
  location: globalRouterLocationSelector(state),
}), {
  login,
  redirect,
})(withRedirectProp(LoginForm));
