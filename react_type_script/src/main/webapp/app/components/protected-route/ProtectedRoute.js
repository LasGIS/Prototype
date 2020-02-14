/*
 * Copyright (c) 2020. Prototype
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isGrantedRoles } from '../../constants/users-roles';
import withAuthProtection from '../../hoc/withAuthProtection';
import { globalRouterLocationSelector, globalUserRolesSelector } from '../../common/services/selectors';

class ProtectedRoute extends Component {
  render() {
    const { availableRoles, userRoles, location, ...rest } = this.props;
    const userCanSeePage = isGrantedRoles(userRoles, availableRoles);
    const error = `Недостаточно прав для посещения страницы - ${location.pathname}`;

    return userCanSeePage ? (
      <Route {...rest} />
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: {
            roleNoAccessRedirect: true,
            forbiddenPath: location.pathname,
            error,
          },
        }}
      />
    );
  }
}

export default connect(state => {
  return {
    userRoles: globalUserRolesSelector(state),
    location: globalRouterLocationSelector(state),
  };
}, {})(withAuthProtection(ProtectedRoute));

ProtectedRoute.propTypes = {
  availableRoles: PropTypes.array,
  userRoles: PropTypes.array,
  location: PropTypes.object,
};
