/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';
import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import MainMenu from '../MainMenu/MainMenu';
import Components from '../../components/ui-kit/Components';
import ProtectedRoute from '../../components/protected-route/ProtectedRoute';
import { FEATURE_EDIT_ROLES } from '../../constants/users-roles';
import Footer from '../Footer/Footer';
import { withCommonDataRequest } from '../../hoc/withCommonDataRequest';
import { ROUTES } from '../MainMenu/constants';
import MainMenuHeader from '../MainMenu/MainMenuHeader';
import withRedirectProp from '../../hoc/withRedirectProp';
import { ColorStyle } from '../Global/global-redux-types';
import { RechartsDiagram } from '../Diagram/RechartsDiagram';
import { WithRedirectHocProps } from '../../common/types/hocs-injected-prop-types';

type Props = {
  location: Location;
  className?: string;
} & WithRedirectHocProps;

export class MainPage extends Component<Props> {

  constructor(props: Props) {
    super(props);
    this.state = {
      isAuth: false,
    };
  }

  render() {
    const isMainMenu = this.props.location.pathname === '/main-menu';
    return (
      <div className={styles.proto}>
        <MainMenuHeader isMain={isMainMenu}/>
        <div className={styles.commonPane}>
          <div className={styles.leftPane}>
панель слева
          </div>
          <div className={styles.rightPane}>
            <Switch>
              <ProtectedRoute
                colorStyle={ColorStyle.blue}
                path="/main-menu"
                name="MainMenu"
                component={MainMenu}
                availableRoles={FEATURE_EDIT_ROLES.ALL_ROLES}
              />
              <ProtectedRoute
                colorStyle={ColorStyle.white}
                path={`/${ROUTES.userListPage}`}
                name="UserManagementTable"
                component={Components}
                availableRoles={FEATURE_EDIT_ROLES.USER_MANAGEMENT}
              />
              <ProtectedRoute
                colorStyle={ColorStyle.red}
                exact
                path={`/${ROUTES.personListPage}`}
                name="PersonManagementTable"
                component={Components}
                availableRoles={FEATURE_EDIT_ROLES.PERSON_MANAGEMENT}
              />
              <Route
                path={`/${ROUTES.recharts}`}
                name="RechartsDiagram"
                component={RechartsDiagram}
              />
              <Route
                path={`/${ROUTES.components}`}
                name="Components"
                component={Components}
              />
              <Redirect from="/" to="/main-menu"/>
            </Switch>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default withRedirectProp(withCommonDataRequest(MainPage));
