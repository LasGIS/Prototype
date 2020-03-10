/*
 * Copyright (c) 2020. Prototype
 */

import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { isGrantedRoles } from '../../constants/users-roles';
import withAuthProtection from '../../hoc/withAuthProtection';
import { globalRouterLocationSelector, globalUserRolesSelector } from '../../common/services/selectors';
import { setColorStyle } from '../../pages/Global/services/action-creators';
import { ColorStyle } from '../../pages/Global/global-redux-types';
import { UserRoleEnum } from '../../common/types/server-api-dtos';
import { RouteProps } from 'react-router';

type Props = {
  availableRoles: UserRoleEnum[];
  userRoles: UserRoleEnum[];
//  location: Location;
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
    const { availableRoles, userRoles, location, ...rest } = this.props;
    const userCanSeePage = isGrantedRoles(userRoles, availableRoles);
    const error = `Недостаточно прав для посещения страницы - ${location.pathname}`;

    return userCanSeePage ? (
      // @ts-ignore
      <Route {...rest} />
    ) : (
      <Redirect to = {
    {
      pathname: '/login',
        state;
    :
      {
        roleNoAccessRedirect: true,
          forbiddenPath;
      :
        location.pathname,
          error,
      }
    ,
    }
  }
    />;
  )
    ;
  }
}

export default connect(state => {
  return {
    userRoles: globalUserRolesSelector(state),
    location: globalRouterLocationSelector(state),
  };
}, {
  setColorStyle,
})(withAuthProtection(ProtectedRoute));

/*
ProtectedRoute.propTypes = {
  availableRoles: PropTypes.array,
  userRoles: PropTypes.array,
  location: PropTypes.object,
  colorStyle: PropTypes.objectOf(ColorStyle) || ColorStyle.red,
};
*/
