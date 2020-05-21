/*
 * Copyright (c) 2020. Prototype
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { isGrantedRoles } from '../../constants/users-roles';
import withAuthProtection from '../../hoc/withAuthProtection';
import {
  globalRouterLocationSelector,
  globalUserDataIdLoadedSelector,
  globalUserRolesSelector,
} from '../../common/services/selectors';
import { setColorStyle } from '../../common/services/action-creators';
import { ColorStyle } from '../../common/global/global-redux-types';
import { UserRoleEnum } from '../../common/types/server-api-dtos';
import { RouteProps } from 'react-router';
import { RootStoreData } from '../../common/types/redux-types';

type Props = {
  availableRoles: UserRoleEnum[];
  userRoles: UserRoleEnum[];
  userDataIsLoaded: boolean;
  setColorStyle: (colorStyle: ColorStyle) => void;
  colorStyle: ColorStyle;
} & RouteProps;

class ProtectedRoute extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<any>) {
    const { setColorStyle, colorStyle } = this.props;
    if (prevProps.colorStyle !== colorStyle) {
      setColorStyle(colorStyle);
    }
  }

  render() {
    const { availableRoles, userRoles, location, userDataIsLoaded, ...rest } = this.props;
    const userCanSeePage = isGrantedRoles(userRoles, availableRoles);
    const error = `Недостаточно прав для посещения страницы - ${location?.pathname}`;

    return (!userDataIsLoaded || userCanSeePage) ? (
      <Route {...rest} />
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: {
            roleNoAccessRedirect: true,
            forbiddenPath: location?.pathname,
            error,
          },
        }}
      />
    );
  }
}

export default connect((state: RootStoreData) => {
  return {
    userRoles: globalUserRolesSelector(state),
    location: globalRouterLocationSelector(state),
    userDataIsLoaded: globalUserDataIdLoadedSelector(state),
  };
}, {
  setColorStyle,
})(withAuthProtection(ProtectedRoute));
