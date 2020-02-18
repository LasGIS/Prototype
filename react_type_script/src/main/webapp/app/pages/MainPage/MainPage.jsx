/*
 * Copyright (c) 2020. Prototype
 */

import './style.scss';

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

export class MainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
    };
  }

  render() {
    return (
      <div className="proto">
        <MainMenuHeader/>
        <Switch>
          <ProtectedRoute
            path="/main-menu"
            name="MainMenu"
            component={MainMenu}
            availableRoles={FEATURE_EDIT_ROLES.ALL_ROLES}
          />
          <ProtectedRoute
            path={`/${ROUTES.userListPage}`}
            name="UserManagementTable"
            component={Components}
            availableRoles={FEATURE_EDIT_ROLES.USER_MANAGEMENT}
          />
          <ProtectedRoute
            exact
            path={`/${ROUTES.personListPage}`}
            name="PersonManagementTable"
            component={Components}
            availableRoles={FEATURE_EDIT_ROLES.PERSON_MANAGEMENT}
          />
          <Route
            path={`/${ROUTES.components}`}
            name="Components"
            component={Components}
          />
          <Redirect from="/" to="/main-menu"/>
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default withRedirectProp(withCommonDataRequest(MainPage));
