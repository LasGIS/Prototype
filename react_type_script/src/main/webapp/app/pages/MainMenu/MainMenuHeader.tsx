/*
 * Copyright (c) 2020. Prototype
 */

import styles from '../Header/style.scss';
import React, { Component } from 'react';
import Button from '../../components/button/Button';
import Header from '../Header/Header';
import cn from 'classnames';
import { connect } from 'react-redux';
import withRedirectProp from '../../hoc/withRedirectProp';
import { FRONT_AUTH_USER } from '../../constants/constants';
import { WithRedirectHocProps } from '../../common/types/hocs-injected-prop-types';

type Props = {
  isMain: boolean;
  className?: string;
} & WithRedirectHocProps;

export class MainMenuHeader extends Component<Props> {
  constructor(props: Props) {
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
        <Button id="backButton" className={cn(styles.buttonHeader, styles.left)}
                onClick={() => redirect && redirect('/main-menu')}
                primary>
          Выход в меню
        </Button>
        }
        <Button id="logoutButton" className={cn(styles.buttonHeader, styles.right)}
                onClick={this.logout}
                primaryFilled>
          Выйти
        </Button>
      </Header>
    );
  }
}

export default connect(state => ({}), {})(withRedirectProp(MainMenuHeader));
