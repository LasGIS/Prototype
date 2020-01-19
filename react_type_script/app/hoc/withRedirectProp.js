/*
 * Copyright (c) 2020. Prototype
 */

import React from 'react';
import { connect } from 'react-redux';
import { redirect } from '../common/actions';

const withRedirectProp = WrappedComponent => {
  const withRedirectProp = props => <WrappedComponent {...props} />;

  return connect(() => ({}), {
    redirect,
  })(withRedirectProp);
};

export default withRedirectProp;
