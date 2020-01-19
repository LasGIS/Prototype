
/*
 * Copyright (c) 2020. Prototype
 */

import './style.scss';

import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import MainMenu from '../MainMenu/MainMenu';
import Components from '../../components/ui-kit/Components';
import ProtectedRoute from '../../components/protected-route/ProtectedRoute';
import { FEATURE_EDIT_ROLES, ROLES } from '../../constants/users-roles';
import Footer from '../Footer/Footer';

export class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
    };
  }

  render() {
    return (
      <div className="new-app">
        <Switch>
          <ProtectedRoute
            path="/main-menu"
            name="MainMenu"
            component={MainMenu}
            availableRoles={[
              ROLES.SUPERVISOR, // Старший смены
              ROLES.OPERATOR, // Оператор
              ROLES.ADMIN, // Администратор
              ROLES.CHIEF, // Начальник
            ]}
          />
          <ProtectedRoute
              path="/user-management-table"
              name="UserManagementTable"
              component={Component}
            availableRoles={FEATURE_EDIT_ROLES.USER_MANAGEMENT}
          />
          <ProtectedRoute
            exact
            path="/person-management-table"
            name="PersonManagementTable"
            component={Component}
            availableRoles={FEATURE_EDIT_ROLES.PERSON_MANAGEMENT}
          />
          <Redirect from="/" to="/main-menu" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withCommonDataRequest(MainPage);
