/*
 * Copyright (c) 2020. Prototype
 */

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FRONT_AUTH_USER } from '../constants/constants';

const withAuthProtection = OriginalComponent => {
  class WithAuthProtection extends React.Component {
    render() {
      const { ...rest } = this.props;
      const authenticated = localStorage.getItem(FRONT_AUTH_USER);
      return authenticated ?
        <OriginalComponent {...rest} /> :
        <Redirect to={'/login'}/>;
    }
  }

  return connect(
    state => ({
      state,
    }),
    {},
  )(WithAuthProtection);
};
export default withAuthProtection;
