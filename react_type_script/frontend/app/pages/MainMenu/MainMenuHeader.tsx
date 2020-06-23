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
  topic: string;
  className?: string;
} & WithRedirectHocProps;

export class MainMenuHeader extends Component<Props> {

  static defaultProps: {};

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
    const { topic } = this.props;
    return (
      <Header whiteStyle hasAccount>
        <div className={styles.left}>
          <div id="menuTopic" className={styles.topic}>
            {topic}
          </div>
        </div>
        <div className={cn(styles.buttonHeader, styles.right)}>
          <Button id="logoutButton"
                  onClick={this.logout}
                  primaryFilled>
            Выйти
          </Button>
        </div>
      </Header>
    );
  }
}

MainMenuHeader.defaultProps = { topic: 'Некоторый текст' };
export default connect(state => ({}), {})(withRedirectProp(MainMenuHeader));
